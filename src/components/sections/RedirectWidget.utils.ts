import { ApiResponse } from "@/app/api/redirhub";

/**
 * Extracts and parses error messages from API responses.
 * Handles HTTP error responses that may contain JSON error objects.
 *
 * @param response - The API response object
 * @returns A user-friendly error message string
 */
export function parseApiErrorMessage(response: ApiResponse): string {
  let errorMessage =
    response.error || response.message || "Unknown API Error";

  try {
    // Check if error message contains JSON embedded in HTTP error format
    const jsonMatch = errorMessage.match(/HTTP Error \d+:\s*(\{.*\})/);
    if (jsonMatch && jsonMatch[1]) {
      const errorData = JSON.parse(jsonMatch[1]);
      errorMessage = errorData.message || errorMessage;
    }
  } catch (e) {
    // If parsing fails, use the original error message
    console.error("Error parsing error message:", e);
  }

  return errorMessage;
}

/**
 * Extracts success message from nested API response structure.
 * Handles varying response formats from the RedirHub API.
 *
 * @param response - The API response object
 * @returns The success message or a default success message
 */
export function parseApiSuccessMessage(response: ApiResponse): string {
  return (
    response.data?.message || response.data?.data?.message || "Success!"
  );
}
