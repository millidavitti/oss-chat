import { useAtom, useSetAtom } from "jotai";
import { useParams } from "next/navigation";
import { useEffect, useRef } from "react";
import {
	chat_history_client_jotai,
	chat_history_db_jotai,
	chats_jotai,
	ChatMessage,
	Chat,
	chat_jotai,
} from "../data/chat-data";
import { queryClient } from "@/data/query-client";

export default function useChatHistoryInterface() {
	const messageRefs = useRef<HTMLDivElement[]>([]);

	const root = useRef<HTMLDivElement>(null);
	const [chat_history_client, chat_history_client_setter] = useAtom(
		chat_history_client_jotai,
	);
	const params = useParams();
	const [chat_history_db] = useAtom(chat_history_db_jotai);
	const [chats] = useAtom(chats_jotai);
	const chat_setter = useSetAtom(chat_jotai);

	useEffect(() => {
		document
			.querySelector("#scroll-into-view")
			?.scrollIntoView({ behavior: "smooth" });
	}, [chat_history_client[1]?.content]);

	useEffect(() => {
		let aiResponse: EventSource;

		if (chat_history_client.length > 1) chat_history_client_setter([]);
		// SSE
		(async () => {
			aiResponse = new EventSource(
				`${process.env.NEXT_PUBLIC_API_ENDPOINT}/chats/ai-response/${params["chat-id"]}`,
				{ withCredentials: true },
			);
			aiResponse.onmessage = async (event) => {
				const { aiMessage, userMessage, chat } = JSON.parse(event.data) as {
					aiMessage?: ChatMessage;
					chat?: Chat;
					userMessage: ChatMessage;
				};

				if (aiMessage?.status === "pending") {
					chat_history_client_setter([userMessage, aiMessage]);
				} else if (aiMessage?.status === "completed") {
					queryClient.setQueryData(
						["chat-messages"],
						({ chatMessages }: { chatMessages: ChatMessage[] }) => {
							return {
								chatMessages: [...chatMessages, userMessage, aiMessage],
							};
						},
					);
					chat_history_client_setter([]);
					await chats.refetch();
				}

				if (chat) {
					queryClient.setQueryData(
						["chats"],
						({ chats }: { chats: Chat[] }) => {
							return {
								chats: chats.map((c) => {
									if (c.id === chat.id) return chat;
									return c;
								}),
							};
						},
					);
					chat_setter(chat);
				}
			};
			aiResponse.onerror = (err) => {
				console.error("EventSource failed:", err);
			};
		})();

		// Oberser
		const observer = new IntersectionObserver(
			([entry]) => {
				const { target, isIntersecting } = entry;
				const chatHistory = root.current as HTMLElement;
				console.log(isIntersecting, target);
				// Subtracting 2 from target.dataset.id because:
				// 1. User messages are rendered at even-numbered indexes (the interval is key here), so subtracting 2 aligns the calculation with the correct message element.
				// Final calculation: Number(target.dataset.id) - 2.
				if (isIntersecting) {
					console.log(chatHistory.children);
					chatHistory?.children[
						Number((target as HTMLElement).dataset.index) - 2
					]?.classList.add("opacity-0", "translate-x-[16px]");
				} else
					chatHistory?.children[
						Number((target as HTMLElement).dataset.index) - 2
					]?.classList.remove("opacity-0", "translate-x-[16px]");
			},
			{
				threshold: 0.15,
				root: root.current,
				rootMargin: "0px 0px -85% 0px",
			},
		);
		console.log(messageRefs);

		for (const ref of messageRefs.current) {
			console.log(ref);
			if (ref) observer.observe(ref);
		}

		return () => {
			aiResponse?.close();
			observer.disconnect();
		};
	}, [params["chat-id"]]);
	return { root, messageRefs, chat_history_db, chat_history_client };
}
