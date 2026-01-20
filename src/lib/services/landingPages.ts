import { client as defaultClient } from '@/sanity/lib/client'
import type { LandingPage } from '@/types/sanity'
import type { SanityClient } from 'next-sanity'

export async function fetchLandingPages(
  locale: string = 'en',
  client: SanityClient = defaultClient,
  isPreview: boolean = false
) {
  const activeFilter = isPreview ? '' : '&& isActive == true'
  const query = `*[
    _type == "landingPage" &&
    locale == $locale
    ${activeFilter}
  ] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    locale
  }`
  return client.fetch(query, { locale })
}

export async function fetchLandingPageBySlug(
  slug: string,
  locale: string = 'en',
  client: SanityClient = defaultClient,
  isPreview: boolean = false
): Promise<LandingPage | null> {
  const activeFilter = isPreview ? '' : '&& isActive == true'
  const query = `*[
    _type == "landingPage" &&
    slug.current == $slug &&
    locale == $locale
    ${activeFilter}
  ][0] {
    _id,
    _createdAt,
    _updatedAt,
    title,
    slug,
    meta,
    hero,
    richContent,
    faqs,
    sections,
    footerType,
    publishedAt,
    locale
  }`
  return client.fetch(query, { slug, locale })
}

export async function fetchLandingPageTranslations(
  slug: string,
  client: SanityClient = defaultClient,
  isPreview: boolean = false
) {
  const activeFilter = isPreview ? '' : '&& isActive == true'
  const query = `*[_type == "landingPage" && slug.current == $slug ${activeFilter}]{
    _id,
    locale,
    title,
    slug
  }`
  return client.fetch(query, { slug })
}
