import Flex from "@/components/layouts/flex";
import ChatThreads from "./components/chat-threads";
import Chat from "./components/chat";

export default function Home() {
	return (
		<Flex className='w-full h-full'>
			<ChatThreads />
			<Chat />
		</Flex>
	);
}
