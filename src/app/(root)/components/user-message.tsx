import Flex from "@/components/layouts/flex";
import InteractiveIcon from "@/components/layouts/interactive_icon";
import { ICON_SIZE } from "@/data/constants";
import { cn } from "@/utils/cn";
import { Copy, CopyCheck, Expand, Shrink } from "lucide-react";
import { ReactNode } from "react";
import useUserMessageInterface from "../interfaces/use-user-message-interface";
import { ChatMessage } from "../data/chat-data";
import { HTMLMotionProps } from "motion/react";

interface UserMessage extends Omit<HTMLMotionProps<"div">, "classID"> {
	children: ReactNode;
	message: ChatMessage;
	index: number;
}
export default function UserMessage({
	children,
	className,
	message,
	index,
	...props
}: UserMessage) {
	const {
		expandShrink,
		shouldClamp,
		isOverflowing,
		paragraphRef,
		copyMessage,
		hasCopiedMessage,
	} = useUserMessageInterface();

	return (
		<Flex
			flex='column'
			id={message.id}
			data-index={index}
			data-type='user'
			className={cn(
				"group shrink-0 p-3 items-end overflow-visible transition-transform",
				className,
				shouldClamp == false && "z-10",
			)}
			{...props}
		>
			<Flex
				flex='column'
				id={"user-message-" + message.id}
				className={cn(
					"body-medium md:body-large gap-3 p-3 rounded-l-[12px] rounded-tr-[12px] bg-system-tertiary-container text-system-on-tertiary-container max-w-full max-h-[320px] no-scrollbar",
				)}
			>
				<p
					className={cn("grow", shouldClamp && "line-clamp-3")}
					ref={paragraphRef}
				>
					{children}
				</p>
			</Flex>

			{/* Message Options */}

			<Flex className='gap-3 ml-auto p-3 hidden absolute rounded-[8px] -bottom-11 bg-system-secondary-container text-system-on-secondary-container right-3 group-hover:flex'>
				<InteractiveIcon
					className='p-0 overflow-clip'
					onClick={() => copyMessage(message.content)}
				>
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

				{isOverflowing && (
					<InteractiveIcon
						className='p-0'
						onClick={() => {
							expandShrink(message.id!);
						}}
					>
						{shouldClamp ? (
							<Expand size={ICON_SIZE} className='stroke-system-on-surface' />
						) : (
							<Shrink size={ICON_SIZE} className='stroke-system-on-surface' />
						)}
					</InteractiveIcon>
				)}
			</Flex>
		</Flex>
	);
}
