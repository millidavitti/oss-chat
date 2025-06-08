export function computeTextAreaResize(textarea: HTMLTextAreaElement) {
	const mockArea = document.createElement("div");
	mockArea.style.width = textarea.getBoundingClientRect().width + "px";
	mockArea.style.position = "absolute";
	mockArea.style.visibility = "hidden";
	mockArea.style.pointerEvents = "none";
	mockArea.style.zIndex = "-1";

	mockArea.textContent = textarea.value;
	document.body.appendChild(mockArea);

	const height = mockArea.getBoundingClientRect().height;

	document.body.removeChild(mockArea);
	return height;
}
