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
import { useTranslation } from "react-i18next";
import Image from "next/image";
import styles from "../../../sections/Hero.module.css";
import Link from "next/link";
import { URL_DASHBOARD_REGISTER } from "@/lib/utils/constants";

interface FeatureBannerProps {
  title: string;
  subtitle: string;

  imageSrc?: string;
  imageAlt?: string;
  subtitleWidth?: string;
}

export default function FeatureBanner({
  title,
  subtitle,
  imageSrc = "/assets/images/banner.png",
  imageAlt = "Feature Banner Image",
  subtitleWidth = "",
}: FeatureBannerProps) {
  const { t } = useTranslation("common");

  return (
    <Box pt={{ base: 24, lg: 28 }} className={styles.heroContainer}>
      <Container maxW="7xl" mx="auto" px={{ base: 2, md: 2, lg: 0 }}>
        <Flex direction="column" align="center" textAlign="center" gap={2}>
          <Heading
            as="h1"
            fontSize={{
              base: "2rem",
              md: "2.5rem",
              lg: "3.2rem",
            }}
            fontWeight="700"
            lineHeight="tight"
            maxW="4xl"
            color="#fff"
            mb={{ base: 4, md: 2 }}
            letterSpacing={{base: "-0.5", md: "-1.8px"}}
          >
            {title}
          </Heading>
          <Text
            fontSize={{ base: "18px", md: "20px" }}
            color="#FFFFFF"
            w={{ base: "100%", md: subtitleWidth ? subtitleWidth : "46%" }}
            letterSpacing={"0.2px"}
            mb={"12px"}
          >
            {subtitle}
          </Text>

          <VStack gap={6} textAlign="center" mb="10px">
            <Link href={URL_DASHBOARD_REGISTER} target={"_blank"}>
              <Button
                bg="brand.500"
                color="white"
                borderColor="brand.500"
                px="24px"
                py="12px"
                minH={'44px'}
                fontSize="1rem"
                fontWeight="semibold"
                borderRadius="8px"
                transition="all 0.2s"
                _hover={{
                  borderColor: "brand.600",
                  color: "white",
                  transform: "translateY(-2px)",
                  boxShadow: "0 10px 20px rgba(95, 82, 63, 0.27)",
                }}
                _active={{
                  bg: "brand.700",
                  transform: "translateY(0)",
                }}
              >
                Get Started For Free
              </Button>
            </Link>
          </VStack>
          <Text
            fontSize={{ base: "1rem", md: "1.1rem" }}
            fontWeight={600}
            color="#FFFFFF9E"
            letterSpacing={"0.2px"}
            mb={"40px"}
          >
            *No Credit Card Needed. Cancel Anytime.
          </Text>
        </Flex>
        <Box w="100%">
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={1920}
            height={600}
            style={{ width: "100%", height: "auto" }}
          />
        </Box>
      </Container>
    </Box>
  );
}
