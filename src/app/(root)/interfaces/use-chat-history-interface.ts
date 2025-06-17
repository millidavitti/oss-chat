import { useAtom, useSetAtom } from "jotai";
import { useParams } from "next/navigation";
import { useEffect, useRef } from "react";
import {
    chat_history_client_jotai,
    chat_history_db_jotai,
    chats_jotai,
    ChatMessage,
    Chat,
    is_waiting_for_ai_jotai,
} from "../data/chat-data";
import { queryClient } from "@/data/query-client";
import { toast } from "sonner";
import debounce from "lodash.debounce";
import { is_scroll_bottom_jotai } from "../data/chat-ui-state";

export default function useChatHistoryInterface() {
	const messageRefs = useRef<HTMLDivElement[]>([]);
	const root = useRef<HTMLDivElement>(null);
	const [chat_history_client, chat_history_client_setter] = useAtom(
		chat_history_client_jotai,
	);
	const params = useParams();
	const [chat_history_db] = useAtom(chat_history_db_jotai);
	const [chats] = useAtom(chats_jotai);
	const is_scroll_bottom_setter = useSetAtom(is_scroll_bottom_jotai);
	const [is_waiting_for_ai, is_waiting_for_ai_setter] = useAtom(
		is_waiting_for_ai_jotai,
	);

	useEffect(() => {
		document
			.querySelector("#scroll-into-view")
			?.scrollIntoView({ behavior: "smooth" });
	}, [chat_history_client[1]?.content]);

	useEffect(() => {
		let aiResponse: EventSource;

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
					is_waiting_for_ai_setter(false);
					chat_history_client_setter((messages) => [
						...messages.slice(0, -2),
						userMessage,
						aiMessage,
					]);
				} else if (aiMessage?.status === "completed") {
					is_waiting_for_ai_setter(false);
					chat_history_client_setter((messages) => [
						...messages.slice(0, -2),
						userMessage,
						aiMessage,
					]);
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
				}
			};
			aiResponse.onerror = (err) => {
				is_waiting_for_ai_setter(false);
				console.error("EventSource failed:", err);
				toast.error("I'm not in the mood to chat right now 😒");
			};
		})();

		// Oberser
		const observer = new IntersectionObserver(
			([entry]) => {
				const { target, isIntersecting } = entry;
				const chatHistory = root.current as HTMLElement;
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

		for (const ref of messageRefs.current) {
			if (ref) observer.observe(ref);
		}

		// Toggle Scroll to Bottom Button

		const scrollToBottomAnchor = document.querySelector(
			"#scroll-into-view",
		) as HTMLDivElement;
		const deboucedCb = debounce(
			() => {
				const { bottom: rootBottom } = root.current!.getBoundingClientRect();
				const { bottom: anchorBottom } =
					scrollToBottomAnchor.getBoundingClientRect();
				const isScrollBottom =
					rootBottom === anchorBottom &&
					(anchorBottom / rootBottom) * 100 < 120;

				is_scroll_bottom_setter(isScrollBottom);
			},
			700,
			{ leading: true },
		);
		const messages = root.current;
		messages?.addEventListener("scroll", deboucedCb);
		return () => {
			aiResponse?.close();
			observer.disconnect();
			messages?.removeEventListener("scroll", deboucedCb);
		};
	}, [chat_history_db.data?.chatMessages.length]);
	return {
		root,
		messageRefs,
		chat_history_db,
		chat_history_client,
		is_waiting_for_ai,
	};
}
