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
    title: `${t('meta.privacyPolicy.title', 'Privacy Policy')} - ${getAppName()}`,
    description: t('meta.privacyPolicy.description', 'RedirHub privacy policy'),
  };
}

export default async function PrivacyPolicyPage() {
  return (
    <Box py={20}>
      <Container maxW="4xl" mx="auto">
        <Heading as="h1" size="2xl" mb={8}>
          Privacy Policy
        </Heading>
        <Text fontSize="md" color="gray.700">
          Privacy policy content coming soon...
        </Text>
      </Container>
    </Box>
  );
}
