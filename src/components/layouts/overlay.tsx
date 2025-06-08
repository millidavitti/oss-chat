"use client";

import {
	ChatUILayer_1,
	chat_ui_layer_1_jotai,
} from "@/app/(root)/data/chat-ui-state";
import { CHAT_UI_LAYER_1 } from "@/data/constants";
import { cn } from "@/utils/cn";
import { useAtom } from "jotai";
import {
	AnimatePresence,
	HTMLMotionProps,
	motion,
	Variants,
} from "motion/react";
import { ReactNode } from "react";

interface Overlay<T extends string | null>
	extends Omit<HTMLMotionProps<"div">, "classID"> {
	stateFlag?: T;
	children: ReactNode;
	className?: string;
	render?: boolean;
}

export default function Overlay<T extends string | null>({
	stateFlag,
	children,
	className,
	render,
	...props
}: Overlay<T>) {
	const [chat_ui_layer_1, chat_ui_layer_1_setter] = useAtom(
		chat_ui_layer_1_jotai,
	);

	const shouldRender =
		stateFlag === null ? false : stateFlag === chat_ui_layer_1;

	return (
		<>
			<AnimatePresence>
				{(render || shouldRender) && (
					<motion.div
						{...props}
						initial='hidden'
						animate='visible'
						exit={{ opacity: 0 }}
						className={cn("bg-transparent absolute p-3 ", className)}
						id={stateFlag!}
						onClick={(e) => {
							e.stopPropagation();
							if (e.currentTarget.id === (e.target as HTMLElement).id)
								chat_ui_layer_1_setter(null);
						}}
						onContextMenu={(e) => e.stopPropagation()}
					>
						{children}
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}
