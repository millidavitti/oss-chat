import {
	dialog_jotai,
	dialog_message_jotai,
	root_ui_layer_1_jotai,
} from "@/app/(root)/atoms/ui_state";
import { useAtom, useAtomValue, useSetAtom } from "jotai";

export default function useAlertDialogInterface() {
	const view_setter = useSetAtom(root_ui_layer_1_jotai);
	const [dialog, dialog_setter] = useAtom(dialog_jotai);
	const dialog_message = useAtomValue(dialog_message_jotai);

	function cancel() {
		view_setter(null);
		dialog_setter("cancel");
	}

	function proceed() {
		dialog_setter("continue");
	}

	return { cancel, proceed, dialog, dialog_message };
}
