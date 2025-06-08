"use client";
import { cn } from "@/utils/cn";
import { HTMLProps } from "react";

export default function Input({
	className,
	...props
}: Omit<HTMLProps<HTMLInputElement>, "classID">) {
	return (
		<input
			{...props}
			className={cn(
				"p-3 border border-system-outline rounded-[8px] overflow-clip body-medium sm:body-large bg-transparent",
				className,
			)}
			onFocus={(e) => {
				requestAnimationFrame(() => {
					if (e.target.value) e.target.select();
				});
			}}
		/>
	);
}
