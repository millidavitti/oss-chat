import Flex from "@/components/layouts/flex";
import Button from "@/components/ui/button";
import { ICON_SIZE } from "@/data/constants";
import { ArrowUp, X } from "lucide-react";
import { AnimatePresence } from "motion/react";
import useChatInputInterface from "../interfaces/use-chat-input-interface";
import { resizeTextArea } from "@/utils/resize-text-area";

export default function ChatInput() {
	const { chat_input, sendChatMessage, captureChatInput, chat_ui_layer_1 } =
		useChatInputInterface();

	return (
		<Flex className='gap-3 w-full max-w-[720px] self-center mt-auto shrink-0 rounded-[12px] bg-system-surface-container-highest sticky bottom-0'>
			<form
				className='flex gap-3 w-full p-3 shrink-0'
				onSubmit={(e) => {
					e.preventDefault();
					sendChatMessage();
				}}
			>
				<textarea
					placeholder='Ask anything'
					value={chat_input}
					className='grow w-full max-h-[200px] min-h-full outline-none resize-none overflow-y-auto bg-transparent gap-3 no-scrollbar'
					onChange={(e) => {
						captureChatInput(e.currentTarget.value);
						resizeTextArea(e);
					}}
				/>

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
								className='w-10 h-10  shrink-0 p-0 rounded-full bg-system-primary lg:w-10 lg:h-10 inset-0 absolute'
								onContextMenu={() => {}}
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
								className='w-10 h-10 shrink-0 p-0 rounded-full bg-system-error lg:w-10 lg:h-10 inset-0 absolute'
								onClick={() => {}}
							>
								<X size={ICON_SIZE} className='stroke-system-on-error' />
							</Button>
						)}
					</AnimatePresence>
				</Flex>
			</form>
		</Flex>
	);
}
