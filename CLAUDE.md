# i18n Implementation Guide

## Translation Pattern

All translations in this project follow a consistent pattern:

```typescript
t("namespace.key", "Fallback text", { variables })
```

### Key Components:

1. **Namespace**: Organizes translation keys by context
2. **Key**: Specific identifier for the translation
3. **Fallback text**: English text shown when translation is missing
4. **Variables**: Dynamic values interpolated into translations

## Namespaces

### `nav.*` - Navigation & Global Elements

Used for:
- Navigation menus
- Global UI components (headers, footers)
- Page metadata (titles, descriptions)
- CTA buttons and links
- Table of contents
- Back navigation links

**Examples:**
```typescript
t("nav.pricing", "Pricing")
t("nav.home-title", "{{n}} - Fast & Secure URL Redirect Management", { n: APP_NAME })
t("nav.blog-description", "Latest guides, tutorials, and insights...")
t("nav.get-started", "Get Started For Free")
```

### `home.*` - Home Page Specific

Used for:
- Hero section content
- Feature descriptions
- Testimonials
- Stats and metrics
- Inactivity popup
- Inline CTAs
- Footer CTAs

**Examples:**
```typescript
t("home.hero-title", "Your domains.")
t("home.inactivity-title", "Want to try {{n}} for free?", { n: APP_NAME })
t("home.footer-cta-title", "Redirect 5x Faster with Built-in Security")
t("home.mins-read", "{{minutes}} mins read", { minutes: readTimeMinutes })
```

## Implementation by Component Type

### Server Components

Use `getT()` function:

```typescript
import { getT } from "@/lib/i18n";
import { APP_NAME } from "@/lib/utils/constants";

const MyComponent = async () => {
  const t = await getT();

  return (
    <div>
      {t("nav.title", "Title", { n: APP_NAME })}
    </div>
  );
};
```

### Client Components

Use `useTranslation()` hook:

```typescript
"use client";

import { useTranslation } from "react-i18next";
import { APP_NAME } from "@/lib/utils/constants";

export default function MyComponent() {
  const { t } = useTranslation();

  return (
    <div>
      {t("nav.title", "Title", { n: APP_NAME })}
    </div>
  );
}
```

## Missing Key Tracking

The system automatically tracks missing translation keys via POST requests. Do **not** manually add keys to `public/locales/en/common.json` - they will be auto-saved.

## Summary

**Pattern**: `t("namespace.key", "Fallback text", { variables })`

**Namespaces**:
- `nav.*` - Navigation, metadata, global UI
- `home.*` - Home page content
- `changelog.*` - Changelog pages
- `support.*` - Support pages
- `enterprise.*` - Enterprise pages

**Variables**:
- `{{n}}` - App name (use `APP_NAME` constant)
- Other descriptive names as needed

**Constants**:
- `APP_NAME` - Not `getAppName()`
- `URL_DASHBOARD` - Not `getDashboardBase()`
- `URL_DASHBOARD_LOGIN` - Not hardcoded URLs
- `URL_DASHBOARD_REGISTER` - Not hardcoded URLs
