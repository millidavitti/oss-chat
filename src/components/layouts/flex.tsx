"use client";
import { cn } from "@/utils/cn";
import { motion } from "motion/react";
import { HTMLProps, ReactNode } from "react";

export interface Flex extends Omit<HTMLProps<HTMLDivElement>, "classID"> {
	children?: ReactNode;
	flex?: "row" | "column";
	debug?: boolean;
}
function Flex({
	children,
	className,
	flex = "row",
	debug = false,
	...props
}: Flex) {
	return (
		<>
			{flex === "column" && (
				<div
					className={cn(
						"flex flex-col overflow-y-auto",
						className,
						debug && "p-3 border border-border",
					)}
					{...props}
				>
					{children}
				</div>
			)}
			{flex === "row" && (
				<div
					className={cn(
						"flex flex-row overflow-x-auto",
						className,
						debug && "p-3 border border-border",
					)}
					{...props}
				>
					{children}
				</div>
			)}
		</>
	);
}

export default motion.create(Flex);
