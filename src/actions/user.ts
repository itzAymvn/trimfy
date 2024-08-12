"use server"

import { SignInFormSchema } from "@/app/(auth)/login/form"
import { SignUpFormSchema } from "@/app/(auth)/register/form"
import { lucia } from "@/lib/lucia"
import prisma from "@/lib/prisma"
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

	redirect("/dashboard")
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

	redirect("/dashboard")
}
export const signOut = async () => {
	const sessionId = cookies().get(lucia.sessionCookieName)?.value!
	await lucia.invalidateSession(sessionId)
	cookies().delete(lucia.sessionCookieName)
	redirect("/")
}
