import { client as defaultClient, draftClient } from '@/sanity/lib/client'
import type { FAQSet } from '@/types/sanity'
import type { SanityClient } from 'next-sanity'

// Determine if the environment is preview (development) or production
// In production, only published content is fetched; in preview, drafts are included
const isPreview = process.env.VERCEL_ENV !== 'production'
const client: SanityClient = isPreview ? draftClient : defaultClient

/**
 * Fetch FAQ set for a specific page and locale
 * @param pageSlug - Page identifier (e.g., 'homepage', 'create-redirects')
 * @param locale - Language code
 * @returns FAQ set or null if not found
 */
export async function fetchFAQSetByPage(
  pageSlug: string,
  locale: string = 'en'
): Promise<FAQSet | null> {
  const query = `*[
    _type == "faqSet" &&
    pageSlug == $pageSlug &&
    locale == $locale
  ][0] {
    _id,
    pageSlug,
    title,
    faqs[] {
      _key,
      question,
      answer
    },
    locale
  }`

  return client.fetch(query, { pageSlug, locale })
}

/**
 * Fetch all FAQ sets for a given locale
 * @param locale - Language code
 * @returns Array of FAQ sets
 */
export async function fetchAllFAQSets(locale: string = 'en') {
  const query = `*[
    _type == "faqSet" &&
    locale == $locale
  ] | order(pageSlug asc) {
    _id,
    pageSlug,
    title,
    faqs,
    locale
  }`

  return client.fetch(query, { locale })
}
