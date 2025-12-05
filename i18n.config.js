const HttpBackend = require('i18next-http-backend/cjs');
const ChainedBackend = require('i18next-chained-backend').default;

const isBrowser = typeof window !== 'undefined';

// Custom class that prevents runtime HTTP fetching in browser
class NoLoadHttpBackend extends HttpBackend {
    read(language, namespace, callback) {
        return callback(null, {}); // Returns empty object to prevent loading
    }
}

module.exports = {
    i18n: {
        locales: ['en', 'de', 'es', 'fr', 'it', 'pt', 'ja', 'zh', 'ko'],
        defaultLocale: 'en',
    },
    // Browser: Uses NoLoadHttpBackend (no HTTP calls)
    // Server: Uses pre-generated files from public/locales/{lang}/common.json
    use: isBrowser ? [ChainedBackend] : [],
    backends: isBrowser ? [NoLoadHttpBackend] : [],
    backend: {
        backendOptions: [
            {
                loadPath: '', // Disabled - no direct loading
                addPath: '/api/translation/missing', // Track missing keys
                allowedAddOrUpdateHosts: () => '/api/translation/missing',
                referenceLng: 'en',
            }
        ]
    },
    serializeConfig: false,
    react: {
        useSuspense: false,
    },
};
