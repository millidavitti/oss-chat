import { ApiResponse } from "@/data/types/global";
import { generateErrorLog } from "@/utils/generate-error-log";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
	try {
		const searchParams = req.nextUrl.searchParams;
		const res = await fetch(
			`${process.env
				.NEXT_PUBLIC_BACKEND_AUTH_ENDPOINT!}/verify-email/${searchParams.get(
				"token",
			)}`,
			{ method: "GET", headers: req.headers },
		);

		const { error, status } = (await res.json()) as ApiResponse;

		if (error) throw new Error(error);

		return new Response(null, {
			status: 302,
			headers: {
				...Object.fromEntries(res.headers.entries()),
				Location: `${process.env.ORIGIN}/auth${
					status === "account-creation-successful" ? `/study-sets` : "/sign-up"
				}?status=${status}`,
			},
		});
	} catch (error) {
		generateErrorLog("verify-email", error, "silent");
		return new Response(null, {
			status: 302,
			headers: {
				Location: `${process.env.ORIGIN}/auth/sign-up?status=not-authenticated`,
			},
		});
	}
}
