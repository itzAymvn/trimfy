import { getUserLinks } from "@/actions/app"
import LINKS from "@/constants/link"
import { useAuth } from "@/lib/lucia"
import { calculateAge } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"
import { FiClock, FiPlusCircle } from "react-icons/fi"

const Dashboard = async () => {
	const { session, user } = await useAuth()

	if (!session) {
		return redirect(LINKS.LOGIN)
	}

	const links = await getUserLinks()

	return (
		<div className="flex min-h-screen bg-gray-900 items-start p-8 md:p-16 justify-center text-white">
			<div className="flex flex-col items-start justify-start w-full max-w-5xl space-y-8">
				<h1 className="text-5xl font-bold text-white">Dashboard</h1>
				<p className="text-gray-400 text-lg">
					Welcome back, {user.name}! Here are your links.
				</p>
				{links.length > 0 ? (
					<div className="overflow-x-auto w-full">
						<table className="min-w-full bg-gray-800 rounded-lg shadow-lg">
							<thead>
								<tr className="bg-gray-700 text-gray-400">
									<th className="py-3 px-6 text-left border-b border-gray-700">
										Token
									</th>
									<th className="py-3 px-6 text-left border-b border-gray-700">
										Full URL
									</th>
									<th className="py-3 px-6 text-left border-b border-gray-700">
										Clicks
									</th>
									<th className="py-3 px-6 text-left border-b border-gray-700">
										Created
									</th>
								</tr>
							</thead>
							<tbody>
								{links.map((link, index) => (
									<tr
										key={link.id}
										className={`hover:bg-gray-700 ${
											index % 2 === 0
												? "bg-gray-800"
												: "bg-gray-850"
										}`}
									>
										<td className="py-3 px-6 border-b border-gray-700">
											<Link
												href={LINKS.DASHBOARD_LINK(
													link.token
												)}
												className="text-lg font-bold text-blue-400 hover:underline"
											>
												/{link.token}
											</Link>
										</td>
										<td className="py-3 px-6 text-gray-400 border-b border-gray-700 truncate max-w-xs">
											{link.fullUrl}
										</td>
										<td className="py-3 px-6 text-gray-400 border-b border-gray-700">
											{link.clicks.length}
										</td>
										<td className="py-3 px-6 text-gray-400 border-b border-gray-700">
											<FiClock className="inline-block mr-1" />
											{calculateAge(link.createdAt)}
										</td>
									</tr>
								))}
							</tbody>
						</table>

						<div className="flex items-center justify-end w-full mt-8">
							<Link
								href={LINKS.DASHBOARD_LINK_NEW}
								className="bg-blue-400 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-500 transition-colors"
							>
								<FiPlusCircle className="mr-2" />
								New Link
							</Link>
						</div>
					</div>
				) : (
					<div className="flex items-center justify-center w-full h-96 bg-gray-800 rounded-lg">
						<div className="flex flex-col items-center justify-center space-y-4">
							<Image
								src="/no_data.svg"
								alt="Empty State"
								width="200"
								height="200"
							/>
							<p className="text-gray-400 text-lg text-center">
								You don't have any links yet. Get started by{" "}
								<Link
									href={LINKS.DASHBOARD_LINK_NEW}
									className="text-blue-400 hover:underline"
								>
									creating a link
								</Link>
								.
							</p>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

export default Dashboard
