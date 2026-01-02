#!/usr/bin/env tsx
/**
 * Fix HTML Entities in Support Articles and Blog Posts
 *
 * This script finds and fixes raw HTML entities and tags in Portable Text content.
 * It converts things like `<code>&lt;text&gt;</code>` to proper Portable Text code marks.
 *
 * Usage: npm run fix:html-entities
 */

import { writeClient, client } from '../src/sanity/lib/client'
import { decode } from 'html-entities'
import type { SupportArticle, Post } from '../src/types/sanity'

interface PortableTextSpan {
  _key: string
  _type: 'span'
  text: string
  marks?: string[]
}

interface PortableTextBlock {
  _key: string
  _type: 'block'
  style?: string
  markDefs?: any[]
  children: PortableTextSpan[]
  listItem?: string
}

interface DocumentWithContent {
  _id: string
  _rev?: string
  _type: 'support' | 'post'
  title: string
  slug: any
  content: any[]
  locale: string
}

// Fetch all support articles with content
async function fetchAllSupportArticles(): Promise<DocumentWithContent[]> {
  const query = `*[_type == "support"] {
    _id,
    _rev,
    _type,
    title,
    slug,
    content,
    locale
  }`
  return client.fetch(query)
}

// Fetch all blog posts with content
async function fetchAllBlogPosts(): Promise<DocumentWithContent[]> {
  const query = `*[_type == "post"] {
    _id,
    _rev,
    _type,
    title,
    slug,
    content,
    locale
  }`
  return client.fetch(query)
}

// Check if text contains HTML entities or tags
function containsHtmlEntities(text: string): boolean {
  return /(&lt;|&gt;|&amp;|&quot;|&#\d+;|<\/?code>|<\/?strong>|<\/?em>|<\/?b>|<\/?i>)/i.test(text)
}

// Parse HTML-like text and extract code segments
function parseHtmlText(text: string): Array<{ text: string; isCode: boolean; isStrong: boolean; isEm: boolean }> {
  const segments: Array<{ text: string; isCode: boolean; isStrong: boolean; isEm: boolean }> = []

  // Match HTML tags and entities
  const regex = /(<\/?(?:code|strong|em|b|i)>|&lt;|&gt;|&amp;|&quot;|&#\d+;|[^<&]+)/gi

  let currentText = ''
  let inCode = false
  let inStrong = false
  let inEm = false

  const matches = text.matchAll(regex)

  for (const match of matches) {
    const token = match[0]

    if (token === '<code>') {
      if (currentText) {
        segments.push({ text: currentText, isCode: false, isStrong: inStrong, isEm: inEm })
        currentText = ''
      }
      inCode = true
    } else if (token === '</code>') {
      if (currentText) {
        segments.push({ text: decode(currentText), isCode: true, isStrong: inStrong, isEm: inEm })
        currentText = ''
      }
      inCode = false
    } else if (token === '<strong>' || token === '<b>') {
      if (currentText) {
        segments.push({ text: currentText, isCode: inCode, isStrong: false, isEm: inEm })
        currentText = ''
      }
      inStrong = true
    } else if (token === '</strong>' || token === '</b>') {
      if (currentText) {
        segments.push({ text: decode(currentText), isCode: inCode, isStrong: true, isEm: inEm })
        currentText = ''
      }
      inStrong = false
    } else if (token === '<em>' || token === '<i>') {
      if (currentText) {
        segments.push({ text: currentText, isCode: inCode, isStrong: inStrong, isEm: false })
        currentText = ''
      }
      inEm = true
    } else if (token === '</em>' || token === '</i>') {
      if (currentText) {
        segments.push({ text: decode(currentText), isCode: inCode, isStrong: inStrong, isEm: true })
        currentText = ''
      }
      inEm = false
    } else {
      currentText += token
    }
  }

  if (currentText) {
    const decoded = decode(currentText)
    segments.push({ text: decoded, isCode: inCode, isStrong: inStrong, isEm: inEm })
  }

  return segments
}

// Generate a unique key
function genKey(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`
}

// Process a single block
function processBlock(block: any): { modified: boolean; block: any } {
  if (!block || block._type !== 'block' || !block.children || !Array.isArray(block.children)) {
    return { modified: false, block }
  }

  let modified = false
  const newChildren: PortableTextSpan[] = []

  for (const child of block.children) {
    if (child._type !== 'span' || !child.text) {
      newChildren.push(child)
      continue
    }

    // Check if this span contains HTML entities or tags
    if (!containsHtmlEntities(child.text)) {
      newChildren.push(child)
      continue
    }

    // Parse the HTML text
    const segments = parseHtmlText(child.text)

    if (segments.length === 1 && segments[0].text === child.text && !segments[0].isCode && !segments[0].isStrong && !segments[0].isEm) {
      // No actual HTML found, just entities that decoded to the same thing
      newChildren.push({
        ...child,
        text: decode(child.text)
      })
      modified = true
      continue
    }

    // Create new spans for each segment
    for (const segment of segments) {
      const marks = [...(child.marks || [])]

      // Add formatting marks
      if (segment.isCode && !marks.includes('code')) {
        marks.push('code')
      }
      if (segment.isStrong && !marks.includes('strong')) {
        marks.push('strong')
      }
      if (segment.isEm && !marks.includes('em')) {
        marks.push('em')
      }

      newChildren.push({
        _key: genKey(),
        _type: 'span',
        text: segment.text,
        marks: marks.length > 0 ? marks : undefined
      })
    }

    modified = true
  }

  if (modified) {
    return {
      modified: true,
      block: {
        ...block,
        children: newChildren
      }
    }
  }

  return { modified: false, block }
}

// Process article content
function processArticleContent(content: any[]): { modified: boolean; content: any[] } {
  if (!Array.isArray(content)) {
    return { modified: false, content }
  }

  let modified = false
  const newContent = content.map(item => {
    const result = processBlock(item)
    if (result.modified) {
      modified = true
    }
    return result.block
  })

  return { modified, content: newContent }
}

// Update a single document
async function updateDocument(doc: DocumentWithContent): Promise<boolean> {
  const result = processArticleContent(doc.content)

  if (!result.modified) {
    return false
  }

  try {
    await writeClient
      .patch(doc._id)
      .set({ content: result.content })
      .commit()

    return true
  } catch (error: any) {
    throw new Error(`Failed to update document: ${error.message}`)
  }
}

// Process documents of a specific type
async function processDocuments(
  type: 'support' | 'post',
  documents: DocumentWithContent[]
): Promise<{ checked: number; updated: number; errors: number }> {
  let checkedCount = 0
  let updatedCount = 0
  let errorCount = 0

  const typeName = type === 'support' ? 'Support' : 'Blog Post'

  for (const doc of documents) {
    checkedCount++

    try {
      const wasUpdated = await updateDocument(doc)

      if (wasUpdated) {
        updatedCount++
        console.log(`✅ Updated [${typeName}]: ${doc.title} (${doc.locale})`)
      } else {
        console.log(`⏭️  Skipped [${typeName}]: ${doc.title} (${doc.locale}) - no HTML entities found`)
      }
    } catch (error: any) {
      errorCount++
      console.error(`❌ Error updating [${typeName}] "${doc.title}": ${error.message}`)
    }
  }

  return { checked: checkedCount, updated: updatedCount, errors: errorCount }
}

// Main function
async function main() {
  console.log('🚀 Starting HTML entities fix for Support Articles and Blog Posts...\n')

  try {
    // Fetch all support articles
    console.log('📥 Fetching all support articles...')
    const supportArticles = await fetchAllSupportArticles()
    console.log(`   Found ${supportArticles.length} support articles\n`)

    // Fetch all blog posts
    console.log('📥 Fetching all blog posts...')
    const blogPosts = await fetchAllBlogPosts()
    console.log(`   Found ${blogPosts.length} blog posts\n`)

    if (supportArticles.length === 0 && blogPosts.length === 0) {
      console.log('⚠️  No documents found')
      return
    }

    // Process support articles
    console.log('🔧 Processing support articles...\n')
    const supportStats = await processDocuments('support', supportArticles)

    // Process blog posts
    console.log('\n🔧 Processing blog posts...\n')
    const blogStats = await processDocuments('post', blogPosts)

    // Show summary
    const totalChecked = supportStats.checked + blogStats.checked
    const totalUpdated = supportStats.updated + blogStats.updated
    const totalErrors = supportStats.errors + blogStats.errors
    const totalSkipped = totalChecked - totalUpdated - totalErrors

    console.log('\n' + '='.repeat(50))
    console.log('✨ Process completed!')
    console.log('='.repeat(50))
    console.log(`\n📊 Overall Statistics:`)
    console.log(`   Total Checked: ${totalChecked}`)
    console.log(`   ✅ Updated: ${totalUpdated}`)
    console.log(`   ⏭️  Skipped: ${totalSkipped}`)
    console.log(`   ❌ Errors: ${totalErrors}`)
    console.log(`\n📋 By Type:`)
    console.log(`   Support Articles: ${supportStats.checked} checked, ${supportStats.updated} updated`)
    console.log(`   Blog Posts: ${blogStats.checked} checked, ${blogStats.updated} updated`)

  } catch (error: any) {
    console.error('❌ Script failed:', error.message)
    process.exit(1)
  }
}

// Run the script
main()
