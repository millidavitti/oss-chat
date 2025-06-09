import { createId } from "@paralleldrive/cuid2";
import { useAtom, useAtomValue } from "jotai";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { chat_input_jotai, create_chat_jotai } from "../data/chat-data";
import { chat_ui_layer_1_jotai } from "../data/chat-ui-state";

export default function useChatInputInterface() {
	const [chat_input, chat_input_setter] = useAtom(chat_input_jotai);
	const chat_ui_layer_1 = useAtomValue(chat_ui_layer_1_jotai);
	const [create_chat] = useAtom(create_chat_jotai);
	const router = useRouter();

	async function createChat() {
		const chatId = createId();
		router.push(`/chat/${chatId}`);
		await create_chat.mutateAsync(chatId, {
			onError() {
				toast.error("Your message was not sent");
			},
			onSuccess() {
				chat_input_setter("");
			},
		});
	}

	function captureChatInput(value: string) {
		chat_input_setter(value);
	}
	return { chat_input, createChat, captureChatInput, chat_ui_layer_1 };
}
