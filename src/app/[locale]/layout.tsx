import { ReactNode, Suspense } from "react";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import { headers } from "next/headers";
import { Provider } from "@/components/ui/provider";
import TranslationsProvider from "@/components/TranslationsProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import NProgressBar from "@/components/NProgressBar";
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

  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "";
  const hideHeaderAndFooter = pathname.includes("/rate");

  const hideHeaderOnly = pathname.includes("/support-category");

  const shouldHideHeader = hideHeaderAndFooter || hideHeaderOnly;

  // Fetch legal pages for footer
  const legalPages = await fetchFooterLegalPages(locale);
  const legalLinks = legalPages.map((page) => ({
    label: page.title,
    href: locale === "en" ? `/${page.slug.current}` : `/${locale}/${page.slug.current}`,
  }));

  return (
    <html lang={locale} suppressHydrationWarning className={inter.variable}>
      <body
        style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
      >
        <Provider>
          <Suspense fallback={null}>
            <NProgressBar />
          </Suspense>
          <TranslationsProvider
            locale={locale}
            namespaces={i18nNamespaces}
            resources={resources}
          >
            {!shouldHideHeader && <Header />}
            <main style={{ flex: 1, display: "flex", flexDirection: "column" }}>
              {children}
            </main>
            {!hideHeaderAndFooter && <Footer legalLinks={legalLinks} />}
          </TranslationsProvider>
        </Provider>
      </body>
    </html>
  );
}
