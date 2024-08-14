import SocialButtons from "@/components/socialauth"
import Divider from "@/components/ui/divider"
import { Metadata } from "next"
import SignInForm from "./form"
import Image from "next/image"
import { useAuth } from "@/lib/lucia"
import { redirect } from "next/navigation"
import Link from "next/link"
import LINKS from "@/constants/link"

export const metadata: Metadata = {
	title: "Sign In - Trimfy",
	description:
		"Sign in to Trimfy to access your account and start shortening links.",
}

const SignIn = async ({
	searchParams,
}: {
	searchParams: { [key: string]: string | string[] | undefined }
}) => {
	const { session } = await useAuth()
	if (session) {
		redirect(LINKS.DASHBOARD)
	}

	return (
		<div className="flex min-h-screen bg-gray-900 items-start pt-4 justify-center text-white px-4">
			<div className="flex flex-col lg:flex-row items-start justify-between w-full max-w-5xl lg:space-x-8">
				<Image
					src="./thought_process.svg"
					alt="Trimfy Logo"
					width="500"
					height="400"
					className="rounded-lg object-cover hidden lg:block"
					style={{
						aspectRatio: "500/400",
						objectFit: "contain",
					}}
				/>
				<div className="space-y-4 max-w-md w-full">
					<h1 className="text-5xl font-bold text-center">Sign In</h1>
					<p className="text-gray-400 text-lg text-center">
						Sign in to your account using one of the methods below.
					</p>

					<SocialButtons />
					<Divider text="OR" />
					<SignInForm params={searchParams} />

					<p className="text-gray-400">
						Don't have an account?{" "}
						<Link
							href={LINKS.REGISTER}
							className="text-blue-400 hover:underline"
						>
							Sign up
						</Link>
					</p>
				</div>
			</div>
		</div>
	)
}

export default SignIn
