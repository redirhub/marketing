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
