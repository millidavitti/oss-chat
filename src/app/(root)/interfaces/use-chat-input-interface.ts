import { createId } from "@paralleldrive/cuid2";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useParams, usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import {
	chat_history_client_jotai,
	chat_input_jotai,
	create_chat_jotai,
	is_waiting_for_ai_jotai,
	selected_model_jotai,
	send_chat_message_jotai,
} from "../data/chat-data";
import {
	chat_ui_layer_1_jotai,
	is_scroll_bottom_jotai,
} from "../data/chat-ui-state";

export default function useChatInputInterface() {
	const [chat_input, chat_input_setter] = useAtom(chat_input_jotai);
	const chat_ui_layer_1 = useAtomValue(chat_ui_layer_1_jotai);
	const [create_chat] = useAtom(create_chat_jotai);
	const [send_chat_message] = useAtom(send_chat_message_jotai);
	const router = useRouter();
	const path = usePathname();
	const params = useParams();
	const chat_history_client_setter = useSetAtom(chat_history_client_jotai);
	const is_scroll_bottom = useAtomValue(is_scroll_bottom_jotai);
	const chat_ui_layer_1_setter = useSetAtom(chat_ui_layer_1_jotai);
	const [selected_model] = useAtomValue(selected_model_jotai);
	const is_waiting_for_ai_setter = useSetAtom(is_waiting_for_ai_jotai);
	async function createChat() {
		const chatId = createId();
		router.push(`/chat/${chatId}`);
		chat_input_setter("");
		chat_history_client_setter((messages) => {
			is_waiting_for_ai_setter(true);
			return [
				...messages,
				{ chatId, content: chat_input, id: createId(), type: "user" },
				{ chatId, content: "", id: createId(), type: "ai" },
			];
		});
		return await create_chat.mutateAsync(
			{ chatId, prompt: chat_input, model: selected_model },
			{
				onError() {
					toast.error("Your message was not sent");
				},
			},
		);
	}

	async function sendChatMessage() {
		if (path === "/") return await createChat();
		const chatId = params["chat-id"] as string;
		chat_input_setter("");
		chat_history_client_setter((messages) => {
			is_waiting_for_ai_setter(true);
			return [
				...messages,
				{ chatId, content: chat_input, id: createId(), type: "user" },
				{ chatId, content: "", id: createId(), type: "ai" },
			];
		});
		send_chat_message.mutateAsync(
			{ prompt: chat_input, chatId, model: selected_model },
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

	function toggleChatMenu() {
		chat_ui_layer_1_setter((layer) =>
			layer === "show-chat-options" ? null : "show-chat-options",
		);
	}
	return {
		chat_input,
		sendChatMessage,
		captureChatInput,
		chat_ui_layer_1,
		is_scroll_bottom,
		toggleChatMenu,
	};
}
