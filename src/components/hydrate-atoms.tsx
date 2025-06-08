"use client";
import { useHydrateAtoms } from "jotai/utils";
import { queryClientAtom } from "jotai-tanstack-query";
import { ReactNode } from "react";
import { queryClient } from "@/data/query-client";

export function HydrateAtoms({ children }: { children: ReactNode }) {
	useHydrateAtoms(new Map([[queryClientAtom, queryClient]]));
	return children;
}
