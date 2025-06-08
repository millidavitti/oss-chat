"use client";
import Flex from "@/components/layouts/flex";
import Overlay from "@/components/layouts/overlay";
import {
	chat_ui_layer_1_jotai,
	ChatUILayer_1,
	mouse_position_jotai,
} from "../data/chat-ui-state";

import React from "react";
import ChatThreadOption from "./chat-thread-option";
import { useAtom, useAtomValue } from "jotai";
import { scaleInVariant } from "@/utils/animation-variants";

export default function ChatThreadOptions({ p }: any) {
	const mouse_position = useAtomValue(mouse_position_jotai);

	return (
		<Overlay<ChatUILayer_1>
			stateFlag='show-chat-thread-options'
			className='absolute inset-0 z-10'
		>
			<Flex
				flex='column'
				className='group text-system-on-surface gap-3 rounded-[12px] p-3 w-[160px] bg-system-surface absolute'
				style={{
					left: `${mouse_position.x}px`,
					top: `${mouse_position.y}px`,
				}}
				variants={scaleInVariant}
			>
				<ChatThreadOption
					onClick={(e) => {
						e.stopPropagation();
					}}
				>
					Rename {p}
				</ChatThreadOption>
				<ChatThreadOption className='text-system-error' onClick={() => {}}>
					Delete
				</ChatThreadOption>
			</Flex>
		</Overlay>
	);
}
