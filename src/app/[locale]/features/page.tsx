import { Metadata } from 'next';
import { Box, Container, Heading, Text } from '@chakra-ui/react';
import { getT } from '@/lib/i18n';
import { APP_NAME } from '@/lib/utils/constants';
import { buildCanonicalUrl, buildStaticHreflangAlternates } from '@/lib/utils/seo';
import { allLanguages } from '@/sanity/config/i18n';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getT();

  return {
    title: `${t('meta.features.title', 'Features')} - ${APP_NAME}`,
    description: t('nav.features-description', 'Explore RedirHub features for managing redirects and short URLs'),
    alternates: {
      canonical: buildCanonicalUrl(locale, '/features'),
      ...buildStaticHreflangAlternates(allLanguages, '/features'),
    },
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
