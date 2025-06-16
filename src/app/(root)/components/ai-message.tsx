import Flex from "@/components/layouts/flex";
import InteractiveIcon from "@/components/layouts/interactive_icon";
import { ICON_SIZE } from "@/data/constants";
import { Copy, CopyCheck } from "lucide-react";
import useAiMessageInterface from "../interfaces/use-ai-message-interface";
import { ChatMessage } from "../data/chat-data";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import { BeatLoader } from "react-spinners";

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
						<Markdown
							remarkPlugins={[remarkGfm]}
							components={{
								code(props) {
									const { children, className, ...rest } = props;
									const match = /language-(\w+)/.exec(className || "");
									return match ? (
										<SyntaxHighlighter
											PreTag='div'
											language={match[1]}
											style={dracula}
										>
											{String(children).replace(/\n$/, "")}
										</SyntaxHighlighter>
									) : (
										<code {...rest} className={className}>
											{children}
										</code>
									);
								},
							}}
						>
							{message.content}
						</Markdown>
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
									id='copy-ai-message'
								/>
							)}
						</InteractiveIcon>
					</Flex>
				</>
			)}
		</Flex>
	);
}
