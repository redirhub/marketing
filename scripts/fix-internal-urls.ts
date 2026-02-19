#!/usr/bin/env tsx
/**
 * Fix Internal URLs in Sanity Posts
 *
 * Replaces absolute URLs like:
 *   https://managed-builder.redirhub.com/blog/foo
 * with relative paths:
 *   /blog/foo
 *
 * Covers:
 *   - PortableText markDefs (link hrefs)
 *   - Span text that contains the old URL
 *   - All document types: post, support, changelog, legal
 *
 * Usage: tsx --env-file=.env.local scripts/fix-internal-urls.ts
 */

import { writeClient, client } from '../src/sanity/lib/client'

const OLD_ORIGIN = 'https://managed-builder.redirhub.com'

const DOC_TYPES = ['post', 'support', 'changelog', 'legal'] as const
type DocType = (typeof DOC_TYPES)[number]

interface SanityDoc {
  _id: string
  _type: DocType
  title?: string
  slug?: { current: string }
  locale?: string
  content?: any[]
}

// ------------------------------------------------------------------
// Fetching
// ------------------------------------------------------------------

async function fetchDocs(type: DocType): Promise<SanityDoc[]> {
  return client.fetch(
    `*[_type == $type] { _id, _type, title, slug, locale, content }`,
    { type }
  )
}

// ------------------------------------------------------------------
// URL replacement helpers
// ------------------------------------------------------------------

function replaceUrl(url: string): { value: string; changed: boolean } {
  if (url.startsWith(OLD_ORIGIN)) {
    return { value: url.slice(OLD_ORIGIN.length) || '/', changed: true }
  }
  return { value: url, changed: false }
}

function replaceInText(text: string): { value: string; changed: boolean } {
  if (text.includes(OLD_ORIGIN)) {
    return { value: text.replaceAll(OLD_ORIGIN, ''), changed: true }
  }
  return { value: text, changed: false }
}

// ------------------------------------------------------------------
// PortableText processing
// ------------------------------------------------------------------

function processBlock(block: any): { block: any; modified: boolean } {
  if (!block || block._type !== 'block') {
    return { block, modified: false }
  }

  let modified = false
  let updated = { ...block }

  // Fix link hrefs in markDefs
  if (Array.isArray(block.markDefs) && block.markDefs.length > 0) {
    const newMarkDefs = block.markDefs.map((def: any) => {
      if (def._type === 'link' && typeof def.href === 'string') {
        const { value, changed } = replaceUrl(def.href)
        if (changed) {
          modified = true
          return { ...def, href: value }
        }
      }
      return def
    })
    if (modified) {
      updated = { ...updated, markDefs: newMarkDefs }
    }
  }

  // Fix old URL in span text (edge case: URL pasted as plain text)
  if (Array.isArray(block.children)) {
    let childrenModified = false
    const newChildren = block.children.map((span: any) => {
      if (span._type === 'span' && typeof span.text === 'string') {
        const { value, changed } = replaceInText(span.text)
        if (changed) {
          childrenModified = true
          return { ...span, text: value }
        }
      }
      return span
    })
    if (childrenModified) {
      modified = true
      updated = { ...updated, children: newChildren }
    }
  }

  return { block: updated, modified }
}

function processContent(content: any[]): { content: any[]; modified: boolean } {
  if (!Array.isArray(content)) return { content, modified: false }

  let modified = false
  const newContent = content.map(item => {
    const result = processBlock(item)
    if (result.modified) modified = true
    return result.block
  })

  return { content: newContent, modified }
}

// ------------------------------------------------------------------
// Document update
// ------------------------------------------------------------------

async function processDoc(doc: SanityDoc): Promise<'updated' | 'skipped' | 'error'> {
  if (!Array.isArray(doc.content) || doc.content.length === 0) return 'skipped'

  const { content, modified } = processContent(doc.content)
  if (!modified) return 'skipped'

  try {
    await writeClient.patch(doc._id).set({ content, needsTranslation: true }).commit()
    return 'updated'
  } catch (err: any) {
    console.error(`  ERROR [${doc._id}]: ${err.message}`)
    return 'error'
  }
}

// ------------------------------------------------------------------
// Main
// ------------------------------------------------------------------

async function main() {
  console.log(`Replacing "${OLD_ORIGIN}" with relative paths in Sanity...\n`)

  let totalChecked = 0
  let totalUpdated = 0
  let totalErrors = 0

  for (const type of DOC_TYPES) {
    console.log(`Fetching ${type} documents...`)
    const docs = await fetchDocs(type)
    console.log(`  Found ${docs.length} documents`)

    let updated = 0
    let errors = 0

    for (const doc of docs) {
      totalChecked++
      const label = doc.title || doc.slug?.current || doc._id
      const locale = doc.locale ? ` (${doc.locale})` : ''
      const result = await processDoc(doc)

      if (result === 'updated') {
        updated++
        totalUpdated++
        console.log(`  [updated] ${label}${locale}`)
      } else if (result === 'error') {
        errors++
        totalErrors++
        console.log(`  [error]   ${label}${locale}`)
      }
    }

    console.log(`  -> ${updated} updated, ${errors} errors\n`)
  }

  console.log('='.repeat(50))
  console.log('Done.')
  console.log(`  Checked: ${totalChecked}`)
  console.log(`  Updated: ${totalUpdated}`)
  console.log(`  Errors:  ${totalErrors}`)
}

main().catch(err => {
  console.error('Fatal:', err.message)
  process.exit(1)
})
