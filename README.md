# RedirHub Marketing Site

Modern Next.js 16 marketing website for RedirHub with Chakra UI v3 and HTTP backend translations.

## 🚀 Tech Stack

- **Framework**: Next.js 16.0.7 (App Router)
- **UI Library**: Chakra UI v3.30.0
- **Styling**: Emotion (CSS-in-JS)
- **Language**: TypeScript 5.7.0
- **Internationalization**: i18next + react-i18next + i18next-http-backend
- **React**: 19.2.0
- **Font**: Inter (Google Fonts)

## 📁 Project Structure

```
redirhub-marketing/
├── src/
│   ├── app/
│   │   ├── [locale]/              # Locale-based routing
│   │   │   ├── layout.tsx         # Root layout with providers
│   │   │   ├── page.tsx           # Home page
│   │   │   ├── features/          # Features pages
│   │   │   ├── pricing/           # Pricing page
│   │   │   └── legal/             # Legal pages
│   │   └── api/
│   │       └── translation/       # Translation API routes
│   ├── components/
│   │   ├── ui/                    # Chakra UI snippets
│   │   ├── layout/                # Header, Footer
│   │   ├── home/                  # Home page components
│   │   └── shared/                # Shared components
│   ├── lib/
│   │   ├── i18n/                  # Translation configuration
│   │   └── theme/                 # Chakra UI theme
│   └── middleware.ts              # Locale routing middleware
├── scripts/
│   └── generate-locales.js        # Build-time translation fetcher
├── public/
│   └── locales/                   # Generated translation files
├── i18n.config.js                 # i18next configuration
└── .env.development               # Environment variables
```

## 🛠️ Development

### Prerequisites

- Node.js 20.9.0 or higher
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Visit: **http://localhost:3000**

### Available Scripts

```bash
npm run dev              # Start development server
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint
npm run generate-locales # Fetch translations from backend
```

## 🌍 Internationalization

### Supported Languages

- **English** (en) - Default, hidden from URL
- German (de)
- Spanish (es)
- French (fr)
- Italian (it)
- Portuguese (pt)
- Japanese (ja)
- Chinese (zh)
- Korean (ko)

### URL Structure

- English (default): `/`, `/features`, `/pricing`
- Other languages: `/de`, `/de/features`, `/es/pricing`

### Translation System

This project uses the **HTTP backend translation pattern** :

1. **Build-time Generation**: Translations fetched from HTTP API during build
2. **Static Serving**: Generated translations saved to `public/locales/{lang}/common.json`
3. **No Runtime Fetching**: Browser loads pre-generated JSON files (fast!)
4. **Missing Key Tracking**: Reports missing translations via `/api/translation/missing`

### Configuration

Edit `.env.development`:

```env
# Site Configuration
NEXT_PUBLIC_SITE_NAME=RedirHub

# Translation Backend
TRANSLATION_URL=https://api.redirhub.com/translations/json/marketing/{{lng}}
TRANSLATION_MISSING_URL=https://api.redirhub.com/translations/missing

# Supported Locales
NEXT_PUBLIC_LOCALES=en,de,es,fr,it,pt,ja,zh,ko
NEXT_PUBLIC_LOCALE=en

# Dashboard (main app)
NEXT_PUBLIC_DASHBOARD_BASE=https://app.redirhub.com
```

### Generate Translations

```bash
# Fetch translations from backend
npm run generate-locales

# Build with translations
npm run build
```

## 🎨 Theme Customization

The custom Chakra UI theme is located in `src/lib/theme/`:

- **colors.ts** - Brand colors (Primary: #1C6DB6)
- **typography.ts** - Font tokens (Inter font)
- **index.ts** - Main theme configuration

### Brand Colors

```js
primary: {
  600: '#1C6DB6',  // Primary
  700: '#1962A4',  // Primary Text
}
```

## 📄 Pages

Information Architecture
`

1. Home
   - /

2. SEO Landing Pages
   - /free-redirect-service
   - /301-redirect-service
   - /url-redirect-service

3. Features
   - /features
     - /manage-redirects
     - /create-redirects
     - /analyze-redirects
     - /team-management
     - /global-scale
     - /security

4. Solutions
   - /solutions
     - /solutions/domain-parking
     - /solutions/website-migrations
     - /solutions/scalable-enterprise-solutions
     - /solutions/marketing-campaigns

5. Enterprise / Business
   - /enterprise

6. Pricing
   - /pricing
   - /charge

7. Support
   - /support

8. Legal
   - /legal
     - /legal/cookie-policy
     - /legal/privacy-policy
     - /legal/terms-of-service
     - /legal/data-subprocessors
     - /legal/security-compliance-information
     - /legal/acceptable-use-policy
     - /legal/data-processing-addendum

9. Blog
   - /blog

`

### Current Pages

- **/** - Home page (Hero, Key Metrics, CTA)
- **/features** - Features overview
- **/pricing** - Pricing plans
- **/legal** - Legal documents index
- **/legal/privacy-policy** - Privacy policy
- **/legal/terms-of-service** - Terms of service

### Adding New Pages

1. Create page in `src/app/[locale]/your-page/page.tsx`
2. Add translations to `public/locales/{lang}/common.json`
3. Update navigation in Header/Footer components

## 📦 Deployment

### Build

```bash
npm run build
```

The build outputs a **standalone** build in `.next/standalone/` for optimal Docker deployments.

### Environment Variables

Set these in your deployment environment:

```env
NEXT_PUBLIC_SITE_URL=https://redirhub.com
NEXT_PUBLIC_SITE_NAME=RedirHub
NEXT_PUBLIC_DASHBOARD_BASE=https://app.redirhub.com
TRANSLATION_URL=https://api.redirhub.com/translations/json/marketing/{{lng}}
TRANSLATION_MISSING_URL=https://api.redirhub.com/translations/missing
NEXT_PUBLIC_LOCALES=en,de,es,fr,it,pt,ja,zh,ko
NEXT_PUBLIC_LOCALE=en
```

## 🎯 Features

### Implemented

- ✅ Next.js 16 App Router with TypeScript
- ✅ Chakra UI v3 with custom theme
- ✅ i18next with HTTP backend translation pattern
- ✅ 9 language support with locale routing
- ✅ Default locale hidden from URL (/en → /)
- ✅ Header with navigation and CTAs
- ✅ Footer with multi-column links
- ✅ Responsive design (mobile-first)
- ✅ SEO-friendly metadata
- ✅ Build-time translation generation
- ✅ Missing translation tracking

### To Add

- [ ] Features page content
- [ ] Pricing page content
- [ ] Blog pages
- [ ] Testimonials section
- [ ] FAQ section
- [ ] Contact form
- [ ] Newsletter signup

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### Translation Not Loading

```bash
# Regenerate translations
npm run generate-locales

# Check translation files exist
ls -la public/locales/en/
```

### Build Errors

```bash
# Clean Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

## 📚 Documentation

- [Next.js 16 Docs](https://nextjs.org/docs)
- [Chakra UI v3 Docs](https://chakra-ui.com/docs/get-started/frameworks/next-app)
- [i18next Docs](https://www.i18next.com/)
- [react-i18next](https://react.i18next.com/)

---

**Note**: This project follows the HTTP backend translation pattern from the redirect-checker project for consistency across RedirHub tools.
