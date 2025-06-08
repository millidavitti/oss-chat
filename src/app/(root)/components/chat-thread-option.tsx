import Flex from "@/components/layouts/flex";
import { cn } from "@/utils/cn";
import React, { MouseEventHandler, ReactNode } from "react";

interface ChatThreadOption {
	children: ReactNode;
	onClick?: MouseEventHandler<HTMLDivElement> | undefined;
	className?: string;
}

export default function ChatThreadOption({
	children,
	onClick,
	className,
}: ChatThreadOption) {
	return (
		<Flex
			flex='column'
			className={cn(
				"p-2 text-system-on-surface hover:bg-system-surface-container-low rounded-[8px] active:scale-[.98] transition-all cursor-pointer",
				className,
			)}
			id='study-set-option'
			onClick={onClick}
		>
			{children}
		</Flex>
	);
}
