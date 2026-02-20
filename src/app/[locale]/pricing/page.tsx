import { Metadata } from 'next';
import { getT } from '@/lib/i18n';
import { APP_NAME } from '@/lib/utils/constants';
import { buildCanonicalUrl, buildStaticHreflangAlternates, buildSocialCards, generateFAQSchema } from '@/lib/utils/seo';
import { allLanguages } from '@/sanity/config/i18n';
import PricingBanner from '@/components/share/banners/pricing/PricingBanner';
import InteractivePricing from '@/components/pricing/InteractivePricing';
import { FAQSection } from '@/components/sections';
import { fetchFAQSetByPage } from '@/lib/services/faq';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getT();

  const title = t("nav.pricing-title", "Pricing - {{n}}", { n: APP_NAME });
  const description = t("nav.pricing-description", "Transparent pricing plans for {{n}}. From startups to enterprise. No hidden fees, cancel anytime.", { n: APP_NAME });

  return {
    title,
    description,
    alternates: {
      canonical: buildCanonicalUrl(locale, '/pricing'),
      ...buildStaticHreflangAlternates(allLanguages, '/pricing'),
    },
    ...buildSocialCards({
      title,
      description,
    }),
  };
}

export default async function PricingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getT();

  // Fetch FAQs for pricing page
  const faqSet = await fetchFAQSetByPage('pricing', locale);
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

      <PricingBanner
        title={t("nav.pricing-banner-title", "Pricing")}
        mainTitle={t("nav.pricing-banner-main", "That Scales With Your Needs")}
        subtitle={t("nav.pricing-banner-subtitle", "Choose the plan that fits your needs and scale as you grow")}
      />
      <InteractivePricing />
      <FAQSection faqs={faqSet?.faqs} />
    </>
  );
}
