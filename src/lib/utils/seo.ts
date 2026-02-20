/**
 * SEO utility functions for generating canonical URLs, hreflang alternates, and structured data schemas
 */

import { APP_URL, URL_OG_IMAGE } from "./constants"
import type { FAQItem } from "@/types/sanity"

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
  const baseUrl = APP_URL

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

/**
 * Generates Schema.org FAQPage structured data JSON-LD
 *
 * @param faqs - Array of FAQ items with question and answer
 * @returns Schema.org FAQPage object or null if no FAQs
 *
 * @example
 * const schema = generateFAQSchema([
 *   { question: "What is this?", answer: "This is a FAQ" }
 * ])
 * // Returns Schema.org FAQPage JSON-LD JSON-LD object
 */
export function generateFAQSchema(faqs: FAQItem[] | undefined | null) {
  if (!faqs || faqs.length === 0) {
    return null
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

/**
 * Social card options for Open Graph and Twitter metadata
 */
export interface SocialCardOptions {
  title: string
  description?: string
  image?: string
  type?: 'article' | 'website'
  publishedTime?: string
  authors?: string[]
}

/**
 * Builds Open Graph and Twitter social card metadata
 *
 * @param options - Social card configuration options
 * @returns Object with openGraph and twitter properties for Next.js metadata
 *
 * @example
 * buildSocialCards({
 *   title: 'My Blog Post',
 *   description: 'A great article',
 *   image: 'https://example.com/image.jpg',
 *   type: 'article',
 *   publishedTime: '2024-01-01',
 *   authors: ['John Doe']
 * })
 * // Returns: { openGraph: {...}, twitter: {...} }
 */
export function buildSocialCards(options: SocialCardOptions) {
  const {
    title,
    description,
    image = URL_OG_IMAGE,
    type = 'website',
    publishedTime,
    authors,
  } = options

  return {
    openGraph: {
      title,
      description: description || undefined,
      type,
      publishedTime: publishedTime || undefined,
      authors: authors || undefined,
      images: image ? [{ url: image }] : undefined,
    },
    twitter: {
      card: 'summary_large_image' as const,
      title,
      description: description || undefined,
      images: image ? [image] : undefined,
    },
  }
}
