import { google } from "@/lib/arctic"
import { lucia } from "@/lib/lucia"
import prisma from "@/lib/prisma"
import { GoogleUser } from "@/types/app"
import { cookies } from "next/headers"

export async function GET(request: Request): Promise<Response> {
	const url = new URL(request.url)

	const code = url.searchParams.get("code")
	const state = url.searchParams.get("state")

	const storedState = cookies().get("google_oauth_state")?.value ?? null
	const codeVerifier =
		cookies().get("google_oauth_code_verifier")?.value ?? null

	if (
		!code ||
		!state ||
		!codeVerifier ||
		!storedState ||
		state !== storedState
	) {
		return new Response(null, {
			status: 302,
			headers: { Location: "/login?error=invalid_request" },
		})
	}

	try {
		const { accessToken } = await google.validateAuthorizationCode(
			code,
			codeVerifier
		)

		const googleResponse = await fetch(
			"https://www.googleapis.com/oauth2/v1/userinfo",
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			}
		)

		const googleUser: GoogleUser = await googleResponse.json()
		const existingUser = await prisma.user.findFirst({
			where: {
				OR: [
					{
						googleId: googleUser.id.toString(),
					},
					{
						email: googleUser.email,
					},
				],
			},
		})

		if (existingUser) {
			if (existingUser.googleId === null) {
				await prisma.user.update({
					where: { id: existingUser.id },
					data: { googleId: googleUser.id.toString() },
				})
			} else if (existingUser.googleId !== googleUser.id.toString()) {
				return new Response(null, {
					status: 302,
					headers: { Location: "/login?error=google_id_mismatch" },
				})
			}

			const session = await lucia.createSession(existingUser.id, {})
			const sessionCookie = lucia.createSessionCookie(session.id)
			cookies().set(
				sessionCookie.name,
				sessionCookie.value,
				sessionCookie.attributes
			)

			return new Response(null, {
				status: 302,
				headers: { Location: "/" },
			})
		} else {
			const newUser = await prisma.user.create({
				data: {
					email: googleUser.email,
					googleId: googleUser.id.toString(),
					name: googleUser.name ?? googleUser.name,
					picture: googleUser.picture,
				},
			})

			const session = await lucia.createSession(newUser.id, {})
			const sessionCookie = lucia.createSessionCookie(session.id)
			cookies().set(
				sessionCookie.name,
				sessionCookie.value,
				sessionCookie.attributes
			)

			return new Response(null, {
				status: 302,
				headers: { Location: "/" },
			})
		}
	} catch (error) {
		return new Response(null, {
			status: 302,
			headers: { Location: "/login?error=google_auth_error" },
		})
	}
}
