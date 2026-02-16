"use client";

import { Box, Container, Flex, Heading, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { getAppName } from "@/lib/utils/constants";
import styles from "../share/banners/blog/BlogBanner.module.css";

const ChangelogBanner = () => {
  const { t } = useTranslation();
  return (
    <Box pt={24} pb={{ base: 14, md: 10 }} className={styles.container}>
      <Container maxW="7xl" mx="auto" px={{ base: 2, md: 2, lg: 0 }}>
        <Flex direction="column" align="center" textAlign="center" gap={2}>
          <Heading
            as="h1"
            fontSize={{
              base: "1.2rem",
              md: "2.4rem",
              lg: "3rem",
            }}
            fontWeight="700"
            lineHeight="tight"
            maxW={{ base: "full", md: "4xl" }}
            color="#fff"
          >
            {t("changelog.banner-title", "Changelog")}
          </Heading>
          <Text
            fontSize={{ base: "1rem", md: "1.15rem" }}
            color="#FFFFFF"
            maxW={{ base: "full", md: "4xl" }}
            letterSpacing="0.2px"
            fontWeight={400}
            mt={{ base: 0, md: 4 }}
            textAlign="center"
          >
            {t("changelog.banner-description", "Latest updates and improvements to {{n}}", { n: getAppName() })}
          </Text>
        </Flex>
      </Container>
    </Box>
  );
};

export default ChangelogBanner;
