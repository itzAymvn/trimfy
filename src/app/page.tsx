import Image from "next/image"
import Link from "next/link"
import { FaBolt, FaInfoCircle, FaLink } from "react-icons/fa"
import { FaShield } from "react-icons/fa6"
import { IoIosSettings } from "react-icons/io"
import HeroIcon from "./../../public/hero-icon.svg"
import { Metadata } from "next"

export const metadata: Metadata = {
	title: "Trimfy",
	description:
		"Your powerful URL shortener to create custom, branded links to share across the web.",
}

const Homepage = () => {
	return (
		<div className="flex min-h-[100dvh] flex-col">
			<main className="flex-1">
				<section className="bg-gray-900 py-12 sm:py-24 lg:py-32">
					<div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
						<div className="grid gap-8 lg:grid-cols-2">
							<div className="space-y-4">
								<h1 className="text-4xl font-bold tracking-tight text-gray-100 sm:text-5xl lg:text-6xl">
									Shorten your links, expand your reach.
								</h1>
								<p className="text-lg text-gray-100">
									Our powerful URL shortener helps you create
									custom, branded links to share across the
									web.
								</p>
								<div className="mt-8">
									<Link
										className="text-gray-900 font-semibold bg-gray-200 p-4 mt-4 rounded-md hover:opacity-90"
										href={"/register"}
									>
										Get Started
									</Link>
								</div>
							</div>
							<div className="flex justify-center">
								<Image
									src={HeroIcon}
									width="500"
									height="400"
									alt="Hero"
									className="rounded-lg object-cover"
									style={{
										aspectRatio: "500/400",
										objectFit: "cover",
									}}
								/>
							</div>
						</div>
					</div>
				</section>
				<section className="bg-muted py-12 sm:py-24 lg:py-32">
					<div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
						<div className="grid gap-8 lg:grid-cols-3">
							<div className="space-y-4">
								<FaLink className="h-8 w-8 text-primary" />
								<h3 className="text-2xl font-bold">
									Custom Domains
								</h3>
								<p className="text-gray-700">
									Brand your links with your own custom domain
									for a professional look.
								</p>
							</div>
							<div className="space-y-4">
								<FaInfoCircle className="h-8 w-8 text-primary" />
								<h3 className="text-2xl font-bold">
									Advanced Analytics
								</h3>
								<p className="text-gray-700">
									Track clicks, views, and other key metrics
									for your shortened links.
								</p>
							</div>
							<div className="space-y-4">
								<FaBolt className="h-8 w-8 text-primary" />
								<h3 className="text-2xl font-bold">
									Easy to Use
								</h3>
								<p className="text-gray-700">
									Our platform is simple and intuitive, making
									it easy to shorten and share links.
								</p>
							</div>
						</div>
					</div>
				</section>
				<section className="bg-background py-12 sm:py-24 lg:py-32">
					<div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
						<div className="space-y-4 text-center">
							<h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl lg:text-5xl">
								Why Choose Trimfy
							</h2>
							<p className="text-lg text-gray-700">
								Our platform offers a range of features to help
								you streamline your online presence.
							</p>
						</div>
						<div className="mt-8 grid gap-8 lg:grid-cols-3">
							<div className="space-y-4">
								<FaBolt className="h-8 w-8 text-primary" />
								<h3 className="text-2xl font-bold">
									Fast and Reliable
								</h3>
								<p className="text-gray-700">
									Our URL shortening service is lightning-fast
									and highly reliable, ensuring your links are
									always accessible.
								</p>
							</div>
							<div className="space-y-4">
								<IoIosSettings className="h-8 w-8 text-primary" />
								<h3 className="text-2xl font-bold">
									Customizable
								</h3>
								<p className="text-gray-700">
									Personalize your links with your own custom
									domain and branding for a professional look.
								</p>
							</div>
							<div className="space-y-4">
								<FaShield className="h-8 w-8 text-primary" />
								<h3 className="text-2xl font-bold">Secure</h3>
								<p className="text-gray-700">
									We take security seriously, ensuring your
									links and data are protected from
									unauthorized access.
								</p>
							</div>
						</div>
					</div>
				</section>
				<section className="bg-muted py-12 sm:py-24 lg:py-32">
					<div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
						<div className="space-y-4 text-center">
							<h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl lg:text-5xl">
								What are you waiting for?
							</h2>
							<p className="text-lg text-gray-700">
								Join us today and start shortening your links to
								expand your reach.
							</p>
						</div>
					</div>
				</section>
			</main>
		</div>
	)
}

export default Homepage
