"use client";

import { Box, Container, Flex, Heading, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { getAppName } from "@/lib/utils/constants";
import styles from "../blog/BlogBanner.module.css";

const SupportBanner = () => {
  const { t } = useTranslation();

  return (
    <>
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
              mt={{base: 2, md: 5}}
            >
              {t("support.banner-title", "{{n}} Support", { n: getAppName() })}
            </Heading>
            <Text
              fontSize={{ base: "1rem", md: "1.15rem" }}
              color="#FFFFFF"
              maxW={{ base: "full", md: "4xl" }}
              letterSpacing={"0.2px"}
              fontWeight={400}
              mt={{base: 0, md: 4}}
              textAlign={{ base: "center", md: "center" }}
            >
              {t("support.banner-description", "Explore our resources for expert articles, guides, and tutorials to help you make the most of {{n}}. Find tips, best practices, and troubleshooting advice to optimize your URL management.", { n: getAppName() })}
            </Text>
          </Flex>
        </Container>
      </Box>
    </>
  );
};

export default SupportBanner;
