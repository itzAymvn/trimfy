import LINKS from "@/constants/link"
import { calculateAge } from "@/lib/utils"
import { ILink } from "@/types/app"
import Link from "next/link"
import { FiClock } from "react-icons/fi"
import CopyButton from "./copybnt"

const LinksTable = ({ links }: { links: ILink[] }) => (
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
				<th className="py-3 px-6 text-left border-b border-gray-700">
					Share
				</th>
			</tr>
		</thead>
		<tbody>
			{links.map((link, index) => (
				<tr
					key={link.id}
					className={`hover:bg-gray-700 ${
						index % 2 === 0 ? "bg-gray-800" : "bg-gray-850"
					}`}
				>
					<td className="py-3 px-6 border-b border-gray-700">
						<Link
							href={LINKS.DASHBOARD_LINK(link.token)}
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
					<td className="py-3 px-6 text-gray-400 border-b border-gray-700">
						<CopyButton
							text={`${process.env.NEXT_PUBLIC_URL}/${link.token}`}
						/>
					</td>
				</tr>
			))}
		</tbody>
	</table>
)

export default LinksTable
