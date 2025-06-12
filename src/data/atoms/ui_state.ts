import { atom } from "jotai";

export type DialogActions = "cancel" | "continue" | null;
export const dialog_action_jotai = atom<DialogActions>(null);
export const dialog_message_jotai = atom<string | null>(null);

export const tooltip_visibility_jotai = atom(false);
