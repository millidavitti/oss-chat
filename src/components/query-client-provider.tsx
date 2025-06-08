"use client";
import { ReactNode } from "react";
import { QueryClientProvider as ClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/data/query-client";

export default function QueryClientProvider({
	children,
}: {
	children: ReactNode;
}) {
	return <ClientProvider client={queryClient}>{children} </ClientProvider>;
}
