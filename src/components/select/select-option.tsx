import { ReactNode } from "react";
import Flex from "../layouts/flex";
import { useSetAtom } from "jotai";
import { select_state_jotai } from "./select-atoms";

export default function SelectOption({
	children,
	value,
}: {
	children: ReactNode;
	value: string;
}) {
	const select_state_setter = useSetAtom(select_state_jotai);

	return (
		<Flex
			className='p-3 bg-system-surface hover:bg-system-surface-container-low'
			onClick={() => {
				select_state_setter({
					select: value,
					showOptions: false,
				});
			}}
		>
			{children}
		</Flex>
	);
}
