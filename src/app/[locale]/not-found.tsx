"use client";

import { Box, Container, Flex, Heading, Text, Button } from "@chakra-ui/react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import { useLocalePath } from "@/lib/hooks/useLocalePath";
import styles from "./not-found.module.css";

export default function NotFound() {
  const params = useParams();
  const locale = (params?.locale as string) || "en";
  const { t } = useTranslation("common");
  const localePath = useLocalePath();

  return (
    <>
      {/* Hero Section with Gradient */}
      <Box pt={28} pb={16} className={styles.heroContainer}>
        <Container maxW="7xl" mx="auto" px={{ base: 4, md: 8 }}>
          <Flex
            direction="column"
            align="center"
            textAlign="center"
            gap={6}
          >
            {/* Large 404 */}
            <Heading
              as="h1"
              fontSize={{ base: "6rem", md: "10rem", lg: "12rem" }}
              fontWeight={900}
              lineHeight={1}
              color="white"
              mb={4}
            >
              404
            </Heading>

            {/* Error Message */}
            <Box maxW="2xl">
              <Heading
                as="h2"
                fontSize={{ base: "1.75rem", md: "2.25rem" }}
                fontWeight={700}
                mb={4}
                color="white"
              >
                {t("common.404-title", "Page Not Found")}
              </Heading>
              <Text
                fontSize={{ base: "1rem", md: "1.1rem" }}
                color="rgba(255, 255, 255, 0.9)"
                lineHeight="1.75"
              >
                {t(
                  "common.404-description",
                  "The page you're looking for doesn't exist or has been moved."
                )}
              </Text>
            </Box>
          </Flex>
        </Container>
      </Box>

      {/* White Content Section */}
      <Box bg="white" py={{ base: 12, md: 16 }}>
        <Container maxW="7xl" mx="auto" px={{ base: 4, md: 8 }}>
          <Flex
            direction="column"
            align="center"
            textAlign="center"
            gap={8}
          >
            {/* Action Buttons */}
            <Flex
              gap={4}
              direction={{ base: "column", sm: "row" }}
              w={{ base: "100%", sm: "auto" }}
            >
              <Link href={localePath("/")}>
                <Button
                  size="lg"
                  bg="#E49426"
                  color="white"
                  px={8}
                  py={6}
                  fontSize="1rem"
                  fontWeight={600}
                  _hover={{
                    bg: "#d18420",
                  }}
                  transition="all 0.2s"
                  w={{ base: "100%", sm: "auto" }}
                >
                  {t("common.backHome", "Back to Home")}
                </Button>
              </Link>
              <Link href={localePath("/support")}>
                <Button
                  size="lg"
                  variant="outline"
                  borderColor="#E49426"
                  color="#E49426"
                  px={8}
                  py={6}
                  fontSize="1rem"
                  fontWeight={600}
                  _hover={{
                    bg: "#f5f5f5",
                  }}
                  transition="all 0.2s"
                  w={{ base: "100%", sm: "auto" }}
                >
                  {t("common.support", "Get Support")}
                </Button>
              </Link>
            </Flex>

            {/* Helpful Links */}
            <Box>
              <Text fontSize="sm" color="#718096" mb={4}>
                {t("common.helpfulLinks", "Popular pages:")}
              </Text>
              <Flex
                gap={6}
                wrap="wrap"
                justify="center"
                fontSize="0.95rem"
              >
                <Link href={localePath("/features")}>
                  <Text
                    color="#4299e1"
                    _hover={{ color: "#E49426", textDecoration: "underline" }}
                    transition="color 0.2s"
                  >
                    {t("title.features", "Features")}
                  </Text>
                </Link>
                <Link href={localePath("/pricing")}>
                  <Text
                    color="#4299e1"
                    _hover={{ color: "#E49426", textDecoration: "underline" }}
                    transition="color 0.2s"
                  >
                    {t("title.pricing", "Pricing")}
                  </Text>
                </Link>
                <Link href={localePath("/blog")}>
                  <Text
                    color="#4299e1"
                    _hover={{ color: "#E49426", textDecoration: "underline" }}
                    transition="color 0.2s"
                  >
                    {t("title.blog", "Blog")}
                  </Text>
                </Link>
              </Flex>
            </Box>
          </Flex>
        </Container>
      </Box>
    </>
  );
}
