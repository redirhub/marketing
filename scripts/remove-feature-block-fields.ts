#!/usr/bin/env tsx
/**
 * Migration Script: Clean up feature blocks in landingPage content arrays
 *
 * For every landingPage document this script:
 *   1. Renames _type 'featureSplitBlock' → 'feature'
 *   2. Removes deprecated fields: removePaddingBottom, imageBorderRadius
 *
 * Run with: npx tsx scripts/remove-feature-block-fields.ts
 *
 * Safe to re-run — skips documents that need no changes.
 */

import { writeClient } from '../src/sanity/lib/client'

async function main() {
  console.log('[Migration] Fetching landingPage documents...')

  const docs = await writeClient.fetch<Array<{ _id: string; content: any[] }>>(
    `*[_type == "landingPage" && defined(content)]{ _id, content }`
  )

  console.log(`[Migration] Found ${docs.length} document(s).`)

  let updated = 0
  let skipped = 0
  let failed = 0

  for (const doc of docs) {
    const needsUpdate = doc.content?.some(
      (block: any) =>
        block._type === 'featureSplitBlock' ||
        (block._type === 'feature' && ('removePaddingBottom' in block || 'imageBorderRadius' in block))
    )

    if (!needsUpdate) {
      skipped++
      continue
    }

    const cleanedContent = doc.content.map((block: any) => {
      if (block._type !== 'featureSplitBlock' && block._type !== 'feature') return block
      const { removePaddingBottom, imageBorderRadius, _type, ...rest } = block
      return { ...rest, _type: 'feature' }
    })

    try {
      await writeClient.patch(doc._id).set({ content: cleanedContent }).commit()
      console.log(`[Migration] ✓ ${doc._id}`)
      updated++
    } catch (err) {
      console.error(`[Migration] ✗ ${doc._id}`, err)
      failed++
    }
  }

  console.log(`\n[Migration] Done. ${updated} updated, ${skipped} skipped, ${failed} failed.`)
}

main().catch((err) => {
  console.error('[Migration] Fatal error:', err)
  process.exit(1)
})
