import { Metadata } from 'next';
import { Box, Container, Heading, Text, Stack } from '@chakra-ui/react';
import Link from 'next/link';
import initTranslations from '@/lib/i18n';
import { getAppName } from '@/lib/utils/constants';
import { fetchLegalDocuments } from '@/lib/services/legal';

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
  const legalDocs = await fetchLegalDocuments(locale);

  return (
    <Box py={20}>
      <Container maxW="4xl" mx="auto">
        <Heading as="h1" size="2xl" mb={8}>
          Legal
        </Heading>
        {legalDocs.length === 0 ? (
          <Text color="gray.600">No legal documents available.</Text>
        ) : (
          <Stack gap={4}>
            {legalDocs.map((doc: any) => (
              <Link key={doc._id} href={`/${locale}/legal/${doc.slug.current}`}>
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
        )}
      </Container>
    </Box>
  );
}
