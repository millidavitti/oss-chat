import { atom } from "jotai";
import { ROOT_UI_LAYER_1 } from "../../../data/constants";

export type Root_UI_Layer_1 = (typeof ROOT_UI_LAYER_1)[number];
export const root_ui_layer_1_jotai = atom<Root_UI_Layer_1>(null);

export type DialogOptions = "cancel" | "continue" | null;
export const dialog_jotai = atom<DialogOptions>(null);
export const dialog_message_jotai = atom<string | null>(null);

export const tooltip_visibility_jotai = atom(false);
