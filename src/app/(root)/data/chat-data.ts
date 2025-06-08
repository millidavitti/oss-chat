import { atom } from "jotai";

export type UserMessage = {
	id: string;
	role: "user" | "ai";
	content: string;
};
export const user_message_jotai = atom<UserMessage | null>(null);

export type ChatThread = number;
export const chat_thread_jotai = atom<ChatThread | null>(null);
