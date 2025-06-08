"use client";
import { cn } from "@/utils/cn";
import { motion } from "motion/react";
import { HTMLProps, ReactNode } from "react";

interface ButtonProps {
	children: ReactNode;
	type?: "submit" | "reset" | "button";
}
interface Button
	extends Omit<
			Omit<Omit<HTMLProps<HTMLButtonElement>, "children">, "type">,
			"classID"
		>,
		ButtonProps {}
export default motion.create(function Button({
	children,
	className,
	type = "button",
	...props
}: Button) {
	return (
		<button
			{...props}
			type={type}
			className={cn(
				"flex justify-center items-center rounded-[8px] bg-system-primary text-system-on-primary gap-3 border border-border px-6 py-2 active:scale-[.98] transition shrink-0 label-large",
				className,
			)}
		>
			{children}
		</button>
	);
});
