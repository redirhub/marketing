#!/usr/bin/env tsx
/**
 * Restore Script - Imports all content and assets
 *
 * This script restores a complete backup:
 * 1. All Sanity CMS content (all document types, including translations)
 * 2. Image assets
 *
 * Usage: npm run restore -- --input ./backups/backup-2024-01-01-123456
 *
 * Options:
 *   --input <path>     Path to backup directory (required)
 *   --locale <code>    Import only specific locale (e.g., en, de, es). Default: all locales
 *   --skip-sanity      Skip Sanity content import
 *   --skip-images      Skip image copying
 *   --dry-run          Show what would be restored without making changes
 */

import { writeClient } from '../src/sanity/lib/client'
import * as fs from 'fs'
import * as path from 'path'

// Parse command line arguments
const args = process.argv.slice(2)
const inputIndex = args.indexOf('--input')
const localeIndex = args.indexOf('--locale')
const skipSanity = args.includes('--skip-sanity')
const skipImages = args.includes('--skip-images')
const dryRun = args.includes('--dry-run')

if (inputIndex === -1) {
  console.error('❌ Error: --input parameter is required')
  console.log('\nUsage: npm run restore -- --input ./backups/backup-2024-01-01-123456')
  console.log('\nOptions:')
  console.log('  --input <path>     Path to backup directory (required)')
  console.log('  --locale <code>    Import only specific locale (e.g., en, de, es). Default: all locales')
  console.log('  --skip-sanity      Skip Sanity content import')
  console.log('  --skip-images      Skip image copying')
  console.log('  --dry-run          Show what would be restored without making changes')
  process.exit(1)
}

const targetLocale = localeIndex !== -1 ? args[localeIndex + 1] : null

const BACKUP_DIR = args[inputIndex + 1]

if (!BACKUP_DIR || !fs.existsSync(BACKUP_DIR)) {
  console.error(`❌ Error: Backup directory not found: ${BACKUP_DIR}`)
  process.exit(1)
}

// Destination directories
const IMAGES_DIR = path.join(process.cwd(), 'public', 'assets', 'images')

// Ensure directory exists
const ensureDir = (dir: string) => {
  if (!dryRun && !fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
}

// Copy directory recursively
const copyDir = (src: string, dest: string) => {
  if (dryRun) {
    console.log(`   [DRY RUN] Would copy: ${src} -> ${dest}`)
    return
  }

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

// Main restore function
async function restore() {
  console.log('🚀 Starting restore process...')
  console.log(`📁 Backup location: ${BACKUP_DIR}`)
  if (targetLocale) {
    console.log(`📍 Target locale: ${targetLocale}`)
  }

  if (dryRun) {
    console.log('🔍 DRY RUN MODE - No changes will be made\n')
  } else {
    console.log('')
  }

  // Check manifest
  const manifestPath = path.join(BACKUP_DIR, 'manifest.json')
  if (fs.existsSync(manifestPath)) {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'))
    console.log('📋 Backup manifest:')
    console.log(`   Created: ${manifest.created}`)
    console.log(`   Version: ${manifest.version}`)
    console.log(`   Project: ${manifest.projectName}\n`)
  } else {
    console.log('⚠️  Warning: manifest.json not found in backup\n')
  }

  // 1. Import Sanity CMS content
  if (!skipSanity) {
    console.log('📦 Step 1/2: Importing Sanity CMS content (including translations)...')
    try {
      // Read all documents from locale/type/slug structure
      const documents: any[] = []

      // Find all locale directories
      const backupEntries = fs.readdirSync(BACKUP_DIR, { withFileTypes: true })
      const localeDirs = backupEntries.filter(entry =>
        entry.isDirectory() && !['assets', 'images'].includes(entry.name)
      )

      if (localeDirs.length === 0) {
        console.log('   ⚠️  No content directories found, skipping')
      } else {
        // Filter locales if specific locale requested
        let localesToImport = localeDirs
        if (targetLocale) {
          localesToImport = localeDirs.filter(dir => dir.name === targetLocale)
          if (localesToImport.length === 0) {
            console.log(`   ⚠️  Locale "${targetLocale}" not found in backup`)
            console.log(`   Available locales: ${localeDirs.map(d => d.name).join(', ')}`)
            return
          }
          console.log(`   📍 Importing only locale: ${targetLocale}`)
        } else {
          console.log(`   🌍 Importing all locales: ${localeDirs.map(d => d.name).join(', ')}`)
        }

        console.log(`   Scanning ${localesToImport.length} locale directory(ies)...`)

        // Read documents from each locale
        for (const localeDir of localesToImport) {
          const localePath = path.join(BACKUP_DIR, localeDir.name)
          const typeEntries = fs.readdirSync(localePath, { withFileTypes: true })
          const typeDirs = typeEntries.filter(entry => entry.isDirectory())

          for (const typeDir of typeDirs) {
            const typePath = path.join(localePath, typeDir.name)
            const jsonFiles = fs.readdirSync(typePath).filter(f => f.endsWith('.json'))

            for (const jsonFile of jsonFiles) {
              const filePath = path.join(typePath, jsonFile)
              const doc = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
              documents.push(doc)
            }
          }
        }

        console.log(`   Found ${documents.length} documents`)

        // Additional filtering: if locale specified, also filter by document.locale field
        // Keep documents without locale field (like images) and those matching target locale
        let filteredDocuments = documents
        if (targetLocale) {
          const beforeCount = documents.length
          filteredDocuments = documents.filter(doc => {
            // Keep system documents without locale (like images)
            if (!doc.locale && (doc._type === 'sanity.imageAsset' || doc._type.startsWith('sanity.'))) {
              return true
            }
            // Keep documents matching target locale
            return doc.locale === targetLocale
          })
          console.log(`   🔍 Filtered to ${filteredDocuments.length} documents for locale "${targetLocale}" (excluded ${beforeCount - filteredDocuments.length})`)
        } else {
          filteredDocuments = documents
        }

        // Sort documents by dependency order to avoid reference errors
        // Images and authors must be imported before content that references them
        const typeOrder: Record<string, number> = {
          'sanity.imageAsset': 1,  // Images first
          'author': 2,              // Authors second
          // Everything else gets priority 3+ (default)
        }

        filteredDocuments.sort((a, b) => {
          const priorityA = typeOrder[a._type] || 999
          const priorityB = typeOrder[b._type] || 999
          return priorityA - priorityB
        })

        console.log('   📋 Sorted documents by dependency order (images → authors → content)')

        // Use filtered documents for import
        const documentsToImport = filteredDocuments

        if (dryRun) {
          console.log(`   [DRY RUN] Would import ${documentsToImport.length} documents`)

          // Show document type summary
          const typeCounts: Record<string, number> = {}
          const localeCounts: Record<string, number> = {}
          documentsToImport.forEach((doc: any) => {
            const type = doc._type || 'unknown'
            const locale = doc.locale || 'en'
            typeCounts[type] = (typeCounts[type] || 0) + 1
            localeCounts[locale] = (localeCounts[locale] || 0) + 1
          })

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
        } else {
          console.log(`   Importing ${documentsToImport.length} documents...`)

          // Import in batches to avoid overwhelming the API
          const BATCH_SIZE = 100
          let imported = 0
          let errors = 0

          for (let i = 0; i < documentsToImport.length; i += BATCH_SIZE) {
            const batch = documentsToImport.slice(i, i + BATCH_SIZE)

            try {
              // Use transaction for batch import
              const transaction = writeClient.transaction()

              batch.forEach((doc: any) => {
                transaction.createOrReplace(doc)
              })

              await transaction.commit()
              imported += batch.length

              console.log(`   Progress: ${imported}/${documentsToImport.length} documents imported`)
            } catch (error) {
              console.error(`   ⚠️  Error importing batch ${i / BATCH_SIZE + 1}:`, error)
              errors += batch.length

              // Try importing documents one by one in this batch
              console.log('   Retrying documents individually...')
              for (const doc of batch) {
                try {
                  await writeClient.createOrReplace(doc)
                  imported++
                  errors--
                } catch (docError) {
                  console.error(`   ❌ Failed to import document ${doc._id}:`, docError)
                }
              }
            }
          }

          console.log(`   ✅ Imported ${imported} documents`)
          if (errors > 0) {
            console.log(`   ⚠️  ${errors} documents failed to import`)
          }
        }
      }
    } catch (error) {
      console.error('   ❌ Error importing Sanity content:', error)
      throw error
    }
  } else {
    console.log('⏭️  Step 1/2: Skipping Sanity content import (--skip-sanity)')
  }

  // 2. Copy image assets
  if (!skipImages) {
    console.log('\n📦 Step 2/2: Restoring image assets...')
    try {
      const imagesBackupPath = path.join(BACKUP_DIR, 'assets', 'images')

      if (!fs.existsSync(imagesBackupPath)) {
        console.log('   ⚠️  images directory not found in backup, skipping')
      } else {
        copyDir(imagesBackupPath, IMAGES_DIR)

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

        const fileCount = countFiles(imagesBackupPath)
        if (dryRun) {
          console.log(`   [DRY RUN] Would copy ${fileCount} image files`)
        } else {
          console.log(`   ✅ Copied ${fileCount} image files`)
        }
      }
    } catch (error) {
      console.error('   ❌ Error restoring images:', error)
      throw error
    }
  } else {
    console.log('⏭️  Step 2/2: Skipping image restoration (--skip-images)')
  }

  if (dryRun) {
    console.log('\n🔍 DRY RUN COMPLETE - No changes were made')
    console.log('   Remove --dry-run flag to perform actual restoration')
  } else {
    console.log('\n✨ Restore completed successfully!')
  }

  console.log('\n📋 Next steps:')
  console.log('   1. Verify the restored content in Sanity Studio (including translations)')
  console.log('   2. Check that images are loading correctly')
  console.log('   3. Rebuild the site: npm run build')
  console.log('   4. Test thoroughly before deploying')
}

// Run restore
restore()
  .then(() => {
    console.log('\n✅ All done!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n❌ Restore failed:', error)
    process.exit(1)
  })
