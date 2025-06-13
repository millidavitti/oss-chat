"use client";
import Flex from "@/components/layouts/flex";
import UserMessageComponent from "./user-message";
import AiMessageComponent from "./ai-message";
import useChatHistoryInterface from "../interfaces/use-chat-history-interface";
import { HashLoader } from "react-spinners";
import { ICON_SIZE } from "@/data/constants";
import ChatInput from "./chat-input";

export default function ChatHistory() {
	const { messageRefs, root, chat_history_db, chat_history_client } =
		useChatHistoryInterface();

	return (
		<Flex
			flex='column'
			className='grow no-scrollbar h-full overflow-x-clip relative outline'
			id='chat-history'
			ref={root}
		>
			{chat_history_db.isPending && (
				<HashLoader
					size={ICON_SIZE}
					color='rbg(var(--primary))'
					className='self-center'
				/>
			)}
			{chat_history_db.isFetching ||
				chat_history_db.data?.chatMessages.map((message, index) => {
					if (message.type === "user")
						return (
							<UserMessageComponent
								key={message.id}
								message={message}
								ref={(node) => {
									if (node) {
										node.dataset.index = index.toString();
										messageRefs.current.push(node!);
									}
								}}
							>
								{message.content}
							</UserMessageComponent>
						);
					else return <AiMessageComponent key={message.id} message={message} />;
				})}
			{chat_history_client.map((message, index) => {
				if (message.type === "user")
					return (
						<UserMessageComponent
							key={message.id}
							message={message}
							ref={(node) => {
								if (node) {
									node.dataset.index = index.toString();
									messageRefs.current.push(node!);
								}
							}}
						>
							{message.content}
						</UserMessageComponent>
					);
				else if (message.type === "ai")
					return <AiMessageComponent key={message.id} message={message} />;
			})}
			<ChatInput />
			<div id='scroll-into-view'></div>
		</Flex>
	);
}
