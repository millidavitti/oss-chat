"use client";
import Flex from "@/components/layouts/flex";
import ChatHistory from "./chat-history";
import ChatOptions from "./chat-options";
import InteractiveIcon from "@/components/layouts/interactive_icon";
import { Ellipsis } from "lucide-react";
import { useAtomValue } from "jotai";
import { chat_jotai } from "../data/chat-data";
import MobileChats from "./mobile-chats";

export default function Chat() {
	const chat = useAtomValue(chat_jotai);
	return (
		<Flex
			flex='column'
			className='w-full p-3 text-system-on-surface overflow-clip'
		>
			<Flex className='shrink-0 items-center justify-between'>
				<h3 className='title-large'>{chat?.title}</h3>
				<InteractiveIcon>
					<Ellipsis />
				</InteractiveIcon>
			</Flex>
			<Flex className='gap-3 relative grow overflow-clip'>
				<ChatHistory />
				<ChatOptions />
			</Flex>
			<MobileChats />
			{/* <StudySetDocuments /> */}
			{/* <UploadDocuments /> */}
		</Flex>
	);
}
