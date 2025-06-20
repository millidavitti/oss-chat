import { useAtomValue } from "jotai";
import { useEffect, useRef, useState } from "react";
import { user_message_jotai } from "../data/chat-data";
import { getErrorMessage } from "@/utils/get-error-message";

export default function useUserMessageInterface() {
	const paragraphRef = useRef<HTMLParagraphElement>(null);
	const [isOverflowing, setIsOverflowing] = useState(false);
	const [shouldClamp, setShouldClamp] = useState(true);
	const user_message = useAtomValue(user_message_jotai);
	const [hasCopiedMessage, setHasCopiedMessage] = useState(false);

	useEffect(() => {
		if (paragraphRef.current) {
			const p = paragraphRef.current;
			const lineHeight = +getComputedStyle(p).lineHeight.replace("px", "");
			const scrollHeightBeforeClamping = lineHeight * 3;
			const isOverflowing = p.scrollHeight > scrollHeightBeforeClamping;
			setIsOverflowing(isOverflowing);
		}
	}, [user_message]);

	function expandShrink(messageId: string, action?: "expand" | "shrink") {
		requestAnimationFrame(() => {
			document
				.querySelector("#user-message-" + messageId)!
				.scrollIntoView({ behavior: "smooth" });
		});

		if (action) {
			if (action === "expand") {
				setShouldClamp(false);
				document
					.querySelector("#chat-history")!
					.classList.add("overflow-y-hidden");
			} else {
				setShouldClamp(true);
				document
					.querySelector("#chat-history")!
					.classList.remove("overflow-y-hidden");
			}
		} else {
			setShouldClamp(!shouldClamp);
			document
				.querySelector("#chat-history")!
				.classList.toggle("overflow-y-hidden");
		}
	}

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
	return {
		expandShrink,
		isOverflowing,
		shouldClamp,
		paragraphRef,
		copyMessage,
		hasCopiedMessage,
	};
}
