import {
	Chat,
	chat_history_client_jotai,
	chat_jotai,
	delete_chat_jotai,
} from "../data/chat-data";
import { useAtom, useSetAtom } from "jotai";
import { useParams } from "next/navigation";

export default function useChatThreadInterface() {
	const chat_setter = useSetAtom(chat_jotai);
	const chat_history_client_setter = useSetAtom(chat_history_client_jotai);
	const params = useParams();
	const [delete_chat] = useAtom(delete_chat_jotai);
	function viewChat(chat: Chat) {
		chat_setter(chat);
		chat_history_client_setter([]);
	}

	return {
		viewChat,
		chatId: params["chat-id"],
		delete_chat,
	};
}
