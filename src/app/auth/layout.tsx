import Flex from "@/components/layouts/flex";
import Image from "next/image";
import React, { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
	return (
		<Flex className='grow gap-3 p-3'>
			<Flex className='hidden w-full rounded-xl overflow-clip md:flex'>
				<Image
					src='/vercel.svg'
					priority
					className='object-cover'
					alt='young lady'
				/>
			</Flex>
			{children}
		</Flex>
	);
}
