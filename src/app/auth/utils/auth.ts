import { NextRequest } from "next/server";
import { getErrorMessage } from "../../../utils/get-error-message";
import { ENDPOINTS } from "../../../backend/endpoints";
import { generateErrorLog } from "../../../utils/generate-error-log";
import { User } from "@/data/types/global";

export async function auth(request?: NextRequest) {
	try {
		const res = await fetch(ENDPOINTS.ping(), {
			method: "GET",
			credentials: "include",
			headers: { Cookie: request?.headers.get("cookie") || "" }, // Forward cookies
		});

		const data = await res.json();

		return data as auth;
	} catch (error) {
		generateErrorLog("auth", error, "silent");
		return { error: getErrorMessage(error) } as auth;
	}
}

type auth = {
	user?: User;
	error?: string;
	isAuthenticated: boolean;
};
