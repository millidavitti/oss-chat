"use client";
import Collision from "@/components/layouts/collision";
import { tooltip_visibility_jotai } from "@/data/atoms/ui_state";
import { useAtomValue } from "jotai";
import { HTMLProps, ReactNode } from "react";

interface Tooltip extends Omit<HTMLProps<HTMLDivElement>, "classID"> {
	children: ReactNode;
}
export default function Tooltip({ children, ...props }: Tooltip) {
	const tooltip = useAtomValue(tooltip_visibility_jotai);
	return <>{tooltip && <Collision {...props}>{children}</Collision>}</>;
}
