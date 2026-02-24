import { Metadata } from 'next';
import { Box, Container, Heading, Text, Stack } from '@chakra-ui/react';
import Link from 'next/link';
import { getT } from '@/lib/i18n';
import { APP_NAME } from '@/lib/utils/constants';
import { buildCanonicalUrl, buildStaticHreflangAlternates, buildSocialCards } from '@/lib/utils/seo';
import { allLanguages } from '@/sanity/config/i18n';
import { fetchLegalDocuments } from '@/lib/services/legal';

export const revalidate = 604800; // Revalidate every 7 days

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getT();

  const title = t("nav.legal-title", "Legal - {{n}}", { n: APP_NAME });
  const description = t("nav.legal-description", "Terms of service, privacy policy, and legal documentation.");

  return {
    title,
    description,
    alternates: {
      canonical: buildCanonicalUrl(locale, '/legal'),
      ...buildStaticHreflangAlternates(allLanguages, '/legal'),
    },
    ...buildSocialCards({
      title,
      description,
      type: 'website',
    }),
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
    <Box py={20} mt={{base: 50, md: 90}} px={{base: 5, lg: 0}}>
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
