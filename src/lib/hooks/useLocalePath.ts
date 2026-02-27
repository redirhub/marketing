"use client";

import { useParams } from "next/navigation";

/**
 * Custom hook to generate locale-aware paths
 * @returns A function that takes a path and returns the localized version
 *
 * @example
 * const localePath = useLocalePath();
 * <Link href={localePath("/pricing")}>Pricing</Link>
 */
export function useLocalePath() {
  const params = useParams();
  const locale = (params?.locale as string) || "en";

  return (path: string) => {
    if (locale === "en") {
      return path;
    }

    try {
      // If the path is included with the domain, we need to preserve it
      const url = new URL(path);
      url.pathname = `/${locale}${url.pathname}`;
      return url.toString();
    } catch {
      // If it's a relative path, we can simply prepend the locale
      return `/${locale}${path}`;
    }
  };
}
