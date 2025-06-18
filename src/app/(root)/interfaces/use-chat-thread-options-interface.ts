import { useAtom, useSetAtom } from "jotai";
import { toast } from "sonner";
import { delete_chat_jotai, chats_jotai } from "../data/chat-data";
import { chat_ui_layer_1_jotai } from "../data/chat-ui-state";

export default function useChatThreadOptionsInterface() {
	const [delete_chat] = useAtom(delete_chat_jotai);
	const [chats] = useAtom(chats_jotai);
	const chat_ui_layer_1_setter = useSetAtom(chat_ui_layer_1_jotai);

	async function deleteChat(chatId: string) {
		chat_ui_layer_1_setter(null);
		(document.querySelector("#close") as HTMLElement)?.click();
		await delete_chat.mutateAsync(chatId, {
			onError() {
				toast.error("You cannot delete your chat at the moment");
			},
			onSuccess() {
				chats.refetch();
			},
		});
	}

	return { deleteChat };
}
