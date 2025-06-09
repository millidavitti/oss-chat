"use client";
import Flex from "@/components/layouts/flex";
import NewChatButton from "./new-chat-button";
import ChatThread from "./chat-thread";
import Button from "@/components/ui/button";
import Link from "next/link";
import { useAtom } from "jotai";
import { user_jotai } from "../data/chat-data";

export default function ChatThreads() {
	const [user] = useAtom(user_jotai);
	console.log(user.data);
	return (
		<Flex
			flex='column'
			className='min-w-[320px] p-3 gap-3 bg-system-surface-container'
		>
			<NewChatButton />
			<Flex flex='column' className='rounded-[8px] gap-3 py-3'>
				{threads.map((d) => (
					<ChatThread key={d} thread={d} />
				))}{" "}
				{threads.map((d) => (
					<ChatThread key={d} thread={d} />
				))}
			</Flex>
			<Flex className='shrink-0'>
				<Link href='/'>
					<Button>Sign In</Button>
				</Link>
				{/* <UserAccount /> */}
			</Flex>
		</Flex>
	);
}

const threads = [1, 2, 3, 4, 5, 6, 7, 8, 9];
