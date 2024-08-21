import SocialButtons from "@/components/socialauth"
import Divider from "@/components/ui/divider"
import { Metadata } from "next"
import SignUpForm from "./form"
import Image from "next/image"
import { Auth } from "@/lib/lucia"
import { redirect } from "next/navigation"
import Link from "next/link"
import LINKS from "@/constants/link"

export const metadata: Metadata = {
	title: "Sign Up - Trimfy",
	description:
		"Sign up for Trimfy to access your account and start shortening links.",
}

const SignUp = async () => {
	const { session } = await Auth()
	if (session) {
		redirect(LINKS.DASHBOARD)
	}

	return (
		<div className="flex min-h-screen items-start pt-4 justify-center text-white px-4">
			<div className="space-y-4 max-w-md w-full">
				<h1 className="text-5xl font-bold text-center">Sign Up</h1>
				<p className="text-gray-400 text-lg text-center">
					Sign up for Trimfy to access your account and start
					shortening links.
				</p>

				<SocialButtons />
				<Divider text="OR" />
				<SignUpForm />

				<p className="text-gray-400">
					Already have an account?{" "}
					<Link
						href={LINKS.LOGIN}
						className="text-blue-400 hover:underline"
					>
						Sign in
					</Link>
				</p>
			</div>
		</div>
	)
}

export default SignUp
