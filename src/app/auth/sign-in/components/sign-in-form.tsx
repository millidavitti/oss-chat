"use client";
import Flex from "@/components/layouts/flex";
import Button from "@/components/ui/button";
import SignInFormHeader from "./sign-in-form-header";
import Email from "./email";
import Oauth from "./oauth";
import { HashLoader } from "react-spinners";
import useSignInFormInterface from "../interfaces/use-sign-in-form-interface";
import { ICON_SIZE } from "@/data/constants";

export default function SignInForm() {
	const { signIn, signingIn } = useSignInFormInterface();
	return (
		<Flex flex='column' className='grow gap-8 justify-center items-center'>
			{/* Form */}
			<Flex flex='column' className='max-w-[480px] w-full gap-3'>
				<SignInFormHeader />
				<form
					className='flex flex-col gap-3'
					onSubmit={(e) => {
						e.preventDefault();
						signIn();
					}}
				>
					<Flex className='gap-3 flex-wrap overflow-visible'>
						<Email />
					</Flex>
					<Button type='submit'>
						Sign In
						{signingIn ? (
							<HashLoader size={ICON_SIZE} color='rgb(var(--on-primary))' />
						) : null}
					</Button>
				</form>
			</Flex>
			<Oauth />
		</Flex>
	);
}
