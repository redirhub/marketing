#!/bin/bash
#
# Copy Sanity Images Between Projects
#
# This script exports the dataset from the old project and imports it to the new project.
# This ensures all image assets are properly copied to the new project's CDN.
#
# Usage: ./scripts/copy-sanity-images.sh <OLD_PROJECT_TOKEN>
#

set -e

OLD_PROJECT_ID="a484lrp0"
NEW_PROJECT_ID="3aqpp6gz"
NEW_PROJECT_TOKEN="skol4ZC1XfXVMvZK3Zm8F27mcxJ2dcOKbcYe3F8Hx5rKMAQj4A2YNqsxTP3pLNiQHUxNkwhUJ7jAgYYlHi47XZNwdfHVwBRyesKQTGMdzOu1OH7SsOhAg4dBRRNDiMG8AwOTLIvVQJ4d7QvbUDnxBCmRp0EjVxwhrfipufBJftPKx7TDKyZa"
EXPORT_FILE="sanity-export-$(date +%Y%m%d-%H%M%S).tar.gz"

# Check if old project token provided
if [ -z "$1" ]; then
  echo "❌ Error: Old project token required"
  echo ""
  echo "Usage: ./scripts/copy-sanity-images.sh <OLD_PROJECT_TOKEN>"
  echo ""
  echo "To get the old project token:"
  echo "1. Go to https://sanity.io/manage"
  echo "2. Select project: $OLD_PROJECT_ID"
  echo "3. Go to API → Tokens"
  echo "4. Create a token with 'Viewer' or 'Read' permissions"
  echo "5. Run: ./scripts/copy-sanity-images.sh <TOKEN>"
  exit 1
fi

OLD_PROJECT_TOKEN="$1"

echo "🚀 Starting Sanity image migration..."
echo "📁 Old Project: $OLD_PROJECT_ID"
echo "📁 New Project: $NEW_PROJECT_ID"
echo ""

# Step 1: Export from old project
echo "📦 Step 1/2: Exporting dataset from old project..."
echo "   This will include all documents and image assets..."
npx sanity dataset export production "$EXPORT_FILE" \
  --project "$OLD_PROJECT_ID" \
  --token "$OLD_PROJECT_TOKEN"

if [ $? -eq 0 ]; then
  echo "   ✅ Export completed: $EXPORT_FILE"

  # Show file size
  FILE_SIZE=$(du -h "$EXPORT_FILE" | cut -f1)
  echo "   📊 Export size: $FILE_SIZE"
else
  echo "   ❌ Export failed"
  exit 1
fi

echo ""

# Step 2: Import to new project
echo "📦 Step 2/2: Importing to new project..."
echo "   This will upload all images to the new project's CDN..."
echo "   Note: Existing documents will be replaced with --replace flag"
echo ""

npx sanity dataset import "$EXPORT_FILE" production \
  --project "$NEW_PROJECT_ID" \
  --token "$NEW_PROJECT_TOKEN" \
  --replace

if [ $? -eq 0 ]; then
  echo ""
  echo "✨ Migration completed successfully!"
  echo ""
  echo "📋 Next steps:"
  echo "   1. Check your site: http://localhost:3000"
  echo "   2. Verify images are loading"
  echo "   3. Keep the export file for backup: $EXPORT_FILE"
else
  echo ""
  echo "❌ Import failed"
  echo "   Export file saved: $EXPORT_FILE"
  exit 1
fi
