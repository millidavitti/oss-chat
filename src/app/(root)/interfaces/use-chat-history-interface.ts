import { useAtom } from "jotai";
import { useParams } from "next/navigation";
import { useEffect, useRef } from "react";
import {
	chat_history_client_jotai,
	chat_history_db_jotai,
	chats_jotai,
	ChatMessage,
} from "../data/chat-data";

export default function useChatHistoryInterface() {
	const messageRefs = useRef<HTMLDivElement[]>([]);

	const root = useRef<HTMLDivElement>(null);
	const [chat_history_client, chat_history_client_setter] = useAtom(
		chat_history_client_jotai,
	);
	const params = useParams();
	const [chat_history_db] = useAtom(chat_history_db_jotai);
	const [chats] = useAtom(chats_jotai);
	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				const { target, isIntersecting } = entry;
				const chatHistory = root.current as HTMLElement;
				console.log(isIntersecting, target);
				// Subtracting 2 from target.dataset.id because:
				// 1. User messages are rendered at even-numbered indexes (the interval is key here), so subtracting 2 aligns the calculation with the correct message element.
				// Final calculation: Number(target.dataset.id) - 2.
				if (isIntersecting) {
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
			observer.disconnect();
		};
	}, [chat_history_db.isPending, params["chat-id"]]);

	useEffect(() => {
		let aiResponse: EventSource;

		(async () => {
			aiResponse = new EventSource(
				`${process.env.NEXT_PUBLIC_API_ENDPOINT}/chats/ai-response/${params["chat-id"]}`,
				{ withCredentials: true },
			);
			aiResponse.onmessage = async (event) => {
				const chatMessage = JSON.parse(event.data) as ChatMessage;

				if (chatMessage.status === "pending") {
					chat_history_client_setter([chatMessage]);
				} else if (chatMessage.status === "completed") {
					await chat_history_db.refetch();
					chat_history_client_setter([]);
					await chats.refetch();
				}
			};
			aiResponse.onerror = (err) => {
				console.log("EventSource failed:", err);
			};
		})();

		return () => {
			aiResponse?.close();
		};
	}, [params["chat-id"]]);
	return { root, messageRefs, chat_history_db, chat_history_client };
}
