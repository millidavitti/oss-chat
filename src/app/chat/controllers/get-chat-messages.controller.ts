import { ChatMessage } from "@/app/(root)/data/chat-data";
import { ENDPOINTS } from "@/backend/endpoints";
import { ApiResponse } from "@/data/types/global";
import { generateErrorLog } from "@/utils/generate-error-log";

export async function getChatMessagesController(chatId: string) {
	try {
		const res = await fetch(ENDPOINTS.getChatMessages(chatId), {
			method: "get",
			credentials: "include",
		});

		const { error, data } = (await res.json()) as ApiResponse;
		if (error) throw new Error(error);

		return data as { chatMessages: ChatMessage[] };
	} catch (error) {
		generateErrorLog("get-chat-messages-controller", error);
	}
}
