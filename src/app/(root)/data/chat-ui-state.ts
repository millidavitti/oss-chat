import { atom } from "jotai";
import { CHAT_UI_LAYER_1, CHAT_UI_LAYER_2 } from "../../../data/constants";

export type ChatUILayer_1 = (typeof CHAT_UI_LAYER_1)[number];
export const chat_ui_layer_1_jotai = atom<ChatUILayer_1>(null);

export type ChatUILayer_2 = (typeof CHAT_UI_LAYER_2)[number];
export const chat_ui_layer_2_jotai = atom<ChatUILayer_2>(null);

export const mouse_position_jotai = atom<{ x: number; y: number }>({
	x: 0,
	y: 0,
});

export const is_scroll_bottom_jotai = atom(false);
