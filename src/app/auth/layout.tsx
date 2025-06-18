import Flex from "@/components/layouts/flex";
import { ReactNode } from "react";
export default function AuthLayout({ children }: { children: ReactNode }) {
	return <Flex className='grow gap-3 p-3'>{children}</Flex>;
}
