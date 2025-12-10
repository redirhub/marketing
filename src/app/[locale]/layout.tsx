import { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import { headers } from 'next/headers';
import { Provider } from '@/components/ui/provider';
import TranslationsProvider from '@/components/TranslationsProvider';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import initTranslations from '@/lib/i18n';
import { i18nConfig } from '@/lib/i18n';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['400', '500', '600', '700'],
});

export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }));
}

const i18nNamespaces = ['common'];

export default async function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const { resources } = await initTranslations(locale, i18nNamespaces);

  const headersList = await headers();
  const pathname = headersList.get('x-pathname') || '';
  const hideHeaderFooter = pathname.includes('/rate');

  return (
    <html lang={locale} suppressHydrationWarning className={inter.variable}>
      <body style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Provider>
          <TranslationsProvider
            locale={locale}
            namespaces={i18nNamespaces}
            resources={resources}
          >
            {!hideHeaderFooter && <Header />}
            <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              {children}
            </main>
            {!hideHeaderFooter && <Footer />}
          </TranslationsProvider>
        </Provider>
      </body>
    </html>
  );
}
