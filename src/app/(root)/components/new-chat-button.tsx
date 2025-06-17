import Button from "@/components/ui/button";
import { useSetAtom } from "jotai";
import Link from "next/link";
import { chat_history_client_jotai, chat_jotai } from "../data/chat-data";
import { chat_ui_layer_1_jotai } from "../data/chat-ui-state";

export default function NewChatButton() {
	const chat_setter = useSetAtom(chat_jotai);
	const chat_history_client_setter = useSetAtom(chat_history_client_jotai);
	const chat_ui_layer_1_setter = useSetAtom(chat_ui_layer_1_jotai);

	return (
		<Link
			href='/'
			className='shrink-0'
			onClick={() => {
				chat_setter(null);
				chat_history_client_setter([]);
				chat_ui_layer_1_setter(null);
			}}
		>
			<Button className='w-full'>New Chat</Button>
		</Link>
	);
}
