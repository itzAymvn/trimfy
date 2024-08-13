import { signOut } from "@/actions/auth"
import { useAuth } from "@/lib/lucia"
import Link from "next/link"
import { FaLink } from "react-icons/fa"

export const Navbar = async () => {
	const { session } = await useAuth()

	return (
		<nav className="bg-gray-900 flex flex-row items-center justify-between">
			<Link
				href={"/"}
				className="text-primary-foreground text-2xl font-bold p-4 flex flex-row items-center hover:text-gray-300"
			>
				<FaLink className="inline-block mr-2" />
				Trimfy
			</Link>

			<div className="flex flex-row items-center space-x-4 p-4">
				{session ? (
					<>
						<Link
							href={"/dashboard"}
							className="text-primary-foreground bg-gray-800 p-4 rounded-md hover:bg-gray-700"
						>
							Dashboard
						</Link>

						<form
							action={async () => {
								"use server"
								await signOut()
							}}
						>
							<button
								type="submit"
								className="text-primary-foreground bg-gray-800 p-4 rounded-md hover:bg-gray-700"
							>
								Logout
							</button>
						</form>
					</>
				) : (
					<>
						<Link
							href={"/login"}
							className="text-primary-foreground bg-gray-800 p-4 rounded-md hover:bg-gray-700"
						>
							Login
						</Link>
						<Link
							href={"/register"}
							className="text-primary-foreground bg-gray-800 p-4 rounded-md hover:bg-gray-700"
						>
							Register
						</Link>
					</>
				)}
			</div>
		</nav>
	)
}
