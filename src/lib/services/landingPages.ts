import { client } from '@/sanity/lib/client'
import type { LandingPage } from '@/types/sanity'

export async function fetchLandingPages(locale: string = 'en') {
  const query = `*[
    _type == "landingPage" &&
    locale == $locale &&
    isActive == true
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
  locale: string = 'en'
): Promise<LandingPage | null> {
  const query = `*[
    _type == "landingPage" &&
    slug.current == $slug &&
    locale == $locale &&
    isActive == true
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

export async function fetchLandingPageTranslations(slug: string) {
  const query = `*[_type == "landingPage" && slug.current == $slug && isActive == true]{
    _id,
    locale,
    title,
    slug
  }`
  return client.fetch(query, { slug })
}
