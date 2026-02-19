import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { Box, Container } from "@chakra-ui/react";
import { fetchChangelogBySlug, fetchChangelogTranslations, formatDate } from "@/lib/services/changelog";
import { APP_NAME } from "@/lib/utils/constants";
import { buildCanonicalUrl, buildHreflangAlternates, buildSocialCards } from "@/lib/utils/seo";
import { getClient } from "@/lib/preview";
import { portableTextComponents } from "@/components/blog/PortableTextComponents";
import ChangelogDetailBanner from "@/components/changelog/ChangelogDetailBanner";
import { getT } from "@/lib/i18n";

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
  const t = await getT();

  if (!entry) {
    return {
      title: t("nav.changelog-not-found", "Changelog Not Found"),
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
    title: t("nav.changelog-detail-title", "{{title}} - Changelog - {{n}}", { title: entry.title, n: APP_NAME }),
    description: entry.description,
    alternates: {
      canonical: canonicalUrl,
      ...hreflangAlternates,
    },
    ...buildSocialCards({
      title: entry.title,
      description: entry.description,
      type: "article",
      publishedTime: entry.publishedAt,
    }),
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
        authorName={entry.author?.name}
      />
      <Container maxW="5xl" mx="auto" px={{ base: 4, md: 4, lg: 0 }}>
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
