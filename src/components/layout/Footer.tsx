"use client";

import {
  Box,
  Container,
  Flex,
  Grid,
  Stack,
  Text,
  IconButton,
  Heading,
  Button,
  VStack,
  Icon,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getAppName } from "@/lib/utils/constants";
import { FaYoutube, FaXTwitter, FaFacebook, FaLinkedin } from "react-icons/fa6";
import React from "react";
import styles from "./Footer.module.css";
import Image from "next/image";

export default function Footer() {
  const { t } = useTranslation("common");
  const params = useParams();
  const locale = (params?.locale as string) || "en";
  const currentYear = new Date().getFullYear();

  // Helper to generate URLs - hide /en for default locale
  const getLocalePath = (path: string) => {
    if (locale === "en") {
      return path;
    }
    return `/${locale}${path}`;
  };

  const footerLinks = {
    company: [
      {
        label: t(`footer.support`, "Support"),
        href: getLocalePath("/support"),
      },
      {
        label: t(`footer.pricing`, "Pricing"),
        href: getLocalePath("/pricing"),
      },
      {
        label: t(`footer.demo`, "Request a demo"),
        href: getLocalePath("/demo"),
      },
      { label: t(`footer.blog`, "Blog"), href: getLocalePath("/blog") },
    ],
    resources: [
      {
        label: t(`footer.status`, "System Status"),
        href: getLocalePath("/status"),
      },
      {
        label: t(`footer.changelog`, "Changelog"),
        href: getLocalePath("/changelog"),
      },
      {
        label: t(`footer.api`, "API Documentation"),
        href: getLocalePath("/api-docs"),
      },
    ],
    products: [
      {
        label: t(`footer.free`, "Free Redirect Service"),
        href: getLocalePath("/free"),
      },
      {
        label: t(`footer.url`, "URL Redirect Service"),
        href: getLocalePath("/url-redirect"),
      },
      {
        label: t(`footer.301`, "301 Redirect Service"),
        href: getLocalePath("/301-redirect"),
      },
      {
        label: t(`footer.checker`, "Redirect Checker"),
        href: getLocalePath("/checker"),
      },
      {
        label: t(`footer.expander`, "Short URL expander"),
        href: getLocalePath("/expander"),
      },
    ],
    contact: [
      { label: t(`footer.login`, "Login"), href: getLocalePath("/login") },
      {
        label: t(`footer.start`, "Start for Free"),
        href: getLocalePath("/signup"),
      },
      {
        label: "Business Email / service[@]redirhub.com",
        href: "mailto:service@redirhub.com",
      },
      {
        label: "Report Abuse / abuse[@]redirhub.com",
        href: "mailto:abuse@redirhub.com",
      },
    ],
    legal: [
      {
        label: t(`footer.terms`, "Terms of Service"),
        href: getLocalePath("/legal/terms-of-service"),
      },
      {
        label: t(`footer.privacy`, "Privacy Policy"),
        href: getLocalePath("/legal/privacy-policy"),
      },
      {
        label: t(`footer.cookie`, "Cookie Policy"),
        href: getLocalePath("/legal/cookie-policy"),
      },
    ],
  };

  const socialLinks = [
    { icon: FaYoutube, href: "https://youtube.com", label: "YouTube" },
    { icon: FaXTwitter, href: "https://twitter.com", label: "X (Twitter)" },
    { icon: FaFacebook, href: "https://facebook.com", label: "Facebook" },
    { icon: FaLinkedin, href: "https://linkedin.com", label: "LinkedIn" },
  ];

  return (
    <Box
      as="footer"
      color="gray.700"
      mt="auto"
      className={styles.footerContainer}
      pt="80px"
      pb="120px"
    >
      <Container maxW="7xl" mx="auto">
        <VStack gap={6} textAlign="center" mb="60px">
          <Heading
            as="h1"
            fontSize={{ base: "3rem", md: "3rem", lg: "3rem" }}
            fontWeight="600"
            color="white"
            lineHeight="1.2"
            maxW="900px"
            letterSpacing={"-1.8px"}
          >
            Redirect 5x Faster with Built-in Security
          </Heading>

          <VStack gap={0} maxW="700px">
            <Text
              textAlign="center"
              color="#FFFFFFD1"
              fontSize="1.1rem"
              fontWeight="500"
              letterSpacing="0.2px"
              textShadow="0px 0px 10px rgba(0, 0, 0, 0.3)"
            >
              Experience the power of rapid, secure redirects and effortless
              management.
            </Text>
            <Text
              textAlign="center"
              color="#FFFFFFD1"
              fontSize="1.1rem"
              fontWeight="500"
              letterSpacing="0.2px"
              textShadow="0px 0px 10px rgba(0, 0, 0, 0.3)"
            >
              RedirHub speeds up your workflow while keeping your domain safe.
            </Text>
          </VStack>

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
            Get Started For Free
          </Button>
        </VStack>

        <Container
          maxW="7xl"
          mx="auto"
          bg="linear-gradient(140deg, #FFFFFFC9 0%, #FFFFFFA3 100%)"
          borderRadius="24px"
          p={10}
        >
          <Grid
            templateColumns={{ base: "1fr", md: "repeat(5, 1fr)" }}
            gap={8}
            mb={8}
          >
            {/* Brand & Social */}
            <Stack gap={4}>
              <Flex align="center" gap={2} mb={2}>
                <Link href={getLocalePath("/")}>
                  <Image
                    src="/assets/images/RedirHub.png"
                    alt={getAppName()}
                    width={160}
                    height={50}
                    style={{ height: "auto" }}
                  />
                </Link>{" "}
              </Flex>

              <Flex gap={4}>
                {socialLinks.map((social) => (
                  <Icon
                    as={social.icon}
                    key={social.label}
                    boxSize={6}
                    color="#475467"
                    cursor="pointer"
                    transition="all 0.2s"
                    _hover={{
                      color: "#E49426",
                      transform: "translateY(-2px)",
                    }}
                  />
                ))}
              </Flex>

              <Box>
                {/* <Select
                size="sm"
                maxW="150px"
                bg="white"
                borderColor="gray.300"
                icon={<Text>🇬🇧</Text>}
                defaultValue="en"
              >
                <option value="en">English</option>
              </Select> */}
              </Box>
            </Stack>

            {/* Company */}
            <Stack gap={3}>
              <Text
                fontSize="1.1rem"
                fontWeight="700"
                lineHeight="2rem"
                letterSpacing="0.4px"
                color="#667085"
              >
                Company
              </Text>
              {footerLinks.company.map((link) => (
                <Link key={link.href} href={link.href}>
                  <Text
                    fontSize="sm"
                    fontWeight="400"
                    letterSpacing="0.2px"
                    color="gray.600"
                    _hover={{ color: "#1C6DB6" }}
                    transition="color 0.2s ease"
                  >
                    {link.label}
                  </Text>
                </Link>
              ))}
            </Stack>

            {/* Resources */}
            <Stack gap={3}>
              <Text
                fontSize="1.1rem"
                fontWeight="700"
                lineHeight="2rem"
                letterSpacing="0.4px"
                color="#667085"
              >
                Resources
              </Text>
              {footerLinks.resources.map((link) => (
                <Link key={link.href} href={link.href}>
                  <Text
                    fontSize="sm"
                    fontWeight="400"
                    letterSpacing="0.2px"
                    color="gray.600"
                    _hover={{ color: "#1C6DB6" }}
                    transition="color 0.2s ease"
                  >
                    {link.label}
                  </Text>
                </Link>
              ))}
            </Stack>

            {/* Products */}
            <Stack gap={3}>
              <Text
                fontSize="1.1rem"
                fontWeight="700"
                lineHeight="2rem"
                letterSpacing="0.4px"
                color="#667085"
              >
                Products
              </Text>
              {footerLinks.products.map((link) => (
                <Link key={link.href} href={link.href}>
                  <Text
                    fontSize="sm"
                    fontWeight="400"
                    letterSpacing="0.2px"
                    color="gray.600"
                    _hover={{ color: "#1C6DB6" }}
                    transition="color 0.2s ease"
                  >
                    {link.label}
                  </Text>
                </Link>
              ))}
            </Stack>

            {/* Contact */}
            <Stack gap={3}>
              <Text
                fontSize="1.1rem"
                fontWeight="700"
                lineHeight="2rem"
                letterSpacing="0.4px"
                color="#667085"
              >
                {" "}
                Contact
              </Text>
              {footerLinks.contact.map((link) => (
                <Link key={link.href} href={link.href}>
                  <Text
                    fontSize="sm"
                    fontWeight="400"
                    letterSpacing="0.2px"
                    color="gray.600"
                    _hover={{ color: "#1C6DB6" }}
                    transition="color 0.2s ease"
                  >
                    {link.label}
                  </Text>
                </Link>
              ))}
            </Stack>
          </Grid>

          {/* Bottom Bar */}
          <Flex
            direction={{ base: "column", md: "row" }}
            justify="space-between"
            align="center"
            pt={8}
            borderTopWidth="0"
            gap={4}
          >
            <Flex
              gap={4}
              flexWrap="wrap"
              justify={{ base: "center", md: "flex-start" }}
            >
              {footerLinks.legal.map((link, index) => (
                <React.Fragment key={link.href}>
                  <Link href={link.href}>
                    <Text
                      fontSize="sm"
                      color="gray.600"
                      _hover={{ color: "blue.600" }}
                    >
                      {link.label}
                    </Text>
                  </Link>
                  {index < footerLinks.legal.length - 1 && (
                    <Text fontSize="sm" color="gray.400">
                      -
                    </Text>
                  )}
                </React.Fragment>
              ))}
            </Flex>

            <Text fontSize="sm" color="gray.600">
              © Copyright - RedirHub
            </Text>
          </Flex>
        </Container>
      </Container>
    </Box>
  );
}
