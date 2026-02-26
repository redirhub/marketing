'use client';

import { I18nextProvider } from 'react-i18next';
import { createInstance } from 'i18next';
import { initReactI18next } from 'react-i18next';
import { ReactNode, useMemo } from 'react';

// Batched missing key tracker
const missingKeysMap = new Map<string, string>();
let flushTimeout: NodeJS.Timeout | null = null;

async function flushMissingKeys() {
  if (typeof window !== 'undefined') return; // Only run on server side
  if (missingKeysMap.size === 0) return;

  const TRANSLATION_MISSING_URL = process.env.TRANSLATION_MISSING_URL;
  if (!TRANSLATION_MISSING_URL) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(`Missing ${missingKeysMap.size} translation keys (no TRANSLATION_MISSING_URL configured)`);
    }
    missingKeysMap.clear();
    return;
  }

  const payload = Object.fromEntries(missingKeysMap.entries());
  const count = missingKeysMap.size;
  missingKeysMap.clear();

  try {
    const response = await fetch(TRANSLATION_MISSING_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.error(`Failed to report missing translations: ${response.status}`);
      return;
    }

    if (process.env.NODE_ENV !== 'production') {
      console.log(`✓ Posted ${count} missing translation keys (server-side)`);
    }
  } catch (error) {
    console.error('Error reporting missing translations:', error);
  }
}

function collectMissingKey(key: string, fallback: string) {
  if (typeof window !== 'undefined') return; // Only collect on server side

  missingKeysMap.set(key, fallback);

  // Debounce: flush after 1 second of no new missing keys
  if (flushTimeout) {
    clearTimeout(flushTimeout);
  }
  flushTimeout = setTimeout(() => {
    flushMissingKeys().catch(console.error);
    flushTimeout = null;
  }, 1000);
}

export default function TranslationsProvider({
  children,
  locale,
  namespaces,
  resources,
}: {
  children: ReactNode;
  locale: string;
  namespaces: string[];
  resources: any;
}) {
  const i18n = useMemo(() => {
    const instance = createInstance();

    instance
      .use(initReactI18next)
      .init({
        lng: locale,
        resources,
        fallbackLng: 'en',
        supportedLngs: ['en', 'de', 'es', 'fr', 'it', 'pt', 'ja', 'zh', 'ko'],
        defaultNS: namespaces[0],
        fallbackNS: namespaces[0],
        ns: namespaces,
        interpolation: {
          escapeValue: false,
        },
        // Custom missing key handler - batches requests
        saveMissing: true,
        missingKeyHandler: (lngs, ns, key, fallbackValue) => {
          collectMissingKey(key, fallbackValue);
        },
      });

    return instance;
  }, [locale, namespaces, resources]);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
