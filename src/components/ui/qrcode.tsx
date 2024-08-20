"use client"

import { useQRCode } from "next-qrcode"

export default function QrCode({ value }: { value: string }) {
	const { Image } = useQRCode()
	return (
		<Image
			text={value}
			options={{
				type: "image/jpeg",
				quality: 0.3,
				errorCorrectionLevel: "M",
				margin: 1,
				scale: 3,
				width: 200,
			}}
		/>
	)
}
