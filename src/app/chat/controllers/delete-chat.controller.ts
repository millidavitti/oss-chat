import { getCsrfToken } from "@/backend/auth/get-csrf-token.controller";
import { ENDPOINTS } from "@/backend/endpoints";
import { ApiResponse } from "@/data/types/global";
import { generateErrorLog } from "@/utils/generate-error-log";

export async function deleteChatController(chatId: string) {
	try {
		const { token } = (await getCsrfToken())!;
		const res = await fetch(ENDPOINTS.deleteChat(chatId), {
			method: "delete",
			credentials: "include",
			headers: { "x-csrf-token": token },
		});

		const { error } = (await res.json()) as ApiResponse;
		if (error) throw new Error(error);
	} catch (error) {
		generateErrorLog("delete-chat-controller", error);
	}
}
