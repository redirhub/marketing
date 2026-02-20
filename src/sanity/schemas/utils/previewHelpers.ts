import { getLocaleLabel } from '../../config/i18n'
import { client } from '../../lib/client'

interface LocalePreviewOptions {
  locale: string
  slug?: { current?: string } | string
  slugCurrent?: string
  isActive?: boolean
  additionalInfo?: string
}

/**
 * Creates a locale-aware preview for Sanity documents.
 * For English locale, shows locale count instead of language label.
 */
export async function prepareLocalePreview(
  options: LocalePreviewOptions,
  typeName: string
) {
  const { locale, slug, slugCurrent, isActive, additionalInfo } = options
  const resolvedSlug = slugCurrent || (typeof slug === 'string' ? slug : slug?.current)
  let localeCount = 0

  // For English locale, count how many locale versions exist
  if (locale === 'en' && resolvedSlug) {
    try {
      const query = `count(*[_type == $type && slug.current == $slug])`
      localeCount = await client.fetch(query, { type: typeName, slug: resolvedSlug })
    } catch (error) {
      // Silently fail if query doesn't work
      console.error('Failed to fetch locale count:', error)
    }
  }

  // Build subtitle parts
  const parts: string[] = []

  // Add locale info
  if (locale === 'en' && localeCount > 0) {
    parts.push(`${localeCount} locale${localeCount !== 1 ? 's' : ''}`)
  } else {
    parts.push(getLocaleLabel(locale))
  }

  // Add slug if provided
  if (resolvedSlug) {
    parts.push(resolvedSlug)
  }

  // Add any additional info
  if (additionalInfo) {
    parts.push(additionalInfo)
  }

  // Add inactive label if needed
  if (isActive === false) {
    parts.push('(Inactive)')
  }

  return parts.join(' • ')
}
