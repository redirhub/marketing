"use client";

import { Box, Container, Flex, Heading, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import styles from "../sections/Hero.module.css";
import { CustomerLogosSection } from "@/components/sections";
import RedirectWidget from "../sections/RedirectWidget";
import type { HeroSection } from "@/types/sanity";
import { urlFor } from "@/sanity/lib/image";

interface HeroProps {
  content?: HeroSection;
}

export default function Hero({ content }: HeroProps) {
  const { t } = useTranslation("common");

  const badge = content?.badge ?? t("home.hero-badge", "✨ 1M+ domains redirected daily");
  const subtitle = content?.subheadline ?? t("home.hero-subtitle", "Forward your domains instantly and manage all redirects from a real-time dashboard. Enhance your SEO with 301/302 redirects and secure every link with HTTPS.");

  const lines = content?.headline?.split('\n') ?? [];
  const h2Text = lines[0] || t("home.hero-title", "Your domains.");
  const h1Raw = lines[1] || null;
  const h1Match = h1Raw ? /^\*\*(.+?)\*\*\s*(.*)$/.exec(h1Raw) : null;
  const highlightedWord = h1Match?.[1] ?? t("home.hero-underline-text", "Globally");
  const mainText = h1Match?.[2] ?? t("home.hero-title2", "redirected. Instantly.");

  return (
    <Box pt={28} className={styles.heroContainer}>
      <Container maxW="7xl" mx="auto" px={{ base: 2, md: 2, lg: 0 }}>
        <Flex direction="column" align="center" textAlign="center" gap={4}>
          <Box>
            <Text as="span" bg={'header.bg.scrolled'} px={'14px'} py={'7px'} borderRadius="full" fontSize="sm" mb={4} display="inline-block" color="white" fontWeight={500}>
              {badge}
            </Text>
            <Heading
              as="h2"
              fontSize={{
                base: "1.8rem",
                md: "2.5rem",
                lg: "3.2rem",
              }}
              fontWeight={600}
              maxW="4xl"
              color="#fff"
              mt={{base: 1, md: 3}}
              mb={{ base: 2, md: "12px" }}
            >
              {h2Text}
            </Heading>
            <Box>
              <Heading
                as="h1"
                fontSize={{ base: "2rem", md: "2.5rem", lg: "4rem" }}
                fontWeight={700}
                lineHeight="tight"
                maxW="5xl"
                color="#fff"
                letterSpacing={"-0.8px"}
              >
                <Text as="span" className={styles.globallyText}>
                  {highlightedWord}{" "}
                </Text>
                <Text as="span">
                  {mainText}
                </Text>
              </Heading>
            </Box>
          </Box>
          {/* Subheading */}
          <Text
            fontSize={{ base: "1rem", md: "1.2rem" }}
            color="#fff"
            lineHeight={{base: "1.5rem", md: "1.75rem"}}
            maxW="4xl"
          >
            {subtitle}
          </Text>
          <RedirectWidget />
        </Flex>
        <CustomerLogosSection />
        <Box w="100%">
          {content?.heroImage ? (
            <Image
              src={urlFor(content.heroImage).width(1920).url()}
              alt="Banner"
              width={content.heroImage.dimensions?.width ?? 1920}
              height={content.heroImage.dimensions?.height ?? 600}
              style={{ width: "100%", height: "auto" }}
            />
          ) : (
            <Image
              src="/assets/images/banner.png"
              alt="Banner"
              width={1920}
              height={600}
              style={{ width: "100%", height: "auto" }}
            />
          )}
        </Box>
      </Container>
    </Box>
  );
}
