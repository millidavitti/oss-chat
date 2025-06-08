import { atom } from "jotai";
import { CHAT_UI_LAYER_1 } from "../../../data/constants";

export type ChatUILayer_1 = (typeof CHAT_UI_LAYER_1)[number];
export const chat_ui_layer_1_jotai = atom<ChatUILayer_1>(null);

export const mouse_position_jotai = atom<{ x: number; y: number }>({
	x: 0,
	y: 0,
});
