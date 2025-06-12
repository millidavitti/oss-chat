import { getCsrfToken } from "@/backend/auth/get-csrf-token.controller";
import { ENDPOINTS } from "@/backend/endpoints";
import { ApiResponse } from "@/data/types/global";
import { generateErrorLog } from "@/utils/generate-error-log";

export async function renameChatController(chatId: string, title: string) {
	try {
		const { token } = (await getCsrfToken())!;
		const res = await fetch(ENDPOINTS.renameChat(chatId), {
			method: "post",
			credentials: "include",
			headers: { "x-csrf-token": token, "Content-Type": "application/json" },
			body: JSON.stringify({ title }),
		});

		const { error } = (await res.json()) as ApiResponse;
		if (error) throw new Error(error);
	} catch (error) {
		generateErrorLog("rename-chat-controller", error);
	}
}
