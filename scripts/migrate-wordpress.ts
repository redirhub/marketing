#!/usr/bin/env tsx
/**
 * WordPress to Sanity Migration Script
 *
 * Migrates all blog posts from WordPress to Sanity CMS
 *
 * Usage: npm run migrate:wordpress
 */

import { writeClient } from '../src/sanity/lib/client'
import { parse, HTMLElement } from 'node-html-parser'
import { decode } from 'html-entities'
import { randomUUID } from 'crypto'

const WORDPRESS_API_BASE = process.env.WORDPRESS_API_BASE || 'https://managed-builder.redirhub.com/wp-json/wp/v2'
const DEFAULT_LOCALE = process.env.WORDPRESS_DEFAULT_LOCALE || 'en'
const PAGE_SIZE = 100

interface WordPressPost {
  id: number
  date: string
  date_gmt?: string
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
  _embedded?: {
    author?: WordPressAuthor[]
    'wp:featuredmedia'?: Array<{ source_url: string }>
    'wp:term'?: Array<Array<{ taxonomy: string; name: string }>>
  }
  jetpack_featured_media_url?: string
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

// Utility functions
const slugify = (value: string = ''): string =>
  value
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 96) || 'post'

const decodeEntities = (value: string = ''): string => decode(value)

const stripHtml = (html: string): string => {
  const text = html ? html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim() : ''
  return decodeEntities(text)
}

const genKey = (): string =>
  typeof randomUUID === 'function'
    ? randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`

const filenameFromUrl = (url: string, fallback: string = 'wp-image.jpg'): string => {
  try {
    const parsed = new URL(url)
    const name = parsed.pathname.split('/').filter(Boolean).pop()
    if (!name) return fallback
    return name.split('?')[0] || fallback
  } catch (_) {
    return fallback
  }
}

// Upload image from URL to Sanity
async function uploadImageFromUrl(url: string, label?: string): Promise<any | undefined> {
  if (!url) return undefined
  try {
    const response = await fetch(url)
    if (!response.ok) throw new Error(`Failed to fetch: ${response.statusText}`)

    const buffer = await response.arrayBuffer()
    const filename = label || filenameFromUrl(url)
    const asset = await writeClient.assets.upload('image', Buffer.from(buffer), { filename })

    return {
      _type: 'image',
      asset: { _type: 'reference', _ref: asset._id },
    }
  } catch (error: any) {
    console.warn(`⚠️  Skipped image ${url}: ${error.message}`)
    return undefined
  }
}

// Upload image with fallback support for srcset
async function uploadImageWithFallback(sources: string[]): Promise<any | undefined> {
  for (const source of sources) {
    const uploaded = await uploadImageFromUrl(source, filenameFromUrl(source))
    if (uploaded) return uploaded
  }
  return undefined
}

// Convert HTML to Portable Text
async function htmlToPortableText(html: string = ''): Promise<any[]> {
  const root = parse(html, {
    blockTextElements: {
      script: true,
      style: true,
      pre: true,
    },
  })

  const blocks: any[] = []
  const linkKeyCache = new Map<string, string>()

  const ensureLinkKey = (href: string | undefined, markDefs: any[]): string | null => {
    if (!href) return null
    if (linkKeyCache.has(href)) return linkKeyCache.get(href)!
    const key = `link-${linkKeyCache.size + 1}`
    linkKeyCache.set(href, key)
    markDefs.push({ _key: key, _type: 'link', href })
    return key
  }

  const buildSpans = (node: any, activeMarks: string[], markDefs: any[]): any[] => {
    if (!node) return []

    // Text node
    if (node.nodeType === 3) {
      const text = decodeEntities(node.rawText || '')
      if (!text || !text.trim()) return []
      return [
        {
          _key: genKey(),
          _type: 'span',
          text,
          marks: activeMarks,
        },
      ]
    }

    // Non-element node
    if (node.nodeType !== 1) return []

    let marks = [...activeMarks]
    const tag = (node.tagName || '').toLowerCase()

    // Handle line breaks
    if (tag === 'br') {
      return [
        {
          _key: genKey(),
          _type: 'span',
          text: '\n',
          marks,
        },
      ]
    }

    // Apply formatting marks
    if (tag === 'strong' || tag === 'b') marks = [...marks, 'strong']
    if (tag === 'em' || tag === 'i') marks = [...marks, 'em']
    if (tag === 'code') marks = [...marks, 'code']
    if (tag === 'a') {
      const href = node.getAttribute('href')
      const linkKey = ensureLinkKey(href, markDefs)
      if (linkKey) marks = [...marks, linkKey]
    }

    return node.childNodes.flatMap((child: any) => buildSpans(child, marks, markDefs))
  }

  const findImageInfo = (node: any): { sources: string[]; alt: string; caption: string } | null => {
    const tag = (node.tagName || '').toLowerCase()
    const imgNode = tag === 'img' ? node : node.querySelector && node.querySelector('img')
    if (!imgNode) return null

    const src = imgNode.getAttribute('src')
    const srcsetRaw = imgNode.getAttribute('srcset') || ''
    const sourcesFromSrcset = srcsetRaw
      .split(',')
      .map((entry: string) => entry.trim().split(' ')[0])
      .filter(Boolean)
    const sources = Array.from(new Set([src, ...sourcesFromSrcset].filter(Boolean)))
    if (!sources.length) return null

    const alt = decodeEntities(imgNode.getAttribute('alt') || '')
    const captionNode =
      node.querySelector && node.querySelector('figcaption') ? node.querySelector('figcaption') : null
    const caption = captionNode
      ? decodeEntities(captionNode.text || captionNode.innerText || '')
      : decodeEntities(imgNode.getAttribute('title') || '')

    return { sources, alt, caption }
  }

  const nodeToBlock = async (node: any): Promise<any | any[] | null> => {
    // Text node
    if (node.nodeType === 3) {
      const text = node.rawText?.trim()
      if (!text) return null
      return {
        _key: genKey(),
        _type: 'block',
        style: 'normal',
        markDefs: [],
        children: [
          {
            _key: genKey(),
            _type: 'span',
            text,
            marks: [],
          },
        ],
      }
    }

    // Non-element node
    if (node.nodeType !== 1) return null

    // Check for images
    const imageInfo = findImageInfo(node)
    if (imageInfo) {
      const uploaded = await uploadImageWithFallback(imageInfo.sources)
      if (!uploaded) return null
      return {
        _key: genKey(),
        ...uploaded,
        alt: imageInfo.alt || imageInfo.caption || '',
        caption: imageInfo.caption || '',
      }
    }

    const tag = (node.tagName || '').toLowerCase()
    const markDefs: any[] = []
    const styleMap: Record<string, string> = {
      h1: 'h1',
      h2: 'h2',
      h3: 'h3',
      h4: 'h4',
      blockquote: 'blockquote',
    }

    // Handle lists
    if (tag === 'ul' || tag === 'ol') {
      const listItemStyle = tag === 'ul' ? 'bullet' : 'number'
      const items = node.childNodes.filter((child: any) => child.tagName?.toLowerCase() === 'li')

      const listBlocks: any[] = []
      for (const item of items) {
        const children = buildSpans(item, [], markDefs)
        if (!children.length) continue
        listBlocks.push({
          _key: genKey(),
          _type: 'block',
          style: 'normal',
          listItem: listItemStyle,
          markDefs,
          children,
        })
      }
      return listBlocks
    }

    // Regular block
    const style = styleMap[tag] || 'normal'
    const children = buildSpans(node, [], markDefs)
    if (!children.length) return null

    return {
      _key: genKey(),
      _type: 'block',
      style,
      markDefs,
      children,
    }
  }

  for (const node of root.childNodes) {
    const blockOrBlocks = await nodeToBlock(node)
    if (Array.isArray(blockOrBlocks)) {
      blocks.push(...blockOrBlocks)
    } else if (blockOrBlocks) {
      blocks.push(blockOrBlocks)
    }
  }

  return blocks
}

// Extract tags from embedded WordPress data
const extractTags = (post: WordPressPost): string[] => {
  const terms = post?._embedded?.['wp:term'] || []
  const tags = terms
    .flat()
    .filter((term: any) => term?.taxonomy === 'post_tag')
    .map((term: any) => term.name)
    .filter(Boolean)
  return Array.from(new Set(tags))
}

// Fetch all posts from WordPress
async function fetchAllPosts(): Promise<WordPressPost[]> {
  let page = 1
  const posts: WordPressPost[] = []

  while (true) {
    console.log(`📡 Fetching WordPress posts (page ${page})...`)
    const response = await fetch(`${WORDPRESS_API_BASE}/posts?page=${page}&per_page=${PAGE_SIZE}&_embed=true&order=asc`)

    if (!response.ok) {
      if (response.status === 400) break // No more pages
      throw new Error(`Failed to fetch posts: ${response.statusText}`)
    }

    const data: WordPressPost[] = await response.json()
    posts.push(...data)

    const totalPages = Number(response.headers.get('x-wp-totalpages') || 1)
    console.log(`✅ Fetched ${data.length} posts (page ${page}/${totalPages})`)

    if (page >= totalPages) break
    page += 1
  }

  return posts
}

// Get or create author in Sanity
async function getOrCreateAuthor(author: WordPressAuthor | null): Promise<any | undefined> {
  if (!author) return undefined
  const name = author.name || 'Unknown'
  const slug = slugify(author.slug || name)
  const id = `author-${slug}`

  const existingId = await writeClient.fetch('*[_type == "author" && _id == $id][0]._id', { id })
  if (existingId) return { _type: 'reference', _ref: existingId }

  const avatarUrl = author.avatar_urls?.['256'] || author.avatar_urls?.['96'] || author.avatar_urls?.['48']
  const image = await uploadImageFromUrl(avatarUrl, `${slug}-avatar.jpg`)

  await writeClient.createIfNotExists({
    _id: id,
    _type: 'author',
    name,
    slug: { current: slug },
    bio: stripHtml(author.description),
    image,
  })

  return { _type: 'reference', _ref: id }
}

// Map WordPress post to Sanity document
async function mapPostToSanity(post: WordPressPost, locale: string = DEFAULT_LOCALE): Promise<any> {
  const slug = post.slug || slugify(post.title?.rendered)
  const documentId = `post-${slug}-${locale}`

  const existingId = await writeClient.fetch(
    '*[_type == "post" && slug.current == $slug && locale == $locale][0]._id',
    { slug, locale }
  )

  const featured = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || post.jetpack_featured_media_url
  const image = await uploadImageFromUrl(featured, `${slug}-featured.jpg`)
  const authorRef = await getOrCreateAuthor(post._embedded?.author?.[0] || null)

  return {
    _id: existingId || documentId,
    _type: 'post',
    locale,
    slug: { current: slug },
    title: stripHtml(post.title?.rendered),
    excerpt: stripHtml(post.excerpt?.rendered),
    tags: extractTags(post),
    content: await htmlToPortableText(post.content?.rendered),
    image,
    publishedAt: new Date(post.date_gmt || post.date || Date.now()).toISOString(),
    author: authorRef,
  }
}

// Main migration function
async function migrate() {
  console.log('🚀 Starting WordPress to Sanity migration...\n')

  try {
    const posts = await fetchAllPosts()
    console.log(`\n📊 Total posts to migrate: ${posts.length}\n`)

    if (posts.length === 0) {
      console.log('⚠️  No posts found to migrate')
      return
    }

    let success = 0
    let failures = 0

    for (const post of posts) {
      try {
        const locale = post.lang || DEFAULT_LOCALE
        const doc = await mapPostToSanity(post, locale)
        await writeClient.createOrReplace(doc)
        console.log(`✅ Migrated: ${post.title.rendered} (${locale})`)
        success += 1
      } catch (error: any) {
        console.error(`❌ Failed "${post.slug || post.id}": ${error.message}`)
        failures += 1
      }
    }

    console.log(`\n✨ Migration completed!`)
    console.log(`✅ Success: ${success}`)
    console.log(`❌ Failures: ${failures}`)
  } catch (error) {
    console.error('❌ Migration aborted:', error)
    process.exit(1)
  }
}

// Run migration
migrate()
