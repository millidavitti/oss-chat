import { atom } from "jotai";
import { CHAT_UI_LAYER_1 } from "../../../data/constants";

export type ChatUILayer_1 = (typeof CHAT_UI_LAYER_1)[number];
export const chat_ui_layer_1_jotai = atom<ChatUILayer_1>(null);

export type DialogOptions = "cancel" | "continue" | null;
export const dialog_jotai = atom<DialogOptions>(null);
export const dialog_message_jotai = atom<string | null>(null);

export const tooltip_visibility_jotai = atom(false);

export const mouse_position_jotai = atom<{ x: number; y: number }>({
	x: 0,
	y: 0,
});
