import Button from "@/components/ui/button";
import { useAtom, useSetAtom } from "jotai";
import Link from "next/link";
import React from "react";
import { chat_thread_jotai } from "../data/chat-data";

export default function NewChatButton() {
	const chat_thread_setter = useSetAtom(chat_thread_jotai);

	return (
		<Link
			href='/'
			className='shrink-0'
			onClick={() => chat_thread_setter(null)}
		>
			<Button className='w-full'>New Chat</Button>
		</Link>
	);
}
