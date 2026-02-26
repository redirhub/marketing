import { client } from '@/sanity/lib/client'
import type { FAQSet } from '@/types/sanity'
import { getFAQTags } from '@/lib/cache-tags'

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

  const tags = getFAQTags();
  return client.fetch(query, { pageSlug, locale }, { next: { tags } })
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

  const tags = getFAQTags();
  return client.fetch(query, { locale }, { next: { tags } })
}
