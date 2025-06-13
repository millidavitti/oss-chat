import { auth } from "@/app/auth/utils/auth";
import { createChatController } from "@/app/chat/controllers/create-chat.controller";
import { deleteChatController } from "@/app/chat/controllers/delete-chat.controller";
import { getChatMessagesController } from "@/app/chat/controllers/get-chat-messages.controller";
import { getChatsController } from "@/app/chat/controllers/get-chat-threads.controller";
import { renameChatController } from "@/app/chat/controllers/rename-chat.controller";
import { sendChatMessageController } from "@/app/chat/controllers/send-chat-message.controller";
import { models } from "@/data/constants";
import { jotaiStore } from "@/data/jotai-store";
import { atom } from "jotai";
import { atomWithMutation, atomWithQuery } from "jotai-tanstack-query";
import { atomWithStorage } from "jotai/utils";

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
		prompt,
		model,
	}: {
		chatId: string;
		prompt: string;
		model: keyof typeof models;
	}) => {
		return await createChatController(chatId, prompt, model);
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
		const chatMessages = await getChatMessagesController(chatId);
		if (chatMessages) {
			return chatMessages;
		}
		return { chatMessages: [] };
	},
	refetchOnWindowFocus: false,
}));

export const chat_history_client_jotai = atom<ChatMessage[]>([]);

export const send_chat_message_jotai = atomWithMutation(() => ({
	mutationFn: async ({
		chatId,
		prompt,
		model,
	}: {
		prompt: string;
		chatId: string;
		model: Model;
	}) => {
		return await sendChatMessageController(chatId, prompt, model);
	},
}));

export const chats_jotai = atomWithQuery((get) => ({
	queryKey: ["chats"],
	queryFn: async () => {
		const chats = await getChatsController(get(user_jotai).data!.guest!.id);
		if (chats) {
			const [, , chatId] = location.pathname.split("/");

			jotaiStore.set(
				chat_jotai,
				chats.chats.find((chat) => chat.id === chatId)!,
			);
			return chats;
		}
		return { chats: [] };
	},
	refetchOnWindowFocus: false,
}));
export const chat_jotai = atom<Chat | null>(null);

export const delete_chat_jotai = atomWithMutation(() => ({
	mutationFn: async (chatId: string) => {
		return await deleteChatController(chatId);
	},
}));
export const rename_chat_jotai = atomWithMutation(() => ({
	mutationFn: async ({ chatId, title }: { title: string; chatId: string }) => {
		return await renameChatController(chatId, title);
	},
}));

export type SeletedModel = [keyof typeof models, string];
export type Model = keyof typeof models;
export const selected_model_jotai = atomWithStorage<SeletedModel>(
	"selected_model",
	["gpt-4.1-mini", "GPT 4.1 Mini"],
);
