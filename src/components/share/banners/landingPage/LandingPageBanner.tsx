"use client";

import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import styles from "../../../sections/Hero.module.css";
import type { HeroSection } from "@/types/sanity";
import { urlFor } from "@/sanity/lib/image";
import RedirectWidget from "@/components/sections/RedirectWidget";
import { CustomerLogosSection } from "@/components/sections";

interface LandingPageBannerProps {
  hero: HeroSection;
}

const bannerGradients: Record<string, string> = {
  default: 'linear-gradient(163deg, #1c6db6 0%, #20a795 86%)',
  purple:  'linear-gradient(163deg, #3d2b9e 0%, #7c4dbb 86%)',
  teal:    'linear-gradient(163deg, #0a6b61 0%, #0d9a8a 86%)',
  dark:    'linear-gradient(163deg, #0f1923 0%, #1b3a5c 86%)',
}

export default function LandingPageBanner({ hero }: LandingPageBannerProps) {
  const aspectRatio = hero.heroImage?.dimensions?.aspectRatio;
  const imageHeight = aspectRatio ? Math.round(1920 / aspectRatio) : 600;
  const heroImageUrl = hero.heroImage
    ? urlFor(hero.heroImage).width(1920).url()
    : null;
  const showRedirectWidget = hero.heroSections?.includes('redirect');
  const showCustomerLogos = hero.heroSections?.includes('customerLogos');
  const gradient = bannerGradients[hero.bannerStyle ?? 'default'] ?? bannerGradients.default;

  return (
    <Box pt={28} pb={showRedirectWidget || showCustomerLogos || heroImageUrl ? 0 : 12} className={styles.heroContainer} style={{ backgroundImage: gradient }}>
      <Container maxW="7xl" mx="auto" px={{ base: 2, md: 2, lg: 0 }}>
        <Flex direction="column" align="center" textAlign="center" gap={2}>
          <Heading
            as="h1"
            fontSize={{
              base: "2rem",
              md: "2.5rem",
              lg: "3.1rem",
            }}
            fontWeight="700"
            lineHeight="tight"
            maxW="4xl"
            color="#fff"
            mb={{ base: 4, md: 2 }}
            letterSpacing={{ base: "-0.5px", lg: "-1px" }}
          >
            {hero.headline}
          </Heading>

          {hero.subheadline && (
            <Text
              fontSize={{ base: "1rem", md: "1.2rem" }}
              color="#FFFFFF"
              w={{ base: "100%", md: "80%" }}
              letterSpacing={"0.2px"}
              mb={"12px"}
              lineHeight="1.6"
            >
              {hero.subheadline}
            </Text>
          )}

          {hero.ctaPrimary?.label && hero.ctaPrimary?.url && !showRedirectWidget && (
            <VStack gap={2} textAlign="center" mb="10px">
              <Link href={hero.ctaPrimary.url} target={hero.ctaPrimary.url.startsWith('http') ? "_blank" : "_self"}>
                <Button
                  variant="primary"
                  px="24px"
                  py="12px"
                  fontSize="1rem"
                >
                  {hero.ctaPrimary.label}
                </Button>
              </Link>
              {hero.ctaNote && (
                <Text
                  fontSize={{ base: "0.9rem", md: "1rem" }}
                  fontWeight={600}
                  color="#FFFFFF9E"
                  letterSpacing="0.2px"
                >
                  {hero.ctaNote}
                </Text>
              )}
            </VStack>
          )}

          {/* Redirect Widget */}
          {showRedirectWidget && (
            <RedirectWidget fixed={`redirect`} />
          )}
        </Flex>

        {/* Customer Logos */}
        {showCustomerLogos && (
          <CustomerLogosSection />
        )}

        {/* Hero Image */}
        {heroImageUrl && (
          <Box w="100%" mt={showRedirectWidget || showCustomerLogos ? 0 : 8}>
            <Image
              src={heroImageUrl}
              alt={hero.headline}
              width={1920}
              height={imageHeight}
              style={{ width: "100%", height: "auto" }}
            />
          </Box>
        )}
      </Container>
    </Box>
  );
}
