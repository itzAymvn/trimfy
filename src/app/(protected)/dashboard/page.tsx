import { useAuth } from "@/lib/lucia"
import { redirect } from "next/navigation"

const Dashboard = async () => {
	const { session, user } = await useAuth()

	if (!session) {
		return redirect("/login")
	}

	return (
		<div className="flex min-h-screen bg-gray-900 items-center justify-center text-white">
			<div className="space-y-4">
				<h1 className="text-5xl font-bold text-center">Dashboard</h1>
				<p className="text-gray-400 text-lg">
					Welcome back, {user.email}!
				</p>

				{user.picture && (
					<img
						src={user.picture}
						alt="Profile Picture"
						className="rounded-full w-32 h-32 mx-auto"
					/>
				)}
			</div>
		</div>
	)
}

export default Dashboard
