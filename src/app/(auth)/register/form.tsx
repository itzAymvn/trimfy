"use client"

import { z } from "zod"
import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ImSpinner2 } from "react-icons/im"

export const SignUpFormSchema = z
	.object({
		email: z.string().email(),
		name: z.string().min(3, "Name must be at least 3 characters"),
		password: z.string().min(8, "Password must be at least 8 characters"),
		confirmPassword: z
			.string()
			.min(8, "Password must be at least 8 characters"),
	})
	.refine((data) => data.password === data.confirmPassword, {
		path: ["confirmPassword"],
		message: "Passwords do not match",
	})

const SignUpForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<z.infer<typeof SignUpFormSchema>>({
		resolver: zodResolver(SignUpFormSchema),
	})

	const onSubmit: SubmitHandler<z.infer<typeof SignUpFormSchema>> = async (
		data
	) => {
		if (isSubmitting) return
		await new Promise((resolve) => setTimeout(resolve, 1000))
	}

	return (
		<form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
			<div className="space-y-2 mb-4">
				<div className="space-y-2">
					<label htmlFor="email" className="block text-gray-400">
						Email
					</label>
					<input
						type="email"
						id="email"
						{...register("email")}
						placeholder="Enter your email"
						className="bg-transparent p-4 rounded-md w-full border border-gray-600 outline-none focus:ring-2 focus:ring-gray-500"
					/>

					{errors.email && (
						<p className="text-red-500 text-sm">
							{errors.email.message}
						</p>
					)}
				</div>

				<div className="space-y-2">
					<label htmlFor="name" className="block text-gray-400">
						Name
					</label>
					<input
						type="text"
						id="name"
						{...register("name")}
						placeholder="Enter your name"
						className="bg-transparent p-4 rounded-md w-full border border-gray-600 outline-none focus:ring-2 focus:ring-gray-500"
					/>

					{errors.name && (
						<p className="text-red-500 text-sm">
							{errors.name.message}
						</p>
					)}
				</div>

				<div className="space-y-2">
					<label htmlFor="password" className="block text-gray-400">
						Password
					</label>
					<input
						type="password"
						id="password"
						{...register("password")}
						placeholder="Enter your password"
						className="bg-transparent p-4 rounded-md w-full border border-gray-600 outline-none focus:ring-2 focus:ring-gray-500"
					/>

					{errors.password && (
						<p className="text-red-500 text-sm">
							{errors.password.message}
						</p>
					)}
				</div>

				<div className="space-y-2">
					<label
						htmlFor="confirmPassword"
						className="block text-gray-400"
					>
						Confirm Password
					</label>
					<input
						type="password"
						id="confirmPassword"
						{...register("confirmPassword")}
						placeholder="Confirm your password"
						className="bg-transparent p-4 rounded-md w-full border border-gray-600 outline-none focus:ring-2 focus:ring-gray-500"
					/>

					{errors.confirmPassword && (
						<p className="text-red-500 text-sm">
							{errors.confirmPassword.message}
						</p>
					)}
				</div>
			</div>

			<button
				type="submit"
				disabled={isSubmitting}
				className="bg-white p-4 rounded-md w-full hover:bg-gray-200 text-black font-semibold"
			>
				{isSubmitting && (
					<ImSpinner2 className="animate-spin inline-block mr-2" />
				)}
				Sign Up
			</button>

			{errors.root && (
				<p className="text-red-500 text-sm">{errors.root.message}</p>
			)}
		</form>
	)
}

export default SignUpForm
