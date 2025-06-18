"use client";
import ChatThreadOption from "./chat-thread-option";
import { Chat } from "../data/chat-data";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogClose,
	DialogFooter,
} from "@/components/ui/dialog";
import Button from "@/components/ui/button";
import {
	ContextMenuContent,
	ContextMenuItem,
} from "@/components/ui/context-menu";
import useChatThreadOptionsInterface from "../interfaces/use-chat-thread-options-interface";
export default function ChatThreadOptions({ thread }: { thread: Chat }) {
	const { deleteChat } = useChatThreadOptionsInterface();
	return (
		<ContextMenuContent className='group text-system-on-surface gap-3 rounded-[12px] p-3 w-[160px] bg-system-surface'>
			<ContextMenuItem asChild>
				<Dialog>
					<DialogTrigger asChild>
						<ChatThreadOption className='text-system-error'>
							Delete
						</ChatThreadOption>
					</DialogTrigger>
					<DialogContent className='p-3 bg-system-surface text-system-on-surface rounded-[12px] outline-none'>
						<DialogHeader>
							<DialogTitle>Are you absolutely sure?</DialogTitle>
							<DialogDescription>
								This action cannot be undone. This will permanently delete your
								account and remove your data from our servers.
							</DialogDescription>
						</DialogHeader>
						<DialogFooter>
							<DialogClose asChild id='close'>
								<Button className='bg-system-surface text-system-on-surface border-system-outline'>
									Cancel
								</Button>
							</DialogClose>
							<Button
								className='bg-system-error text-system-on-error'
								onClick={() => deleteChat(thread.id)}
							>
								Continue
							</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</ContextMenuItem>
		</ContextMenuContent>
	);
}
