import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { Box, Container } from "@chakra-ui/react";
import { fetchChangelogBySlug, fetchChangelogTranslations, formatDate } from "@/lib/services/changelog";
import { getAppName } from "@/lib/utils/constants";
import { buildCanonicalUrl, buildHreflangAlternates } from "@/lib/utils/seo";
import { getClient } from "@/lib/preview";
import { portableTextComponents } from "@/components/blog/PortableTextComponents";
import ChangelogDetailBanner from "@/components/changelog/ChangelogDetailBanner";

interface ChangelogDetailPageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
  searchParams: Promise<{
    version?: string;
  }>;
}

export async function generateMetadata({
  params,
  searchParams,
}: ChangelogDetailPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const client = getClient(await searchParams);
  const entry = await fetchChangelogBySlug(slug, locale, client);

  if (!entry) {
    return {
      title: "Changelog Not Found",
    };
  }

  // Generate canonical URL
  const canonicalUrl = buildCanonicalUrl(locale, `/changelog/${slug}`);

  // Fetch translations for hreflang alternates
  const translations = await fetchChangelogTranslations(slug, client);
  const hreflangAlternates = translations.length > 0
    ? buildHreflangAlternates(translations, '/changelog')
    : {};

  return {
    title: `${entry.title} - Changelog - ${getAppName()}`,
    description: entry.description,
    alternates: {
      canonical: canonicalUrl,
      ...hreflangAlternates,
    },
    openGraph: {
      title: entry.title,
      description: entry.description,
      type: "article",
      publishedTime: entry.publishedAt,
    },
    twitter: {
      card: "summary_large_image",
      title: entry.title,
      description: entry.description,
    },
  };
}

export default async function ChangelogDetailPage({
  params,
  searchParams,
}: ChangelogDetailPageProps) {
  const { locale, slug } = await params;
  const client = getClient(await searchParams);
  const entry = await fetchChangelogBySlug(slug, locale, client);

  if (!entry) {
    notFound();
  }

  const backHref = locale === "en" ? "/changelog" : `/${locale}/changelog`;

  return (
    <Box bg="white" pb={20}>
      <ChangelogDetailBanner
        title={entry.title}
        date={formatDate(entry.publishedAt)}
        backHref={backHref}
      />
      <Container maxW="7xl" mx="auto" px={{ base: 2, md: 2, lg: 0 }}>
        <Box
          bg="white"
          p={{ base: 6, md: 12 }}
          borderRadius="2xl"
          borderColor="gray.100"
        >
          {entry.content && (
            <Box fontSize="lg" lineHeight="1.8" color="#344054">
              <PortableText
                value={entry.content}
                components={portableTextComponents()}
              />
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
}
