import LINKS from "@/constants/link"
import prisma from "@/lib/prisma"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { NextRequest, NextResponse } from "next/server"

export const GET = async (
	request: NextRequest,
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
