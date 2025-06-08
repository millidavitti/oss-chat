import { ReactNode, useEffect } from "react";
import Flex from "../layouts/flex";
import { useAtomValue } from "jotai";
import { select_state_jotai } from "./select-atoms";

interface Select<T> {
	children: ReactNode;
	onSelect: (value: T) => void;
}
export default function Select<T>({ children, onSelect }: Select<T>) {
	const select_state = useAtomValue(select_state_jotai);

	useEffect(() => {
		if (select_state.select) onSelect(select_state.select as T);
	}, [select_state.select]);
	return <Flex className='relative overflow-visible'>{children}</Flex>;
}
