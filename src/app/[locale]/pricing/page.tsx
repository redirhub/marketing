import { Metadata } from 'next';
import { Box, Container, Heading, Text } from '@chakra-ui/react';
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
    title: `${t('meta.pricing.title', 'Pricing')} - ${getAppName()}`,
    description: t('meta.pricing.description', 'Simple, transparent pricing for RedirHub'),
  };
}

export default async function PricingPage() {
  return (
    <Box py={20}>
      <Container maxW="7xl" mx="auto">
        <Heading as="h1" size="2xl" mb={4}>
          Pricing
        </Heading>
        <Text fontSize="xl" color="gray.600">
          Coming soon...
        </Text>
      </Container>
    </Box>
  );
}
