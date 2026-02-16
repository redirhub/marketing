#!/usr/bin/env tsx
/**
 * Bulk update needsTranslation field to true for English posts
 *
 * Usage:
 * tsx --env-file=.env.local scripts/update-needs-translation.ts
 */

import { writeClient } from '../src/sanity/lib/client'

async function run() {
  console.log('🚀 Updating needsTranslation field for English posts...\n')

  // 1️⃣ Fetch all English posts
  const docs: { _id: string; title: string; needsTranslation?: boolean }[] = await writeClient.fetch(
    `*[_type == "landingPage" && locale == "en"]{
      _id,
      title,
      needsTranslation
    }`
  )

  if (!docs.length) {
    console.log('⚠️ No English posts found')
    return
  }

  console.log(`📄 Found ${docs.length} English posts\n`)

  let success = 0
  let failed = 0
  let skipped = 0

  for (const doc of docs) {
    try {
      // Skip if already set to true
      if (doc.needsTranslation === true) {
        console.log(`⏭️  Skipped ${doc._id} - "${doc.title}" (already marked)`)
        skipped++
        continue
      }

      await writeClient
        .patch(doc._id)
        .set({ needsTranslation: true })
        .commit()

      console.log(`✅ Updated ${doc._id} - "${doc.title}"`)
      success++
    } catch (err: any) {
      console.error(`❌ Failed ${doc._id} - "${doc.title}": ${err.message}`)
      failed++
    }
  }

  console.log('\n✨ Done')
  console.log(`✅ Success: ${success}`)
  console.log(`⏭️  Skipped: ${skipped}`)
  console.log(`❌ Failed: ${failed}`)
}

run().catch((err) => {
  console.error('❌ Script failed:', err.message)
  process.exit(1)
})
