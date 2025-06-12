import { Chat } from "@/app/(root)/data/chat-data";
import { ENDPOINTS } from "@/backend/endpoints";
import { ApiResponse } from "@/data/types/global";
import { generateErrorLog } from "@/utils/generate-error-log";

export async function getChatsController(chatId: string) {
	try {
		const res = await fetch(ENDPOINTS.getChats(chatId), {
			method: "get",
			credentials: "include",
		});

		const { error, data } = (await res.json()) as ApiResponse;
		if (error) throw new Error(error);

		return data as { chats: Chat[] };
	} catch (error) {
		generateErrorLog("get-chats-controller", error);
	}
}
