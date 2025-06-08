import { atom } from "jotai";

export type SignInCredentials = {
	email: string;
};

export const sign_in_credentials_jotai = atom<SignInCredentials>({
	email: "",
});
