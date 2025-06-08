"use client";;
import Flex from "@/components/layouts/flex";
import NewChatButton from "./new-chat-button";
import ChatThread from "./chat-thread";

export default function ChatThreads() {
	return (
		<Flex
			flex='column'
			className='min-w-[320px] p-3 gap-3 bg-system-surface-container'
		>
			<NewChatButton />
			{threads.map((d) => (
				<ChatThread key={d} thread={d} />
			))}{" "}
			{threads.map((d) => (
				<ChatThread key={d} thread={d} />
			))}
		</Flex>
	);
}

const threads = [1, 2, 3, 4, 5, 6, 7, 8, 9];
