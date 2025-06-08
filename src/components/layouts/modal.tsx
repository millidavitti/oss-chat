"use client";

import {
	Root_UI_Layer_1,
	root_ui_layer_1_jotai,
} from "@/app/(root)/atoms/ui_state";
import { CHAT_UI_LAYER_1 } from "@/data/constants";
import { cn } from "@/utils/cn";
import { useAtom } from "jotai";
import { AnimatePresence, motion, Variants } from "motion/react";
import { ReactNode } from "react";

interface Overlay {
	stateFlag: Root_UI_Layer_1;
	children: ReactNode;
	className?: string;
}

export default motion.create(function Modal({
	stateFlag,
	children,
	className,
	...props
}: Overlay) {
	const [root_ui_layer_1, root_ui_layer_1_setter] = useAtom(
		root_ui_layer_1_jotai,
	);

	const shouldRender =
		stateFlag === null ? false : stateFlag === root_ui_layer_1;

	return (
		<>
			<AnimatePresence>
				{shouldRender && (
					<motion.div
						initial='hidden'
						animate='visible'
						variants={overlayVariants}
						exit={{ opacity: 0 }}
						// exit='hidden'
						className={cn(
							"inset-0 bg-light-surface-on-surface/15 backdrop-blur-sm z-20 fixed shrink-0 p-3 flex justify-center items-center",
							className,
						)}
						{...props}
						id={stateFlag!}
						onClick={(e) => {
							e.stopPropagation();
							if (
								CHAT_UI_LAYER_1.includes(
									(e.target as HTMLElement).id as Root_UI_Layer_1,
								)
							) {
								root_ui_layer_1_setter(null);
							}
						}}
					>
						{children}
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
});
const overlayVariants: Variants = {
	hidden: {
		opacity: 0,
		transition: {
			when: "afterChildren",
		},
	},
	visible: {
		opacity: 1,
		transition: {
			when: "beforeChildren",
		},
	},
};
