"use client"

import { ImCopy } from "react-icons/im"
import { toast } from "sonner"

function CopyButton({ text }: { text: string }) {
	return (
		<button
			aria-label="Copy to clipboard"
			onClick={() => {
				if (!navigator.clipboard) {
					toast.error("Clipboard is not supported")
					return
				} else {
					navigator.clipboard.writeText(text)
					toast.success("Copied to clipboard")
				}
			}}
			className="text-white rounded-lg p-2 flex items-center gap-2"
		>
			<ImCopy className="text-xl" />
		</button>
	)
}

export default CopyButton
