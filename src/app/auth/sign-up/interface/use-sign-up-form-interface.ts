import { ApiStatus } from "@/data/types/global";
import { useAtomValue } from "jotai";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { sign_up_credentials_jotai } from "../atom/sign-up-data";
import { signUpController } from "../controllers/sign-up.controller";
import { generateErrorLog } from "@/utils/generate-error-log";
import { getErrorMessage } from "@/utils/get-error-message";

export default function useSignUpFormInterface() {
	const sign_up_credentials = useAtomValue(sign_up_credentials_jotai);
	const status = useSearchParams().get("status") as ApiStatus;
	const [creating, setCreating] = useState(false);

	useEffect(() => {
		if (status === "email-verification-failed")
			toast.info("Email verification failed. Try signing up again");
		else if (status === "user-exists")
			toast.info("You already have an account. Sign in to continue");
		else if (status === "not-authenticated")
			toast.info("Your identity could not be verified");
	}, [status]);

	async function createAccount() {
		try {
			setCreating(true);
			const status = await signUpController(sign_up_credentials);
			if (status === "email-verification-sent") {
				toast.info(
					"A verification email has been sent to " + sign_up_credentials.email,
				);
			} else if (status === "email-verification-failed")
				toast.info("Email verification failed. Try siging up again");
			else if (status === "user-exists")
				toast.info("You already have an account. Sign in to continue");
			setCreating(false);
		} catch (error) {
			setCreating(false);
			toast.info(getErrorMessage(error));
			generateErrorLog("create-account", error, "silent");
		}
	}
	return { createAccount, creating };
}
