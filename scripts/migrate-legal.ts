#!/usr/bin/env tsx
/**
 * WordPress Legal Pages to Sanity Migration Script
 *
 * Migrates all legal pages (pages with slug starting with /legal/) from WordPress to Sanity CMS
 *
 * Usage: npm run migrate:legal
 */

import { writeClient } from '../src/sanity/lib/client'
import { parse, HTMLElement } from 'node-html-parser'
import { decode } from 'html-entities'
import { randomUUID } from 'crypto'

const WORDPRESS_API_BASE = process.env.WORDPRESS_API_BASE || 'https://managed-builder.redirhub.com/wp-json/wp/v2'
const DEFAULT_LOCALE = process.env.WORDPRESS_DEFAULT_LOCALE || 'en'
const PAGE_SIZE = 100

interface WordPressPage {
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
  lang?: string
  translations?: Record<string, number>
}

// Utility functions
const slugify = (value: string = ''): string =>
  value
    .toString()
    .toLowerCase()
    .trim()
    .replace(/^legal[-\/]*/, '') // Remove "legal/" or "legal-" prefix
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 96) || 'document'

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

// Fetch all legal pages from WordPress
async function fetchAllLegalPages(): Promise<WordPressPage[]> {
  const pages: WordPressPage[] = []
  let page = 1
  let hasMore = true

  while (hasMore) {
    try {
      const url = `${WORDPRESS_API_BASE}/pages?page=${page}&per_page=${PAGE_SIZE}&_embed=1`
      console.log(`📥 Fetching pages (page ${page})...`)

      const response = await fetch(url)
      if (!response.ok) {
        if (response.status === 400) {
          console.log('⚠️  Reached end of pages')
          break
        }
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const data = (await response.json()) as WordPressPage[]
      if (!data || data.length === 0) {
        hasMore = false
      } else {
        // Filter only pages with slug starting with "legal"
        const legalPages = data.filter((p) => p.slug.startsWith('legal'))
        if (legalPages.length > 0) {
          pages.push(...legalPages)
          console.log(`   Found ${legalPages.length} legal pages on page ${page}`)
        }
        page += 1
      }
    } catch (error: any) {
      console.error(`❌ Error fetching page ${page}:`, error.message)
      hasMore = false
    }
  }

  return pages
}

// Map WordPress page to Sanity legal document
async function mapPageToSanity(wpPage: WordPressPage, locale: string): Promise<any> {
  const slug = slugify(wpPage.slug || wpPage.title?.rendered)
  const documentId = `legal-${wpPage.id}`

  // Check if document already exists
  const existingDoc = await writeClient.fetch(`*[_type == "legal" && _id == $id][0]._id`, {
    id: documentId,
  })

  return {
    _id: existingDoc || documentId,
    _type: 'legal',
    locale,
    slug: { current: slug },
    title: stripHtml(wpPage.title?.rendered),
    content: await htmlToPortableText(wpPage.content?.rendered),
    publishedAt: new Date(wpPage.date_gmt || wpPage.date || Date.now()).toISOString(),
  }
}

// Main migration function
async function migrate() {
  console.log('🚀 Starting WordPress Legal Pages to Sanity migration...\n')

  try {
    const pages = await fetchAllLegalPages()
    console.log(`\n📊 Total legal pages to migrate: ${pages.length}\n`)

    if (pages.length === 0) {
      console.log('⚠️  No legal pages found to migrate (pages with slug starting with "legal")')
      return
    }

    let success = 0
    let failures = 0

    for (const wpPage of pages) {
      try {
        const locale = wpPage.lang || DEFAULT_LOCALE
        const doc = await mapPageToSanity(wpPage, locale)
        await writeClient.createOrReplace(doc)
        console.log(`✅ Migrated: ${wpPage.title.rendered} (${locale}) - slug: ${wpPage.slug}`)
        success += 1
      } catch (error: any) {
        console.error(`❌ Failed "${wpPage.slug || wpPage.id}": ${error.message}`)
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
