import {
	dialog_jotai,
	dialog_message_jotai,
	root_ui_layer_1_jotai,
} from "@/app/(root)/atoms/ui_state";
import { waitForDialog } from "@/utils/wait-for-dialog";
import { useSetAtom } from "jotai";

export default function useDialog() {
	const view_setter = useSetAtom(root_ui_layer_1_jotai);
	const dialog_setter = useSetAtom(dialog_jotai);
	const dialog_message_setter = useSetAtom(dialog_message_jotai);

	function displayDialog(message?: string) {
		dialog_message_setter(message || null);
		view_setter("alert-dialog");
	}

	function closeDialog() {
		view_setter(null);
		dialog_setter(null);
	}

	return { closeDialog, displayDialog, waitForDialog };
}
