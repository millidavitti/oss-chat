import Button from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function NewChatButton() {
	return (
		<Link href='/' className='shrink-0'>
			<Button className='w-full'>New Chat</Button>
		</Link>
	);
}
