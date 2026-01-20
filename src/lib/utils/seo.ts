/**
 * SEO utility functions for generating canonical URLs and hreflang alternates
 */

/**
 * Builds a canonical URL for a given locale and path
 *
 * @param locale - The current locale (e.g., 'en', 'es', 'de')
 * @param path - The path without locale prefix (e.g., '/blog/my-post')
 * @returns Absolute canonical URL
 *
 * @example
 * buildCanonicalUrl('en', '/blog/my-post') // https://findredirect.com/blog/my-post
 * buildCanonicalUrl('es', '/blog/my-post') // https://findredirect.com/es/blog/my-post
 */
export function buildCanonicalUrl(locale: string, path: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || ''

  // English (default locale) doesn't have a prefix
  if (locale === 'en') {
    return `${baseUrl}${path}`
  }

  // All other locales include the locale prefix
  return `${baseUrl}/${locale}${path}`
}

/**
 * Builds hreflang alternates from translations fetched from CMS
 *
 * @param translations - Array of translation objects from Sanity
 * @param basePath - Base path for the content type (e.g., '/blog', '/support')
 * @returns Object with languages property for Next.js metadata
 *
 * @example
 * buildHreflangAlternates(translations, '/blog')
 * // Returns: { languages: { 'en': '/blog/my-post', 'es': '/es/blog/my-post', 'x-default': '/blog/my-post' } }
 */
export function buildHreflangAlternates(
  translations: Array<{ locale: string; slug: { current: string } }>,
  basePath: string
) {
  const languages: Record<string, string> = {}

  translations.forEach((t) => {
    const path = `${basePath}/${t.slug.current}`

    if (t.locale === 'en') {
      languages['en'] = path
      // x-default should always point to the English version
      languages['x-default'] = path
    } else {
      languages[t.locale] = `/${t.locale}${path}`
    }
  })

  return { languages }
}

/**
 * Builds hreflang alternates for static pages that exist in all locales
 * (e.g., home page, blog listing, support listing)
 *
 * @param locales - Array of all available locale codes
 * @param basePath - Base path for the page (e.g., '/', '/blog', '/support')
 * @returns Object with languages property for Next.js metadata
 *
 * @example
 * buildStaticHreflangAlternates(['en', 'es', 'de'], '/')
 * // Returns: { languages: { 'en': '/', 'es': '/es', 'de': '/de', 'x-default': '/' } }
 */
export function buildStaticHreflangAlternates(
  locales: string[],
  basePath: string
) {
  const languages: Record<string, string> = {}

  locales.forEach((locale) => {
    if (locale === 'en') {
      languages['en'] = basePath
      // x-default should always point to the English version
      languages['x-default'] = basePath
    } else {
      languages[locale] = `/${locale}${basePath}`
    }
  })

  return { languages }
}
