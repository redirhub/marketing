import fs from 'fs';
import path from 'path';

const i18nConfig = {
  locales: ['en', 'de', 'es', 'fr', 'it', 'pt', 'ja', 'zh', 'ko'],
  defaultLocale: 'en',
};

export default async function initTranslations(
  locale: string,
  namespaces: string[] = ['common']
) {
  // Load translations from public/locales directory
  const resources: any = {};

  for (const ns of namespaces) {
    const filePath = path.join(process.cwd(), 'public', 'locales', locale, `${ns}.json`);

    try {
      if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const translations = JSON.parse(fileContent);

        if (!resources[locale]) {
          resources[locale] = {};
        }
        resources[locale][ns] = translations;
      }
    } catch (error) {
      console.error(`Error loading translations for ${locale}/${ns}:`, error);
      // Return empty object on error
      if (!resources[locale]) {
        resources[locale] = {};
      }
      resources[locale][ns] = {};
    }
  }

  return {
    resources,
    locale,
  };
}

export { i18nConfig };
