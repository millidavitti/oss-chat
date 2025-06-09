"use client";
import Flex from "@/components/layouts/flex";
import Overlay from "@/components/layouts/overlay";
import { ChatUILayer_1 } from "../data/chat-ui-state";

import ChatThreadOption from "./chat-thread-option";
import { scaleInVariant } from "@/utils/animation-variants";
import { ChatThread } from "../data/chat-data";
import Collision from "@/components/layouts/collision";

export default function ChatThreadOptions({ thread }: { thread: ChatThread }) {
	return (
		<Overlay<ChatUILayer_1>
			stateFlag='show-chat-thread-options'
			className='absolute inset-0 z-10 overflow-clip'
		>
			<Collision>
				<Flex
					flex='column'
					className='group text-system-on-surface gap-3 rounded-[12px] p-3 w-[160px] bg-system-surface'
					variants={scaleInVariant}
				>
					<ChatThreadOption
						onClick={(e) => {
							e.stopPropagation();
						}}
					>
						Rename {thread}
					</ChatThreadOption>
					<ChatThreadOption className='text-system-error' onClick={() => {}}>
						Delete
					</ChatThreadOption>
				</Flex>
			</Collision>
		</Overlay>
	);
}
