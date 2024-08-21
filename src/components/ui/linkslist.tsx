import LINKS from "@/constants/link"
import { calculateAge } from "@/lib/utils"
import { ILink } from "@/types/app"
import Link from "next/link"
import { FiClock } from "react-icons/fi"
import CopyButton from "./copybnt"

const LinksList = ({ links }: { links: ILink[] }) => (
	<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 w-full">
		{links.map((link) => (
			<div
				key={link.id}
				className="bg-gray-800 rounded-lg shadow-lg p-4 hover:bg-gray-700 w-full transition-colors"
			>
				<p className="text-lg font-bold text-blue-400 hover:underline flex items-center gap-2">
					<CopyButton
						text={`${process.env.NEXT_PUBLIC_URL}/${link.token}`}
					/>
					<Link href={LINKS.DASHBOARD_LINK(link.token)}>
						/{link.token}
					</Link>
				</p>
				<p className="text-gray-400 truncate">{link.fullUrl}</p>
				<div className="flex items-center justify-between mt-2">
					<p className="text-gray-400 flex items-center">
						<FiClock className="inline-block mr-1" />
						{calculateAge(link.createdAt)}
					</p>
					<p className="text-gray-400 flex items-center">
						<FiClock className="inline-block mr-1" />
						{link.clicks.length} clicks
					</p>
				</div>
			</div>
		))}
	</div>
)

export default LinksList
