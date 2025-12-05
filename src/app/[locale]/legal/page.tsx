import { Metadata } from 'next';
import { Box, Container, Heading, Text, Stack } from '@chakra-ui/react';
import Link from 'next/link';
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
    title: `${t('meta.legal.title', 'Legal')} - ${getAppName()}`,
    description: t('meta.legal.description', 'Legal information and policies'),
  };
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Helper to generate URLs - hide /en for default locale
  const getLocalePath = (path: string) => {
    if (locale === 'en') {
      return path;
    }
    return `/${locale}${path}`;
  };

  const legalDocs = [
    { title: 'Privacy Policy', href: getLocalePath('/legal/privacy-policy') },
    { title: 'Terms of Service', href: getLocalePath('/legal/terms-of-service') },
  ];

  return (
    <Box py={20}>
      <Container maxW="4xl" mx="auto">
        <Heading as="h1" size="2xl" mb={8}>
          Legal
        </Heading>
        <Stack gap={4}>
          {legalDocs.map((doc) => (
            <Link key={doc.href} href={doc.href}>
              <Box
                p={6}
                borderWidth="1px"
                borderRadius="lg"
                _hover={{ borderColor: 'primary.600', bg: 'gray.50' }}
                transition="all 0.2s"
              >
                <Text fontSize="xl" fontWeight="semibold">
                  {doc.title}
                </Text>
              </Box>
            </Link>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}
