import { client as defaultClient } from '@/sanity/lib/client'
import type { LegalDocument } from '@/types/sanity'
import type { SanityClient } from 'next-sanity'

export async function fetchFooterLegalPages(
  locale: string = 'en',
  client: SanityClient = defaultClient
): Promise<LegalDocument[]> {
  const query = `*[
    _type == "legal" &&
    locale == $locale &&
    footer == true
  ] | order(title asc) {
    _id,
    title,
    slug,
    footer,
    locale,
    publishedAt
  }`
  return client.fetch(query, { locale })
}

export async function fetchAllLegalPages(
  locale: string = 'en',
  client: SanityClient = defaultClient
): Promise<LegalDocument[]> {
  const query = `*[
    _type == "legal" &&
    locale == $locale
  ] | order(title asc) {
    _id,
    title,
    slug,
    footer,
    locale,
    publishedAt
  }`
  return client.fetch(query, { locale })
}

export async function fetchLegalDocuments(
  locale: string = 'en',
  client: SanityClient = defaultClient
) {
  const query = `*[
    _type == "legal" &&
    locale == $locale
  ] | order(title asc) {
    _id,
    title,
    slug,
    publishedAt,
    locale,
    footer
  }`
  return client.fetch(query, { locale })
}

export async function fetchLegalPageBySlug(
  slug: string,
  locale: string = 'en',
  client: SanityClient = defaultClient
): Promise<LegalDocument | null> {
  const query = `*[
    _type == "legal" &&
    slug.current == $slug &&
    locale == $locale
  ][0] {
    _id,
    title,
    slug,
    content,
    footer,
    locale,
    publishedAt
  }`
  return client.fetch(query, { slug, locale })
}

export async function fetchLegalDocumentBySlug(
  slug: string,
  locale: string = 'en',
  client: SanityClient = defaultClient
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
    locale,
    footer
  }`
  return client.fetch(query, { slug, locale })
}

export async function fetchLegalDocumentTranslations(
  slug: string,
  client: SanityClient = defaultClient
) {
  const query = `*[_type == "legal" && slug.current == $slug]{
    _id,
    locale,
    title,
    slug,
    footer
  }`
  return client.fetch(query, { slug })
}
