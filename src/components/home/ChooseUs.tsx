"use client";

import { Box, Heading, SimpleGrid, Text, Button, Flex } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useLocalePath } from "@/lib/hooks/useLocalePath";
import Image from "next/image";
import Link from "next/link";

interface ChooseUsBoxProps {
  title: string;
  subtitle?: string;
  buttonTitle?: string;
  buttonLink?: string;
  imageSrc: string;
  background?: string;
  maxWidth?: string;
}

function ChooseUsBox({
  title,
  subtitle,
  buttonTitle,
  buttonLink,
  imageSrc,
  background = "#fff",
  maxWidth = "6xl",
}: ChooseUsBoxProps) {
  return (
    <Box
      bg={background}
      borderRadius="xl"
      border="4px solid"
      borderColor="#222B271A"
      maxW={maxWidth}
      mx="auto"
      mt={{ base: 4, md: 10 }}
    >
      <Flex
        direction={{ base: "column", md: "column", lg: "row" }}
        justify="space-between"
        align={{ base: "start", md: "start", lg: "center" }}
        px={{ base: 4, md: 8 }}
        pt={{ base: 4, md: 8 }}
        pb={{ base: 1, md: 2 }}
        wrap="wrap"
      >
        <Box flex="1" order={{ base: 1, md: 1 }}>
          <Heading
            as={"h2"}
            fontSize={{ base: "1rem", md: "1.2rem", lg: "1.5rem" }}
            fontWeight="600"
            color="#333"
            textAlign={"left"}
          >
            {title}
          </Heading>
        </Box>

        {buttonTitle && buttonLink && (
          <Box
            order={{ base: -1, md: -1, lg: 3 }}
            w={{ base: "full", md: "auto" }}
            mb={{ base: 3, md: 2, lg: 0 }}
          >
            <Link href={buttonLink}>
              <Button
                mt={{ base: 4, md: 2, lg: 0 }}
                w={{ base: "full", md: "auto" }}
                variant="outline"
                borderColor="gray.300"
                p={"10px"}
                textAlign={"left"}
                borderRadius="md"
                fontSize={"12px"}
                color="#101828"
                letterSpacing={"0.2px"}
                bg="#fff"
                _hover={{ bg: "#16538A00", color: "#1C6DB6" }}
              >
                {buttonTitle}
              </Button>
            </Link>
          </Box>
        )}
      </Flex>

      <Flex
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        align={{ base: "start", md: "center" }}
        mb={6}
        px={{ base: 4, md: 8 }}
        order={{ base: 2, md: 2, lg: 2 }}
      >
        {subtitle && (
          <Text
            color="#667085"
            mt={2}
            textAlign={"left"}
            fontSize={"15px"}
            fontWeight={400}
          >
            {subtitle}
          </Text>
        )}
      </Flex>
      <Box bg="white" borderRadius="lg" p={6}>
        <Image
          src={imageSrc}
          alt={title}
          width={1200}
          height={600}
          style={{
            width: "100%",
            height: "auto",
            borderRadius: "8px",
            border: "1px solid #222B271A",
          }}
        />
      </Box>
    </Box>
  );
}

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
            imageSrc="/assets/images/powerful-features/quick-dns-Setup.png"
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
