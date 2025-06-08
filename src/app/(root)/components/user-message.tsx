import Flex from "@/components/layouts/flex";
import InteractiveIcon from "@/components/layouts/interactive_icon";
import { ICON_SIZE } from "@/data/constants";
import { cn } from "@/utils/cn";
import { Copy, CopyCheck, Edit, Expand, Shrink } from "lucide-react";
import { ReactNode } from "react";
import useUserMessageInterface from "../interfaces/use-user-message-interface";
import { type UserMessage as UserMessageT } from "../data/chat-data";
import Button from "@/components/ui/button";
import { HTMLMotionProps } from "motion/react";

interface UserMessage extends Omit<HTMLMotionProps<"div">, "classID"> {
	children: ReactNode;
	message: UserMessageT;
}
export default function UserMessage({
	children,
	className,
	message,
	...props
}: UserMessage) {
	const {
		expandShrink,
		shouldClamp,
		isOverflowing,
		paragraphRef,
		editMessage,
		shouldEdit,
		cancelEdit,
		saveEdit,
		copyMessage,
		hasCopiedMessage,
	} = useUserMessageInterface();
	return (
		<Flex
			flex='column'
			className={cn(
				"group shrink-0 p-3 items-end sticky top-0 overflow-visible transition-transform",
				className,
				shouldClamp == false && "z-10",
			)}
			{...props}
		>
			<Flex
				flex='column'
				id={"user-message-" + message.id}
				className={cn(
					"body-medium md:body-large gap-3 p-3 rounded-l-[12px] rounded-tr-[12px] bg-system-tertiary-container text-system-on-tertiary-container min-w-[280px] max-w-full max-h-[320px] no-scrollbar",
				)}
			>
				<p
					className={cn(
						"grow",
						shouldClamp && "line-clamp-3",
						shouldEdit(message.id) && "p-3 overflow-y-scroll no-scrollbar",
					)}
					contentEditable={shouldEdit(message.id)}
					ref={paragraphRef}
					onInput={(e) => {
						console.log(e.currentTarget.textContent);
						// setEdit(e.currentTarget.textContent!);
					}}
				>
					{children}
				</p>
				{shouldEdit(message.id) && (
					<Flex className='gap-3 justify-end shrink-0'>
						<Button
							className='bg-system-surface text-system-on-surface border-system-outline'
							onClick={() => cancelEdit(message.id)}
						>
							Cancel
						</Button>
						<Button
							className='bg-system-primary text-system-on-primary'
							onClick={() => saveEdit(message.id)}
						>
							Save
						</Button>
					</Flex>
				)}
			</Flex>

			{/* Message Options */}
			{shouldEdit(message.id) || (
				<Flex className='gap-3 ml-auto p-3 hidden absolute rounded-[12px] -bottom-11 backdrop-blur-lg right-3 group-hover:flex'>
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
					<InteractiveIcon
						className='p-0'
						onClick={() => {
							editMessage(message);
						}}
					>
						<Edit
							size={ICON_SIZE}
							className='stroke-system-on-surface overflow-clip'
						/>
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
			)}
		</Flex>
	);
}
