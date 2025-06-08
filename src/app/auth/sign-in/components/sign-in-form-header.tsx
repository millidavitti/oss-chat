import Link from "next/link";

export default function SignInFormHeader() {
	return (
		<>
			<h2 className='headline-small sm:headline-medium'>Welcome back</h2>
			<p className='body-medium sm:body-large'>
				Don&apos;t have account?{" "}
				<Link href='/auth/sign-up' className='text-system-primary'>
					Sign Up
				</Link>
			</p>
		</>
	);
}
