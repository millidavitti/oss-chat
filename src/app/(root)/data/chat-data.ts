import { auth } from "@/app/auth/utils/auth";
import { createChatController } from "@/app/chat/controllers/create-chat.controller";
import { deleteChatController } from "@/app/chat/controllers/delete-chat.controller";
import { getChatMessagesController } from "@/app/chat/controllers/get-chat-messages.controller";
import { getChatsController } from "@/app/chat/controllers/get-chat-threads.controller";
import { sendChatMessageController } from "@/app/chat/controllers/send-chat-message.controller";
import { atom } from "jotai";
import { atomWithMutation, atomWithQuery } from "jotai-tanstack-query";

export const user_jotai = atomWithQuery(() => ({
	queryKey: [],
	queryFn: async () => {
		return await auth();
	},
}));

export const chat_input_jotai = atom("");

export const create_chat_jotai = atomWithMutation(() => ({
	mutationFn: async ({
		chatId,
		userMessage,
	}: {
		chatId: string;
		userMessage: string;
	}) => {
		return await createChatController(chatId, userMessage);
	},
}));

export type Chat = {
	id: string;
	title: string;
	createdAt: string;
	updateAt: string;
};

export type ChatMessage = {
	id: string;
	chatId: string;
	type: "user" | "ai";
	content: string;
	status?: "pending" | "completed" | "error";
	updatedAt?: string;
	createdAt?: string;
};

export const user_message_jotai = atom<ChatMessage | null>(null);

export type ChatHistory = {
	db: ChatMessage[];
	client: ChatMessage[];
};

export const chat_history_db_jotai = atomWithQuery(() => ({
	queryKey: ["chat-messages"],
	queryFn: async ({}) => {
		const [, , chatId] = location.pathname.split("/");
		return await getChatMessagesController(chatId);
	},
	refetchOnWindowFocus: false,
}));

export const chat_history_client_jotai = atom<ChatMessage[]>([]);

export const send_chat_message_jotai = atomWithMutation(() => ({
	mutationFn: async ({
		chatId,
		userMessage,
	}: {
		userMessage: string;
		chatId: string;
	}) => {
		return await sendChatMessageController(chatId, userMessage);
	},
}));

export const chats_jotai = atomWithQuery((get) => ({
	queryKey: ["chats"],
	queryFn: async () => {
		return await getChatsController(get(user_jotai).data!.guest!.id);
	},
	refetchOnWindowFocus: false,
}));
export const chat_thread_jotai = atom<Chat | null>(null);

export const delete_chat_jotai = atomWithMutation(() => ({
	mutationFn: async (chatId: string) => {
		return await deleteChatController(chatId);
	},
}));
