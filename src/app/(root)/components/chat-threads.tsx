"use client";
import Flex from "@/components/layouts/flex";
import NewChatButton from "./new-chat-button";
import ChatThread from "./chat-thread";
import Button from "@/components/ui/button";
import Link from "next/link";
import { useAtom } from "jotai";
import { chats_jotai, user_jotai } from "../data/chat-data";
import { HashLoader } from "react-spinners";
import { ICON_SIZE } from "@/data/constants";
import { listVariant } from "@/utils/animation-variants";
import { AnimatePresence } from "motion/react";
import { useEffect } from "react";
import { useParams } from "next/navigation";

export default function ChatThreads() {
	const [chats] = useAtom(chats_jotai);
	const [user] = useAtom(user_jotai);
	const params = useParams();

	// const
	useEffect(() => {}, [params["chat-id"]]);
	return (
		<Flex
			flex='column'
			className='w-[400px] p-3 gap-3 bg-system-surface-container text-system-on-surface justify-between md:flex hidden shrink-0'
		>
			<NewChatButton />
			{chats.isLoading && (
				<HashLoader
					size={ICON_SIZE}
					color='rgb(var(--on-surface))'
					className='self-center mb-auto'
				/>
			)}
			{Boolean(chats.data?.chats.length) && (
				<Flex
					flex='column'
					className='rounded-[8px] gap-3 py-3 h-full'
					variants={listVariant}
					initial='hidden'
					animate='visible'
				>
					<AnimatePresence>
						{chats.data?.chats.map((chat) => (
							<ChatThread key={chat.id} thread={chat} />
						))}
					</AnimatePresence>
				</Flex>
			)}
			<Flex className='shrink-0'>
				{user.data?.isAuthenticated ? (
					<Link href='/auth/sign-out'>
						<Button>Sign Out</Button>
					</Link>
				) : (
					<Link href='/auth/sign-in'>
						<Button>Sign In</Button>
					</Link>
				)}
			</Flex>
		</Flex>
	);
}
