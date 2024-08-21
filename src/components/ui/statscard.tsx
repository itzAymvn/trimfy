const StatsCard = ({
	title,
	count,
}: {
	title: string
	count: number
}): JSX.Element => (
	<div className="relative bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700 flex-1 min-w-[250px] overflow-hidden">
		{/* SVG Background Layer */}
		<div
			className="absolute inset-0 bg-no-repeat bg-center bg-cover opacity-10 pointer-events-none"
			style={{ backgroundImage: "url('    /bg.svg')" }}
		></div>
		{/* Content */}
		<div className="relative z-10">
			<p className="text-gray-400 text-2xl mb-2">{title}</p>
			<div className="flex items-baseline space-x-2">
				<span className="text-4xl font-semibold">{count}</span>
				<span className="text-sm text-gray-400">total</span>
			</div>
		</div>
	</div>
)

export default StatsCard
