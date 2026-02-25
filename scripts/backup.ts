#!/usr/bin/env tsx
/**
 * Backup Script - Exports all content and assets
 *
 * This script creates a complete backup of:
 * 1. All Sanity CMS content (all document types, including translations)
 * 2. Image assets
 *
 * Usage: npm run backup
 *        npm run backup -- --output ./my-backup
 */

import { writeClient } from '../src/sanity/lib/client'
import * as fs from 'fs'
import * as path from 'path'

// Parse command line arguments
const args = process.argv.slice(2)
const outputIndex = args.indexOf('--output')
const customOutput = outputIndex !== -1 ? args[outputIndex + 1] : null

// Configuration
const BACKUP_DIR = customOutput || path.join(process.cwd(), 'backups', `backup-${new Date().toISOString().split('T')[0]}-${Date.now()}`)
const IMAGES_DIR = path.join(process.cwd(), 'public', 'assets', 'images')

// Ensure backup directories exist
const ensureDir = (dir: string) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
}

// Copy directory recursively
const copyDir = (src: string, dest: string) => {
  ensureDir(dest)
  const entries = fs.readdirSync(src, { withFileTypes: true })

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name)
    const destPath = path.join(dest, entry.name)

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath)
    } else {
      fs.copyFileSync(srcPath, destPath)
    }
  }
}

// Main backup function
async function backup() {
  console.log('🚀 Starting backup process...')
  console.log(`📁 Backup location: ${BACKUP_DIR}\n`)

  ensureDir(BACKUP_DIR)

  // 1. Export Sanity CMS content
  console.log('📦 Step 1/2: Exporting Sanity CMS content (including translations)...')
  try {
    const query = '*[!(_id in path("_.**"))]' // Exclude system documents
    const documents = await writeClient.fetch(query)

    console.log(`   Found ${documents.length} documents`)

    // Create a summary by document type and locale
    const typeCounts: Record<string, number> = {}
    const localeCounts: Record<string, number> = {}
    let savedCount = 0

    // Save each document as individual JSON file
    documents.forEach((doc: any) => {
      const type = doc._type || 'unknown'
      const locale = doc.locale || 'en'
      const slug = doc.slug?.current || doc._id

      // Create directory structure: backup-xxx/{locale}/{type}/
      const typeDir = path.join(BACKUP_DIR, locale, type)
      ensureDir(typeDir)

      // Create safe filename from slug or ID
      const safeFilename = slug.replace(/[^a-zA-Z0-9-_]/g, '-') + '.json'
      const filePath = path.join(typeDir, safeFilename)

      // Write individual document
      fs.writeFileSync(filePath, JSON.stringify(doc, null, 2))

      // Update counts
      typeCounts[type] = (typeCounts[type] || 0) + 1
      localeCounts[locale] = (localeCounts[locale] || 0) + 1
      savedCount++
    })

    console.log(`   ✅ Exported ${savedCount} documents as individual files`)
    console.log('   📊 Document types:')
    Object.entries(typeCounts)
      .sort(([, a], [, b]) => b - a)
      .forEach(([type, count]) => {
        console.log(`      - ${type}: ${count}`)
      })
    console.log('   🌍 Languages:')
    Object.entries(localeCounts)
      .sort(([, a], [, b]) => b - a)
      .forEach(([locale, count]) => {
        console.log(`      - ${locale}: ${count}`)
      })
  } catch (error) {
    console.error('   ❌ Error exporting Sanity content:', error)
    throw error
  }

  // 2. Copy image assets
  console.log('\n📦 Step 2/2: Copying image assets...')
  try {
    if (fs.existsSync(IMAGES_DIR)) {
      const imagesBackupPath = path.join(BACKUP_DIR, 'assets', 'images')
      copyDir(IMAGES_DIR, imagesBackupPath)

      // Count files recursively
      const countFiles = (dir: string): number => {
        let count = 0
        const entries = fs.readdirSync(dir, { withFileTypes: true })
        for (const entry of entries) {
          if (entry.isDirectory()) {
            count += countFiles(path.join(dir, entry.name))
          } else {
            count++
          }
        }
        return count
      }

      const fileCount = countFiles(IMAGES_DIR)
      console.log(`   ✅ Copied ${fileCount} image files`)
    } else {
      console.log('   ⚠️  images directory not found, skipping')
    }
  } catch (error) {
    console.error('   ❌ Error copying images:', error)
    throw error
  }

  // Create backup manifest
  const manifest = {
    created: new Date().toISOString(),
    version: '3.0.0',
    projectName: 'redirhub-marketing',
    structure: 'Individual JSON files organized by locale/type/slug',
    contents: {
      sanity: '{locale}/{type}/{slug}.json - Individual documents',
      images: 'assets/images/',
    },
  }

  fs.writeFileSync(
    path.join(BACKUP_DIR, 'manifest.json'),
    JSON.stringify(manifest, null, 2)
  )

  console.log('\n✨ Backup completed successfully!')
  console.log(`📁 Backup saved to: ${BACKUP_DIR}`)
  console.log('\n📋 Next steps:')
  console.log('   1. Review the backup files')
  console.log('   2. Store the backup in a safe location')
  console.log('   3. To restore, run: npm run restore -- --input ' + BACKUP_DIR)
}

// Run backup
backup()
  .then(() => {
    console.log('\n✅ All done!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n❌ Backup failed:', error)
    process.exit(1)
  })
