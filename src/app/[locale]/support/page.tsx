import { Metadata } from "next";
import { getT } from "@/lib/i18n";
import { APP_NAME } from "@/lib/utils/constants";
import SupportBanner from "@/components/share/banners/support/SupportBanner";
import { Box, Flex, Heading, VStack } from "@chakra-ui/react";
import Sidebar from "@/components/support/Sidebar";
import { ArticleItem } from "@/components/support/ArticleItem";
import { fetchSupportArticles } from "@/lib/services/support";
import { buildCanonicalUrl, buildStaticHreflangAlternates, buildSocialCards } from "@/lib/utils/seo";
import { allLanguages } from "@/sanity/config/i18n";

export const revalidate = 1800; // Revalidate every 30 minutes

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;

  const t = await getT();

  const title = t("nav.support-title", "Support - {{n}}", { n: APP_NAME });
  const description = t("nav.support-description", "Find answers, guides, and tutorials for {{n}}. Get help with redirects, analytics, and troubleshooting.", { n: APP_NAME });

  return {
    title,
    description,
    alternates: {
      canonical: buildCanonicalUrl(locale, "/support"),
      ...buildStaticHreflangAlternates(allLanguages, "/support"),
    },
    ...buildSocialCards({
      title,
      description,
      type: "website",
    }),
  };
}

export default async function SupportPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const articles = await fetchSupportArticles(locale);
  const t = await getT();

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
                {t("support.category", "Category")}
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
                      {t("support.no-articles", "No support articles found.")}
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
