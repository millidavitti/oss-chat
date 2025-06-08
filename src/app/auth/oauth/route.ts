import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
	const searchParams = req.nextUrl.searchParams;
	if (searchParams.get("status") === "authenticated") redirect("/study-sets");
	else redirect(`/auth/sign-in?status=${searchParams.get("status")}`);
}
