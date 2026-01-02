#!/usr/bin/env tsx
/**
 * WordPress Support CPT to Sanity Migration Script
 *
 * Migrates all support articles from WordPress Custom Post Type "support" to Sanity CMS
 *
 * Usage: npm run migrate:support
 */

import { writeClient } from '../src/sanity/lib/client'
import { parse, HTMLElement } from 'node-html-parser'
import { decode } from 'html-entities'
import { randomUUID } from 'crypto'

const WORDPRESS_API_BASE = process.env.WORDPRESS_API_BASE || 'https://managed-builder.redirhub.com/wp-json/wp/v2'
const DEFAULT_LOCALE = process.env.WORDPRESS_DEFAULT_LOCALE || 'en'
const PAGE_SIZE = 100

interface WordPressSupportArticle {
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
  categories: number[]
  tags: number[]
  lang?: string
  translations?: Record<string, number>
  _embedded?: {
    'wp:term'?: Array<Array<{ taxonomy: string; name: string }>>
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
    .slice(0, 96) || 'support'

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

    if (node.nodeType !== 1) return null

    const tag = (node.tagName || '').toLowerCase()

    // Skip scripts and styles
    if (tag === 'script' || tag === 'style') return null

    // Handle images
    if (tag === 'img' || tag === 'figure') {
      const info = findImageInfo(node)
      if (!info) return null
      const uploaded = await uploadImageWithFallback(info.sources)
      if (!uploaded) return null
      return {
        _key: genKey(),
        _type: 'image',
        asset: uploaded.asset,
        alt: info.alt,
        caption: info.caption,
      }
    }

    // Handle headings
    if (/^h[1-6]$/.test(tag)) {
      const markDefs: any[] = []
      const children = buildSpans(node, [], markDefs)
      if (!children.length) return null
      return {
        _key: genKey(),
        _type: 'block',
        style: tag,
        markDefs,
        children,
      }
    }

    // Handle lists
    if (tag === 'ul' || tag === 'ol') {
      const listItems = node.querySelectorAll('li')
      if (!listItems || !listItems.length) return null
      const items: any[] = []
      for (const li of listItems) {
        const markDefs: any[] = []
        const children = buildSpans(li, [], markDefs)
        if (children.length) {
          items.push({
            _key: genKey(),
            _type: 'block',
            style: 'normal',
            listItem: tag === 'ul' ? 'bullet' : 'number',
            markDefs,
            children,
          })
        }
      }
      return items
    }

    // Handle blockquote
    if (tag === 'blockquote') {
      const markDefs: any[] = []
      const children = buildSpans(node, [], markDefs)
      if (!children.length) return null
      return {
        _key: genKey(),
        _type: 'block',
        style: 'blockquote',
        markDefs,
        children,
      }
    }

    // Handle paragraphs and divs
    if (tag === 'p' || tag === 'div') {
      const markDefs: any[] = []
      const children = buildSpans(node, [], markDefs)
      if (!children.length) return null
      return {
        _key: genKey(),
        _type: 'block',
        style: 'normal',
        markDefs,
        children,
      }
    }

    // For other inline elements, just process children
    const results: any[] = []
    for (const child of node.childNodes || []) {
      const result = await nodeToBlock(child)
      if (result) {
        if (Array.isArray(result)) {
          results.push(...result)
        } else {
          results.push(result)
        }
      }
    }
    return results.length ? results : null
  }

  for (const child of root.childNodes || []) {
    const result = await nodeToBlock(child)
    if (result) {
      if (Array.isArray(result)) {
        blocks.push(...result)
      } else {
        blocks.push(result)
      }
    }
  }

  return blocks.length ? blocks : []
}

// Fetch all support articles from WordPress
async function fetchAllSupportArticles(): Promise<WordPressSupportArticle[]> {
  const articles: WordPressSupportArticle[] = []
  let page = 1
  let hasMore = true

  while (hasMore) {
    try {
      const url = `${WORDPRESS_API_BASE}/support?page=${page}&per_page=${PAGE_SIZE}&_embed=1`
      console.log(`📥 Fetching support articles (page ${page})...`)

      const response = await fetch(url)
      if (!response.ok) {
        if (response.status === 400) {
          console.log('⚠️  Reached end of pages')
          break
        }
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const data = (await response.json()) as WordPressSupportArticle[]
      if (!data || data.length === 0) {
        hasMore = false
      } else {
        articles.push(...data)
        console.log(`   Found ${data.length} articles on page ${page}`)
        page += 1
      }
    } catch (error: any) {
      console.error(`❌ Error fetching page ${page}:`, error.message)
      hasMore = false
    }
  }

  return articles
}

// Extract tags from WordPress article
function extractTags(article: WordPressSupportArticle): string[] {
  const tags = new Set<string>()

  // Get categories and tags from _embedded
  if (article._embedded?.['wp:term']) {
    for (const termGroup of article._embedded['wp:term']) {
      for (const term of termGroup) {
        if (term.name) {
          tags.add(term.name)
        }
      }
    }
  }

  return Array.from(tags)
}

// Map WordPress support article to Sanity support document
async function mapArticleToSanity(article: WordPressSupportArticle, locale: string): Promise<any> {
  const slug = slugify(article.slug || article.title?.rendered)
  const documentId = `support-${article.id}`

  // Check if document already exists
  const existingDoc = await writeClient.fetch(`*[_type == "support" && _id == $id][0]._id`, {
    id: documentId,
  })

  return {
    _id: existingDoc || documentId,
    _type: 'support',
    locale,
    slug: { current: slug },
    title: stripHtml(article.title?.rendered),
    tags: extractTags(article),
    content: await htmlToPortableText(article.content?.rendered),
    publishedAt: new Date(article.date_gmt || article.date || Date.now()).toISOString(),
  }
}

// Main migration function
async function migrate() {
  console.log('🚀 Starting WordPress Support to Sanity migration...\n')

  try {
    const articles = await fetchAllSupportArticles()
    console.log(`\n📊 Total support articles to migrate: ${articles.length}\n`)

    if (articles.length === 0) {
      console.log('⚠️  No support articles found to migrate')
      return
    }

    let success = 0
    let failures = 0

    for (const article of articles) {
      try {
        const locale = article.lang || DEFAULT_LOCALE
        const doc = await mapArticleToSanity(article, locale)
        await writeClient.createOrReplace(doc)
        console.log(`✅ Migrated: ${article.title.rendered} (${locale})`)
        success += 1
      } catch (error: any) {
        console.error(`❌ Failed "${article.slug || article.id}": ${error.message}`)
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
