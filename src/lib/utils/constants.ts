/**
 * Get the application name from environment variables
 */
export const getAppName = () => process.env.NEXT_PUBLIC_SITE_NAME || "RedirHub";

/**
 * Get the dashboard base URL from environment variables
 */
export const getDashboardBase = () =>
  process.env.NEXT_PUBLIC_DASHBOARD_BASE || "https://app.redirhub.com";

// export const getBaseUrl = () =>
//   process.env.SITE_URL || "https://marketing-mpiebw5fx-redirhub.vercel.app/";
export const getBaseUrl = () =>
  "https://marketing-mpiebw5fx-redirhub.vercel.app/";

export const SOCIAL_HANDLE = process.env.NEXT_PUBLIC_SOCIAL_HANDLE || "redirhub";
export const URL_API_DEV = process.env.NEXT_PUBLIC_URL_API_DEV || "https://dev.redirhub.com";
