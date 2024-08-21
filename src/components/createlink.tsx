"use client"

import { shortenLink } from "@/actions/app"
import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"
import { CgSpinner } from "react-icons/cg"
import { toast } from "sonner"
import { z } from "zod"

const PUBLIC_URL = process.env.NEXT_PUBLIC_URL

const CreateLinkSchema = z
	.object({
		fullUrl: z.string().url({ message: "Please enter a valid URL" }),
	})
	.refine(
		(data) => {
			return !data.fullUrl
				.toLowerCase()
				.startsWith(PUBLIC_URL!.toLowerCase())
		},
		{
			message: "You cannot shorten links that belong to this service",
			path: ["fullUrl"],
		}
	)

function CreateLinkForm() {
	const {
		register,
		handleSubmit,
		formState: { isSubmitting, errors },
	} = useForm<z.infer<typeof CreateLinkSchema>>({
		resolver: zodResolver(CreateLinkSchema),
		defaultValues: {
			fullUrl: "https://",
		},
	})

	const onSubmit: SubmitHandler<z.infer<typeof CreateLinkSchema>> = async (
		data
	) => {
		if (isSubmitting) return
		new Promise((resolve) => setTimeout(resolve, 3000))
		try {
			const r = await shortenLink(data.fullUrl)
			if (r) {
				toast.success("Link shortened successfully")
			} else {
				toast.error("Failed to shorten link")
			}
		} catch (error) {
			toast.error("Failed to shorten link")
		}
	}

	return (
		<div className="w-full">
			<p className="text-gray-400 text-lg mb-2">Create a new link.</p>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="w-full flex flex-col gap-4"
			>
				<div className="flex w-full bg-gray-800 rounded-lg overflow-hidden">
					<input
						className="p-4 outline-none bg-transparent flex-grow"
						type="text"
						{...register("fullUrl")}
						placeholder="Enter a URL to shorten"
					/>
					<button
						className="bg-blue-600 text-white px-4 py-2 flex-shrink-0 hover:bg-blue-700 transition-colors"
						type="submit"
						disabled={isSubmitting}
					>
						{!isSubmitting ? (
							<span>Shorten</span>
						) : (
							<div className="flex items-center gap-2">
								<CgSpinner className="animate-spin" />
								<span>Shortening</span>
							</div>
						)}
					</button>
				</div>
				{errors.fullUrl && (
					<p className="text-red-500 text-sm">
						{errors.fullUrl.message}
					</p>
				)}
			</form>
		</div>
	)
}

export default CreateLinkForm
