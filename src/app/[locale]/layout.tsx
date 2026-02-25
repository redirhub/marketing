import { ReactNode, Suspense } from "react";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import { Provider } from "@/components/ui/provider";
import TranslationsProvider from "@/components/TranslationsProvider";
import ThemeHeader from "@/components/ThemeHeader";
import Footer from "@/components/layout/Footer";
import NProgressBar from "@/components/NProgressBar";
import FernandWidget from "@/components/FernandWidget";
import initTranslations from "@/lib/i18n";
import { i18nConfig } from "@/lib/i18n";
import { fetchFooterLegalPages } from "@/lib/services/legal";
import "./globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "RedirHub",
  description: "Simple, transparent enterprise URL management",
  icons: {
    icon: "/assets/images/favicon.png",
    shortcut: "/assets/images/favicon.png",
    apple: "/assets/images/favicon.png",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }));
}

// Global revalidation time: 24 hours (use webhook for on-demand updates)
export const revalidate = 86400;

const i18nNamespaces = ["common"];

export default async function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const { resources } = await initTranslations(locale, i18nNamespaces);

  // Fetch legal pages for footer
  const legalPages = await fetchFooterLegalPages(locale);
  const legalLinks = legalPages.map((page) => ({
    label: page.title,
    href: locale === "en" ? `/legal/${page.slug.current}` : `/${locale}/legal/${page.slug.current}`,
  }));

  return (
    <html lang={locale} suppressHydrationWarning className={inter.variable}>
      <body style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <Provider>
          <Suspense fallback={null}>
            <NProgressBar />
          </Suspense>
          <TranslationsProvider
            locale={locale}
            namespaces={i18nNamespaces}
            resources={resources}
          >
            <ThemeHeader />
            <main style={{ flex: 1, display: "flex", flexDirection: "column" }}>
              {children}
            </main>
            <Footer legalLinks={legalLinks} />
            <FernandWidget />
          </TranslationsProvider>
        </Provider>
      </body>
    </html>
  );
}
