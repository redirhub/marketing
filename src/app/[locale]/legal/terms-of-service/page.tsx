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
    title: `${t('meta.termsOfService.title', 'Terms of Service')} - ${getAppName()}`,
    description: t('meta.termsOfService.description', 'RedirHub terms of service'),
  };
}

export default async function TermsOfServicePage() {
  return (
    <Box py={20}>
      <Container maxW="4xl" mx="auto">
        <Heading as="h1" size="2xl" mb={8}>
          Terms of Service
        </Heading>
        <Text fontSize="md" color="gray.700">
          Terms of service content coming soon...
        </Text>
      </Container>
    </Box>
  );
}
