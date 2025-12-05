import { Metadata } from 'next';
import Hero from '@/components/home/Hero';
import KeyMetrics from '@/components/home/KeyMetrics';
import CTA from '@/components/shared/CTA';
import initTranslations from '@/lib/i18n';
import { getAppName } from '@/lib/utils/constants';

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
    title: `${getAppName()} - ${t('meta.home.title', 'Modern URL Management')}`,
    description: t('meta.home.description', 'Manage redirects, short URLs, and monitor your links with ease'),
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <>
      <Hero />
      <KeyMetrics />
      <CTA />
    </>
  );
}
