import { ReactNode } from "react";
import Flex from "../layouts/flex";
import { useAtomValue } from "jotai";
import { select_state_jotai } from "./select-atoms";

export default function SelectOptions({ children }: { children: ReactNode }) {
	const select_state = useAtomValue(select_state_jotai);
	return (
		<Flex
			flex='column'
			className='bg-system-surface rounded-[8px] gap-3 absolute inset-x-0 top-14 data-[show-options=false]:hidden cursor-pointer'
			data-show-options={select_state.showOptions}
		>
			{children}
		</Flex>
	);
}
