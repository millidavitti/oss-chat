import Flex from "@/components/layouts/flex";
import Overlay from "@/components/layouts/overlay";
import { useAtom, useSetAtom } from "jotai";
import {
	chat_ui_layer_1_jotai,
	mouse_position_jotai,
} from "../data/chat-ui-state";
import Collision from "@/components/layouts/collision";

export default function SelectModel() {
	const chat_ui_layer_1_setter = useSetAtom(chat_ui_layer_1_jotai);
	const [mouse_position, mouse_position_setter] = useAtom(mouse_position_jotai);

	return (
		<Flex className='shrink-0'>
			<Flex
				className='p-3 bg-system-surface-container-low text-system-on-surface rounded-[8px] w-full cursor-pointer'
				onClick={() => {
					// mouse_position_setter({ x: e.clientX, y: e.clientY });
					chat_ui_layer_1_setter("select-model");
				}}
				onTouchStart={(e) => {
					const touch = e.touches[0];
					mouse_position_setter({ x: touch.clientX, y: touch.clientY });
				}}
			>
				gpt-4.1-mini
			</Flex>
			<Overlay stateFlag='select-model' className='fixed'>
				<Collision className='inset-0 max-w-[480px] w-full h-[480px] outline p-3 rounded-[12px]'>
					<Flex className='max-w-[480px] w-full h-[480px] outline p-3 rounded-[12px]'>
						<Flex className='w-[160px] h-[160px] outline rounded-[12px]'></Flex>
					</Flex>
				</Collision>
			</Overlay>
		</Flex>
	);
}
