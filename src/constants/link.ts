// Links that does not require any dynamic data
const STATIC_LINKS = {
	HOME: "/",
	LOGIN: "/login",
	REGISTER: "/register",
	DASHBOARD: "/dashboard",
	DASHBOARD_LINK_NEW: "/dashboard/link/new",
}

// Links that require dynamic data
const DYNAMIC_LINKS = {
	DASHBOARD_LINK: (token: string) => `/dashboard/${token}`,
}

// Combine both static and dynamic links
const LINKS = {
	...STATIC_LINKS,
	...DYNAMIC_LINKS,
}

// Export the combined links
export default LINKS
