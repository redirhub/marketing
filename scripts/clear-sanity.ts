#!/usr/bin/env tsx
/**
 * Clear Sanity - Deletes all documents from Sanity CMS
 *
 * WARNING: This will delete ALL documents. Use with caution!
 *
 * Usage: tsx --env-file=.env.local scripts/clear-sanity.ts
 */

import { writeClient } from '../src/sanity/lib/client'

async function clearSanity() {
  console.log('⚠️  WARNING: This will delete ALL documents from Sanity!')
  console.log('📁 Project ID:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID)
  console.log('📁 Dataset:', process.env.NEXT_PUBLIC_SANITY_DATASET)
  console.log('')

  try {
    // Fetch all documents with their types
    const query = '*[!(_id in path("_.**"))]{_id, _type}'
    const docs = await writeClient.fetch(query)

    console.log(`Found ${docs.length} documents to delete`)

    if (docs.length === 0) {
      console.log('✅ No documents to delete')
      return
    }

    // Sort in reverse dependency order (content first, then authors, then images last)
    const typeOrder: Record<string, number> = {
      'sanity.imageAsset': 999,  // Images last
      'author': 998,              // Authors second to last
      // Everything else gets priority 1-997 (deleted first)
    }

    docs.sort((a, b) => {
      const priorityA = typeOrder[a._type] || 1
      const priorityB = typeOrder[b._type] || 1
      return priorityA - priorityB
    })

    console.log('Deleting documents in reverse dependency order...')

    // Delete in batches
    const BATCH_SIZE = 100
    let deleted = 0

    for (let i = 0; i < docs.length; i += BATCH_SIZE) {
      const batch = docs.slice(i, i + BATCH_SIZE)
      const transaction = writeClient.transaction()

      batch.forEach((doc: any) => {
        transaction.delete(doc._id)
      })

      try {
        await transaction.commit()
        deleted += batch.length
        console.log(`Progress: ${deleted}/${docs.length} documents deleted`)
      } catch (batchError: any) {
        // If batch fails, try individually
        console.log(`   Batch failed, retrying individually...`)
        for (const doc of batch) {
          try {
            await writeClient.delete(doc._id)
            deleted++
          } catch (docError) {
            console.log(`   Skipping ${doc._id} (${doc._type}) - may have references`)
          }
        }
      }
    }

    console.log(`✅ Deleted ${deleted} documents`)
  } catch (error) {
    console.error('❌ Error:', error)
    throw error
  }
}

clearSanity()
  .then(() => {
    console.log('\n✅ All done!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n❌ Failed:', error)
    process.exit(1)
  })
