import { createId } from "@paralleldrive/cuid2";
import { useAtom, useAtomValue } from "jotai";
import { useParams, usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import {
	chat_input_jotai,
	create_chat_jotai,
	send_chat_message_jotai,
} from "../data/chat-data";
import { chat_ui_layer_1_jotai } from "../data/chat-ui-state";

export default function useChatInputInterface() {
	const [chat_input, chat_input_setter] = useAtom(chat_input_jotai);
	const chat_ui_layer_1 = useAtomValue(chat_ui_layer_1_jotai);
	const [create_chat] = useAtom(create_chat_jotai);
	const [send_chat_message] = useAtom(send_chat_message_jotai);
	const router = useRouter();
	const path = usePathname();
	const params = useParams();

	async function createChat() {
		const chatId = createId();
		router.push(`/chat/${chatId}`);
		chat_input_setter("");

		return await create_chat.mutateAsync(
			{ chatId, userMessage: chat_input },
			{
				onError() {
					toast.error("Your message was not sent");
				},
			},
		);
	}

	async function sendChatMessage() {
		console.log(path);
		if (path === "/") return await createChat();
		send_chat_message.mutateAsync(
			{ userMessage: chat_input, chatId: params["chat-id"] as string },
			{
				onError() {
					toast.error("Your message was not sent");
				},
			},
		);
	}

	function captureChatInput(value: string) {
		chat_input_setter(value);
	}
	return { chat_input, sendChatMessage, captureChatInput, chat_ui_layer_1 };
}
