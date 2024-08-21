"use server"

import prisma from "@/lib/prisma"
import { Auth } from "@/lib/lucia"
import { redirect } from "next/navigation"
import LINKS from "@/constants/link"
import { revalidatePath } from "next/cache"

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

			orderBy: {
				createdAt: "desc",
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

export const shortenLink = async (fullUrl: string) => {
	try {
		const { user } = await Auth()

		if (!user) {
			redirect(LINKS.LOGIN)
		} else {
			const link = await prisma.link.create({
				data: {
					token: Math.random().toString(36).substring(7),
					fullUrl,
					userId: user.id,
				},
			})

			revalidatePath(LINKS.DASHBOARD)
			return link ?? null
		}
	} catch (error) {
		return null
	}
}
