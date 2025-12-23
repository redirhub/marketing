import { Metadata } from "next";
import SinglePageBanner from "@/components/share/banners/support/SinglePageBanner";
import { SUPPORT_ARTICLES } from "@/lib/dummy-data/support-data";
import { notFound } from "next/navigation";
import NextLink from "next/link";

import {
  SimpleGrid,
  Link,
  Flex,
  Heading,
  Box,
  Container,
  Text,
} from "@chakra-ui/react";
import { fetchSupportArticles } from "@/lib/services/support";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const articles = await fetchSupportArticles();
  const article = articles.find((a: any) => a.slug === slug);
  if (!article) {
    return { title: "Article Not Found" };
  }

  return {
    title: `${article.title} | RedirHub Support`,
    description: `Learn how to set up ${article.title} with RedirHub.`,
  };
}
export default async function SupportSinglePage({ params }: PageProps) {
  const { slug } = await params;

  const articles = await fetchSupportArticles();
  const article = articles.find((a: any) => a.slug === slug);
  if (!article) {
    notFound();
  }

  const similarResources = SUPPORT_ARTICLES.filter(
    (a) => a.category === article.category && a.slug !== slug
  ).slice(0, 3);

  return (
    <>
      <Box bg="white" pb={20}>
        <SinglePageBanner title={article.title} category={article.category} />
        <Container maxW="7xl" mx="auto" px={{ base: 2, md: 2, lg: 0 }}>
          <Box
            bg="white"
            p={{ base: 6, md: 12 }}
            borderRadius="2xl"
            borderColor="gray.100"
          >
            <Box
              fontSize="lg"
              lineHeight="1.8"
              color="#344054"
              css={{
                "& h2": {
                  marginTop: "40px",
                  marginBottom: "16px",
                  fontSize: "2xl",
                  fontWeight: "700",
                  color: "#101828",
                },
                "& h3": {
                  mt: 8,
                  mb: 4,
                  fontSize: "xl",
                  fontWeight: "600",
                  color: "#101828",
                },
                "& p": { mb: 6 },
                "& ul": {
                  ml: 8,
                  mb: 6,
                  listStyleType: "disc",
                  listStylePosition: "outside",
                },
                "& ol": { ml: 6, mb: 6 },
                "& li": { mb: 2 },
                "& img": {
                  borderRadius: "lg",
                  my: 8,
                  border: "1px solid",
                  borderColor: "gray.200",
                },
                "& code": {
                  bg: "gray.50",
                  px: 2,
                  py: 1,
                  borderRadius: "md",
                  color: "#E49426",
                  fontSize: "sm",
                },
                "& strong": { color: "#101828" },
              }}
              dangerouslySetInnerHTML={{ __html: article.content || "" }}
            />
          </Box>
        </Container>
      </Box>
      <Box bg="#f2f4ef" py={20}>
        <Container maxW="7xl" mx="auto" px={{ base: 2, md: 2, lg: 0 }}>
          <Heading
            textAlign="center"
            mb={12}
            color="#344054"
            fontWeight={500}
            fontSize={{ base: "1rem", md: "3rem" }}
            letterSpacing={"0.4px"}
          >
            Go Through Similar Resources
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 3 }} gap={6}>
            {similarResources.map((resource) => (
              <Box
                key={resource.id}
                bg="white"
                p={"24px"}
                borderRadius="24px"
                border="4px solid"
                borderColor="#EAECF0"
                transition="all 0.2s"
                _hover={{ shadow: "md", transform: "translateY(-4px)" }}
              >
                <Flex
                  align="center"
                  justifyContent={"space-between"}
                  gap={3}
                  mb={4}
                >
                  <Box
                    bg="#fff6ed"
                    color="#d65334"
                    p="5px 15px 5px 15px"
                    borderRadius="25px"
                    textTransform="capitalize"
                    fontSize="16px"
                  >
                    {resource.category}s
                  </Box>
                  <Text
                    fontSize="0.8rem"
                    color="#797a7c"
                    fontWeight="500"
                    textTransform={"uppercase"}
                    letterSpacing={"0.2px"}
                  >
                    ADD YOUR HEADING TEXT HERE
                  </Text>
                </Flex>

                <Heading
                  fontSize="1.3rem"
                  mb={6}
                  color="#101828"
                  lineHeight="short"
                >
                  {resource.title}
                </Heading>

                <Link
                  asChild
                  color="#1c6db6"
                  fontWeight="400"
                  fontSize={"15px"}
                  display="flex"
                  alignItems="center"
                  gap={2}
                  _hover={{ textDecoration: "none", color: "#155a9a" }}
                >
                  <NextLink href={`/support/${resource.slug}`}>
                    Read More <span>→</span>
                  </NextLink>
                </Link>
              </Box>
            ))}
          </SimpleGrid>
        </Container>
      </Box>
    </>
  );
}
