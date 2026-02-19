#!/usr/bin/env tsx
/**
 * Script: Delete all testimonials where locale is not "en"
 *
 * Fetches every testimonial document whose locale field is not "en"
 * and permanently deletes them from Sanity.
 *
 * Run with: npx tsx scripts/delete-non-en-testimonials.ts
 *
 * Pass --dry-run to preview what would be deleted without making changes:
 *   npx tsx scripts/delete-non-en-testimonials.ts --dry-run
 */

import { writeClient } from '../src/sanity/lib/client'

const isDryRun = process.argv.includes('--dry-run')

async function main() {
  if (isDryRun) {
    console.log('[dry-run] No documents will be deleted.\n')
  }

  console.log('[delete-non-en-testimonials] Fetching non-en testimonials...')

  const docs = await writeClient.fetch<Array<{ _id: string; author: string; locale: string }>>(
    `*[_type == "testimonial" && locale != "en"]{ _id, author, locale }`
  )

  if (docs.length === 0) {
    console.log('No non-en testimonials found. Nothing to delete.')
    return
  }

  console.log(`Found ${docs.length} testimonial(s) to delete:\n`)
  for (const doc of docs) {
    console.log(`  - ${doc._id}  author: "${doc.author}"  locale: ${doc.locale}`)
  }
  console.log()

  if (isDryRun) {
    console.log(`[dry-run] Would delete ${docs.length} document(s). Re-run without --dry-run to apply.`)
    return
  }

  let deleted = 0
  let failed = 0

  for (const doc of docs) {
    try {
      await writeClient.delete(doc._id)
      console.log(`[delete-non-en-testimonials] ✓ Deleted ${doc._id} (${doc.author} / ${doc.locale})`)
      deleted++
    } catch (err) {
      console.error(`[delete-non-en-testimonials] ✗ Failed to delete ${doc._id}`, err)
      failed++
    }
  }

  console.log(`\n[delete-non-en-testimonials] Done. ${deleted} deleted, ${failed} failed.`)
}

main().catch((err) => {
  console.error('[delete-non-en-testimonials] Fatal error:', err)
  process.exit(1)
})
