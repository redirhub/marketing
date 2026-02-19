"use client";

import { Box, Container, Heading, Text, Flex } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import styles from "../share/banners/blog/BlogBanner.module.css";
import { FaArrowLeftLong } from "react-icons/fa6";
import NextLink from "next/link";

interface ChangelogDetailBannerProps {
  title: string;
  date: string;
  backHref: string;
  authorName?: string;
}

export default function ChangelogDetailBanner({
  title,
  date,
  backHref,
  authorName,
}: ChangelogDetailBannerProps) {
  const { t } = useTranslation();
  return (
    <Box pb={{ base: 14, md: 10 }} pt={24} className={styles.container}>
      <Container maxW="7xl" mx="auto" px={{ base: 2, md: 2, lg: 0 }}>
        <Flex
          direction={{ base: "column", md: "row" }}
          justifyContent={{ base: "flex-start", md: "space-between" }}
          alignItems={{ base: "flex-start", md: "center" }}
          gap={{ base: 3, md: 0 }}
          px={{ base: 0, md: 10 }}
          mb={{ base: 5, md: 10 }}
          mt={5}
        >
          <NextLink
            href={backHref}
            passHref
            style={{ textDecoration: "none" }}
          >
            <Flex
              alignItems="center"
              gap={2}
              display="flex"
              color="#fff"
              fontWeight="500"
              transition="all 0.2s ease-in-out"
              _hover={{
                textDecoration: "none",
                transform: "scale(1.1)",
                opacity: 0.8,
              }}
            >
              <FaArrowLeftLong />
              <Text as="span">{t("changelog.back-to-changelog", "Back to Changelog")}</Text>
            </Flex>
          </NextLink>

          <Box
            bg="#fff6ed"
            color="#d65334"
            p="5px 15px 5px 15px"
            borderRadius="25px"
            fontSize="16px"
          >
            {date}
          </Box>
        </Flex>
        <Flex direction="column" align="center" textAlign="center" gap={2}>
          <Heading
            as="h1"
            fontSize={{
              base: "1.6rem",
              md: "2.4rem",
              lg: "3rem",
            }}
            fontWeight="700"
            lineHeight="tight"
            maxW={{ base: "full", md: "4xl" }}
            color="#fff"
          >
            {title}
          </Heading>
          {authorName && (
            <Text
              fontSize={{ base: "sm", md: "md" }}
              color="rgba(255, 255, 255, 0.8)"
              fontWeight="500"
            >
              {t("nav.by-author", "by {{author}}", { author: authorName })}
            </Text>
          )}
        </Flex>
      </Container>
    </Box>
  );
}
