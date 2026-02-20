#!/usr/bin/env tsx
/**
 * Script: Delete all documents of a given type where locale is not "en"
 *
 * Fetches every document of the given type whose locale field is not "en"
 * and permanently deletes them from Sanity.
 *
 * Run with: npx tsx scripts/delete-non-en-articles.ts
 *
 * Pass --dry-run to preview what would be deleted without making changes
 */

import { writeClient } from '../src/sanity/lib/client'

const type = process.env.TYPE || 'support'

const isDryRun = process.argv.includes('--dry-run')

async function main() {
  if (isDryRun) {
    console.log('[dry-run] No documents will be deleted.\n')
  }

  console.log(`[delete-non-en] Fetching non-en documents of type "${type}"...`)

  const docs = await writeClient.fetch<Array<{ _id: string; author?: string; locale: string; slug?: { current: string } }>>(
    `*[_type == "${type}" && locale != "en"]{ _id, author, locale, slug }`
  )

  if (docs.length === 0) {
    console.log(`No non-en documents of type "${type}" found. Nothing to delete.`)
    return
  }

  console.log(`Found ${docs.length} document(s) of type "${type}" to delete:\n`)
  for (const doc of docs) {
    console.log(`  - ${doc._id}  author: "${doc.author}"  locale: ${doc.locale}`)
  }
  console.log()

  const slugsToMark: string[] = []

  if (isDryRun) {
    console.log(`[dry-run] Would delete ${docs.length} document(s). Re-run without --dry-run to apply.`)
    return
  }

  let deleted = 0
  let failed = 0

  for (const doc of docs) {
    try {
      if (doc.slug?.current) slugsToMark.push(doc.slug.current)
      await writeClient.delete(doc._id)
      console.log(`[delete-non-en] ✓ Deleted ${doc._id} (${doc.author ?? 'unknown'} / ${doc.locale})`)
      deleted++
    } catch (err) {
      console.error(`[delete-non-en-testimonials] ✗ Failed to delete ${doc._id}`, err)
      failed++
    }
  }

  if (slugsToMark.length) {
    console.log(`[info] Marking ${slugsToMark.length} English documents as needsTranslation = true...`)
    const transaction = writeClient.transaction()
    for (const slug of slugsToMark) {
      transaction.patch(
        `*[_type == "${type}" && slug.current == "${slug}" && locale == "en"][0]`,
        (p) => p.set({ needsTranslation: true })
      )
    }
    await transaction.commit()
    console.log(`[info] Batch update completed.`)
  }

  console.log(`\n[delete-non-en] Done for type "${type}". ${deleted} deleted, ${failed} failed.`)
}

main().catch((err) => {
  console.error('[delete-non-en-testimonials] Fatal error:', err)
  process.exit(1)
})
