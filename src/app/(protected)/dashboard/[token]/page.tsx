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
	title: "View Link - Trimfy",
	description: "View and manage your link statistics.",
}

const ClickCard = async ({ click }: { click: IClick }) => {
	const location = await ip2location(click.ipAddress!)

	return (
		<div className="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700 hover:border-blue-400 transition-colors flex flex-col-reverse md:flex-row gap-6">
			<div className="flex-1">
				<div className="mb-4">
					<span>User Agent:</span>
					<p className="text-gray-400 text-sm">{click.userAgent}</p>
				</div>
				<div className="mb-4">
					<span>IP Address:</span>
					<p className="text-gray-400 text-sm">{click.ipAddress}</p>
				</div>
				<div className="mb-4">
					<span>Click Time:</span>
					<p className="text-gray-400 text-sm">
						{new Date(click.createdAt).toLocaleString()}
					</p>
				</div>
			</div>
			{location?.status === "success" && (
				<div className="flex-shrink-0 w-full md:w-1/2 min-h-[200px]">
					<Map posix={[location?.lat!, location?.lon!]} />
				</div>
			)}
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
		<div className="min-h-screen bg-gray-900 p-8 md:p-16 text-white">
			<div className="container mx-auto max-w-5xl space-y-8">
				<h1 className="text-4xl font-bold mb-4">
					View and Manage Your Link Statistics
				</h1>

				<div className="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700 mb-8 flex flex-wrap justify-between items-start">
					<div className="flex-1 min-w-[200px]">
						<h2 className="text-3xl font-bold mb-2">{`/${link.token}`}</h2>
						<p className="text-gray-400 text-lg">{link.fullUrl}</p>
					</div>
					<div className="flex-shrink-0 mt-4 sm:mt-0">
						<QrCode
							value={`${process.env.NEXT_PUBLIC_URL}/${link.token}`}
						/>
					</div>
				</div>

				{link.clicks.length > 0 ? (
					<div className="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700">
						<h2 className="text-2xl font-semibold">Clicks</h2>
						<p className="text-gray-400 text-lg mb-4">
							On this link, there have been {link.clicks.length}{" "}
							clicks.
						</p>
						<ul className="flex flex-col gap-4">
							{link.clicks.map((click) => (
								<li key={click.id}>
									<ClickCard click={click} />
								</li>
							))}
						</ul>
					</div>
				) : (
					<div className="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700">
						<h2 className="text-2xl font-semibold mb-4">Clicks</h2>
						<p className="text-gray-400 text-lg">
							<span className="block">
								No clicks yet. Share the link to start tracking.
							</span>
							<span className="block text-blue-400 hover:underline">
								{process.env.NEXT_PUBLIC_URL}/{link.token}
							</span>
						</p>
					</div>
				)}

				{link.clicks.length > 0 && (
					<div className="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700 w-full h-96">
						<h2 className="text-2xl font-semibold mb-4">
							Clicks Over Time
						</h2>
						<ClicksChart clicks={link.clicks} />
					</div>
				)}

				<div className="flex items-center justify-end w-full mt-8">
					<Link
						href={LINKS.DASHBOARD}
						className="bg-blue-400 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-500 transition-colors"
					>
						Back to Dashboard
					</Link>
				</div>
			</div>
		</div>
	)
}

export default LinkPage
