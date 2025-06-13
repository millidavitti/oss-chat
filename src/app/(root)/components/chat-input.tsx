import Flex from "@/components/layouts/flex";
import Button from "@/components/ui/button";
import { ICON_SIZE } from "@/data/constants";
import { ArrowUp, ChevronDown, X } from "lucide-react";
import { AnimatePresence } from "motion/react";
import useChatInputInterface from "../interfaces/use-chat-input-interface";
import { resizeTextArea } from "@/utils/resize-text-area";
import SelectModel from "./select-model";
import InteractiveIcon from "@/components/layouts/interactive_icon";

export default function ChatInput() {
	const {
		chat_input,
		sendChatMessage,
		captureChatInput,
		chat_ui_layer_1,
		is_scroll_bottom,
	} = useChatInputInterface();

	return (
		<Flex
			flex='column'
			className='shrink-0 self-center w-full max-w-[720px] sticky bottom-0 bg-system-surface-container-highest rounded-[12px] mt-auto overflow-visible'
		>
			{is_scroll_bottom || (
				<InteractiveIcon
					className='self-center absolute -top-10 bg-system-secondary rounded-full p-1'
					onClick={() => {
						(
							document.querySelector("#scroll-into-view") as HTMLDivElement
						).scrollIntoView({ behavior: "smooth" });
					}}
				>
					<ChevronDown
						size={ICON_SIZE}
						className='stroke-system-on-secondary'
					/>
				</InteractiveIcon>
			)}
			<Flex className='flex gap-3 w-full p-3 '>
				<textarea
					placeholder='Ask anything'
					value={chat_input}
					className='grow w-full max-h-[200px]  min-h-[40px] outline-none resize-none overflow-y-auto bg-transparent gap-3 no-scrollbar'
					onChange={(e) => {
						captureChatInput(e.currentTarget.value);
						resizeTextArea(e);
					}}
					onKeyDown={(e) => {
						if (e.key === "Enter" && !e.shiftKey && chat_input) {
							e.preventDefault();
							sendChatMessage();
						}
					}}
				/>
			</Flex>

			<Flex className='w-full justify-between p-3'>
				<SelectModel />
				<Flex className='relative shrink-0 w-10 h-10 self-end'>
					<AnimatePresence>
						{Boolean(chat_ui_layer_1 === "show-chat-options") || (
							<Button
								type='submit'
								disabled={!Boolean(chat_input)}
								initial={{ scale: 0.8 }}
								animate={{ scale: 1 }}
								exit={{ scale: 0, opacity: 0 }}
								transition={{ type: "tween", duration: 0.2 }}
								className='w-10 h-10 shrink-0 p-0 rounded-[12px] bg-system-primary lg:w-10 lg:h-10 inset-0 absolute'
								onClick={() => sendChatMessage()}
							>
								<ArrowUp
									size={ICON_SIZE}
									className='stroke-system-on-primary'
								/>
							</Button>
						)}
					</AnimatePresence>
					<AnimatePresence>
						{Boolean(chat_ui_layer_1 === "show-chat-options") && (
							<Button
								type='button'
								initial={{ scale: 0.8 }}
								animate={{ scale: 1 }}
								exit={{ scale: 0, opacity: 0 }}
								transition={{ type: "tween", duration: 0.2 }}
								className='w-10 h-10 shrink-0 p-0 rounded-[12px] bg-system-error lg:w-10 lg:h-10 inset-0 absolute'
								onClick={() => {}}
							>
								<X size={ICON_SIZE} className='stroke-system-on-error' />
							</Button>
						)}
					</AnimatePresence>
				</Flex>
			</Flex>
		</Flex>
	);
}
