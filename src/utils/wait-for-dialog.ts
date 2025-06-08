import { dialog_jotai } from "@/data/atoms/ui_state";
import { jotaiStore } from "@/data/jotai-store";

export function waitForDialog(resolve: (value: boolean) => void) {
	setTimeout(() => resolve(false), 30000);

	const checkTask = () => {
		if (jotaiStore.get(dialog_jotai) === "continue") {
			console.log("Continued");
			resolve(true);
		} else if (jotaiStore.get(dialog_jotai) === "cancel") {
			console.log("Canceled");
			resolve(false);
		} else {
			setTimeout(checkTask, 2000);
		}
	};
	checkTask();
}
