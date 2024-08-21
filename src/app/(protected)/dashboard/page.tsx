import { getUserLinks } from "@/actions/app"
import LinksList from "@/components/ui/linkslist"
import LinksTable from "@/components/ui/linkstable"
import StatsCard from "@/components/ui/statscard"
import LINKS from "@/constants/link"
import { Auth } from "@/lib/lucia"
import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"
import { FiPlusCircle } from "react-icons/fi"

export const metadata: Metadata = {
	title: "Dashboard - Trimfy",
	description: "Manage your links and view statistics.",
}



const Dashboard = async () => {
	const { session, user } = await Auth()

	if (!session) {
		return redirect(LINKS.LOGIN)
	}
	const links = await getUserLinks()

	return (
		<div className="flex min-h-screenitems-start p-8 md:p-16 justify-center text-white">
			<div className="flex flex-col items-start justify-start w-full max-w-5xl space-y-8">
				<h1 className="text-5xl font-bold text-white">Dashboard</h1>
				<p className="text-gray-400 text-lg">
					Welcome back, {user.name}!
				</p>

				<div className="flex flex-wrap gap-4 w-full">
					<StatsCard title="Links" count={links.length} />
					<StatsCard
						title="Clicks"
						count={links.reduce(
							(acc, link) => acc + link.clicks.length,
							0
						)}
					/>
				</div>



				<p className="text-gray-400 text-lg">Here are your links.</p>

				{links.length > 0 ? (
					<>
						<div className="overflow-x-auto w-full hidden md:block">
							<LinksTable links={links} />
						</div>
						<div className="block md:hidden w-full">
							<LinksList links={links} />
						</div>
						<div className="flex items-center justify-end w-full mt-8">
							<Link
								href={LINKS.DASHBOARD_LINK_NEW}
								className="bg-blue-400 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-500 transition-colors"
							>
								<FiPlusCircle className="mr-2" />
								New Link
							</Link>
						</div>
					</>
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
								You don&apos;t have any links yet. Get started
								by{" "}
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
