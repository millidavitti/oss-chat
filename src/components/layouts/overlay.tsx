"use client";
import {
	chat_ui_layer_1_jotai,
	chat_ui_layer_2_jotai,
	ChatUILayer_1,
	ChatUILayer_2,
} from "@/app/(root)/data/chat-ui-state";
import { CHAT_UI_LAYER_1, CHAT_UI_LAYER_2 } from "@/data/constants";
import { listVariant } from "@/utils/animation-variants";
import { cn } from "@/utils/cn";
import { useAtom } from "jotai";
import { AnimatePresence, motion } from "motion/react";
import { ReactNode } from "react";

interface Overlay {
	stateFlag: ChatUILayer_1 | ChatUILayer_2;
	children: ReactNode;
	className?: string;
}

export default function Overlay({ stateFlag, children, className }: Overlay) {
	const [chat_ui_layer_1, chat_ui_layer_1_setter] = useAtom(
		chat_ui_layer_1_jotai,
	);
	const [chat_ui_layer_2, chat_ui_layer_2_setter] = useAtom(
		chat_ui_layer_2_jotai,
	);

	const shouldRender =
		stateFlag === null
			? false
			: stateFlag === chat_ui_layer_2 || stateFlag === chat_ui_layer_1;

	return (
		<>
			<AnimatePresence>
				{shouldRender && (
					<motion.div
						initial='hidden'
						animate='visible'
						exit={{ opacity: 0 }}
						variants={listVariant}
						className={cn(
							"inset-0 bg-transparent backdrop-blur-sm absolute p-3 justify-center items-center",
							className,
						)}
						id={stateFlag!}
						onClick={(e) => {
							e.stopPropagation();
							const targetId = (e.target as HTMLElement).id;

							if (CHAT_UI_LAYER_1.includes(targetId as ChatUILayer_1)) {
								chat_ui_layer_1_setter(null);
								return;
							}

							if (CHAT_UI_LAYER_2.includes(targetId as ChatUILayer_2)) {
								chat_ui_layer_2_setter(null);
								return;
							}
						}}
					>
						{children}
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}
