import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PortableText } from '@portabletext/react'
import { Box, Container } from "@chakra-ui/react";
import SinglePageBanner from "@/components/share/banners/support/SinglePageBanner";
import { fetchSupportArticleBySlug, fetchSupportArticleTranslations } from "@/lib/services/support";
import { portableTextComponents } from '@/components/blog/PortableTextComponents'
import { getClient } from '@/lib/preview'
import { buildCanonicalUrl, buildHreflangAlternates, buildSocialCards } from '@/lib/utils/seo'
import { getT } from "@/lib/i18n";
import { APP_NAME } from "@/lib/utils/constants";

export const revalidate = 1800; // Revalidate every 30 minutes

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
  const t = await getT();

  const article = await fetchSupportArticleBySlug(slug, locale, client);
  if (!article) {
    return { title: "Article Not Found" };
  }

  // Generate canonical URL
  const canonicalUrl = buildCanonicalUrl(locale, `/support/${slug}`)

  // Fetch translations for hreflang alternates
  const translations = await fetchSupportArticleTranslations(slug, client)
  const hreflangAlternates = translations.length > 0
    ? buildHreflangAlternates(translations, '/support')
    : {}

  const title = `${article.title} | Support`;
  const description = t("nav.support-article-description", "Learn how to {{title}} with {{n}}.", {
    title: article.title,
    n: APP_NAME
  });

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      ...hreflangAlternates,
    },
    ...buildSocialCards({
      title,
      description,
      type: 'article',
    }),
  };
}

export default async function SupportSinglePage({ params, searchParams }: PageProps) {
  const { locale, slug } = await params;
  const client = getClient(await searchParams);

  const article = await fetchSupportArticleBySlug(slug, locale, client);
  if (!article) {
    notFound();
  }

  return (
    <Box bg="white" pb={20}>
      <SinglePageBanner
        title={article.title}
        category={article.tags?.[0] || 'Support'}
      />
      <Container maxW="5xl" mx="auto" px={{ base: 2, md: 2, lg: 0 }}>
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
                components={portableTextComponents(locale)}
              />
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
}
