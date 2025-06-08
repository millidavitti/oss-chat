import { ENDPOINTS } from "@/backend/endpoints";

export async function generateOpenIdUri() {
	const [doc, token] = await Promise.all([
		(async () => {
			const res = await fetch(ENDPOINTS.openId(), {
				cache: "force-cache",
			});
			return await res.json();
		})(),
		(async () => {
			const res = await fetch(ENDPOINTS.csrfToken(), {
				credentials: "include",
				cache: "no-store",
			});
			const { status, data } = await res.json();
			console.log(status, data);
			return data.token;
		})(),
	]);
	const array = new Uint32Array(1);
	self.crypto.getRandomValues(array);

	return encodeURI(
		`${doc.authorization_endpoint}?response_type=code&client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&scope=openid email profile&redirect_uri=${process.env.NEXT_PUBLIC_BACKEND_REDIRECT_URI}&state=${token}&nonce=${array[0]}`,
	);
}
