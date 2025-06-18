import Flex from "@/components/layouts/flex";
import Button from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import SignInForm from "./components/sign-in-form";
import { Suspense } from "react";

export const metadata: Metadata = {
	title: "Sign In",
	description: "Accelerate Your Learning with Interactive Study Sets",
};
export default function SignIn() {
	return (
		<Flex flex='column' className='w-full p-3'>
			<Link href='/' className='self-end'>
				<Button className='bg-system-secondary-container text-system-on-secondary-container rounded-full justify-center items-center gap-2'>
					<ArrowLeft
						size={16}
						className='stroke-system-on-secondary-container'
					/>
					Back to Chat
				</Button>
			</Link>
			<Suspense>
				<SignInForm />
			</Suspense>
		</Flex>
	);
}
