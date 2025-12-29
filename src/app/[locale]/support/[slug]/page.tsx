import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PortableText } from '@portabletext/react'
import { Box, Container } from "@chakra-ui/react";
import SinglePageBanner from "@/components/share/banners/support/SinglePageBanner";
import { fetchSupportArticleBySlug, fetchSupportArticleTranslations } from "@/lib/services/support";
import { portableTextComponents } from '@/components/blog/PortableTextComponents'

interface PageProps {
  params: Promise<{
    locale: string
    slug: string
  }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;

  const article = await fetchSupportArticleBySlug(slug, locale);
  if (!article) {
    return { title: "Article Not Found" };
  }

  // Fetch translations for hreflang alternates
  const translations = await fetchSupportArticleTranslations(slug)
  const alternates: { languages?: Record<string, string> } = {}

  if (translations.length > 0) {
    alternates.languages = {}
    translations.forEach((translation: { locale: string; slug: { current: string } }) => {
      if (alternates.languages) {
        alternates.languages[translation.locale] = `/${translation.locale}/support/${translation.slug.current}`
      }
    })
  }

  return {
    title: `${article.title} | RedirHub Support`,
    description: `Learn how to ${article.title} with RedirHub.`,
    alternates,
  };
}

export default async function SupportSinglePage({ params }: PageProps) {
  const { locale, slug } = await params;

  const article = await fetchSupportArticleBySlug(slug, locale);
  if (!article) {
    notFound();
  }

  return (
    <Box bg="white" pb={20}>
      <SinglePageBanner
        title={article.title}
        category={article.tags?.[0] || 'Support'}
      />
      <Container maxW="7xl" mx="auto" px={{ base: 2, md: 2, lg: 0 }}>
        <Box
          bg="white"
          p={{ base: 6, md: 12 }}
          borderRadius="2xl"
          borderColor="gray.100"
        >
          {article.content && (
            <Box fontSize="lg" lineHeight="1.8" color="#344054">
              <PortableText
                value={article.content}
                components={portableTextComponents}
              />
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
}
