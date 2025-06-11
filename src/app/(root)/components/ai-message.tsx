import Flex from "@/components/layouts/flex";
import InteractiveIcon from "@/components/layouts/interactive_icon";
import { ICON_SIZE } from "@/data/constants";
import { Copy, CopyCheck } from "lucide-react";
import useAiMessageInterface from "../interfaces/use-ai-message-interface";
import { ChatMessage } from "../data/chat-data";
import { BeatLoader } from "react-spinners";
import Markdown from "react-markdown";

export default function AiMessage({ message }: { message: ChatMessage }) {
	const { copyMessage, hasCopiedMessage } = useAiMessageInterface();
	return (
		<Flex flex='column' className='mr-auto shrink-0'>
			{Boolean(message.content) && (
				<>
					<Flex
						flex='column'
						className='body-medium lg:body-large p-3 gap-3 rounded-r-[12px] rounded-tl-[12px] h-fit'
					>
						<Markdown>{message.content}</Markdown>
					</Flex>
					{/* Message Options */}
					<Flex
						className='gap-3 mr-auto px-3 shrink-0'
						onClick={() => copyMessage(message.content)}
					>
						<InteractiveIcon className='p-0'>
							{hasCopiedMessage ? (
								<CopyCheck
									size={ICON_SIZE}
									className='stroke-system-on-surface overflow-clip'
								/>
							) : (
								<Copy
									size={ICON_SIZE}
									className='stroke-system-on-surface overflow-clip'
								/>
							)}
						</InteractiveIcon>
					</Flex>
				</>
			)}
			{Boolean(message.content) || (
				<BeatLoader size={ICON_SIZE} color='rgb(var(--on-surface))' />
			)}
		</Flex>
	);
}
