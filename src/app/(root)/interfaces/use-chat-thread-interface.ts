import { useEffect, useRef } from "react";
import {
	Chat,
	chat_jotai,
	chats_jotai,
	rename_chat_jotai,
} from "../data/chat-data";
import { useQueryClient } from "@tanstack/react-query";
import { useSetAtom, useAtom } from "jotai";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import {
	mouse_position_jotai,
	chat_ui_layer_1_jotai,
} from "../data/chat-ui-state";

export default function useChatThreadInterface() {
	const mouse_position_setter = useSetAtom(mouse_position_jotai);
	const [chat_ui_layer_1, chat_ui_layer_1_setter] = useAtom(
		chat_ui_layer_1_jotai,
	);
	const [chat, chat_setter] = useAtom(chat_jotai);
	const [chats] = useAtom(chats_jotai);
	const params = useParams();
	const [rename_chat] = useAtom(rename_chat_jotai);
	const queryClient = useQueryClient();
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (inputRef.current) inputRef.current.focus();
	}, [chat_ui_layer_1 === "rename-chat"]);

	async function saveChatRename(chatId: string) {
		await rename_chat.mutateAsync(
			{ chatId, title: chat!.title },
			{
				onError() {
					toast.error("You cannot delete your chat at the moment");
				},
				onSuccess() {
					queryClient.cancelQueries({ queryKey: ["chats"] });
					queryClient.setQueryData(["chats"], {
						chats: [
							chat,
							...chats.data!.chats.filter((c) => c.id !== chat?.id),
						],
					});
					cancelChatRename();
				},
			},
		);
	}
	function renameChat(value: string) {
		chat_setter((chat) => ({
			...chat!,
			title: value,
		}));
	}
	function displayChatOptions(clientX: number, clientY: number, chat: Chat) {
		mouse_position_setter({ x: clientX, y: clientY });
		chat_ui_layer_1_setter("show-chat-thread-options");
		chat_setter(chat);
	}

	function viewChat(chat: Chat) {
		cancelChatRename();
		chat_setter(chat);
	}
	function cancelChatRename() {
		chat_ui_layer_1_setter(null);
	}
	return {
		saveChatRename,
		displayChatOptions,
		renameChat,
		viewChat,
		chatId: params["chat-id"],
		chat_ui_layer_1,
		chat,
		cancelChatRename,
		inputRef,
	};
}
