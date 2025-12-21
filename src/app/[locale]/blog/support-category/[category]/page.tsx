import { Box, Flex, Heading, VStack } from "@chakra-ui/react";
import SupportBanner from "@/components/share/banners/support/SupportBanner";
import Sidebar from "@/components/support/Sidebar";
import { ArticleItem } from "@/components/support/ArticleItem";
import { SUPPORT_ARTICLES } from "@/lib/dummy-data/support-data";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const filteredArticles = SUPPORT_ARTICLES.filter(
    (article) => article.category.toLowerCase() === category.toLowerCase()
  );

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
                {filteredArticles.length > 0 ? (
                  filteredArticles.map((article) => (
                    <ArticleItem
                      key={article.id}
                      title={article.title}
                      category={article.category}
                      slug={article.slug}
                    />
                  ))
                ) : (
                  <Box py={10} textAlign="center">
                    <Heading size="md" color="gray.500">
                      No articles found for this category.
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
