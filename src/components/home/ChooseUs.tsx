"use client";

import { Box, Heading, SimpleGrid } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useLocalePath } from "@/lib/hooks/useLocalePath";
import ChooseUsBox from "./ChooseUsBox";

export default function ChooseUs() {
  const { t } = useTranslation();
  const localePath = useLocalePath();
  return (
    <Box
      w="100%"
      py={{ base: 10, md: 12, lg: 16 }}
      px={{ base: 4, md: 6 }}
      textAlign="center"
      bg={"#F2F4EF"}
    >
      <Box w="100%" maxW="7xl" mx="auto" textAlign="center">
        {/* Main Title */}
        <Heading
          as={"p"}
          fontSize={{ base: "1.5rem", md: "2rem", lg: "3rem" }}
          fontWeight={500}
          lineHeight={{ base: "2rem", md: "3rem" }}
          color="#344054"
          letterSpacing="0.4px"
          mb={{ base: 4, md: 6 }}
        >
          {t("home.choose-us-title", "Why should you choose us?")}
        </Heading>

        <SimpleGrid
          columns={{ base: 1, md: 2 }}
          gap={{ base: 2, md: 6 }}
          mb={6}
        >
          <ChooseUsBox
            title={t("home.choose-us-https-title", "HTTPS everywhere")}
            subtitle={t("home.choose-us-https-subtitle", "Automatically secure all your redirects with HTTPS for a better user experience and SEO.")}
            buttonTitle={t("home.choose-us-https-button", "Explore Links Management")}
            buttonLink={localePath("/manage-redirects")}
            imageSrc="/assets/images/why-us-1.png"
          />
          <ChooseUsBox
            title={t("home.choose-us-easy-title", "Easy Setup")}
            subtitle={t("home.choose-us-easy-subtitle", "Simplify your setup with easy DNS configuration, nameservers, API integration and multi-user support.")}
            buttonTitle={t("home.choose-us-easy-button", "Explore Links Management")}
            buttonLink={localePath("/create-redirects")}
            imageSrc="/assets/images/why-us-2.png"
          />
        </SimpleGrid>

        {/* Second Row: Single Image */}

        <ChooseUsBox
          title={t("home.choose-us-analytics-title", "Real-Time Control and Analytics")}
          subtitle={t("home.choose-us-analytics-subtitle", "Optimize your redirects with real-time analytics and instant updates, empowering smarter decisions and better performance.")}
          buttonTitle={t("home.choose-us-analytics-button", "Explore Links Analysis")}
          buttonLink={localePath("/analyze-redirects")}
          imageSrc="/assets/images/why-us-3.png"
          maxWidth="7xl"
        />
      </Box>
    </Box>
  );
}
