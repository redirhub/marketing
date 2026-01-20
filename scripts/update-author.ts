#!/usr/bin/env tsx
/**
 * Batch update author reference for given postType
 *
 * Usage:
 * tsx  --env-file=.env.local scripts/update-author.ts post trinayan-ch
 */

import { writeClient } from '../src/sanity/lib/client'

const postType = process.argv[2]
const authorSlug = process.argv[3]

if (!postType || !authorSlug) {
  console.error('❌ Usage: tsx scripts/update-author.ts <postType> <authorSlug>')
  process.exit(1)
}

async function run() {
  console.log(`🚀 Updating author for postType="${postType}" → author="${authorSlug}"`)

  // 1️⃣ 找到 author 文档
  const authorId: string | null = await writeClient.fetch(
    `*[_type == "author" && slug.current == $slug][0]._id`,
    { slug: authorSlug }
  )

  if (!authorId) {
    throw new Error(`Author with slug "${authorSlug}" not found`)
  }

  console.log(`👤 Author ID: ${authorId}`)

  // 2️⃣ 找到需要更新的文章
  const docs: { _id: string }[] = await writeClient.fetch(
    `*[
      _type == $type &&
      (!defined(author._ref) || author._ref != $authorId)
    ]{
      _id
    }`,
    {
      type: postType,
      authorId,
    }
  )

  if (!docs.length) {
    console.log('⚠️ No documents need update')
    return
  }

  console.log(`📄 Found ${docs.length} documents to update`)

  let success = 0
  let failed = 0

  for (const doc of docs) {
    try {
      await writeClient
        .patch(doc._id)
        .set({
          author: {
            _type: 'reference',
            _ref: authorId,
          },
        })
        .commit()

      console.log(`✅ Updated ${doc._id}`)
      success++
    } catch (err: any) {
      console.error(`❌ Failed ${doc._id}: ${err.message}`)
      failed++
    }
  }

  console.log('\n✨ Done')
  console.log(`✅ Success: ${success}`)
  console.log(`❌ Failed: ${failed}`)
}

run().catch((err) => {
  console.error('❌ Script failed:', err.message)
  process.exit(1)
})