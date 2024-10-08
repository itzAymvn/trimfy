import LINKS from "@/constants/link"
import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { NextRequest, NextResponse, userAgent } from "next/server"

export const GET = async (
	request: NextRequest,
	{ params }: { params: { token: string } }
) => {
	const ua = userAgent(request)

	const link = await prisma.link.findUnique({
		where: {
			token: params.token,
		},
	})

	if (!link) {
		return redirect(LINKS.HOME)
	}

	if (ua.isBot) {
		return NextResponse.redirect(link.fullUrl)
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

	revalidatePath(LINKS.DASHBOARD_LINK(link.token))
	return NextResponse.redirect(link.fullUrl)
}
