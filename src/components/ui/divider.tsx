import React from "react"

type Props = {
	text?: string
}

const Divider = (props: Props) => {
	return (
		<div className="flex items-center space-x-4">
			<div className="flex-1 h-0.5 bg-gray-800"></div>
			<p className="text-gray-400 font-semibold">{props?.text || "Or"}</p>
			<div className="flex-1 h-0.5 bg-gray-800"></div>
		</div>
	)
}

export default Divider
