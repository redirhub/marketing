import { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import initTranslations from "@/lib/i18n";
import { getAppName } from "@/lib/utils/constants";
import ChooseUs from "@/components/home/ChooseUs";
import WhyStandsOut from "@/components/home/WhyStandsOut";
import PowerfulFeatures from "@/components/home/PowerfulFeatures";
import APIDocumentation from "@/components/home/APIDocumentation";
import { BlogSection, FAQSection } from "@/components/sections";
import { fetchFAQSetByPage } from "@/lib/services/faq";
import { buildCanonicalUrl, buildStaticHreflangAlternates, generateFAQSchema } from '@/lib/utils/seo'
import { allLanguages } from '@/sanity/config/i18n'
import RedirectFreeOfferPopup from "@/components/popups/RedirectFreeOfferPopup";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { resources } = await initTranslations(locale, ["common"]);
  const t = (key: string, fallback: string) => {
    const translation = resources?.[locale]?.common?.[key];
    return translation || fallback;
  };

  // Generate canonical URL and hreflang alternates for home page
  const canonicalUrl = buildCanonicalUrl(locale, '/')
  const hreflangAlternates = buildStaticHreflangAlternates(allLanguages, '/')

  return {
    title: `${getAppName()} - ${t("meta.home.title", "Rapid & Secure URL Redirect Service")}`,
    description: t(
      "meta.home.description",
      "Effortlessly forward your URLs with unmatched speed with RedirHub Redirect Service. Our real-time dashboard makes it easy to manage domain and link redirects."
    ),
    alternates: {
      canonical: canonicalUrl,
      ...hreflangAlternates,
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Fetch FAQs from CMS
  const faqSet = await fetchFAQSetByPage('homepage', locale);

  // Transform to FAQAccordion format (add 'value' field)
  const faqData = faqSet?.faqs.map((faq, index) => ({
    value: `faq-${index + 1}`,
    question: faq.question,
    answer: faq.answer,
  })) || [];

  // Generate FAQ Schema.org JSON-LD
  const faqSchema = generateFAQSchema(faqSet?.faqs);

  return (
    <>
      {/* FAQ Schema.org JSON-LD */}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <Hero />
      <WhyStandsOut />
      <ChooseUs />
      <PowerfulFeatures />
      <APIDocumentation />
      <BlogSection locale={locale} title="Go Through Our Blogs Today" />
      {faqData.length > 0 && <FAQSection faqData={faqData} />}
      <RedirectFreeOfferPopup />
    </>
  );
}
