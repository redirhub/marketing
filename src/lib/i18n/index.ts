/**
 * Server-side i18n implementation for Next.js App Router
 *
 * Features:
 * - Auto-detects locale from URL (via proxy headers)
 * - Variable interpolation with {{variableName}} syntax
 * - Automatic missing key tracking (batched POST to API)
 * - Simple API: just call getT() with no parameters
 */

import fs from 'fs';
import path from 'path';
import { headers } from 'next/headers';

export const i18nConfig = {
  locales: ['en', 'de', 'es', 'fr', 'it', 'pt', 'ja', 'zh', 'ko'],
  defaultLocale: 'en',
};

const headerName = 'x-locale';

// Collect missing keys across requests for batched reporting
const missingKeysMap = new Map<string, string>();
let flushTimeout: NodeJS.Timeout | null = null;

/**
 * Interpolates variables in translation strings
 * Example: "Hello {{name}}" with {name: "World"} => "Hello World"
 */
function interpolate(text: string, variables?: Record<string, any>): string {
  if (!variables) return text;

  return text.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    return variables[key] !== undefined ? String(variables[key]) : match;
  });
}

/**
 * Flushes all collected missing keys to TRANSLATION_MISSING_URL
 * Posts as JSON: { "key1": "fallback1", "key2": "fallback2", ... }
 */
async function flushMissingKeys() {
  if (missingKeysMap.size === 0) return;

  const TRANSLATION_MISSING_URL = process.env.TRANSLATION_MISSING_URL;
  if (!TRANSLATION_MISSING_URL) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(`Missing ${missingKeysMap.size} translation keys (no TRANSLATION_MISSING_URL configured)`);
    }
    missingKeysMap.clear();
    return;
  }

  try {
    const payload = Object.fromEntries(missingKeysMap.entries());
    const count = missingKeysMap.size;
    missingKeysMap.clear();

    // Disable SSL verification in development
    const originalRejectUnauthorized = process.env.NODE_TLS_REJECT_UNAUTHORIZED;
    if (process.env.NODE_ENV !== 'production') {
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    }

    try {
      await fetch(TRANSLATION_MISSING_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (process.env.NODE_ENV !== 'production') {
        console.log(`✓ Posted ${count} missing translation keys`);
      }
    } finally {
      if (process.env.NODE_ENV !== 'production') {
        if (originalRejectUnauthorized !== undefined) {
          process.env.NODE_TLS_REJECT_UNAUTHORIZED = originalRejectUnauthorized;
        } else {
          delete process.env.NODE_TLS_REJECT_UNAUTHORIZED;
        }
      }
    }
  } catch (error) {
    console.error('Error reporting missing translations:', error);
  }
}

/**
 * Collects a missing key and schedules a debounced flush
 * Keys are batched and posted together after 1 second of inactivity
 */
function collectMissingKey(key: string, fallback: string) {
  if (typeof window !== 'undefined') return;

  missingKeysMap.set(key, fallback);

  if (flushTimeout) clearTimeout(flushTimeout);
  flushTimeout = setTimeout(() => {
    flushMissingKeys().catch(console.error);
    flushTimeout = null;
  }, 1000);
}

/**
 * Loads translations from filesystem
 * Reads from: public/locales/{locale}/{namespace}.json
 */
function loadTranslations(locale: string, namespaces: string[] = ['common']) {
  const resources: any = {};

  for (const ns of namespaces) {
    const filePath = path.join(process.cwd(), 'public', 'locales', locale, `${ns}.json`);

    try {
      if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const translations = JSON.parse(fileContent);

        if (!resources[locale]) resources[locale] = {};
        resources[locale][ns] = translations;
      }
    } catch (error) {
      console.error(`Error loading translations for ${locale}/${ns}:`, error);
      if (!resources[locale]) resources[locale] = {};
      resources[locale][ns] = {};
    }
  }

  return resources;
}

/**
 * Get translation function for Server Components
 *
 * @param namespace - Translation namespace (default: 'common')
 * @param options - Optional config { trackMissing: boolean }
 * @returns Translation function: (key, fallback, variables?) => string
 *
 * @example
 * const t = await getT();
 * t("support.title", "Support")
 * t("support.description", "Get help for {{app}}", { app: "MyApp" })
 */
export async function getT(namespace: string = 'common', options?: { trackMissing?: boolean }) {
  const headersList = await headers();
  const locale = headersList.get(headerName) || i18nConfig.defaultLocale;

  const resources = loadTranslations(locale, [namespace]);
  const shouldTrackMissing = options?.trackMissing ?? true;

  return (key: string, fallback: string, variables?: Record<string, any>) => {
    const translation = resources?.[locale]?.[namespace]?.[key];
    const result = translation || fallback;

    if (!translation && shouldTrackMissing && typeof window === 'undefined') {
      collectMissingKey(key, fallback);
    }

    return interpolate(result, variables);
  };
}

/**
 * Load translations with resources object
 * Used by layout for client-side TranslationsProvider
 */
export default async function initTranslations(
  locale: string,
  namespaces: string[] = ['common']
) {
  const resources = loadTranslations(locale, namespaces);

  return {
    resources,
    locale,
  };
}
