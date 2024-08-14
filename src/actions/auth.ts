"use server"

import { SignInFormSchema } from "@/app/(auth)/login/form"
import { SignUpFormSchema } from "@/app/(auth)/register/form"
import LINKS from "@/constants/link"
import { github, google } from "@/lib/arctic"
import { lucia } from "@/lib/lucia"
import prisma from "@/lib/prisma"
import { generateCodeVerifier, generateState } from "arctic"
import bcrypt from "bcryptjs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { z } from "zod"

export const createUser = async (data: z.infer<typeof SignUpFormSchema>) => {
	const { email, name, password, confirmPassword } = data

	try {
		if (password !== confirmPassword) {
			throw new Error("Passwords do not match")
		}

		const existingUser = await prisma.user.findUnique({
			where: { email },
		})

		if (existingUser) {
			throw new Error("User already exists")
		}

		const hashedPassword = await bcrypt.hash(password, 10)

		const user = await prisma.user.create({
			data: {
				email: email.toLowerCase(),
				name: name.toLowerCase(),
				hashedPassword,
			},
		})

		const session = await lucia.createSession(user.id, {})
		const sessionCookie = lucia.createSessionCookie(session.id)
		cookies().set(
			sessionCookie.name,
			sessionCookie.value,
			sessionCookie.attributes
		)
	} catch (error: any) {
		throw new Error(error.message)
	}

	redirect(LINKS.DASHBOARD)
}
export const signIn = async (data: z.infer<typeof SignInFormSchema>) => {
	const { email, password } = data

	try {
		const user = await prisma.user.findUnique({
			where: { email },
		})

		if (!user || !user.hashedPassword) {
			throw new Error("Invalid Credentials")
		}

		const passwordMatch = await bcrypt.compare(
			password,
			user.hashedPassword
		)

		if (!passwordMatch) {
			throw new Error("Invalid Credentials")
		}

		const session = await lucia.createSession(user.id, {})
		const sessionCookie = lucia.createSessionCookie(session.id)
		cookies().set(
			sessionCookie.name,
			sessionCookie.value,
			sessionCookie.attributes
		)
	} catch (error: any) {
		throw new Error(error.message)
	}

	redirect(LINKS.DASHBOARD)
}
export const signOut = async () => {
	const sessionId = cookies().get(lucia.sessionCookieName)?.value!
	await lucia.invalidateSession(sessionId)
	cookies().delete(lucia.sessionCookieName)
	redirect(LINKS.HOME)
}
export const githubSignIn = async () => {
	const state = generateState()
	const url = await github.createAuthorizationURL(state)

	cookies().set("github_oauth_state", state, {
		path: "/",
		secure: process.env.NODE_ENV === "production",
		httpOnly: true,
		maxAge: 60 * 10,
		sameSite: "lax",
	})

	redirect(url.toString())
}

export const googleSignIn = async () => {
	const state = generateState()
	const codeVerifier = generateCodeVerifier()
	const options = {
		scopes: ["email", "profile"],
	}

	const url = await google.createAuthorizationURL(
		state,
		codeVerifier,
		options
	)

	cookies().set("google_oauth_state", state, {
		path: "/",
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		maxAge: 60 * 10,
		sameSite: "lax",
	})
	cookies().set("google_oauth_code_verifier", codeVerifier, {
		path: "/",
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		maxAge: 60 * 10,
		sameSite: "lax",
	})

	redirect(url.toString())
}
