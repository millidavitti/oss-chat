"use client";
import Flex from "@/components/layouts/flex";
import Link from "next/link";
import ChatThreadOptions from "./chat-thread-options";
import { useAtom, useSetAtom } from "jotai";
import {
	chat_ui_layer_1_jotai,
	mouse_position_jotai,
} from "../data/chat-ui-state";
import { chat_thread_jotai } from "../data/chat-data";
import { AnimatePresence } from "motion/react";

export default function ChatThread({ thread }: { thread: number }) {
	const mouse_position_setter = useSetAtom(mouse_position_jotai);
	const chat_ui_layer_1_setter = useSetAtom(chat_ui_layer_1_jotai);
	const [chat_thread, chat_thread_setter] = useAtom(chat_thread_jotai);
	return (
		<Flex
			flex='column'
			className='overflow-visible shrink-0'
			onContextMenu={(e) => {
				e.preventDefault();
				mouse_position_setter({ x: e.clientX, y: e.clientY });
				chat_ui_layer_1_setter("show-chat-thread-options");
				chat_thread_setter(thread);
			}}
		>
			<Link href='/'>
				<Flex className='bg-system-surface-container-low p-3 rounded-[8px] text-system-on-surface'>
					Chat thread {thread}
				</Flex>
			</Link>

			{chat_thread === thread && (
				<AnimatePresence>
					<ChatThreadOptions p={thread} />
				</AnimatePresence>
			)}
		</Flex>
	);
}
