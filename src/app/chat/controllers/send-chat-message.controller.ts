import { ChatMessage, Model } from "@/app/(root)/data/chat-data";
import { getCsrfToken } from "@/backend/auth/get-csrf-token.controller";
import { ENDPOINTS } from "@/backend/endpoints";
import { ApiResponse } from "@/data/types/global";
import { generateErrorLog } from "@/utils/generate-error-log";

export async function sendChatMessageController(
	chatId: string,
	prompt: string,
	model: Model,
) {
	try {
		const { token } = (await getCsrfToken())!;
		const res = await fetch(ENDPOINTS.sendChatMessage(chatId), {
			method: "post",
			credentials: "include",
			headers: { "x-csrf-token": token, "Content-Type": "application/json" },
			body: JSON.stringify({ prompt, model }),
		});

		const { error, data } = (await res.json()) as ApiResponse;
		if (error) throw new Error(error);

		return data as { chatHistory: ChatMessage[] };
	} catch (error) {
		generateErrorLog("send-chat-message-controller", error);
	}
}
