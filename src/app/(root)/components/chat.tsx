"use client";
import Flex from "@/components/layouts/flex";
import ChatHistory from "./chat-history";
import ChatOptions from "./chat-options";
import InteractiveIcon from "@/components/layouts/interactive_icon";
import { Ellipsis } from "lucide-react";
import { useAtomValue, useSetAtom } from "jotai";
import { chat_jotai } from "../data/chat-data";
import MobileChats from "./mobile-chats";
import { chat_ui_layer_1_jotai } from "../data/chat-ui-state";

export default function Chat() {
	const chat = useAtomValue(chat_jotai);
	const chat_ui_layer_1_setter = useSetAtom(chat_ui_layer_1_jotai);
	return (
		<Flex
			flex='column'
			className='w-full p-3 text-system-on-surface overflow-clip'
		>
			<Flex className='shrink-0 items-center justify-between'>
				<h3 className='title-large'>{chat?.title}</h3>
				<InteractiveIcon
					onClick={() => {
						chat_ui_layer_1_setter((layer) =>
							layer === "show-chat-options" ? null : "show-chat-options",
						);
					}}
				>
					<Ellipsis />
				</InteractiveIcon>
			</Flex>
			<Flex className='gap-3 relative grow overflow-clip'>
				<ChatHistory />
				<ChatOptions />
			</Flex>
			<MobileChats />
		</Flex>
	);
}
