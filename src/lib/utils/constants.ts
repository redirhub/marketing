/**
 * Get the application name from environment variables
 */
export const getAppName = () => process.env.NEXT_PUBLIC_SITE_NAME || 'RedirHub';

/**
 * Get the dashboard base URL from environment variables
 */
export const getDashboardBase = () => process.env.NEXT_PUBLIC_DASHBOARD_BASE || 'https://app.redirhub.com';
