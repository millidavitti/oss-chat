import { generateErrorLog } from "@/utils/generate-error-log";
import { ENDPOINTS } from "@/backend/endpoints";
import { ApiResponse } from "@/data/types/global";
import { SignInCredentials } from "../atoms/sign-in-data";

export async function signInController(signInCredentials: SignInCredentials) {
	try {
		const response = await fetch(ENDPOINTS.signIn(), {
			method: "post",
			body: JSON.stringify(signInCredentials),
			headers: { "Content-Type": "application/json" },
			credentials: "include",
		});
		const { error, status } = (await response.json()) as ApiResponse;

		if (error) throw new Error(error);
		return status;
	} catch (error) {
		generateErrorLog("sign-in-controller", error);
	}
}
