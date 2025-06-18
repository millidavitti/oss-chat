import { useAtom, useSetAtom } from "jotai";
import { useParams } from "next/navigation";
import { useEffect, useRef } from "react";
import {
	chat_history_client_jotai,
	chat_history_db_jotai,
	ChatMessage,
	Chat,
	is_waiting_for_ai_jotai,
} from "../data/chat-data";
import { queryClient } from "@/data/query-client";
import { toast } from "sonner";
import debounce from "lodash.debounce";
import {
	chat_ui_layer_1_jotai,
	is_scroll_bottom_jotai,
} from "../data/chat-ui-state";

export default function useChatHistoryInterface() {
	const messageRefs = useRef<HTMLDivElement[]>([]);
	const root = useRef<HTMLDivElement>(null);
	const [chat_history_client, chat_history_client_setter] = useAtom(
		chat_history_client_jotai,
	);
	const params = useParams();
	const [chat_history_db] = useAtom(chat_history_db_jotai);
	const is_scroll_bottom_setter = useSetAtom(is_scroll_bottom_jotai);
	const [is_waiting_for_ai, is_waiting_for_ai_setter] = useAtom(
		is_waiting_for_ai_jotai,
	);
	const chat_ui_layer_1_setter = useSetAtom(chat_ui_layer_1_jotai);

	// SSE && Scroll to bottom button
	useEffect(() => {
		let aiResponseEventSource: EventSource;

		// SSE
		(async () => {
			aiResponseEventSource = new EventSource(
				`${process.env.NEXT_PUBLIC_API_ENDPOINT}/chats/ai-response/${params["chat-id"]}`,
				{ withCredentials: true },
			);

			aiResponseEventSource.onmessage = async (event) => {
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
					chat_ui_layer_1_setter(null);
					is_waiting_for_ai_setter(false);
					chat_history_client_setter((messages) => [
						...messages.slice(0, -2),
						userMessage,
						aiMessage,
					]);
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

			aiResponseEventSource.onerror = (err) => {
				is_waiting_for_ai_setter(false);
				console.error("EventSource failed:", err);
				toast.error("I'm not in the mood to chat right now 😒");
			};
		})();

		//Toggle Scroll to Bottom Button

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
			aiResponseEventSource?.close();
			messages?.removeEventListener("scroll", deboucedCb);
		};
	}, []);

	return {
		root,
		messageRefs,
		chat_history_db,
		chat_history_client,
		is_waiting_for_ai,
	};
}
