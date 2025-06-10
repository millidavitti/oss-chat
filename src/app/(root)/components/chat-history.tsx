"use client";
import Flex from "@/components/layouts/flex";
import UserMessageComponent from "./user-message";
import AiMessageComponent from "./ai-message";
import useChatHistoryInterface from "../interfaces/use-chat-history-interface";
import {
	chat_history_client_jotai,
	chat_history_db_jotai,
} from "../data/chat-data";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import { createId } from "@paralleldrive/cuid2";
import { HashLoader } from "react-spinners";
import { ICON_SIZE } from "@/data/constants";

export default function ChatHistory() {
	const { messageRefs, root } = useChatHistoryInterface();
	const [chat_history_client, chat_history_client_setter] = useAtom(
		chat_history_client_jotai,
	);
	const params = useParams();
	const [chat_history_db] = useAtom(chat_history_db_jotai);
	console.log(chat_history_db.data);

	useEffect(() => {
		let aiResponse: EventSource;

		(async () => {
			aiResponse = new EventSource(
				`${process.env.NEXT_PUBLIC_API_ENDPOINT}/chats/ai-response/${params["chat-id"]}`,
				{ withCredentials: true },
			);
			aiResponse.onmessage = async (event) => {
				const { chunk, chatId, status } = JSON.parse(event.data);
				console.log(event.data);

				if (chunk !== undefined) {
					chat_history_client_setter((history) => {
						const ai = history.pop();
						return [
							...history,
							{
								chatId,
								content: ai?.content + chunk,
								id: createId(),
								type: "ai",
								status: "pending",
							},
						];
					});
				} else if (status === "completed") {
					await chat_history_db.refetch();
					chat_history_client_setter([]);
				}
			};
			aiResponse.onerror = (err) => {
				console.log("EventSource failed:", err);
			};
		})();

		return () => {
			aiResponse?.close();
		};
	}, [params["chat-id"]]);

	return (
		<Flex
			flex='column'
			className='grow no-scrollbar overflow-x-clip relative'
			id='chat-history'
			ref={root}
		>
			{chat_history_db.isPending && (
				<HashLoader size={ICON_SIZE} color='rbg(var(--primary))' />
			)}
			{chat_history_db.data?.chatMessages.map((message, index) => {
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
				else return <AiMessageComponent key={message.id} message={message} />;
			})}
		</Flex>
	);
}
