import { generateOpenIdUri } from "../../utils/generate-open-id-uri";

export default function useOauthInterface() {
	async function signInWithGoogle() {
		self.open(await generateOpenIdUri(), "_self");
	}

	return { signInWithGoogle };
}
