import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PortableText } from '@portabletext/react'
import { Box, Container } from "@chakra-ui/react";
import SinglePageBanner from "@/components/share/banners/support/SinglePageBanner";
import { fetchSupportArticleBySlug, fetchSupportArticleTranslations, fetchSupportArticles } from "@/lib/services/support";
import { portableTextComponents } from '@/components/blog/PortableTextComponents'
import { buildCanonicalUrl, buildHreflangAlternates, buildSocialCards } from '@/lib/utils/seo'
import { getT } from "@/lib/i18n";
import { APP_NAME } from "@/lib/utils/constants";
import { allLanguages } from '@/sanity/config/i18n';


interface PageProps {
  params: Promise<{
    locale: string
    slug: string
  }>;
}

export async function generateStaticParams() {
  // Fetch articles from English only (slugs are same across all locales)
  const articles = await fetchSupportArticles('en');

  // Generate paths for all locales with the same slugs
  return articles.flatMap((article) =>
    allLanguages.map((locale) => ({
      locale,
      slug: article.slug.current,
    }))
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = getT(locale);

  const article = await fetchSupportArticleBySlug(slug, locale);
  if (!article) {
    return { title: "Article Not Found" };
  }

  // Generate canonical URL
  const canonicalUrl = buildCanonicalUrl(locale, `/support/${slug}`)

  // Fetch translations for hreflang alternates
  const translations = await fetchSupportArticleTranslations(slug)
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
