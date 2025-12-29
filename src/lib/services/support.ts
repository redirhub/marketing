import { client } from '@/sanity/lib/client'
import type { SupportArticle } from '@/types/sanity'

export async function fetchSupportArticles(locale: string = 'en') {
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
  return client.fetch(query, { locale })
}

export async function fetchSupportArticleBySlug(
  slug: string,
  locale: string = 'en'
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
  return client.fetch(query, { slug, locale })
}

export async function fetchSupportArticlesByTag(
  tag: string,
  locale: string = 'en'
) {
  const query = `*[
    _type == "support" &&
    locale == $locale &&
    $tag in tags
  ] | order(publishedAt desc) {
    _id,
    title,
    slug,
    tags,
    publishedAt,
    locale
  }`
  return client.fetch(query, { tag, locale })
}

export async function fetchSupportArticleTranslations(slug: string) {
  const query = `*[_type == "support" && slug.current == $slug]{
    _id,
    locale,
    title,
    slug
  }`
  return client.fetch(query, { slug })
}
