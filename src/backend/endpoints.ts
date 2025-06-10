export const ENDPOINTS = {
	openId: () => "https://accounts.google.com/.well-known/openid-configuration",
	ping: () => `${process.env.NEXT_PUBLIC_BACKEND_AUTH_ENDPOINT}/ping`,
	signUp: () => `${process.env.NEXT_PUBLIC_BACKEND_AUTH_ENDPOINT}/sign-up`,
	signIn: () => `${process.env.NEXT_PUBLIC_BACKEND_AUTH_ENDPOINT}/sign-in`,
	signOut: () => `${process.env.NEXT_PUBLIC_BACKEND_AUTH_ENDPOINT}/sign-out`,
	csrfToken: () =>
		`${process.env.NEXT_PUBLIC_BACKEND_AUTH_ENDPOINT}/csrf-token`,
	updateUser: (userId: string) =>
		`${process.env.NEXT_PUBLIC_API_ENDPOINT!}/users/${userId}`,
	createChat: (chatId: string) =>
		`${process.env.NEXT_PUBLIC_API_ENDPOINT!}/chats/create-chat/${chatId}`,
	sendChatMessage: (chatId: string) =>
		`${process.env
			.NEXT_PUBLIC_API_ENDPOINT!}/chats/send-chat-message/${chatId}`,
	getChatMessages: (chatId: string) =>
		`${process.env
			.NEXT_PUBLIC_API_ENDPOINT!}/chats/get-chat-messages/${chatId}`,
};
