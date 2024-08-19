import { getLink } from "@/actions/app"
import LINKS from "@/constants/link"
import { Auth } from "@/lib/lucia"
import { IClick } from "@/types/app"
import { Metadata } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
	title: "View Link - Trimfy",
	description: "View and manage your link statistics.",
}

const ClickCard = ({ click }: { click: IClick }) => (
	<div className="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700">
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
)

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
				<div className="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700 mb-8">
					<h2 className="text-3xl font-bold mb-2">{`/${link.token}`}</h2>
					<p className="text-gray-400 text-lg">{link.fullUrl}</p>
				</div>

				{link.clicks.length > 0 ? (
					<div className="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700">
						<h2 className="text-2xl font-semibold">Clicks</h2>
						<p className="text-gray-400 text-lg mb-4">
							On this link, there have been {link.clicks.length}{" "}
							clicks.
						</p>
						<ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
