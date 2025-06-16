import { ApiResponse } from "@/data/types/global";
import { generateErrorLog } from "@/utils/generate-error-log";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
	try {
		const searchParams = req.nextUrl.searchParams;
		const res = await fetch(
			`${
				process.env.NEXT_PUBLIC_BACKEND_AUTH_ENDPOINT
			}/sign-in/${searchParams.get("token")}`,
			{ method: "post", headers: req.headers, credentials: "include" },
		);

		const { error, status, data } = (await res.json()) as ApiResponse;

		if (error) throw new Error(error);
		return status === "authenticated" && data
			? new Response(null, {
					status: 302,
					headers: {
						...Object.fromEntries(res.headers.entries()),
						Location: `${process.env.ORIGIN}`,
					},
			  })
			: new Response(null, {
					status: 302,
					headers: {
						...Object.fromEntries(res.headers.entries()),
						Location: `${process.env.ORIGIN}/auth/sign-in?status=${status}`,
					},
			  });
	} catch (error) {
		generateErrorLog("sign-in-verification", error, "silent");
		return new Response(null, {
			status: 302,
			headers: {
				Location: `${process.env.ORIGIN}/auth/sign-in?status=not-authenticated`,
			},
		});
	}
}
