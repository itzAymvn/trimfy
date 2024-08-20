import { failedResponse, ipResponse, successResponse } from "@/types/ip"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function calculateAge(createdAt: Date) {
	const now = new Date().getTime()
	const created = new Date(createdAt).getTime()
	const difference = now - created
	const days = Math.floor(difference / (1000 * 60 * 60 * 24))
	const months = Math.floor(days / 30)
	const years = Math.floor(months / 12)

	if (years > 0) {
		return `${years} year${years > 1 ? "s" : ""} ago`
	} else if (months > 0) {
		return `${months} month${months > 1 ? "s" : ""} ago`
	} else if (days > 0) {
		return `${days} day${days > 1 ? "s" : ""} ago`
	} else {
		return "Today"
	}
}

export const ip2location = async (
	ip: string
): Promise<ipResponse | null> => {
	try {
		const response = await fetch(`http://ip-api.com/json/${ip}?`)

		if (!response.ok) {
			const data = await response.json()
            return data as failedResponse
		}

		const data = await response.json()
		return data as successResponse
	} catch (error) {
		return null
	}
}
