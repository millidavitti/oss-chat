import { ChangeEvent } from "react";
import { computeTextAreaResize } from "./compute-text-area-resize";

export function resizeTextArea(e: ChangeEvent<HTMLTextAreaElement>) {
	if (e.currentTarget.value)
		e.currentTarget.style.height = e.currentTarget.scrollHeight + "px";
	else
		e.currentTarget.style.height =
			computeTextAreaResize(e.currentTarget) + "px";
}
