# Landing Pages Content

This folder contains landing page definitions in JSON format for importing into Sanity CMS.

## Available Landing Pages

- `free-redirect-service.json` - Free Redirect Service landing page
- `url-redirect-service.json` - URL Redirect Service landing page
- `301-redirect-service.json` - 301 Redirect Service landing page

## How to Import

**Import a specific landing page:**

```bash
tsx --env-file=.env.local scripts/import-landing-page.ts content-landings/free-redirect-service.json
```

**Import all landing pages** (using bash for loop):

```bash
for file in content-landings/*.json; do
  tsx --env-file=.env.local scripts/import-landing-page.ts "$file"
done
```

The script will:
- Read the specified JSON file
- Transform it to Sanity document format
- Check if the landing page already exists (by slug and locale)
- Skip if it exists to avoid duplicates
- Create the landing page in Sanity if it doesn't exist

## JSON Structure

Each landing page JSON file includes:

- **title** - Page title
- **slug** - URL slug
- **meta** - SEO metadata (metaTitle, metaDescription, ogImage)
- **hero** - Hero section with headline, subheadline, CTA, image, and heroSections array
- **richContent** - Rich text content using Portable Text format
- **faqs** - Array of FAQ items
- **sections** - Optional page sections array (contentTable, testimonials, blogInsight)
- **footerType** - Footer style (default, with-widgets)
- **publishedAt** - Publication date
- **isActive** - Whether the page is active
- **onFooter** - Whether to show in footer links
- **locale** - Language code (e.g., 'en')
- **needsTranslation** - (optional) Auto-translate flag

## Adding New Landing Pages

1. Create a new JSON file in this directory following the structure above
2. Run the import script with the path to your new file
