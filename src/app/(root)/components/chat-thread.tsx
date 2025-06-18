"use client";
import Flex from "@/components/layouts/flex";
import Link from "next/link";
import ChatThreadOptions from "./chat-thread-options";
import { Chat } from "../data/chat-data";
import { fadeInVariant } from "@/utils/animation-variants";
import { cn } from "@/utils/cn";
import useChatThreadInterface from "../interfaces/use-chat-thread-interface";
import { HashLoader } from "react-spinners";
import { ICON_SIZE } from "@/data/constants";
import { ContextMenu, ContextMenuTrigger } from "@/components/ui/context-menu";
export default function ChatThread({ thread }: { thread: Chat }) {
	const { chatId, delete_chat, viewChat } = useChatThreadInterface();

	return (
		<>
			<ContextMenu>
				<ContextMenuTrigger asChild>
					<Flex
						flex='column'
						className='overflow-visible shrink-0'
						variants={fadeInVariant}
						layout
					>
						<Link href={`/chat/${thread.id}`} onClick={() => viewChat(thread)}>
							<Flex
								className={cn(
									"bg-system-surface-container gap-3 p-3 rounded-[8px] hover:font-medium body-medium md:body-large",
									chatId === thread.id && "bg-system-surface font-medium",
								)}
							>
								{thread.title}{" "}
								{delete_chat.isPending &&
									thread.id === delete_chat.variables && (
										<HashLoader
											size={ICON_SIZE}
											color='rgb(var(--on-surface))'
										/>
									)}
							</Flex>
						</Link>
					</Flex>
				</ContextMenuTrigger>
				{<ChatThreadOptions thread={thread} />}
			</ContextMenu>
		</>
	);
}
