import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PortableText } from '@portabletext/react'
import { Box, Container, Heading } from "@chakra-ui/react";
import { fetchLegalDocumentBySlug, fetchLegalDocumentTranslations } from "@/lib/services/legal";
import { portableTextComponents } from '@/components/blog/PortableTextComponents'
import { getClient } from '@/lib/preview'
import { APP_NAME } from "@/lib/utils/constants";
import { buildCanonicalUrl, buildHreflangAlternates, buildSocialCards } from "@/lib/utils/seo";

interface PageProps {
  params: Promise<{
    locale: string
    slug: string
  }>;
  searchParams: Promise<{
    version?: string
  }>;
}

export async function generateMetadata({
  params,
  searchParams,
}: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const client = getClient(await searchParams);

  const document = await fetchLegalDocumentBySlug(slug, locale, client);
  if (!document) {
    return { title: "Document Not Found" };
  }

  // Fetch translations for hreflang alternates
  const translations = await fetchLegalDocumentTranslations(slug, client)

  const title = `${document.title} | ${APP_NAME}`;
  const description = document.title;

  return {
    title,
    description,
    alternates: {
      canonical: buildCanonicalUrl(locale, `/legal/${slug}`),
      ...buildHreflangAlternates(translations, '/legal'),
    },
    ...buildSocialCards({
      title,
      description,
      type: 'article',
    }),
  };
}

export default async function LegalDocumentPage({ params, searchParams }: PageProps) {
  const { locale, slug } = await params;
  const client = getClient(await searchParams);

  const document = await fetchLegalDocumentBySlug(slug, locale, client);
  if (!document) {
    notFound();
  }

  return (
    <Box bg="white" py={20} mt={100}>
      <Container maxW="4xl" mx="auto" px={{ base: 4, md: 6 }}>
        <Heading
          as="h1"
          fontSize={{ base: '3xl', md: '5xl' }}
          fontWeight="800"
          color="#222"
          mb={8}
          textAlign="center"
        >
          {document.title}
        </Heading>

        {document.content && (
          <Box fontSize="lg" lineHeight="1.8" color="gray.700">
            <PortableText
              value={document.content}
              components={portableTextComponents()}
            />
          </Box>
        )}
      </Container>
    </Box>
  );
}
