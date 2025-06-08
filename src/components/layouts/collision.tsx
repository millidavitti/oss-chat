import React, {
	HTMLProps,
	ReactNode,
	useEffect,
	useRef,
	useState,
} from "react";
import { cn } from "@/utils/cn";

interface CollisionProps extends Omit<HTMLProps<HTMLDivElement>, "classID"> {
	children: ReactNode;
}

const Collision: React.FC<CollisionProps> = ({
	children,
	className,
	...props
}) => {
	const ref = useRef<HTMLDivElement | null>(null);
	const [position, setOffsetBleeding] = useState<number>();

	useEffect(() => {
		if (ref.current) {
			const viewPortWidth = document.body.clientWidth;
			const isTooltipBleedingRight =
				ref.current.getBoundingClientRect().right > viewPortWidth;
			const padding = 12;
			if (isTooltipBleedingRight) {
				const offsetBleeding = Math.abs(
					ref.current.getBoundingClientRect().right - viewPortWidth,
				);

				setOffsetBleeding(-offsetBleeding - padding);
			}
		}
	}, []);
	return (
		<div
			ref={ref}
			className={cn("absolute", className)}
			{...props}
			style={{
				translate: position,
				transition: "translate ease-out 0.2s",
			}}
		>
			{children}
		</div>
	);
};

export default Collision;
