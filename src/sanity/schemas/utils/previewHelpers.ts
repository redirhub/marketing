import { getLocaleLabel } from '../../config/i18n'

interface LocalePreviewOptions {
  locale: string
  slug?: { current?: string } | string
  slugCurrent?: string
  isActive?: boolean
  additionalInfo?: string
}

/**
 * Creates a locale-aware preview for Sanity documents.
 */
export function prepareLocalePreview(
  options: LocalePreviewOptions
): string {
  const { locale, slug, slugCurrent, isActive, additionalInfo } = options
  const resolvedSlug = slugCurrent || (typeof slug === 'string' ? slug : slug?.current)

  // Build subtitle parts
  const parts: string[] = []

  // Add locale info
  parts.push(getLocaleLabel(locale))

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
