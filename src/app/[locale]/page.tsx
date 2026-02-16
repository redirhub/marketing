import { Metadata } from "next";
import Hero from "@/components/home/Hero";
import { getT } from "@/lib/i18n";
import { getAppName } from "@/lib/utils/constants";
import ChooseUs from "@/components/home/ChooseUs";
import WhyStandsOut from "@/components/home/WhyStandsOut";
import PowerfulFeatures from "@/components/home/PowerfulFeatures";
import APIDocumentation from "@/components/home/APIDocumentation";
import { BlogSection, FAQSection } from "@/components/sections";
import { fetchFAQSetByPage } from "@/lib/services/faq";
import { buildCanonicalUrl, buildStaticHreflangAlternates, generateFAQSchema } from '@/lib/utils/seo'
import { allLanguages } from '@/sanity/config/i18n'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getT();

  // Generate canonical URL and hreflang alternates for home page
  const canonicalUrl = buildCanonicalUrl(locale, '/')
  const hreflangAlternates = buildStaticHreflangAlternates(allLanguages, '/')

  return {
    title: t("home.title", "{{n}} - Fast & Secure URL Redirect Management", { n: getAppName() }),
    description: t(
      "home.description",
      "Enterprise-grade URL redirect service. Manage redirects, track analytics, and scale globally with {{n}}. Trusted by businesses worldwide.",
      { n: getAppName() }
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
  const t = await getT();

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
      <BlogSection locale={locale} title={t("home.blog-title", "Go Through Our Blogs Today")} />
      {faqData.length > 0 && <FAQSection faqData={faqData} title={t("home.faq-title", "Frequently asked questions")} />}
    </>
  );
}
