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
    title: `${t('meta.features.title', 'Features')} - ${getAppName()}`,
    description: t('meta.features.description', 'Explore RedirHub features for managing redirects and short URLs'),
  };
}

export default async function FeaturesPage() {
  return (
    <Box py={20} flex={1} display="flex" alignItems="center" justifyContent="center">
      <Container maxW="7xl" mx="auto">
        <Box textAlign="center">
          <Heading as="h1" size="2xl" mb={4}>
            Features
          </Heading>
          <Text fontSize="xl" color="gray.600">
            Coming soon...
          </Text>
        </Box>
      </Container>
    </Box>
  );
}
