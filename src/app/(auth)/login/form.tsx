"use client"

import { z } from "zod"
import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ImSpinner2 } from "react-icons/im"
import { signIn } from "@/actions/auth"
import { toast } from "sonner"

export const SignInFormSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8, "Password must be at least 8 characters"),
})

const SignInForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<z.infer<typeof SignInFormSchema>>({
		resolver: zodResolver(SignInFormSchema),
	})

	const onSubmit: SubmitHandler<z.infer<typeof SignInFormSchema>> = async (
		data
	) => {
		try {
			await signIn(data)
		} catch (error: any) {
			toast.error(error.message)
		}
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
			</div>

			<button
				type="submit"
				disabled={isSubmitting}
				className="bg-white p-4 rounded-md w-full hover:bg-gray-200 text-black font-semibold"
			>
				{isSubmitting && (
					<ImSpinner2 className="animate-spin inline-block mr-2" />
				)}
				Sign In
			</button>

			{errors.root && (
				<p className="text-red-500 text-sm">{errors.root.message}</p>
			)}
		</form>
	)
}

export default SignInForm
