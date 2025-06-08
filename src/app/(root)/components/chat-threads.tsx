"use client";
import Flex from "@/components/layouts/flex";
import React from "react";
import NewChatButton from "./new-chat-button";
import Link from "next/link";
import ChatThread from "./chat-thread";
import { useAtom } from "jotai";
import { mouse_position_jotai } from "../data/chat-ui-state";

export default function ChatThreads() {
	const [parent_rect, parent_rect_setter] = useAtom(mouse_position_jotai);
	console.log(parent_rect);
	return (
		<Flex
			flex='column'
			className='min-w-[320px] p-3 gap-3 bg-system-surface-container'
		>
			<NewChatButton />
			{threads.map((d) => (
				<ChatThread key={d} thread={d} />
			))}{" "}
			{threads.map((d) => (
				<ChatThread key={d} thread={d} />
			))}
		</Flex>
	);
}

const threads = [1, 2, 3, 4, 5, 6, 7, 8, 9];
