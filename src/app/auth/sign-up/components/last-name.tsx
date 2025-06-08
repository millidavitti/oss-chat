"use client";
import Flex from "@/components/layouts/flex";
import Input from "@/components/ui/input";
import { useAtom } from "jotai";
import { last_name_jotai } from "../atom/sign-up-data";

export default function LastName() {
	const [last_name, last_name_setter] = useAtom(last_name_jotai);
	return (
		<>
			<Flex flex='column' className='basis-[160px] grow overflow-visible'>
				<label htmlFor='last-name' className='title-small sm:title-medium'>
					Last Name
				</label>
				<Input
					type='text'
					id='last-name'
					required
					placeholder='Doe'
					value={last_name}
					onChange={(e) => last_name_setter(e.currentTarget.value)}
				/>
			</Flex>
		</>
	);
}
