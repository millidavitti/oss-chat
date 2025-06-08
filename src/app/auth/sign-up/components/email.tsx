"use client";
import Flex from "@/components/layouts/flex";
import Input from "@/components/ui/input";
import { useAtom } from "jotai";
import { email_jotai } from "../atom/sign-up-data";

export default function Email() {
	const [email, email_setter] = useAtom(email_jotai);
	return (
		<>
			<Flex flex='column' className='grow overflow-visible'>
				<label htmlFor='email' className='title-small sm:title-medium'>
					Email
				</label>
				<Input
					type='email'
					id='email'
					required
					value={email}
					placeholder='john@doe.com'
					onChange={(e) => email_setter(e.currentTarget.value)}
				/>
			</Flex>
		</>
	);
}
