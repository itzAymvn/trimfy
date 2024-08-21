import { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{
			url: "https://trimfy.vercel.app/",
			lastModified: new Date().toISOString(),
			changeFrequency: "monthly",
			priority: 1,
		},
		{
			url: "https://trimfy.vercel.app/login",
			lastModified: new Date().toISOString(),
			changeFrequency: "monthly",
			priority: 1,
		},
		{
			url: "https://trimfy.vercel.app/register",
			lastModified: new Date().toISOString(),
			changeFrequency: "monthly",
			priority: 1,
		},
	]
}
