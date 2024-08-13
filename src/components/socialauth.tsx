"use client"

import { githubSignIn, googleSignIn } from "@/actions/auth"
import { useState } from "react"
import { FaGithub, FaGoogle } from "react-icons/fa"
import { ImSpinner2 } from "react-icons/im"

function SocialButtons() {
	const [loading, setLoading] = useState({ google: false, github: false })

	const signInWithGoogle = async () => {
		setLoading((prev) => ({ ...prev, google: true }))
		await googleSignIn()
		setLoading((prev) => ({ ...prev, google: false }))
	}

	const signInWithGithub = async () => {
		setLoading((prev) => ({ ...prev, github: true }))
		await githubSignIn()
		setLoading((prev) => ({ ...prev, github: false }))
	}

	return (
		<div className="flex flex-col space-y-4">
			<button
				onClick={signInWithGoogle}
				className={`p-4 rounded-md flex items-center justify-center space-x-2 relative 
					${
						loading.google
							? "bg-gray-600 cursor-not-allowed"
							: "bg-gray-800 hover:bg-gray-700"
					}
				`}
				disabled={loading.google || loading.github}
			>
				{loading.google ? (
					<ImSpinner2 className="animate-spin" />
				) : (
					<FaGoogle />
				)}
				<span>Sign in with Google</span>
			</button>

			<button
				onClick={signInWithGithub}
				className={`p-4 rounded-md flex items-center justify-center space-x-2 relative
					${
						loading.github
							? "bg-gray-600 cursor-not-allowed"
							: "bg-gray-800 hover:bg-gray-700"
					}
				`}
				disabled={loading.github || loading.google}
			>
				{loading.github ? (
					<ImSpinner2 className="animate-spin" />
				) : (
					<FaGithub />
				)}
				<span>Sign in with GitHub</span>
			</button>
		</div>
	)
}

export default SocialButtons
