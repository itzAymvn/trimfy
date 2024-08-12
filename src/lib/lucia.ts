import { Lucia } from "lucia"
import { PrismaAdapter } from "@lucia-auth/adapter-prisma"
import prisma from "./prisma"
import { cookies } from "next/headers"
import { cache } from "react"
import type { Session, User } from "lucia"

const adapter = new PrismaAdapter(prisma.session, prisma.user)

declare module "lucia" {
	interface Register {
		Lucia: typeof lucia
		DatabaseUserAttributes: DatabaseUserAttributes
	}
}

interface DatabaseUserAttributes {
	email: string
	picture?: string
	links?: any[]
}

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		name: "auth",
		expires: false,
		attributes: {
			secure: process.env.NODE_ENV === "production",
		},
	},

	getUserAttributes: (attributes) => {
		return {
			email: attributes.email,
			picture: attributes.picture,
			links: attributes.links,
		}
	},
})

export const useAuth = cache(
	async (): Promise<
		{ user: User; session: Session } | { user: null; session: null }
	> => {
		const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null
		if (!sessionId) {
			return {
				user: null,
				session: null,
			}
		}

		const result = await lucia.validateSession(sessionId)
		try {
			if (result.session && result.session.fresh) {
				const sessionCookie = lucia.createSessionCookie(
					result.session.id
				)
				cookies().set(
					sessionCookie.name,
					sessionCookie.value,
					sessionCookie.attributes
				)
			}
			if (!result.session) {
				const sessionCookie = lucia.createBlankSessionCookie()
				cookies().set(
					sessionCookie.name,
					sessionCookie.value,
					sessionCookie.attributes
				)
			}
		} catch {}
		return result
	}
)
