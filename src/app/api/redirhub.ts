const API_URL =
  process.env.API_BASE_URL || "https://api.redirhub.com/json/wp-ajax";

export interface ApiResponse {
  success: boolean;
  data?: any;
  message?: string;
  error?: string;
}
interface CreateRedirectParams {
  from: string;
  to: string;
}
export interface ShortenUrlParams {
  domain: "system" | "custom" | string;
  url: string;
}
interface CheckRedirectParams {
  checkUrl: string;
  secondaryUrl?: string;
}

async function callRedirHubApi(
  formDataFields: Record<string, string>,
  product: "redirect" | "shorten" | "check"
): Promise<ApiResponse> {
  const formData = new FormData();

  formData.append("form_fields[product]", product);

  for (const key in formDataFields) {
    if (formDataFields.hasOwnProperty(key)) {
      formData.append(`form_fields[${key}]`, formDataFields[key]);
    }
  }

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      // Handle HTTP errors (e.g., 404, 500)
      const errorText = await response.text();
      return {
        success: false,
        error: `HTTP Error ${response.status}: ${errorText}`,
      };
    }

    // Attempt to parse JSON response
    const data = await response.json();

    // Assuming the API returns a structure like { success: boolean, data: ... }
    return { success: data.success, data: data, message: data.message };
  } catch (error) {
    console.error(`API Call Error (${product}):`, error);
    return {
      success: false,
      error: `Network or parsing error: ${error instanceof Error ? error.message : String(error)}`,
    };
  }
}

export async function createRedirect({
  from,
  to,
}: CreateRedirectParams): Promise<ApiResponse> {
  return callRedirHubApi(
    {
      from: from,
      to: to,
    },
    "redirect"
  );
}

export async function shortenUrl({
  domain,
  url,
}: ShortenUrlParams): Promise<ApiResponse> {
  return callRedirHubApi(
    {
      domain: domain,
      url: url,
    },
    "shorten"
  );
}

export async function checkRedirect({
  checkUrl,
  secondaryUrl,
}: CheckRedirectParams): Promise<ApiResponse> {
  const fields: Record<string, string> = {
    action: checkUrl,
  };

  if (secondaryUrl) {
    fields.url = secondaryUrl;
  }

  return callRedirHubApi(fields, "check");
}
