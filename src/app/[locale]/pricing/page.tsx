import { Metadata } from 'next';
import { getT } from '@/lib/i18n';
import { APP_NAME } from '@/lib/utils/constants';
import PricingBanner from '@/components/share/banners/pricing/PricingBanner';
import InteractivePricing from '@/components/pricing/InteractivePricing';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getT();

  return {
    title: t("nav.pricing-title", "Pricing - {{n}}", { n: APP_NAME }),
    description: t("nav.pricing-description", "Transparent pricing plans for {{n}}. From startups to enterprise. No hidden fees, cancel anytime.", { n: APP_NAME }),
  };
}

export default async function PricingPage() {
  const t = await getT();

  return (
    <>
      <PricingBanner
        title={t("nav.pricing-banner-title", "Pricing")}
        mainTitle={t("nav.pricing-banner-main", "That Scales With Your Needs")}
        subtitle={t("nav.pricing-banner-subtitle", "Choose the plan that fits your needs and scale as you grow")}
      />
      <InteractivePricing />
    </>
  );
}
