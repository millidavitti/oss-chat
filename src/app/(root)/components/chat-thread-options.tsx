"use client";
import Flex from "@/components/layouts/flex";
import Overlay from "@/components/layouts/overlay";
import ChatThreadOption from "./chat-thread-option";
import { scaleInVariant } from "@/utils/animation-variants";
import Collision from "@/components/layouts/collision";
import { Chat, chats_jotai, delete_chat_jotai } from "../data/chat-data";
import { useAtom } from "jotai";
import { toast } from "sonner";
import useDialog from "@/hooks/use-dialog";

export default function ChatThreadOptions({ thread }: { thread: Chat }) {
	const [delete_chat] = useAtom(delete_chat_jotai);
	const [chats] = useAtom(chats_jotai);
	const { closeDialog, displayDialog, waitForDialog } = useDialog();

	async function deleteChat(chatId: string) {
		displayDialog();
		if (await new Promise(waitForDialog))
			await delete_chat.mutateAsync(chatId, {
				onError() {
					toast.error("You cannot delete your chat at the moment");
				},
				onSuccess() {
					console.log("first");
					chats.refetch();
				},
			});
		closeDialog();
	}
	return (
		<Overlay
			stateFlag='show-chat-thread-options'
			className='inset-0 z-10 overflow-clip'
		>
			<Collision>
				<Flex
					flex='column'
					className='group text-system-on-surface gap-3 rounded-[12px] p-3 w-[160px] bg-system-surface-container'
					variants={scaleInVariant}
				>
					<ChatThreadOption
						onClick={(e) => {
							e.stopPropagation();
						}}
					>
						Rename
					</ChatThreadOption>
					<ChatThreadOption
						className='text-system-error'
						onClick={() => deleteChat(thread.id)}
					>
						Delete
					</ChatThreadOption>
				</Flex>
			</Collision>
		</Overlay>
	);
}
