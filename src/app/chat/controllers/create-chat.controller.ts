import { ChatMessage } from "@/app/(root)/data/chat-data";
import { getCsrfToken } from "@/backend/auth/get-csrf-token.controller";
import { ENDPOINTS } from "@/backend/endpoints";
import { ApiResponse } from "@/data/types/global";
import { generateErrorLog } from "@/utils/generate-error-log";

export async function createChatController(chatId: string, prompt: string) {
	try {
		const { token } = (await getCsrfToken())!;
		const res = await fetch(ENDPOINTS.createChat(chatId), {
			method: "post",
			credentials: "include",
			headers: { "x-csrf-token": token, "Content-Type": "application/json" },
			body: JSON.stringify({ prompt }),
		});

		const { error, data } = (await res.json()) as ApiResponse;
		if (error) throw new Error(error);

		return data as { chat: ChatMessage[] };
	} catch (error) {
		generateErrorLog("create-chat-controller", error);
	}
}
