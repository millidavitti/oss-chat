import Chat from "@/app/(root)/components/chat";
import ChatThreads from "@/app/(root)/components/chat-threads";
import Flex from "@/components/layouts/flex";

export default function Home() {
	return (
		<Flex className='w-full'>
			<ChatThreads />
			<Chat />
		</Flex>
	);
}
