import SocialButtons from "@/components/socialauth"
import Divider from "@/components/ui/divider"
import { Metadata } from "next"
import SignUpForm from "./form"

export const metadata: Metadata = {
	title: "Sign Up - Trimfy",
	description:
		"Sign up for Trimfy to access your account and start shortening links.",
}

const SignUp = () => {
	return (
		<div className="flex min-h-screen bg-gray-900 items-center justify-center text-white">
			<div className="space-y-4">
				<h1 className="text-5xl font-bold text-center">Sign Up</h1>
				<p className="text-gray-400 text-lg">
					Sign up for Trimfy to access your account and start
					shortening links.
				</p>

				<SocialButtons />
				<Divider text="OR" />
				<SignUpForm />
			</div>
		</div>
	)
}

export default SignUp
