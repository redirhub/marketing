#!/usr/bin/env tsx
/**
 * WordPress to Sanity Migration Script
 *
 * Migrates all blog posts from WordPress to Sanity CMS
 *
 * Usage: npx tsx scripts/migrate-wordpress.ts
 */

import { writeClient } from '../src/sanity/lib/client'
import { allLanguages } from '../src/sanity/config/i18n'

const WORDPRESS_API_BASE = process.env.WORDPRESS_API_BASE || 'https://managed-builder.redirhub.com/wp-json/wp/v2'
const BATCH_SIZE = 10

interface WordPressPost {
  id: number
  date: string
  modified: string
  slug: string
  status: string
  title: {
    rendered: string
  }
  content: {
    rendered: string
  }
  excerpt: {
    rendered: string
  }
  author: number
  featured_media: number
  categories: number[]
  tags: number[]
  lang?: string
  translations?: Record<string, number>
}

interface WordPressAuthor {
  id: number
  name: string
  description: string
  slug: string
  avatar_urls?: Record<string, string>
}

interface WordPressMedia {
  id: number
  source_url: string
  alt_text: string
  media_details: {
    width: number
    height: number
  }
}

interface WordPressCategory {
  id: number
  name: string
  slug: string
}

// Convert HTML to Portable Text blocks
function htmlToPortableText(html: string): any[] {
  // Remove HTML tags and convert to simple paragraphs
  const cleanText = html
    .replace(/<p>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .trim()

  const paragraphs = cleanText
    .split('\n')
    .filter(p => p.trim().length > 0)

  return paragraphs.map(text => ({
    _type: 'block',
    _key: Math.random().toString(36).substring(2, 11),
    style: 'normal',
    children: [
      {
        _type: 'span',
        _key: Math.random().toString(36).substring(2, 11),
        text: text.trim(),
        marks: []
      }
    ],
    markDefs: []
  }))
}

// Fetch all posts from WordPress
async function fetchWordPressPosts(page = 1, perPage = 100): Promise<WordPressPost[]> {
  const url = `${WORDPRESS_API_BASE}/posts?page=${page}&per_page=${perPage}&_embed=true`
  console.log(`📡 Fetching WordPress posts (page ${page})...`)

  const response = await fetch(url)
  if (!response.ok) {
    if (response.status === 400) {
      // No more pages
      return []
    }
    throw new Error(`Failed to fetch posts: ${response.statusText}`)
  }

  const posts = await response.json()
  const totalPages = parseInt(response.headers.get('x-wp-totalpages') || '1')

  console.log(`✅ Fetched ${posts.length} posts (page ${page}/${totalPages})`)

  // Recursively fetch remaining pages
  if (page < totalPages) {
    const nextPosts = await fetchWordPressPosts(page + 1, perPage)
    return [...posts, ...nextPosts]
  }

  return posts
}

// Fetch author by ID
async function fetchAuthor(authorId: number): Promise<WordPressAuthor | null> {
  try {
    const response = await fetch(`${WORDPRESS_API_BASE}/users/${authorId}`)
    if (!response.ok) return null
    return await response.json()
  } catch (error) {
    console.error(`Failed to fetch author ${authorId}:`, error)
    return null
  }
}

// Fetch media by ID
async function fetchMedia(mediaId: number): Promise<WordPressMedia | null> {
  if (!mediaId) return null
  try {
    const response = await fetch(`${WORDPRESS_API_BASE}/media/${mediaId}`)
    if (!response.ok) return null
    return await response.json()
  } catch (error) {
    console.error(`Failed to fetch media ${mediaId}:`, error)
    return null
  }
}

// Fetch categories
async function fetchCategories(categoryIds: number[]): Promise<string[]> {
  if (!categoryIds || categoryIds.length === 0) return []

  try {
    const promises = categoryIds.map(async (id) => {
      const response = await fetch(`${WORDPRESS_API_BASE}/categories/${id}`)
      if (!response.ok) return null
      const category: WordPressCategory = await response.json()
      return category.name
    })
    const categories = await Promise.all(promises)
    return categories.filter((c): c is string => c !== null)
  } catch (error) {
    console.error('Failed to fetch categories:', error)
    return []
  }
}

// Create or get author in Sanity
async function getOrCreateAuthor(wpAuthor: WordPressAuthor): Promise<string> {
  const authorId = `author-${wpAuthor.slug}`

  // Check if author exists
  const existingAuthor = await writeClient.fetch(
    `*[_type == "author" && slug.current == $slug][0]`,
    { slug: wpAuthor.slug }
  )

  if (existingAuthor) {
    return existingAuthor._id
  }

  // Create new author
  const author = await writeClient.create({
    _type: 'author',
    _id: authorId,
    name: wpAuthor.name,
    slug: {
      _type: 'slug',
      current: wpAuthor.slug
    },
    bio: wpAuthor.description || '',
  })

  console.log(`✅ Created author: ${author.name}`)
  return author._id
}

// Upload image to Sanity
async function uploadImageToSanity(imageUrl: string, altText: string = ''): Promise<any> {
  try {
    const response = await fetch(imageUrl)
    if (!response.ok) throw new Error(`Failed to fetch image: ${imageUrl}`)

    const buffer = await response.arrayBuffer()
    const asset = await writeClient.assets.upload('image', Buffer.from(buffer), {
      filename: imageUrl.split('/').pop() || 'image.jpg'
    })

    return {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: asset._id
      },
      alt: altText
    }
  } catch (error) {
    console.error(`Failed to upload image ${imageUrl}:`, error)
    return null
  }
}

// Migrate a single post
async function migratePost(wpPost: WordPressPost, locale: string = 'en'): Promise<void> {
  try {
    // Check if post already exists
    const existingPost = await writeClient.fetch(
      `*[_type == "post" && slug.current == $slug && locale == $locale][0]`,
      { slug: wpPost.slug, locale }
    )

    if (existingPost) {
      console.log(`⏭️  Skipping existing post: ${wpPost.title.rendered} (${locale})`)
      return
    }

    // Fetch author
    const wpAuthor = await fetchAuthor(wpPost.author)
    let authorRef = null
    if (wpAuthor) {
      const authorId = await getOrCreateAuthor(wpAuthor)
      authorRef = {
        _type: 'reference',
        _ref: authorId
      }
    }

    // Fetch featured image
    let featuredImage = null
    if (wpPost.featured_media) {
      const media = await fetchMedia(wpPost.featured_media)
      if (media) {
        featuredImage = await uploadImageToSanity(media.source_url, media.alt_text)
      }
    }

    // Fetch categories as tags
    const tags = await fetchCategories(wpPost.categories)

    // Convert content to Portable Text
    const content = htmlToPortableText(wpPost.content.rendered)

    // Extract excerpt
    const excerpt = wpPost.excerpt.rendered
      .replace(/<[^>]+>/g, '')
      .replace(/&nbsp;/g, ' ')
      .trim()
      .substring(0, 200)

    // Create post in Sanity
    const sanityPost = {
      _type: 'post',
      title: wpPost.title.rendered,
      slug: {
        _type: 'slug',
        current: wpPost.slug
      },
      excerpt: excerpt || undefined,
      content,
      image: featuredImage,
      publishedAt: wpPost.date,
      tags: tags.length > 0 ? tags : undefined,
      author: authorRef,
      locale,
      needsTranslation: locale === 'en', // Flag English posts for translation
    }

    await writeClient.create(sanityPost)
    console.log(`✅ Migrated: ${wpPost.title.rendered} (${locale})`)
  } catch (error) {
    console.error(`❌ Failed to migrate post ${wpPost.title.rendered}:`, error)
  }
}

// Main migration function
async function migrateAllPosts() {
  console.log('🚀 Starting WordPress to Sanity migration...\n')

  try {
    // Fetch all WordPress posts
    const wpPosts = await fetchWordPressPosts()
    console.log(`\n📊 Total posts to migrate: ${wpPosts.length}\n`)

    if (wpPosts.length === 0) {
      console.log('⚠️  No posts found to migrate')
      return
    }

    // Migrate posts in batches
    for (let i = 0; i < wpPosts.length; i += BATCH_SIZE) {
      const batch = wpPosts.slice(i, i + BATCH_SIZE)
      console.log(`\n🔄 Processing batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(wpPosts.length / BATCH_SIZE)}`)

      await Promise.all(
        batch.map(post => migratePost(post, post.lang || 'en'))
      )

      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000))
    }

    console.log('\n✨ Migration completed successfully!')
    console.log('\n📝 Next steps:')
    console.log('1. Visit http://localhost:3000/studio to review migrated posts')
    console.log('2. Use the Language Switcher plugin to trigger translations')
    console.log('3. Use the AI Assistant to enhance content if needed')
  } catch (error) {
    console.error('❌ Migration failed:', error)
    process.exit(1)
  }
}

// Run migration
migrateAllPosts()
