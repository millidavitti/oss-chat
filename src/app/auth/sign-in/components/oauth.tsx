import Flex from "@/components/layouts/flex";
import Button from "@/components/ui/button";
import Image from "next/image";
import useOauthInterface from "../interfaces/use-oauth-interface";

export default function Oauth() {
	const { signInWithGoogle } = useOauthInterface();
	return (
		<>
			<Flex flex='column' className='max-w-[480px] w-full gap-3'>
				<Flex className='justify-center items-center grow gap-3'>
					<div className='grow border border-b-1 border-system-outline' />
					<p className='body-medium sm:body-large'>Or sign in with</p>
					<div className='grow border border-b-1 border-system-outline' />
				</Flex>
				<Button
					className='group bg-transparent text-system-on-surface hover:bg-system-primary-container hover:text-system-on-primary-container'
					onClick={() => signInWithGoogle()}
				>
					<Image src='/google.svg' width={24} height={24} alt='google-icon' />
					Sign in with Google
				</Button>
			</Flex>
		</>
	);
}
