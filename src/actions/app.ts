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
