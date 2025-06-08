"use client";
import Flex from "@/components/layouts/flex";
import ChatHistory from "./chat-history";
import ChatInput from "./chat-input";
import ChatOptions from "./chat-options";
import InteractiveIcon from "@/components/layouts/interactive_icon";
import { Ellipsis } from "lucide-react";

export default function Chat() {
	const some = "chat";
	return (
		<Flex
			flex='column'
			className='w-full p-3 text-system-on-surface overflow-clip data-[chat=false]:hidden md:data-[chat=false]:flex relative '
			data-chat={some === "chat"}
		>
			<Flex className='shrink-0 items-center justify-between'>
				<h3 className='title-large'>Benefits of LINQ</h3>
				<InteractiveIcon>
					<Ellipsis />
				</InteractiveIcon>
			</Flex>
			<Flex className='gap-3 relative grow overflow-clip'>
				<Flex flex='column' className='grow gap-3 '>
					<ChatHistory />
					<ChatInput />
				</Flex>
				<ChatOptions />
			</Flex>
			{/* <StudySetChats />
			<StudySetDocuments />
			<UploadDocuments /> */}
		</Flex>
	);
}
