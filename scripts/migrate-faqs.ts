#!/usr/bin/env tsx
/**
 * FAQ Migration Script
 * Extracts hardcoded FAQs from page files and imports to Sanity
 *
 * Usage: npm run migrate:faqs
 */

import { writeClient } from '../src/sanity/lib/client'
import { readFileSync } from 'fs'
import { join } from 'path'

const DEFAULT_LOCALE = 'en'

interface FAQData {
  pageSlug: string
  filePath: string
}

// Map of pages with FAQs
const FAQ_PAGES: FAQData[] = [
  { pageSlug: 'homepage', filePath: 'src/app/[locale]/page.tsx' },
  { pageSlug: 'create-redirects', filePath: 'src/app/[locale]/create-redirects/page.tsx' },
  { pageSlug: 'manage-redirects', filePath: 'src/app/[locale]/manage-redirects/page.tsx' },
  { pageSlug: 'domain-parking', filePath: 'src/app/[locale]/domain-parking/page.tsx' },
  { pageSlug: 'analyze-redirects', filePath: 'src/app/[locale]/analyze-redirects/page.tsx' },
  { pageSlug: 'team-management', filePath: 'src/app/[locale]/team-management/page.tsx' },
  { pageSlug: 'global-scale', filePath: 'src/app/[locale]/global-scale/page.tsx' },
  { pageSlug: 'security', filePath: 'src/app/[locale]/security/page.tsx' },
  { pageSlug: 'free-redirect-service', filePath: 'src/app/[locale]/free-redirect-service/page.tsx' },
]

// Extract FAQ data from file content
function extractFAQsFromFile(content: string): any[] {
  // Match faqData array definition
  const faqDataMatch = content.match(/const\s+faqData\s*=\s*\[([\s\S]*?)\];/m)
  if (!faqDataMatch) return []

  const arrayContent = faqDataMatch[1]

  // Extract individual FAQ objects
  const faqMatches = arrayContent.matchAll(/\{[\s\S]*?value:\s*["']([^"']+)["'],[\s\S]*?question:\s*["'](.*?)["'],[\s\S]*?answer:\s*["'](.*?)["'],?[\s\S]*?\}/g)

  const faqs: any[] = []
  for (const match of faqMatches) {
    faqs.push({
      question: match[2].replace(/\\"/g, '"').replace(/\\'/g, "'"),
      answer: match[3].replace(/\\"/g, '"').replace(/\\'/g, "'"),
    })
  }

  return faqs
}

async function migrate() {
  console.log('🚀 Starting FAQ migration...\n')

  let success = 0
  let failures = 0
  let skipped = 0

  for (const page of FAQ_PAGES) {
    try {
      const filePath = join(process.cwd(), page.filePath)

      // Read file
      let content: string
      try {
        content = readFileSync(filePath, 'utf-8')
      } catch (err) {
        console.log(`⚠️  Skipped: ${page.pageSlug} (file not found)`)
        skipped += 1
        continue
      }

      // Extract FAQs
      const faqs = extractFAQsFromFile(content)

      if (faqs.length === 0) {
        console.log(`⚠️  Skipped: ${page.pageSlug} (no FAQs found)`)
        skipped += 1
        continue
      }

      // Create Sanity document
      const documentId = `faqset-${page.pageSlug}-${DEFAULT_LOCALE}`

      // Check if already exists
      const existing = await writeClient.fetch(
        `*[_type == "faqSet" && pageSlug == $pageSlug && locale == $locale][0]._id`,
        { pageSlug: page.pageSlug, locale: DEFAULT_LOCALE }
      )

      const doc = {
        _id: existing || documentId,
        _type: 'faqSet',
        pageSlug: page.pageSlug,
        locale: DEFAULT_LOCALE,
        faqs: faqs,
      }

      await writeClient.createOrReplace(doc)
      console.log(`✅ Migrated: ${page.pageSlug} (${faqs.length} FAQs)`)
      success += 1
    } catch (error: any) {
      console.error(`❌ Failed: ${page.pageSlug} - ${error.message}`)
      failures += 1
    }
  }

  console.log(`\n✨ Migration completed!`)
  console.log(`✅ Success: ${success}`)
  console.log(`❌ Failures: ${failures}`)
  console.log(`⚠️  Skipped: ${skipped}`)
}

migrate()
