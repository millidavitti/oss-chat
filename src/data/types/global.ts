export type ApiResponse<T = undefined> = {
	error?: string;
	status?: ApiStatus;
	data?: T | Record<string, unknown>;
};

export type User = {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	emailVerified: boolean;
	linkOauthAccounts: boolean;
	picture: string | null;
};
export type ApiStatus =
	| "account-creation-successful"
	| "account-creation-failed"
	| "email-verification-failed"
	| "email-verification-sent"
	| "magic-link-sent"
	| "magic-link-not-sent"
	| "csrf-token-missing"
	| "csrf-token-mismatch"
	| "authenticated"
	| "not-authenticated"
	| "has-profile"
	| "not-linked"
	| "user-does-not-exist"
	| "study-set-not-created"
	| "user-exists";
