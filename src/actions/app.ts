"use server"

import prisma from "@/lib/prisma"
import { useAuth } from "@/lib/lucia"
import { redirect } from "next/navigation"
import LINKS from "@/constants/link"

export const getUserLinks = async () => {
	const { user } = await useAuth()

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
