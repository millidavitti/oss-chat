import { getErrorMessage } from "@/utils/get-error-message";
import { useState } from "react";

export default function useAiMessageInterface() {
	const [hasCopiedMessage, setHasCopiedMessage] = useState(false);

	async function copyMessage(content: string) {
		try {
			const permission = (
				await navigator.permissions.query({
					name: "clipboard-write" as PermissionName,
				})
			).state;
			if (permission === "granted") {
				await navigator.clipboard.writeText(content);
				setHasCopiedMessage(true);
				setTimeout(() => setHasCopiedMessage(false), 1000);
			} else alert(permission);
		} catch (error) {
			alert(getErrorMessage(error));
		}
	}
	return { copyMessage, hasCopiedMessage };
}
