import { toast } from "sonner";
import { signInController } from "../controllers/sign-in.controller";
import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import { sign_in_credentials_jotai } from "../atoms/sign-in-data";
import { generateErrorLog } from "@/utils/generate-error-log";
import { ApiStatus } from "@/data/types/global";
import { useSearchParams } from "next/navigation";

export default function useSignInFormInterface() {
	const sign_in_credentials = useAtomValue(sign_in_credentials_jotai);
	const [signingIn, setSigningIn] = useState(false);
	const status = useSearchParams().get("status") as ApiStatus;

	useEffect(() => {
		if (status === "not-linked")
			toast.info(
				"An account with this email already exists. Please sign in using your original method, then go to Settings → Security and enable 'Link OAuth Profiles' to connect your Google account.",
			);
		else if (status === "not-authenticated")
			toast.info("Your identity could not be verified");
	}, [status]);

	async function signIn() {
		try {
			setSigningIn(true);
			const status = await signInController(sign_in_credentials);
			if (status === "magic-link-sent") {
				toast.info("Magic link has been sent to " + sign_in_credentials.email);
			} else if (status === "magic-link-not-sent") {
				toast.info("We were unable to send you a magic link");
			} else if (status === "user-does-not-exist") {
				toast.info(
					"You do not have an account associated with " +
						sign_in_credentials.email,
				);
			}
			setSigningIn(false);
		} catch (error) {
			generateErrorLog("sign-in", error, "silent");
		}
	}
	return { signingIn, signIn };
}
