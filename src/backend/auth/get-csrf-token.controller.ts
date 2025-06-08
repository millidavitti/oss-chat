import { ApiResponse } from "@/data/types/global";
import { ENDPOINTS } from "../endpoints";
import { generateErrorLog } from "@/utils/generate-error-log";

export async function getCsrfToken() {
	try {
		const res = await fetch(ENDPOINTS.csrfToken(), {
			method: "GET",
			credentials: "include",
			headers: { "Content-Type": "application/json" },
		});
		const { error, data } = (await res.json()) as ApiResponse;
		if (error) throw new Error(error);

		return data as { token: string };
	} catch (error) {
		generateErrorLog("get-csrf-token", error);
	}
}
