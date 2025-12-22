import { Metadata } from "next";
import SinglePageBanner from "@/components/share/banners/support/SinglePageBanner";
import { SUPPORT_ARTICLES } from "@/lib/dummy-data/support-data";
import { notFound } from "next/navigation";
import { Box, Container, Text } from "@chakra-ui/react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  // Find the article to get the real title from your data
  const article = SUPPORT_ARTICLES.find((a) => a.slug === slug);

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

  const article = SUPPORT_ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  return (
    <>
      <Box bg="white" pb={20}>
        <SinglePageBanner title={article.title} category={article.category} />
        {/* Main Article Content */}
        <Container maxW="7xl" mx="auto" px={{ base: 2, md: 2, lg: 0 }}>
          <Box
            bg="white"
            p={{ base: 6, md: 12 }}
            borderRadius="2xl"
            borderColor="gray.100"
          >
            {/* Article Body Styled for Editor Content */}
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
                "& ul, & ol": { ml: 6, mb: 6 },
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
            >
              <Text>
                To set up {article.title}, you need to follow these steps.
                First, ensure your domain is active. Next, navigate to your DNS
                provider settings and add the CNAME records provided by
                RedirHub.
              </Text>
              <h2>Step 1: Create a RedirHub account</h2>
              <Text>
                Start by signing up for a free account. Once logged in, you can
                add your first domain.
              </Text>
              <Box
                h="200px"
                bg="gray.100"
                my={6}
                borderRadius="lg"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                [Image Placeholder]
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
}
