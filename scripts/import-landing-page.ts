#!/usr/bin/env tsx
/**
 * Import Landing Page to Sanity
 *
 * Imports a landing page from a JSON file to Sanity CMS
 *
 * Usage:
 *   tsx --env-file=.env.local scripts/import-landing-page.ts content-landings/free-redirect-service.json
 */

import { writeClient } from '../src/sanity/lib/client'
import { readFileSync } from 'fs'
import { randomUUID } from 'crypto'

const genKey = (): string => randomUUID()

// Add _key to array items and process blocks
function processContent(content: any[]): any[] {
  return content.map((item) => {
    const processed: any = {
      ...item,
      _key: genKey(),
    }

    // Process block children
    if (item._type === 'block' && item.children) {
      processed.children = item.children.map((child: any) => ({
        ...child,
        _key: genKey(),
      }))
    }

    // Process markDefs if present
    if (item._type === 'block' && item.markDefs) {
      processed.markDefs = item.markDefs.map((def: any) => ({
        ...def,
        _key: genKey(),
      }))
    }

    return processed
  })
}

// Transform JSON to Sanity document
function transformToSanityDocument(data: any): any {
  return {
    _type: 'landingPage',
    title: data.title,
    slug: data.slug,
    meta: data.meta,
    hero: {
      ...data.hero,
      heroSections: data.hero.heroSections || [],
    },
    richContent: processContent(data.richContent),
    faqs: data.faqs.map((faq: any) => ({
      ...faq,
      _key: genKey(),
      _type: 'object',
    })),
    sections: data.sections || [],
    footerType: data.footerType,
    publishedAt: data.publishedAt,
    isActive: data.isActive,
    onFooter: data.onFooter,
    locale: data.locale,
    needsTranslation: data.needsTranslation || false,
  }
}

// Main import function
async function importLandingPage(filePath: string) {
  console.log('🚀 Starting landing page import...\n')

  try {
    // Read JSON file
    console.log(`📖 Reading file: ${filePath}`)
    const fileContent = readFileSync(filePath, 'utf-8')
    const data = JSON.parse(fileContent)

    // Check if document already exists
    const existing = await writeClient.fetch(
      `*[_type == "landingPage" && slug.current == $slug && locale == $locale][0]`,
      { slug: data.slug.current, locale: data.locale }
    )

    // Transform document
    const document = transformToSanityDocument(data)

    if (existing) {
      // Update existing document
      document._id = existing._id
      const result = await writeClient.createOrReplace(document)
      console.log(`🔄 Updated existing landing page: ${data.title}`)
      console.log(`   ID: ${result._id}`)
      console.log(`   Slug: ${data.slug.current}`)
      console.log(`   Locale: ${data.locale}\n`)
    } else {
      // Create new document
      const result = await writeClient.create(document)
      console.log(`✅ Created new landing page: ${data.title}`)
      console.log(`   ID: ${result._id}`)
      console.log(`   Slug: ${data.slug.current}`)
      console.log(`   Locale: ${data.locale}\n`)
    }

    console.log('✨ Import completed!\n')
  } catch (error: any) {
    console.error(`❌ Error importing landing page:`, error.message)
    process.exit(1)
  }
}

// Parse arguments
const args = process.argv.slice(2)
if (args.length === 0) {
  console.error('❌ Error: No JSON file specified\n')
  console.log('Usage: tsx --env-file=.env.local scripts/import-landing-page.ts <json-file>')
  console.log('Example: tsx --env-file=.env.local scripts/import-landing-page.ts content-landings/free-redirect-service.json\n')
  process.exit(1)
}

const filePath = args[0]
importLandingPage(filePath)
