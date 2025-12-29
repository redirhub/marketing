import { getBaseUrl } from "../utils/constants";

/**
 * Fetches all support articles from the internal API.
 * Uses 'force-cache' for static generation.
 */
export async function fetchSupportArticles() {
  try {
    const res = await fetch(`${getBaseUrl()}/api/support`, {
      cache: "force-cache", // This ensures the page is static
    });

    if (!res.ok) throw new Error("Failed to fetch support articles");
    return await res.json();
  } catch (error) {
    console.error("API Error:", error);
    return [];
  }
}
