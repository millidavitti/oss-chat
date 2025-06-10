import { createId } from "@paralleldrive/cuid2";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import {
	chat_history_client_jotai,
	chat_input_jotai,
	create_chat_jotai,
} from "../data/chat-data";
import { chat_ui_layer_1_jotai } from "../data/chat-ui-state";

export default function useChatInputInterface() {
	const [chat_input, chat_input_setter] = useAtom(chat_input_jotai);
	const chat_ui_layer_1 = useAtomValue(chat_ui_layer_1_jotai);
	const [create_chat] = useAtom(create_chat_jotai);

	const chat_history_client_setter = useSetAtom(chat_history_client_jotai);
	const router = useRouter();
	const path = usePathname();

	async function createChat() {
		const chatId = createId();
		router.push(`/chat/${chatId}`);

		chat_history_client_setter((history) => [
			...history,
			{
				id: createId(),
				content: chat_input,
				status: "pending",
				type: "user",
				chatId,
			},
		]);
		return await create_chat.mutateAsync(
			{ chatId, userMessage: chat_input },
			{
				onError() {
					toast.error("Your message was not sent");
				},
				onSuccess() {
					chat_input_setter("");
				},
			},
		);
	}

	async function sendChatMessage() {
		if (path === "/") return createChat();
	}

	function captureChatInput(value: string) {
		chat_input_setter(value);
	}
	return { chat_input, sendChatMessage, captureChatInput, chat_ui_layer_1 };
}
