import Flex from "@/components/layouts/flex";
import InteractiveIcon from "@/components/layouts/interactive_icon";
import Overlay from "@/components/layouts/overlay";
import { ICON_SIZE } from "@/data/constants";
import { modalVariant, listVariant } from "@/utils/animation-variants";
import { useAtom, useSetAtom } from "jotai";
import { Plus, X } from "lucide-react";
import { chat_ui_layer_1_jotai } from "../data/chat-ui-state";
import {
	chat_history_client_jotai,
	chat_jotai,
	chats_jotai,
} from "../data/chat-data";
import ChatThread from "./chat-thread";
import Link from "next/link";

export default function MobileChats() {
	const chat_ui_layer_1_jotai_setter = useSetAtom(chat_ui_layer_1_jotai);
	const [chats] = useAtom(chats_jotai);
	const chat_setter = useSetAtom(chat_jotai);
	const chat_history_client_setter = useSetAtom(chat_history_client_jotai);
	return (
		<Overlay stateFlag='show-mobile-chats' className='overflow-clip'>
			<Flex
				flex='column'
				className='ml-auto max-w-[600px] h-full p-3 rounded-[12px] bg-system-surface-container'
				variants={modalVariant}
				exit={{
					opacity: 0,
					transform: "translate(24px)",
				}}
			>
				{/* Header */}
				<Flex className='justify-between items-center shrink-0'>
					<h2 className='title-medium md:title-large'>Chats</h2>
					<Flex>
						<Link
							href='/'
							onClick={() => {
								chat_setter(null);
								chat_history_client_setter([]);
								chat_ui_layer_1_jotai_setter(null);
							}}
						>
							<InteractiveIcon>
								<Plus size={ICON_SIZE} className='stroke-system-primary' />
							</InteractiveIcon>
						</Link>
						<InteractiveIcon onClick={() => chat_ui_layer_1_jotai_setter(null)}>
							<X size={ICON_SIZE} className='stroke-system-error' />
						</InteractiveIcon>
					</Flex>
				</Flex>
				{/* Study Set Chats */}
				<Flex
					flex='column'
					className='gap-3 no-scrollbar'
					variants={listVariant}
				>
					{chats.data?.chats.map((chat) => (
						<ChatThread key={chat.id} thread={chat} />
					))}
				</Flex>
			</Flex>
		</Overlay>
	);
}
