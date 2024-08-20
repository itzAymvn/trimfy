export type failedResponse = {
	status: "fail"
	message: string
	query: string
}

export type successResponse = {
	status: "success"
	country: string
	countryCode: string
	region: string
	regionName: string
	city: string
	zip: string
	lat: number
	lon: number
	timezone: string
	isp: string
	org: string
	as: string
	query: string
}

export type ipResponse = failedResponse | successResponse
