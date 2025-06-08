"use client";
import { ReactNode } from "react";
import Flex from "../../layouts/flex";
import { useSetAtom } from "jotai";
import { tooltip_visibility_jotai } from "@/app/(root)/atoms/ui_state";

export default function TooltipWrapper({ children }: { children: ReactNode }) {
	const tooltip_setter = useSetAtom(tooltip_visibility_jotai);
	return (
		<Flex
			className='group relative z-[1] overflow-visible'
			onMouseEnter={() => tooltip_setter(true)}
			onMouseLeave={() => tooltip_setter(false)}
		>
			{children}
		</Flex>
	);
}
