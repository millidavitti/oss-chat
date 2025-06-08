"use client";
import { HTMLProps, ReactNode } from "react";
import { cn } from "@/utils/cn";
import { motion } from "motion/react";

interface InteractiveIcon extends Omit<HTMLProps<HTMLSpanElement>, "classID"> {
	children: ReactNode;
}
const InteractiveIcon = motion.create(function ({
	children,
	className,
	...props
}: InteractiveIcon) {
	return (
		<span
			role='button'
			className={cn(
				"p-3 cursor-pointer active:scale-95 transition stroke-light-surface-on-surface block shrink-0",
				className,
			)}
			{...props}
		>
			{children}
		</span>
	);
});
export default InteractiveIcon;
