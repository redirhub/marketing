/**
 * Format a date string for display in a specific locale
 */
export function formatPostDate(date: string, locale: string = 'en'): string {
  return new Date(date).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

/**
 * Normalize a tag string for URL usage
 */
export function normalizeTag(tag: string): string {
  return tag.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
}

/**
 * Get excerpt from post (fallback to content if excerpt is missing)
 */
export function getExcerpt(post: {
  excerpt?: string
  content?: any[]
}): string {
  if (post.excerpt) return post.excerpt

  // Fallback: extract from first content block
  const firstBlock = post.content?.find((block) => block._type === 'block')
  if (firstBlock && firstBlock.children) {
    const text =
      firstBlock.children.map((child: any) => child.text).join('') || ''
    return text.substring(0, 160) + (text.length > 160 ? '...' : '')
  }

  return ''
}

/**
 * Generate a unique key for Sanity blocks
 */
export function generateKey(): string {
  return Math.random().toString(36).substring(2, 11)
}

/**
 * Extract text content from Portable Text for search/display purposes
 */
export function extractTextFromPortableText(content: any[]): string {
  if (!content || !Array.isArray(content)) return ''

  return content
    .filter((block) => block._type === 'block')
    .map((block) =>
      block.children?.map((child: any) => child.text || '').join(''))
    .filter(Boolean)
    .join('\n\n')
}

/**
 * Generate reading progress milestones for TOC highlighting
 */
export function generateReadingMilestones(
  headings: Array<{ id: string; level: number; text: string }>,
  content: any[]
): number[] {
  // Simple implementation: divide content into sections based on headings
  if (headings.length === 0) return []

  const totalBlocks = content.filter((b) => b._type === 'block').length
  const milestones: number[] = []

  headings.forEach((_, index) => {
    const progress = ((index + 1) / headings.length) * 100
    milestones.push(Math.round(progress))
  })

  return milestones
}
