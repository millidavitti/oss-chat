"use client";

import {
	Root_UI_Layer_1,
	root_ui_layer_1_jotai,
} from "@/app/(root)/atoms/ui_state";
import { ROOT_UI_LAYER_1 } from "@/data/constants";
import { cn } from "@/utils/cn";
import { useAtom } from "jotai";
import {
	AnimatePresence,
	HTMLMotionProps,
	motion,
	Variants,
} from "motion/react";
import { ReactNode } from "react";

interface Overlay extends Omit<HTMLMotionProps<"div">, "classID"> {
	stateFlag?: Root_UI_Layer_1;
	children: ReactNode;
	className?: string;
	render?: boolean;
}

export default motion.create(function Overlay({
	stateFlag,
	children,
	className,
	render,
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
				{(render || shouldRender) && (
					<motion.div
						{...props}
						initial='hidden'
						animate='visible'
						exit={{ opacity: 0 }}
						variants={overlayVariants}
						className={cn(
							"inset-0 bg-transparent backdrop-blur-sm absolute p-3 justify-center items-center",
							className,
						)}
						id={stateFlag!}
						onClick={(e) => {
							e.stopPropagation();
							const targetId = (e.target as HTMLElement).id;

							if (ROOT_UI_LAYER_1.includes(targetId as Root_UI_Layer_1)) {
								root_ui_layer_1_setter(null);
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
