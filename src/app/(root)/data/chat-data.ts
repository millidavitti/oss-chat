import { atom } from "jotai";
import { focusAtom } from "jotai-optics";
import { atomWithReset } from "jotai/utils";
import { atomWithMutation, atomWithQuery } from "jotai-tanstack-query";

export type UserMessage = {
	id: string;
	role: "user" | "ai";
	content: string;
};
export const user_message_jotai = atom<UserMessage | null>(null);

export type Chat = number;
export const chat_thread_jotai = atom<Chat | null>(null);
