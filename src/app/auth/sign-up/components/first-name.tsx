"use client";
import Flex from "@/components/layouts/flex";
import Input from "@/components/ui/input";
import { useAtom } from "jotai";
import { first_name_jotai } from "../atom/sign-up-data";

export default function FirstName() {
	const [first_name, first_name_setter] = useAtom(first_name_jotai);
	return (
		<>
			<Flex flex='column' className='basis-[160px] grow overflow-visible'>
				<label htmlFor='first-name' className='title-small sm:title-medium'>
					First Name
				</label>
				<Input
					type='text'
					id='first-name'
					required
					placeholder='John'
					value={first_name}
					onChange={(e) => first_name_setter(e.currentTarget.value)}
				/>
			</Flex>
		</>
	);
}
