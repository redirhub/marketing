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

  return {
    title: `${getAppName()} - ${t("meta.home.title", "Modern URL Management")}`,
    description: t(
      "meta.home.description",
      "Manage redirects, short URLs, and monitor your links with ease"
    ),
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

  return (
    <>
      <Hero />
      <WhyStandsOut />
      <ChooseUs />
      <PowerfulFeatures />
      <APIDocumentation />
      <BlogSection locale={locale} title="Go Through Our Blogs Today" />
      {faqData.length > 0 && <FAQSection faqData={faqData} />}
    </>
  );
}
