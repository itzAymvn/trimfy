import { getLink } from "@/actions/app"
import ClicksChart from "@/components/ui/clickschart"
import Map from "@/components/ui/map"
import QrCode from "@/components/ui/qrcode"
import LINKS from "@/constants/link"
import { Auth } from "@/lib/lucia"
import { ip2location } from "@/lib/utils"
import { IClick } from "@/types/app"
import { Metadata } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
	title: "Link Analytics - Trimfy",
	description: "Detailed view and management of your link's performance.",
}

const ClickCard = async ({ click }: { click: IClick }) => {
	const location = await ip2location(click.ipAddress!)

	return (
		<div className="bg-gray-900 p-4 rounded-lg shadow hover:shadow-lg transition-all flex flex-col md:flex-row gap-6 relative group">
			<div className="flex-1">
				<div className="mb-3">
					<span className="text-sm font-semibold text-gray-300">
						User Agent:
					</span>
					<p className="text-gray-400 text-sm">{click.userAgent}</p>
				</div>
				<div className="mb-3">
					<span className="text-sm font-semibold text-gray-300">
						IP Address:
					</span>
					<p className="text-gray-400 text-sm">{click.ipAddress}</p>
				</div>
				{location?.status === "success" && (
					<div className="mb-3">
						<span className="text-sm font-semibold text-gray-300">
							Country / City:
						</span>
						<p className="text-gray-400 text-sm">
							{location.country} / {location.city}
						</p>
					</div>
				)}
				<div className="mb-3">
					<span className="text-sm font-semibold text-gray-300">
						Click Time:
					</span>
					<p className="text-gray-400 text-sm">
						{new Date(click.createdAt).toLocaleString()}
					</p>
				</div>
			</div>
			{location?.status === "success" && (
				<div className="w-full md:w-1/3 min-h-[200px] flex items-center justify-center relative">
					<Map posix={[location?.lat!, location?.lon!]} />
				</div>
			)}
			{/* Colored Section with Hover Effect */}
			<div className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-blue-500 to-blue-400 rounded-l-sm transition-all duration-300 ease-in-out group-hover:w-0"></div>
		</div>
	)
}

const LinkPage = async ({ params }: { params: { token: string } }) => {
	const { session } = await Auth()
	if (!session) {
		return redirect(LINKS.LOGIN)
	}

	const link = await getLink(params.token)
	if (!link) {
		return redirect(LINKS.DASHBOARD)
	}

	return (
		<div className="min-h-screen p-8 text-gray-100 flex justify-center items-center">
			<div className="max-w-6xl space-y-12 sm:space-y-16 sm:mx-3">
				{/* Header Section */}
				<div className="flex flex-col md:flex-row justify-between items-start md:items-center">
					<h1 className="text-5xl font-extrabold text-blue-400">
						Link Analytics
					</h1>
					<Link
						href={LINKS.DASHBOARD}
						className="mt-6 md:mt-0 bg-blue-500 text-white px-6 py-2 rounded-full shadow hover:bg-blue-600 transition"
					>
						Back to Dashboard
					</Link>
				</div>

				{/* Main Link Information */}
				<div className="p-8 rounded-lg shadow-lg border bg-gray-800 border-gray-800 flex flex-col md:flex-row items-start gap-8">
					<div className="flex-1 flex-col space-y-4">
						<h2 className="text-4xl font-bold text-white">{`/${link.token}`}</h2>
						<p className="text-lg text-gray-400 break-words">
							{link.fullUrl}
						</p>
						<div className="bg-gray-900 p-4 rounded-2xl">
							<p className="text-sm text-gray-400">
								Created:{" "}
								{new Date(link.createdAt).toLocaleString()}
							</p>
							<p className="text-sm text-gray-400">
								Last clicked:{" "}
								{new Date(
									link.clicks[
										link.clicks.length - 1
									].createdAt
								).toLocaleString()}
							</p>
						</div>
					</div>
					<div className="w-full md:w-auto">
						<QrCode
							value={`${process.env.NEXT_PUBLIC_URL}/${link.token}`}
						/>
					</div>
				</div>

				{/* Clicks Section */}
				{link.clicks.length > 0 ? (
					<>
						<div className="p-8 rounded-lg bg-gray-800 shadow-lg border border-gray-800">
							<h2 className="text-3xl font-semibold mb-6">
								Clicks
							</h2>
							<p className="text-lg text-gray-400 mb-8">
								This link has been clicked{" "}
								<span className="text-white">
									{link.clicks.length}
								</span>{" "}
								times.
							</p>
							<ul className="space-y-6">
								{link.clicks.map((click) => (
									<li key={click.id}>
										<ClickCard click={click} />
									</li>
								))}
							</ul>
						</div>

						{/* Clicks Chart */}
						<div className="p-8 rounded-lg shadow-lg bg-gray-800 border border-gray-800">
							<h2 className="text-3xl font-semibold mb-6">
								Clicks Over Time
							</h2>
							<div className="w-full h-96">
								<ClicksChart clicks={link.clicks} />
							</div>
						</div>
					</>
				) : (
					<div className="p-8 rounded-lg shadow-lg border bg-gray-800 border-gray-800 text-center">
						<h2 className="text-3xl font-semibold mb-4">Clicks</h2>
						<p className="text-lg text-gray-400">
							No clicks yet. Share the link to start tracking.
							<br />
							<span className="block text-blue-500 hover:underline mt-4">
								{process.env.NEXT_PUBLIC_URL}/{link.token}
							</span>
						</p>
					</div>
				)}
			</div>
		</div>
	)
}

export default LinkPage
