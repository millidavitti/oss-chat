import Link from "next/link";

export default function SignUpFormHeader() {
	return (
		<>
			<h2 className='headline-small sm:headline-medium'>Create an account</h2>
			<p className='body-medium sm:body-large'>
				Already have account?{" "}
				<Link href='/auth/sign-in' className='text-system-primary'>
					Sign In
				</Link>
			</p>
		</>
	);
}
