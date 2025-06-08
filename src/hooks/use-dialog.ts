import { chat_ui_layer_1_jotai } from "@/app/(root)/data/chat-ui-state";
import { dialog_jotai, dialog_message_jotai } from "@/data/atoms/ui_state";
import { waitForDialog } from "@/utils/wait-for-dialog";
import { useSetAtom } from "jotai";

export default function useDialog() {
	const chat_ui_layer_1 = useSetAtom(chat_ui_layer_1_jotai);
	const dialog_setter = useSetAtom(dialog_jotai);
	const dialog_message_setter = useSetAtom(dialog_message_jotai);

	function displayDialog(message?: string) {
		dialog_message_setter(message || null);
		chat_ui_layer_1("alert-dialog");
	}

	function closeDialog() {
		chat_ui_layer_1(null);
		dialog_setter(null);
	}

	return { closeDialog, displayDialog, waitForDialog };
}
