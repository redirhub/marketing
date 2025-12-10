"use client";

import { Box, Container, Flex, Heading, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import HeroTabs from "./HeroTabs";
import styles from "./Hero.module.css";
import LogoBar from "./LogoBar";

export default function Hero() {
  const { t } = useTranslation("common");

  return (
    <Box pt={20} className={styles.heroContainer}>
      <Container maxW="7xl" mx="auto">
        <Flex direction="column" align="center" textAlign="center" gap={8}>
          {/* Main Heading */}
          <Box>
            <Heading
              as="h1"
              fontSize={{
                base: "4xl",
                md: "5xl",
                lg: "3.2rem",
              }}
              fontWeight="600"
              lineHeight="tight"
              maxW="4xl"
              color="#fff"
            >
              {t(`home.hero.title`, "Your domains.")}
            </Heading>
            <Heading
              as="h1"
              fontSize={{ base: "4xl", md: "5xl", lg: "4rem" }}
              fontWeight="bold"
              lineHeight="tight"
              maxW="5xl"
              mt={-2}
              color="#fff"
              className={styles.globallyText}
            >
              {t(`home.hero.title2`, "Globally redirected. Instantly.")}
            </Heading>
          </Box>
          {/* Subheading */}
          <Text fontSize={{ base: "lg", md: "xl" }} color="#fff" maxW="4xl">
            {t(
              `home.hero.subtitle`,
              "Forward your domains instantly and manage all redirects from a real-time dashboard. Enhance your SEO with 301/302 redirects and secure every link with HTTPS."
            )}
          </Text>
          <HeroTabs />
        </Flex>
        <LogoBar />
        <Box w="100%">
          <Image
            src="/assets/images/banner.png"
            alt="Banner"
            width={1920}
            height={600}
            style={{ width: "100%", height: "auto" }}
          />
        </Box>
      </Container>
    </Box>
  );
}
