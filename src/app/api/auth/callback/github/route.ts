import { github } from "@/lib/arctic"
import { lucia } from "@/lib/lucia"
import prisma from "@/lib/prisma"
import { GitHubUser } from "@/types/app"
import { cookies } from "next/headers"

export async function GET(request: Request): Promise<Response> {
	const url = new URL(request.url)

	const code = url.searchParams.get("code")
	const state = url.searchParams.get("state")

	const storedState = cookies().get("github_oauth_state")?.value ?? null

	if (!code || !state || !storedState || state !== storedState) {
		return new Response(null, {
			status: 302,
			headers: { Location: "/login?error=invalid_request" },
		})
	}

	try {
		const tokens = await github.validateAuthorizationCode(code)
		const githubUserResponse = await fetch("https://api.github.com/user", {
			headers: {
				Authorization: `Bearer ${tokens.accessToken}`,
			},
		})
		const githubUser: GitHubUser = await githubUserResponse.json()
		const existingUser = await prisma.user.findFirst({
			where: {
				OR: [
					{
						githubId: githubUser.id.toString(),
					},
					{
						email: githubUser.email,
					},
				],
			},
		})

		if (existingUser) {
			if (existingUser.githubId === null) {
				await prisma.user.update({
					where: { id: existingUser.id },
					data: { githubId: githubUser.id.toString() },
				})
			} else if (existingUser.githubId !== githubUser.id.toString()) {
				return new Response(null, {
					status: 302,
					headers: { Location: "/login?error=github_id_mismatch" },
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
					email: githubUser.email,
					githubId: githubUser.id.toString(),
					name: githubUser.name ?? githubUser.login,
					picture: githubUser.avatar_url,
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
	} catch (e) {
		return new Response(null, {
			status: 302,
			headers: { Location: "/login?error=github_auth_error" },
		})
	}
}
