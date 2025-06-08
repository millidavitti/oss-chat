"use client";
import Flex from "@/components/layouts/flex";
import Button from "@/components/ui/button";
import Link from "next/link";
import SignUpFormHeader from "./sign-up-form-header";
import FirstName from "./first-name";
import LastName from "./last-name";
import Email from "./email";
import Oauth from "./oauth";
import { HashLoader } from "react-spinners";
import { ICON_SIZE } from "@/data/constants";
import useSignUpFormInterface from "../interface/use-sign-up-form-interface";

export default function SignUpForm() {
	const { createAccount, creating } = useSignUpFormInterface();
	return (
		<Flex flex='column' className='grow gap-8 justify-center items-center'>
			{/* Form */}
			<Flex
				flex='column'
				className='max-w-[480px] w-full gap-3 overflow-visible'
			>
				<SignUpFormHeader />
				<form
					className='flex flex-col gap-3 overflow-visible'
					onSubmit={(e) => {
						e.preventDefault();
						createAccount();
					}}
				>
					<Flex className='gap-3 flex-wrap overflow-visible'>
						<FirstName />
						<LastName />
						<Email />
					</Flex>
					<p className='body-medium sm:body-large'>
						By signing up you agree to our{" "}
						<Link href='/' className='text-system-primary'>
							Terms & Conditions
						</Link>
					</p>
					<Button type='submit'>
						Create account{" "}
						{creating ? (
							<HashLoader size={ICON_SIZE} color='rgb(var(--on-primary))' />
						) : null}
					</Button>
				</form>
			</Flex>
			<Oauth />
		</Flex>
	);
}
