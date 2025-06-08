import { generateErrorLog } from "@/utils/generate-error-log";
import { SignUpCredentials } from "../atom/sign-up-data";
import { ENDPOINTS } from "@/backend/endpoints";
import { ApiResponse } from "@/data/types/global";

export async function signUpController(signUpCredentials: SignUpCredentials) {
	try {
		const response = await fetch(ENDPOINTS.signUp(), {
			method: "post",
			body: JSON.stringify(signUpCredentials),
			headers: { "Content-Type": "application/json" },
			credentials: "include",
		});
		const { error, status } = (await response.json()) as ApiResponse;

		if (error) throw new Error(error);
		return status;
	} catch (error) {
		generateErrorLog("sign-up-controller", error);
	}
}
