export const CHAT_UI_LAYER_1 = [
	"settings",
	"show-chat-thread-options",
	"show-chat-options",
	"rename-chat",
	"show-mobile-chats",
	"send-chat-message",
	null,
] as const;
export const CHAT_UI_LAYER_2 = ["alert-dialog", null] as const;
export const ICON_SIZE = 20;

export const chatModels = {
	"gpt-4.1-mini": "OpenAI GPT 4.1 Mini",
	"gpt-4.1": "OpenAI GPT 4.1",
};

export const resoningModels = {
	"o4-mini": "OpenAI o4 Mini",
	"o3-mini": "OpenAI o3 Mini",
	"o1-mini": "OpenAI o1 Mini",
	o1: "OpenAI o1",
};
