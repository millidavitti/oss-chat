import { auth } from "@/app/auth/utils/auth";
import { createChatController } from "@/app/chat/controllers/create-chat.controller";
import { atom } from "jotai";
import { atomWithMutation, atomWithQuery } from "jotai-tanstack-query";

export type UserMessage = {
	id: string;
	role: "user" | "ai";
	content: string;
};
export const user_message_jotai = atom<UserMessage | null>(null);

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
	mutationFn: async (chatId: string) => {
		return await createChatController(chatId);
	},
}));

export type Chat = {
	id: string;
	title: string;
	createdAt: string;
	updateAt: string;
};
