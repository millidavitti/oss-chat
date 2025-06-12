"use client";
import Flex from "@/components/layouts/flex";
import Link from "next/link";
import ChatThreadOptions from "./chat-thread-options";
import { useAtom, useSetAtom } from "jotai";
import {
	chat_ui_layer_1_jotai,
	mouse_position_jotai,
} from "../data/chat-ui-state";
import { Chat, chat_thread_jotai } from "../data/chat-data";
import { AnimatePresence } from "motion/react";
import { fadeInVariant } from "@/utils/animation-variants";
import { useParams } from "next/navigation";
import { cn } from "@/utils/cn";

export default function ChatThread({ thread }: { thread: Chat }) {
	const mouse_position_setter = useSetAtom(mouse_position_jotai);
	const chat_ui_layer_1_setter = useSetAtom(chat_ui_layer_1_jotai);
	const [chat_thread, chat_thread_setter] = useAtom(chat_thread_jotai);
	const params = useParams();
	return (
		<Flex
			flex='column'
			className='overflow-visible shrink-0'
			variants={fadeInVariant}
			layout
			exit={{ transform: "translateY(-48px)", opacity: 0 }}
			onContextMenu={(e) => {
				e.preventDefault();
				mouse_position_setter({ x: e.clientX, y: e.clientY });
				chat_ui_layer_1_setter("show-chat-thread-options");
				chat_thread_setter(thread);
			}}
		>
			<Link
				href={`/chat/${thread.id}`}
				onClick={() => chat_thread_setter(thread)}
			>
				<Flex
					className={cn(
						"bg-system-surface-container p-3 rounded-[8px] text-system-on-surface",
						params["chat-id"] === thread.id && "bg-system-surface font-bold",
					)}
				>
					{thread.title}
				</Flex>
			</Link>

			{chat_thread === thread && (
				<AnimatePresence>
					<ChatThreadOptions thread={thread} />
				</AnimatePresence>
			)}
		</Flex>
	);
}
