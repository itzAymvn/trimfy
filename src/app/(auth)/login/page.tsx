import SocialButtons from "@/components/socialauth"
import Divider from "@/components/ui/divider"
import { Metadata } from "next"
import SignInForm from "./form"

export const metadata: Metadata = {
	title: "Sign In - Trimfy",
	description:
		"Sign in to Trimfy to access your account and start shortening links.",
}

const SignIn = ({
	searchParams,
}: {
	searchParams: { [key: string]: string | string[] | undefined }
}) => {
	return (
		<div className="flex min-h-screen bg-gray-900 items-center justify-center text-white">
			<div className="space-y-4">
				<h1 className="text-5xl font-bold text-center">Sign In</h1>
				<p className="text-gray-400 text-lg">
					Sign in to your account using one of the methods below.
				</p>

				<SocialButtons />
				<Divider text="OR" />
				<SignInForm params={searchParams} />
			</div>
		</div>
	)
}

export default SignIn
