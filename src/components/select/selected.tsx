import Flex from "../layouts/flex";
import { useSetAtom } from "jotai";
import { ReactNode } from "react";
import { select_state_jotai } from "./select-atoms";

interface Selected {
	defaultValue?: string;
	value?: ReactNode;
}
export default function Selected({ defaultValue, value }: Selected) {
	const select_state_setter = useSetAtom(select_state_jotai);

	return (
		<Flex
			className='p-3 bg-system-surface-container-low text-system-on-surface rounded-[8px] w-full cursor-pointer'
			onClick={() => {
				select_state_setter((state) => ({
					...state,
					showOptions: true,
				}));
			}}
		>
			{value || defaultValue || "Select an option"}
		</Flex>
	);
}
