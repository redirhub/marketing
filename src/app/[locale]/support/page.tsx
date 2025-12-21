import { Metadata } from "next";
import initTranslations from "@/lib/i18n";
import { getAppName } from "@/lib/utils/constants";
import SupportBanner from "@/components/share/banners/support/SupportBanner";
import { Box, Flex, Heading, Container, Stack, VStack } from "@chakra-ui/react";
import Sidebar from "@/components/support/Sidebar";
import { SUPPORT_ARTICLES } from "@/lib/dummy-data/support-data";
import { ArticleItem } from "@/components/support/ArticleItem";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { resources } = await initTranslations(locale, ["common"]);
  const t = (key: string, fallback: string) => {
    const translation = resources?.[locale]?.common?.[key];
    return translation || fallback;
  };

  return {
    title: `${t("meta.support.title", "Support")} - ${getAppName()}`,
    description: t(
      "meta.support.description",
      "Simple, transparent enterprise for RedirHub"
    ),
  };
}

export default async function SupportPage() {
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
                {SUPPORT_ARTICLES.map((article) => (
                  <ArticleItem
                    key={article.id}
                    title={article.title}
                    category={article.category}
                    slug={article.slug}
                  />
                ))}
              </VStack>
            </Box>
          </Flex>
        </Box>
      </Box>
    </>
  );
}
