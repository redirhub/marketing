process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
require('dotenv').config({ path: '.env.local' });
const fs = require('fs');
const path = require('path');
const https = require('https');

const TRANSLATION_URL = process.env.TRANSLATION_URL;
const allLanguages = (process.env.NEXT_PUBLIC_LOCALES || 'en').split(',');
const outputDir = path.join(__dirname, '../public/locales');

if (!TRANSLATION_URL) {
    console.error('❌ TRANSLATION_URL is not defined in .env.local');
    process.exit(1);
}

function ensureDirExists(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}

async function fetchTranslationsFromApi(locale) {
    const url = TRANSLATION_URL.replace('{{lng}}', locale);
    console.log(`📡 Fetching translations for ${locale} from ${url}`);

    try {
        const response = await fetch(url, {
            agent: new https.Agent({ rejectUnauthorized: false }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const common = await response.json();
        return { common };
    } catch (error) {
        console.error(`❌ Error fetching translations for ${locale}:`, error.message);
        // Return empty translations on error
        return { common: {} };
    }
}

// Serial execution for all languages
(async () => {
    console.log('🌍 Starting translation generation...\n');

    for (const lang of allLanguages) {
        try {
            const resources = await fetchTranslationsFromApi(lang);
            const langDir = path.join(outputDir, lang);
            ensureDirExists(langDir);

            const filePath = path.join(langDir, 'common.json');
            fs.writeFileSync(filePath, JSON.stringify(resources.common, null, 2), 'utf8');
            console.log(`✅ Saved translations to ${filePath}\n`);
        } catch (error) {
            console.error(`❌ Failed to process ${lang}:`, error.message);
        }
    }

    console.log('🎉 Translation generation complete!');
})();
