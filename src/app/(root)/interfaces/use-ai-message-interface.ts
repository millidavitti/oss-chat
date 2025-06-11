import { getErrorMessage } from "@/utils/get-error-message";
import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import { chat_history_client_jotai } from "../data/chat-data";

export default function useAiMessageInterface() {
	const [hasCopiedMessage, setHasCopiedMessage] = useState(false);
	const chat_history_client = useAtomValue(chat_history_client_jotai);
	useEffect(() => {
		document
			.querySelector("#copy-ai-message")
			?.scrollIntoView({ behavior: "smooth" });
	}, [chat_history_client[0]?.content]);
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
