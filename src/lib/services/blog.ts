import { getBaseUrl } from "../utils/constants";

/**
 * Fetches blog posts from the internal API.
 */
export async function fetchBlogPosts() {
  try {
    const res = await fetch(`${getBaseUrl()}/api/blogs`, {
      cache: "force-cache",
    });

    if (!res.ok) throw new Error("Failed to fetch blog posts");
    return await res.json();
  } catch (error) {
    console.error("API Error:", error);
    return [];
  }
}
