import { useEffect, useRef } from "react";

export default function useChatHistoryInterface() {
	const messageRefs = useRef<HTMLDivElement[]>([]);
	const root = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				const { target, isIntersecting } = entry;
				const chatHistory = root.current as HTMLElement;

				// Subtracting 2 from target.dataset.id because:
				// 1. User messages are rendered at even-numbered indexes (the interval is key here), so subtracting 2 aligns the calculation with the correct message element.
				// Final calculation: Number(target.dataset.id) - 2.
				if (isIntersecting) {
					chatHistory?.children[
						Number((target as HTMLElement).dataset.index) - 2
					]?.classList.add("opacity-0", "translate-x-[16px]");
				} else
					chatHistory?.children[
						Number((target as HTMLElement).dataset.index) - 2
					]?.classList.remove("opacity-0", "translate-x-[16px]");
			},
			{
				threshold: 0.15,
				root: root.current,
				rootMargin: "0px 0px -85% 0px",
			},
		);

		for (const ref of messageRefs.current) {
			if (ref) observer.observe(ref);
		}

		return () => {
			observer.disconnect();
		};
	}, []);
	return { root, messageRefs };
}
