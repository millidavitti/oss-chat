"use client";
import { jotaiStore } from "@/data/jotai-store";
import { Provider } from "jotai";
import React, { ReactNode } from "react";

export default function JotaiProvider({ children }: { children: ReactNode }) {
	return <Provider store={jotaiStore}>{children} </Provider>;
}
