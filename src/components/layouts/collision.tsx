import React, {
	HTMLProps,
	ReactNode,
	useEffect,
	useRef,
	useState,
} from "react";
import { cn } from "@/utils/cn";
import { useAtom } from "jotai";
import { mouse_position_jotai } from "@/app/(root)/data/chat-ui-state";

interface CollisionProps extends Omit<HTMLProps<HTMLDivElement>, "classID"> {
	children: ReactNode;
}

const Collision: React.FC<CollisionProps> = ({
	children,
	className,
	...props
}) => {
	const ref = useRef<HTMLDivElement | null>(null);
	const [mouse_position] = useAtom(mouse_position_jotai);
	const [position, setPosition] = useState<{ x: number; y: number }>(
		mouse_position,
	);

	useEffect(() => {
		if (ref.current) {
			const viewPortWidth = document.body.clientWidth;
			const viewPortHeight = document.body.clientHeight;
			const isElementBleedingRight =
				ref.current.getBoundingClientRect().right > viewPortWidth;

			const isElementBleedingBottom =
				ref.current.getBoundingClientRect().bottom > viewPortHeight;
			const padding = 12;

			if (isElementBleedingRight) {
				const offsetBleed =
					viewPortWidth - ref.current.getBoundingClientRect().right;

				setPosition((pos) => ({
					...pos,
					x: offsetBleed - padding,
				}));
			} else if (isElementBleedingBottom) {
				const offsetBleed = Math.abs(
					ref.current.getBoundingClientRect().bottom -
						ref.current.getBoundingClientRect().height -
						(ref.current.getBoundingClientRect().bottom - viewPortHeight) -
						24,
				);

				setPosition((pos) => ({
					...pos,
					y: offsetBleed - padding,
				}));
			}
		}
	}, []);
	return (
		<div
			ref={ref}
			className={cn("absolute", className)}
			{...props}
			style={{
				translate: `${position.x + "px"} ${position.y + "px"}`,
				transition: "translate ease-out 0.2s",
			}}
		>
			{children}
		</div>
	);
};

export default Collision;
