import { client } from '@/sanity/lib/client'
import type { LegalDocument } from '@/types/sanity'

export async function fetchLegalDocuments(locale: string = 'en') {
  const query = `*[
    _type == "legal" &&
    locale == $locale
  ] | order(title asc) {
    _id,
    title,
    slug,
    publishedAt,
    locale
  }`
  return client.fetch(query, { locale })
}

export async function fetchLegalDocumentBySlug(
  slug: string,
  locale: string = 'en'
): Promise<LegalDocument | null> {
  const query = `*[
    _type == "legal" &&
    slug.current == $slug &&
    locale == $locale
  ][0] {
    _id,
    _createdAt,
    _updatedAt,
    title,
    slug,
    content,
    publishedAt,
    locale
  }`
  return client.fetch(query, { slug, locale })
}

export async function fetchLegalDocumentTranslations(slug: string) {
  const query = `*[_type == "legal" && slug.current == $slug]{
    _id,
    locale,
    title,
    slug
  }`
  return client.fetch(query, { slug })
}
