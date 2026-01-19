import { client as defaultClient } from '@/sanity/lib/client'
import type { Post, PostPreview } from '@/types/sanity'
import type { SanityClient } from 'next-sanity'

/**
 * Fetch blog posts by locale with optional limit
 */
export async function fetchBlogPosts(
  locale: string = 'en',
  limit?: number,
  client: SanityClient = defaultClient
): Promise<PostPreview[]> {
  const query = `*[
    _type == "post" &&
    locale == $locale
  ] | order(publishedAt desc) ${limit ? `[0...${limit}]` : ''} {
    _id,
    title,
    slug,
    excerpt,
    image,
    publishedAt,
    tags,
    author->{
      name,
      image,
      slug
    }
  }`

  return client.fetch(query, { locale })
}

/**
 * Fetch paginated blog posts
 */
export async function fetchPaginatedPosts(
  locale: string = 'en',
  page: number = 1,
  pageSize: number = 12,
  client: SanityClient = defaultClient
) {
  const start = (page - 1) * pageSize
  const end = start + pageSize

  const [posts, total] = await Promise.all([
    client.fetch(
      `*[_type == "post" && locale == $locale] | order(publishedAt desc) [$start...$end] {
        _id,
        title,
        slug,
        excerpt,
        image,
        publishedAt,
        tags,
        author->{
          name,
          image,
          slug
        }
      }`,
      { locale, start, end }
    ),
    client.fetch(
      `count(*[_type == "post" && locale == $locale])`,
      { locale }
    ),
  ])

  return {
    posts,
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  }
}

/**
 * Fetch a single post by slug and locale
 */
export async function fetchPostBySlug(
  slug: string,
  locale: string = 'en',
  client: SanityClient = defaultClient
): Promise<Post | null> {
  const query = `*[
    _type == "post" &&
    slug.current == $slug &&
    locale == $locale
  ][0] {
    _id,
    _createdAt,
    _updatedAt,
    title,
    slug,
    excerpt,
    tags,
    content,
    image,
    publishedAt,
    locale,
    author->{
      _id,
      name,
      image,
      bio,
      slug
    },
    faqs
  }`

  return client.fetch(query, { slug, locale })
}

/**
 * Fetch related posts by tags
 */
export async function fetchRelatedPosts(
  postId: string,
  tags: string[],
  locale: string = 'en',
  limit: number = 6,
  client: SanityClient = defaultClient
): Promise<PostPreview[]> {
  if (!tags || tags.length === 0) {
    return []
  }

  const query = `*[
    _type == "post" &&
    _id != $postId &&
    locale == $locale &&
    count((tags[])[@ in $tags]) > 0
  ] | order(publishedAt desc) [0...${limit}] {
    _id,
    title,
    slug,
    excerpt,
    image,
    publishedAt,
    tags,
    author->{
      name,
      image,
      slug
    }
  }`

  return client.fetch(query, { postId, tags, locale })
}

/**
 * Fetch posts by author
 */
export async function fetchPostsByAuthor(
  authorSlug: string,
  locale: string = 'en',
  limit?: number,
  client: SanityClient = defaultClient
): Promise<PostPreview[]> {
  const query = `*[
    _type == "post" &&
    author->slug.current == $authorSlug &&
    locale == $locale
  ] | order(publishedAt desc) ${limit ? `[0...${limit}]` : ''} {
    _id,
    title,
    slug,
    excerpt,
    image,
    publishedAt,
    tags,
    author->{
      name,
      image,
      slug
    }
  }`

  return client.fetch(query, { authorSlug, locale })
}

/**
 * Fetch posts by tag
 */
export async function fetchPostsByTag(
  tag: string,
  postLocale: string = 'en',
  limit?: number,
  client: SanityClient = defaultClient
): Promise<PostPreview[]> {
  const query = `*[
    _type == "post" &&
    $tag in tags[] &&
    locale == $postLocale
  ] | order(publishedAt desc) ${limit ? `[0...${limit}]` : ''} {
    _id,
    title,
    slug,
    excerpt,
    image,
    publishedAt,
    tags,
    author->{
      name,
      image,
      slug
    }
  }`

  return client.fetch(query, { tag, postLocale } as any)
}

/**
 * Calculate estimated read time for Portable Text content
 */
export function calculateReadTime(content: any[]): number {
  if (!content || !Array.isArray(content)) return 1

  const WORDS_PER_MINUTE = 200
  const wordCount = content
    .filter((block) => block._type === 'block')
    .reduce((count, block) => {
      const text =
        block.children?.map((child: any) => child.text || '').join(' ') || ''
      return count + text.trim().split(/\s+/).filter(Boolean).length
    }, 0)

  return Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE))
}

/**
 * Get all available translations for a post
 */
export async function fetchPostTranslations(
  slug: string,
  client: SanityClient = defaultClient
) {
  const query = `*[_type == "post" && slug.current == $slug]{
    _id,
    locale,
    title,
    slug
  }`

  return client.fetch(query, { slug })
}

/**
 * Get all unique tags across all posts for a locale
 */
export async function fetchAllTags(
  locale: string = 'en',
  client: SanityClient = defaultClient
): Promise<string[]> {
  const query = `array::unique(*[_type == "post" && locale == $locale].tags[])`

  return client.fetch(query, { locale })
}
