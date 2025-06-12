import Button from "@/components/ui/button";
import { useSetAtom } from "jotai";
import Link from "next/link";
import { chat_history_client_jotai, chat_jotai } from "../data/chat-data";

export default function NewChatButton() {
	const chat_setter = useSetAtom(chat_jotai);
	const chat_history_client_setter = useSetAtom(chat_history_client_jotai);

	return (
		<Link
			href='/'
			className='shrink-0'
			onClick={() => {
				chat_setter(null);
				chat_history_client_setter([]);
			}}
		>
			<Button className='w-full'>New Chat</Button>
		</Link>
	);
}
