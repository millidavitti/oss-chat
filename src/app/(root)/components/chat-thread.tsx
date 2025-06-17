"use client";
import Flex from "@/components/layouts/flex";
import Link from "next/link";
import ChatThreadOptions from "./chat-thread-options";
import { Chat } from "../data/chat-data";
import { AnimatePresence } from "motion/react";
import { fadeInVariant } from "@/utils/animation-variants";
import { cn } from "@/utils/cn";
import Input from "@/components/ui/input";
import useChatThreadInterface from "../interfaces/use-chat-thread-interface";

export default function ChatThread({ thread }: { thread: Chat }) {
	const {
		displayChatOptions,
		renameChat,
		saveChatRename,
		chat,
		chatId,
		chat_ui_layer_1,
		viewChat,
		inputRef,
		cancelChatRename,
	} = useChatThreadInterface();

	return (
		<Flex
			flex='column'
			className='overflow-visible shrink-0'
			variants={fadeInVariant}
			layout
			onContextMenu={(e) => {
				e.preventDefault();
				displayChatOptions(e.clientX, e.clientY, thread);
			}}
		>
			{!(chat_ui_layer_1 === "rename-chat" && chat?.id === thread.id) && (
				<Link href={`/chat/${thread.id}`} onClick={() => viewChat(thread)}>
					<Flex
						className={cn(
							"bg-system-surface-container p-3 rounded-[8px] hover:font-medium body-medium",
							chatId === thread.id && "bg-system-surface font-medium",
						)}
					>
						{thread.title}
					</Flex>{" "}
				</Link>
			)}
			{chat_ui_layer_1 === "rename-chat" && chat?.id === thread.id && (
				<form
					onSubmit={(e) => {
						e.preventDefault();
						saveChatRename(thread.id);
					}}
					className='w-full'
					onKeyDown={(e) => {
						if (e.key === "Escape") cancelChatRename();
					}}
				>
					<Input
						ref={inputRef}
						className='w-full'
						defaultValue={thread.title}
						onChange={(e) => renameChat(e.currentTarget.value)}
					/>
				</form>
			)}

			{chat === thread && (
				<AnimatePresence>
					<ChatThreadOptions thread={thread} />
				</AnimatePresence>
			)}
		</Flex>
	);
}
