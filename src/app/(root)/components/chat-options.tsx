import Flex from "@/components/layouts/flex";
import InteractiveIcon from "@/components/layouts/interactive_icon";
import { ICON_SIZE } from "@/data/constants";
import { useAtom, useSetAtom } from "jotai";
import { Files, MessageSquare, Plus } from "lucide-react";
import { AnimatePresence, Variants } from "motion/react";
import { chat_ui_layer_1_jotai } from "../data/chat-ui-state";
import Link from "next/link";
import { chat_history_client_jotai, chat_jotai } from "../data/chat-data";

export default function ChatOptions() {
	const [chat_ui_layer_1, chat_ui_layer_1_jotai_setter] = useAtom(
		chat_ui_layer_1_jotai,
	);
	const chat_history_client_setter = useSetAtom(chat_history_client_jotai);
	const chat_setter = useSetAtom(chat_jotai);

	return (
		<>
			<AnimatePresence>
				{chat_ui_layer_1 === "show-chat-options" && (
					<Flex
						flex='column'
						initial='hidden'
						animate='visible'
						exit={{
							opacity: 0,
							transform: "translateX(24px)",
						}}
						variants={listVariant}
						className='p-3 gap-3 absolute right-3 rounded-[8px] justify-center items-center self-center backdrop-blur-md overflow-x-clip bg-system-surface-container'
					>
						<Link
							href='/'
							onClick={() => {
								chat_setter(null);
								chat_history_client_setter([]);
								chat_ui_layer_1_jotai_setter(null);
							}}
						>
							<InteractiveIcon variants={listItemVariant}>
								<Plus size={ICON_SIZE} className='stroke-system-on-surface' />
							</InteractiveIcon>
						</Link>
						<InteractiveIcon
							variants={listItemVariant}
							onClick={() => {
								chat_ui_layer_1_jotai_setter("show-mobile-chats");
							}}
						>
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
