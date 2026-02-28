import { client as defaultClient } from '@/sanity/lib/client'
import type { LandingPage } from '@/types/sanity'
import type { SanityClient } from 'next-sanity'

// Determine if the environment is preview (development) or production
// In production, only published content is fetched; in preview, drafts are included
const isPreview = process.env.NODE_ENV !== 'production'

// Global draft filter used in all queries
const DRAFT_FILTER = isPreview ? '' : '&& !(_id in path("drafts.**"))'

export async function fetchLandingPages(
  locale: string = 'en',
  client: SanityClient = defaultClient,
) {
  const query = `*[
    _type == "landingPage" &&
    locale == $locale && 
    isActive == true
    ${DRAFT_FILTER}
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
): Promise<LandingPage | null> {
  const query = `*[
    _type == "landingPage" &&
    slug.current == $slug &&
    locale == $locale && 
    isActive == true
    ${DRAFT_FILTER}
  ][0] {
    _id,
    _createdAt,
    _updatedAt,
    title,
    slug,
    meta,
    hero {
      ...,
      heroImage {
        ...,
        "dimensions": asset->metadata.dimensions
      }
    },
    content,
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
) {
  const query = `*[_type == "landingPage" && slug.current == $slug && isActive == true]{
    _id,
    locale,
    title,
    slug
  }`
  return client.fetch(query, { slug })
}
