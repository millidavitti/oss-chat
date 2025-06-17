"use client";
import Flex from "@/components/layouts/flex";
import NewChatButton from "./new-chat-button";
import ChatThread from "./chat-thread";
import Button from "@/components/ui/button";
import Link from "next/link";
import { useAtom, useSetAtom } from "jotai";
import { chat_jotai, chats_jotai, user_jotai } from "../data/chat-data";
import { HashLoader } from "react-spinners";
import { ICON_SIZE } from "@/data/constants";
import { listVariant } from "@/utils/animation-variants";
import { AnimatePresence } from "motion/react";
import { useQueryClient } from "@tanstack/react-query";

export default function ChatThreads() {
	const [chats] = useAtom(chats_jotai);
	const [user] = useAtom(user_jotai);
	const chat_setter = useSetAtom(chat_jotai);
	const queryClient = useQueryClient();
	return (
		<Flex
			flex='column'
			className='w-[320px] p-3 gap-3 bg-system-surface-container text-system-on-surface justify-between md:flex hidden shrink-0'
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
					<Link
						href='/auth/sign-out'
						onClick={() => {
							chat_setter(null);
							queryClient.setQueryData(["user"], null);
							queryClient.setQueryData(["chats"], []);
						}}
					>
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
