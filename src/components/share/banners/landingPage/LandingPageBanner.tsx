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
import styles from "../../../home/Hero.module.css";
import type { HeroSection } from "@/types/sanity";
import { urlFor } from "@/sanity/lib/image";
import RedirectWidget from "@/components/home/RedirectWidget";
import { CustomerLogosSection } from "@/components/sections";

interface LandingPageBannerProps {
  hero: HeroSection;
}

export default function LandingPageBanner({ hero }: LandingPageBannerProps) {
  const heroImageUrl = hero.heroImage ? urlFor(hero.heroImage).width(1920).height(600).url() : null;
  const showRedirectWidget = hero.heroSections?.includes('redirect');
  const showCustomerLogos = hero.heroSections?.includes('customerLogos');

  return (
    <Box pt={20} pb={showRedirectWidget || showCustomerLogos || heroImageUrl ? 0 : 12} className={styles.heroContainer}>
      <Container maxW="7xl" mx="auto" px={{ base: 2, md: 2, lg: 0 }}>
        <Flex direction="column" align="center" textAlign="center" gap={2}>
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
            mb={{ base: 4, md: 2 }}
            letterSpacing={"-1.8px"}
          >
            {hero.headline}
          </Heading>

          {hero.subheadline && (
            <Text
              fontSize={{ base: "1rem", md: "1.1rem" }}
              color="#FFFFFFBA"
              w={{ base: "100%", md: "50%" }}
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
                  bg="#E49426"
                  color="white"
                  px="24px"
                  py="12px"
                  fontSize="1rem"
                  fontWeight="semibold"
                  borderRadius="8px"
                  _hover={{
                    bg: "#C78121",
                    transform: "translateY(-2px)",
                    boxShadow: "lg",
                  }}
                  _active={{
                    bg: "orange.700",
                    transform: "translateY(0)",
                  }}
                  transition="all 0.2s"
                >
                  {hero.ctaPrimary.label}
                </Button>
              </Link>
            </VStack>
          )}

          {/* Redirect Widget */}
          {showRedirectWidget && (
            <RedirectWidget />
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
              height={600}
              style={{ width: "100%", height: "auto" }}
            />
          </Box>
        )}
      </Container>
    </Box>
  );
}
