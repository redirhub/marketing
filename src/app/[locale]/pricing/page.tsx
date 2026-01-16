import { Metadata } from 'next';
import initTranslations from '@/lib/i18n';
import { getAppName } from '@/lib/utils/constants';
import PricingBanner from '@/components/share/banners/pricing/PricingBanner';
import InteractivePricing from '@/components/pricing/InteractivePricing';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { resources } = await initTranslations(locale, ['common']);
  const t = (key: string, fallback: string) => {
    const translation = resources?.[locale]?.common?.[key];
    return translation || fallback;
  };

  return {
    title: `${t('meta.pricing.title', 'Pricing')} - ${getAppName()}`,
    description: t('meta.pricing.description', 'Simple, transparent pricing for RedirHub'),
  };
}

export default async function PricingPage() {
  return (
    <>
      <PricingBanner
        title="Pricing"
        mainTitle="That Scales With Your Needs"
        subtitle="Choose the plan that fits your needs and scale as you grow"
      />
      <InteractivePricing />
    </>
  );
}
