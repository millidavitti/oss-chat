import Flex from "@/components/layouts/flex";
import InteractiveIcon from "@/components/layouts/interactive_icon";
import { ICON_SIZE } from "@/data/constants";
import { Copy, CopyCheck } from "lucide-react";
import { HTMLMotionProps } from "motion/react";
import useAiMessageInterface from "../interfaces/use-ai-message-interface";

export default function AiMessage({ ...props }: HTMLMotionProps<"div">) {
	const { copyMessage, hasCopiedMessage } = useAiMessageInterface();
	return (
		<Flex flex='column' className='mr-auto shrink-0' {...props}>
			<p className='body-medium lg:body-large p-3 rounded-r-[12px] rounded-tl-[12px] h-fit'>
				{mock}
			</p>
			{/* Message Options */}
			<Flex
				className='gap-3 mr-auto px-3 shrink-0'
				onClick={() => copyMessage("Ai message")}
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
		</Flex>
	);
}

const mock = `It looks like you’re asking about the benefits of LINQ (Language Integrated Query) at its root level. LINQ is a powerful feature in C# and .NET that allows developers to write queries in a more readable, expressive, 
`;
