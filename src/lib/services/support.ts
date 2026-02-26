import { client as defaultClient } from '@/sanity/lib/client'
import type { SupportArticle } from '@/types/sanity'
import type { SanityClient } from 'next-sanity'
import { getSupportArticleTags } from '@/lib/cache-tags'

export async function fetchSupportArticles(
  locale: string = 'en',
  client: SanityClient = defaultClient
) {
  const query = `*[
    _type == "support" &&
    locale == $locale
  ] | order(publishedAt desc) {
    _id,
    title,
    slug,
    tags,
    publishedAt,
    locale
  }`

  const tags = getSupportArticleTags(locale);
  return client.fetch(query, { locale }, { next: { tags } })
}

export async function fetchSupportArticleBySlug(
  slug: string,
  locale: string = 'en',
  client: SanityClient = defaultClient
): Promise<SupportArticle | null> {
  const query = `*[
    _type == "support" &&
    slug.current == $slug &&
    locale == $locale
  ][0] {
    _id,
    _createdAt,
    _updatedAt,
    title,
    slug,
    content,
    tags,
    publishedAt,
    locale
  }`

  const tags = getSupportArticleTags(locale);
  return client.fetch(query, { slug, locale }, { next: { tags } })
}

export async function fetchSupportArticlesByTag(
  tag: string,
  locale: string = 'en',
  client: SanityClient = defaultClient
) {
  const query = `*[
    _type == "support" &&
    locale == $locale &&
    count(tags[lower(@) == lower($tag)]) > 0
  ] | order(publishedAt desc) {
    _id,
    title,
    slug,
    tags,
    publishedAt,
    locale
  }`

  const tags = getSupportArticleTags(locale);
  return client.fetch(query, { tag, locale } as Record<string, any>, { next: { tags } })
}

export async function fetchSupportArticleTranslations(
  slug: string,
  client: SanityClient = defaultClient
) {
  const query = `*[_type == "support" && slug.current == $slug]{
    _id,
    locale,
    title,
    slug
  }`

  const tags = getSupportArticleTags();
  return client.fetch(query, { slug }, { next: { tags } })
}

export async function fetchAllSupportTags(
  locale: string = 'en',
  client: SanityClient = defaultClient
): Promise<string[]> {
  const query = `array::unique(*[_type == "support" && locale == $locale].tags[])`
  return client.fetch(query, { locale })
}
