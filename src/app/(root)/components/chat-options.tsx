import Flex from "@/components/layouts/flex";
import InteractiveIcon from "@/components/layouts/interactive_icon";
import { ICON_SIZE } from "@/data/constants";
import { Files, MessageSquare, Plus } from "lucide-react";
import { AnimatePresence, Variants } from "motion/react";

export default function ChatOptions() {
	return (
		<>
			<AnimatePresence>
				{"chat-options" === "chat-options" && (
					<Flex
						flex='column'
						initial='hidden'
						animate='visible'
						exit={{
							opacity: 0,
							transform: "translateX(24px)",
						}}
						variants={listVariant}
						className='p-3 gap-3 absolute right-3 rounded-[8px] justify-center items-center self-center backdrop-blur-md overflow-x-clip'
					>
						<InteractiveIcon variants={listItemVariant}>
							<Plus size={ICON_SIZE} className='stroke-system-on-surface' />
						</InteractiveIcon>
						<InteractiveIcon variants={listItemVariant} onClick={() => {}}>
							<MessageSquare
								size={ICON_SIZE}
								className='stroke-system-on-surface'
							/>
						</InteractiveIcon>
						<InteractiveIcon variants={listItemVariant} onClick={() => {}}>
							<Files size={ICON_SIZE} className='stroke-system-on-surface' />
						</InteractiveIcon>
					</Flex>
				)}
			</AnimatePresence>
		</>
	);
}
const listVariant: Variants = {
	hidden: {
		opacity: 0,
		transform: "translateX(24px)",
		transition: {
			when: "afterChildren",
			staggerChildren: 0.1,
		},
	},
	visible: {
		opacity: 1,
		transform: "translateX(0)",
		transition: {
			staggerChildren: 0.1,
		},
	},
};
const listItemVariant: Variants = {
	hidden: {
		transform: "translateY(-24px)",
		opacity: 0,
	},
	visible: {
		opacity: 1,
		transform: "translateY(0)",
	},
};
