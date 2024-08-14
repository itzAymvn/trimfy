import { NextApiRequest } from "next"
import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"
import { notFound, redirect } from "next/navigation"
import LINKS from "@/constants/link"
import { headers } from "next/headers"

export const GET = async (
	request: NextApiRequest,
	{ params }: { params: { token: string } }
) => {
	const link = await prisma.link.findUnique({
		where: {
			token: params.token,
		},
	})

	if (!link) {
		return redirect(LINKS.HOME)
	}

	const headersList = headers()
	const ip = headersList.get("x-forwarded-for")

	await prisma.link.update({
		where: {
			id: link.id,
		},
		data: {
			clicks: {
				create: {
					userId: link.userId!,
					ipAddress: ip,
					userAgent: headersList.get("user-agent"),
				},
			},
		},
	})

	return NextResponse.redirect(link.fullUrl)
}
