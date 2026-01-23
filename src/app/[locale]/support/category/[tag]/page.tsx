import { Metadata } from "next";
import initTranslations from "@/lib/i18n";
import { getAppName } from "@/lib/utils/constants";
import SupportBanner from "@/components/share/banners/support/SupportBanner";
import { Box, Flex, Heading, VStack } from "@chakra-ui/react";
import Sidebar from "@/components/support/Sidebar";
import { ArticleItem } from "@/components/support/ArticleItem";
import { fetchSupportArticlesByTag } from "@/lib/services/support";
import { buildCanonicalUrl, buildStaticHreflangAlternates } from '@/lib/utils/seo';
import { allLanguages } from '@/sanity/config/i18n';
import { denormalizeTag, formatTagForDisplay } from "@/lib/utils/tagsHelpers";


interface CategoryPageProps {
  params: Promise<{
    locale: string;
    tag: string;
  }>;
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { locale, tag } = await params;
  const { resources } = await initTranslations(locale, ["common"]);
  const t = (key: string, fallback: string) => {
    const translation = resources?.[locale]?.common?.[key];
    return translation || fallback;
  };

  const decodedTag = denormalizeTag(tag);
  const categoryName = formatTagForDisplay(decodedTag);
  const canonicalUrl = buildCanonicalUrl(locale, `/support/category/${tag}`);
  const hreflangAlternates = buildStaticHreflangAlternates(allLanguages, `/support/category/${tag}`);

  return {
    title: `${categoryName} - ${t("meta.support.title", "Support")} - ${getAppName()}`,
    description: t(
      "meta.support.description",
      "Simple, transparent enterprise for RedirHub"
    ),
    alternates: {
      canonical: canonicalUrl,
      ...hreflangAlternates,
    },
  };
}

export default async function SupportCategoryPage({
  params,
}: CategoryPageProps) {
  const { locale, tag } = await params;
  const decodedTag = denormalizeTag(tag);
  const articles = await fetchSupportArticlesByTag(decodedTag, locale);

  return (
    <>
      <SupportBanner />
      <Box w="100%" px={{ base: 4, md: 6 }}>
        <Box w="100%" maxW="7xl" mx="auto" my={"59px"}>
          <Flex direction={{ base: "column", md: "row" }} gap={12}>
            <Box as="aside" w={{ base: "full", md: "25%", lg: "20%" }}>
              <Heading
                as="h3"
                fontSize={"0.9rem"}
                fontWeight={600}
                color="#667085"
                textTransform="uppercase"
                mb={4}
                letterSpacing="0.2px"
                textAlign={{ base: "center", md: "left" }}
              >
                Categories
              </Heading>
              <Sidebar />
            </Box>
            <Box as="section" w={{ base: "full", md: "75%", lg: "80%" }}>
              <VStack align="stretch" gap={0}>
                {articles.length > 0 ? (
                  articles.map((article: any) => (
                    <ArticleItem
                      key={article._id}
                      title={article.title}
                      slug={article.slug.current}
                      locale={locale}
                      tags={article.tags?.[0]}
                    />
                  ))
                ) : (
                  <Box py={10} textAlign="center">
                    <Heading size="sm" color="gray.500">
                      No support articles found in this category.
                    </Heading>
                  </Box>
                )}
              </VStack>
            </Box>
          </Flex>
        </Box>
      </Box>
    </>
  );
}
