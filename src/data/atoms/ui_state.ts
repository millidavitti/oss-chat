import { atom } from "jotai";

export type DialogOptions = "cancel" | "continue" | null;
export const dialog_jotai = atom<DialogOptions>(null);
export const dialog_message_jotai = atom<string | null>(null);

export const tooltip_visibility_jotai = atom(false);
