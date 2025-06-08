import { ENDPOINTS } from "@/backend/endpoints";
import { generateErrorLog } from "@/utils/generate-error-log";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
	try {
		(await cookies()).delete("connect.sid");
		const res = await fetch(ENDPOINTS.signOut(), {
			method: "GET",
			headers: req.headers,
			credentials: "include",
		});
		const { error } = await res.json();
		if (error) throw new Error(error);

		return new Response(null);
	} catch (error) {
		generateErrorLog("sign-out-controller", error, "silent");
		return new Response(null);
	} finally {
		redirect("/auth");
	}
}
