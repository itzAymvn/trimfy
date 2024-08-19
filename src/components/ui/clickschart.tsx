"use client"

import { Click } from "@prisma/client"
import {
	Area,
	AreaChart,
	CartesianGrid,
	Legend,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts"

export default function ClicksChart({ clicks }: { clicks: Click[] }) {
	const data = clicks.reduce((acc, click) => {
		const date = new Date(click.createdAt).toLocaleDateString()
		const index = acc.findIndex((item) => item.date === date)
		if (index === -1) {
			acc.push({ date, count: 1 })
		} else {
			acc[index].count++
		}
		return acc
	}, [] as { date: string; count: number }[])

	return (
		<ResponsiveContainer width="90%" height="90%">
			<AreaChart data={data}>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis
					dataKey="date"
					tickFormatter={(tick) => {
						const date = new Date(tick)
						return `${date.getMonth() + 1}/${date.getDate()}`
					}}
				/>
				<YAxis
					tickFormatter={(tick) => tick.toFixed(0)}
					domain={[0, "dataMax"]}
					allowDecimals={false}
				/>
				<Tooltip content={<CustomTooltip />} />
				<Area
					type="monotone"
					dataKey="count"
					stroke="#8884d8"
					fill="#8884d8"
				/>
			</AreaChart>
		</ResponsiveContainer>
	)
}

const CustomTooltip = ({ active, payload, label }: any) => {
	if (active && payload && payload.length) {
		const clicks = payload[0].value
		return (
			<div className="bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700">
				<p className="text-gray-400 text-sm">
					{`${label}: ${clicks} click${clicks === 1 ? "" : "s"}`}
				</p>
			</div>
		)
	}

	return null
}
