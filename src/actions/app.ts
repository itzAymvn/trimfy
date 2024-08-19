"use server"

import prisma from "@/lib/prisma"
import { Auth } from "@/lib/lucia"
import { redirect } from "next/navigation"
import LINKS from "@/constants/link"

export const getUserLinks = async () => {
	const { user } = await Auth()

	if (!user) {
		redirect(LINKS.LOGIN)
	} else {
		const links = await prisma.link.findMany({
			where: {
				userId: user.id,
			},

			include: {
				clicks: true,
			},
		})

		return links ?? null
	}
}

export const getLink = async (token: string) => {
	const { user } = await Auth()

	if (!user) {
		redirect(LINKS.LOGIN)
	} else {
		const link = await prisma.link.findUnique({
			where: {
				token,
				userId: user.id,
			},
			include: {
				clicks: true,
			},
		})

		return link ?? null
	}
}
