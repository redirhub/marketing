import { unstable_cache } from 'next/cache'
import { client as defaultClient } from '@/sanity/lib/client'
import type { SanityClient } from 'next-sanity'
import type { ChangelogEntry } from '@/types/sanity'

/**
 * Fetch changelog entries with cursor-based pagination
 */
export async function fetchChangelogEntries(
  locale: string = 'en',
  limit: number = 10,
  cursor?: string,
  client: SanityClient = defaultClient
): Promise<{ entries: ChangelogEntry[]; nextCursor: string | null }> {
  const cursorFilter = cursor
    ? `&& publishedAt < $cursor`
    : ''

  const query = `*[
    _type == "changelog" &&
    locale == $locale
    ${cursorFilter}
  ] | order(publishedAt desc) [0...${limit + 1}] {
    _id,
    _createdAt,
    _updatedAt,
    title,
    slug,
    description,
    content,
    author->{
      _id,
      name,
      slug,
      image
    },
    publishedAt,
    locale
  }`

  const results = await client.fetch(query, { locale, cursor })

  // Check if there are more items
  const hasMore = results.length > limit
  const entries = hasMore ? results.slice(0, limit) : results
  const nextCursor = hasMore ? entries[entries.length - 1].publishedAt : null

  return {
    entries,
    nextCursor,
  }
}

/**
 * Get single changelog entry by slug and locale (cached for 24 hours)
 */
export function fetchChangelogBySlug(
  slug: string,
  locale: string = 'en',
  client: SanityClient = defaultClient
): Promise<ChangelogEntry | null> {
  if (client === defaultClient) {
    return unstable_cache(
      async () => {
        const query = `*[
          _type == "changelog" &&
          slug.current == $slug &&
          locale == $locale
        ][0] {
          _id,
          _createdAt,
          _updatedAt,
          title,
          slug,
          description,
          content,
          author->{
            _id,
            name,
            slug,
            image
          },
          publishedAt,
          locale
        }`
        return client.fetch(query, { slug, locale })
      },
      ['changelog', slug, locale],
      { revalidate: 86400, tags: ['changelog'] }
    )()
  }

  const query = `*[
    _type == "changelog" &&
    slug.current == $slug &&
    locale == $locale
  ][0] {
    _id,
    _createdAt,
    _updatedAt,
    title,
    slug,
    description,
    content,
    author->{
      _id,
      name,
      slug,
      image
    },
    publishedAt,
    locale
  }`
  return client.fetch(query, { slug, locale })
}

/**
 * Get all translations of a changelog entry
 */
export async function fetchChangelogTranslations(
  slug: string,
  client: SanityClient = defaultClient
) {
  const query = `*[_type == "changelog" && slug.current == $slug]{
    _id,
    locale,
    title,
    slug
  }`

  return client.fetch(query, { slug })
}

/**
 * Format a date string for display
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
