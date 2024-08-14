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
