import { atom } from "jotai";
import { focusAtom } from "jotai-optics";

export type SignUpCredentials = {
	firstName: string;
	lastName: string;
	email: string;
};

export const sign_up_credentials_jotai = atom<SignUpCredentials>({
	firstName: "",
	lastName: "",
	email: "",
});

export const first_name_jotai = focusAtom(sign_up_credentials_jotai, (optic) =>
	optic.prop("firstName"),
);
export const last_name_jotai = focusAtom(sign_up_credentials_jotai, (optic) =>
	optic.prop("lastName"),
);
export const email_jotai = focusAtom(sign_up_credentials_jotai, (optic) =>
	optic.prop("email"),
);
