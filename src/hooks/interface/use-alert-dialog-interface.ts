import { chat_ui_layer_1_jotai } from "@/app/(root)/data/chat-ui-state";
import { dialog_jotai, dialog_message_jotai } from "@/data/atoms/ui_state";
import { useAtom, useAtomValue, useSetAtom } from "jotai";

export default function useAlertDialogInterface() {
	const chat_ui_layer_1 = useSetAtom(chat_ui_layer_1_jotai);
	const [dialog, dialog_setter] = useAtom(dialog_jotai);
	const dialog_message = useAtomValue(dialog_message_jotai);

	function cancel() {
		chat_ui_layer_1(null);
		dialog_setter("cancel");
	}

	function proceed() {
		dialog_setter("continue");
	}

	return { cancel, proceed, dialog, dialog_message };
}
