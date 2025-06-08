import Flex from "@/components/layouts/flex";
import Button from "@/components/ui/button";
import { ICON_SIZE } from "@/data/constants";
import { computeTextAreaResize } from "@/utils/compute-text-area-resize";
import { useAtom } from "jotai";
import { ArrowUp, X } from "lucide-react";
import { AnimatePresence } from "motion/react";

export default function ChatInput() {
	return (
		<Flex className='gap-3 w-full shrink-0 rounded-[12px] bg-system-surface-container-low'>
			<form
				className='flex gap-3 w-full p-3 shrink-0'
				onSubmit={(e) => {
					e.preventDefault();
					alert("Sent");
				}}
			>
				<textarea
					placeholder='Ask anything'
					className='grow w-full max-h-[200px] min-h-full outline-none resize-none overflow-y-auto bg-transparent gap-3 no-scrollbar'
					onChange={(e) => {
						if (e.currentTarget.value)
							e.currentTarget.style.height =
								e.currentTarget.scrollHeight + "px";
						else
							e.currentTarget.style.height =
								computeTextAreaResize(e.currentTarget) + "px";
					}}
				/>

				<Flex className='relative shrink-0 w-10 h-10 self-end'>
					<AnimatePresence>
						{Boolean("chat-options" === "chat-options") || (
							<Button
								type='submit'
								initial={{ scale: 0.8 }}
								animate={{ scale: 1 }}
								exit={{ scale: 0, opacity: 0 }}
								transition={{ type: "tween", duration: 0.2 }}
								className='w-10 h-10  shrink-0 p-0 rounded-full bg-system-primary lg:w-10 lg:h-10 inset-0 absolute'
								onContextMenu={(e) => {}}
							>
								<ArrowUp
									size={ICON_SIZE}
									className='stroke-system-on-primary'
								/>
							</Button>
						)}
					</AnimatePresence>
					<AnimatePresence>
						{Boolean("chat-options" === "chat-options") && (
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
