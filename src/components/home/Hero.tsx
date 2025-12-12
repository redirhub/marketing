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
      <Container maxW="7xl" mx="auto" px={{ base: 2, md: 2, lg: 0 }}>
        <Flex direction="column" align="center" textAlign="center" gap={8}>
          <Box>
            <Heading
              as="h1"
              fontSize={{
                base: "2rem",
                md: "2.5rem",
                lg: "3.2rem",
              }}
              fontWeight="600"
              lineHeight="tight"
              maxW="4xl"
              color="#fff"
              mb={{ base: 4, md: 0 }}
            >
              {t(`home.hero.title`, "Your domains.")}
            </Heading>
            <Box>
              <Heading
                as="h1"
                fontSize={{ base: "2rem", md: "2rem", lg: "4rem" }}
                fontWeight="bold"
                lineHeight="tight"
                maxW="5xl"
                mt={-2}
                color="#fff"
              >
                <Text as="span" className={styles.globallyText}>
                  {t(`home.hero.underLineText`, "Globally")}{" "}
                </Text>
                <Text as="span">
                  {t(`home.hero.title2`, "redirected. Instantly.")}
                </Text>
              </Heading>
            </Box>
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
