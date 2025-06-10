import { auth } from "@/app/auth/utils/auth";
import { createChatController } from "@/app/chat/controllers/create-chat.controller";
import { getChatMessagesController } from "@/app/chat/controllers/get-chat-messages.controller";
import { sendChatMessageController } from "@/app/chat/controllers/send-chat-message.controller";
import { jotaiStore } from "@/data/jotai-store";
import { atom } from "jotai";
import { atomWithMutation, atomWithQuery } from "jotai-tanstack-query";

export type ChatThread = number;
export const chat_thread_jotai = atom<ChatThread | null>(null);

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

export const chat_history_jotai = atom<ChatHistory>({
	db: [],
	client: [],
});

export const chat_history_db_jotai = atomWithQuery(() => ({
	queryKey: ["chat-messages"],
	queryFn: async () => {
		const [, , chatId] = location.pathname.split("/");

		return await getChatMessagesController(chatId);
	},
	refetchOnWindowFocus: false,
}));

export const chat_history_client_jotai = atom<ChatMessage[]>([]);

export const send_chat_message_jotai = atomWithMutation(() => ({
	mutationFn: async (chatId: string) => {
		return await sendChatMessageController(chatId);
	},
}));
