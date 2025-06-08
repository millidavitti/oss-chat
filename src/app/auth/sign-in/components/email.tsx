import Flex from "@/components/layouts/flex";
import Input from "@/components/ui/input";
import { useAtom } from "jotai";
import { sign_in_credentials_jotai } from "../atoms/sign-in-data";

export default function Email() {
	const [sign_in_credentials, sign_in_credentials_setter] = useAtom(
		sign_in_credentials_jotai,
	);
	return (
		<>
			<Flex flex='column' className='grow overflow-visible'>
				<label htmlFor='email' className='title-small sm:title-medium'>
					Email
				</label>
				<Input
					type='email'
					id='email'
					placeholder='john@doe.com'
					required
					value={sign_in_credentials.email}
					onChange={(e) => {
						sign_in_credentials_setter({ email: e.currentTarget.value });
					}}
				/>
			</Flex>
		</>
	);
}
