"use client";

import {
  Box,
  Container,
  Flex,
  Grid,
  Stack,
  Icon,
  Heading,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { getAppName } from "@/lib/utils/constants";
import { FaYoutube, FaXTwitter, FaFacebook, FaLinkedin } from "react-icons/fa6";
import styles from "./Footer.module.css";
import Image from "next/image";
import LanguageSelector from "../share/LanguageSelector";
import { FooterBottomBar, FooterLinkItem } from "../footer/FooterBottomBar";
import { FooterLinkColumn } from "../footer/FooterLinkColumn";
import { FooterCtaHeader } from "../footer/FooterCtaHeader";
import RedirectWidget from "../sections/RedirectWidget";

interface FooterProps {
  legalLinks?: FooterLinkItem[];
}

export default function Footer({ legalLinks }: FooterProps) {
  const { t } = useTranslation();
  const params = useParams();
  const pathname = usePathname();
  const locale = (params?.locale as string) || "en";

  const tabRoutes = [
    "/create-redirects",
    "/manage-redirects",
    "/analyze-redirects",
    "/team-management",
    "/global-scale",
    "/security",
    "/scalable-enterprise-solutions",
    "/domain-parking",
    "/marketing-campaigns",
    "/website-migrations",
  ];
  // const showTabs = tabRoutes.includes(pathname);
  const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}(\/|$)/, "/") || "/";
  const showTabs =
    tabRoutes.includes(pathWithoutLocale) ||
    pathWithoutLocale.startsWith("/support/");

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
        href: getLocalePath("/enterprise"),
      },
      { label: t(`footer.blog`, "Blog"), href: getLocalePath("/blog") },
      {
        label: t(`footer.affiliate-program`, "Affiliate Program"),
        href: "https://redirhub.getrewardful.com/signup",
        target: "blank",
      },
    ],
    resources: [
      {
        label: t(`footer.status`, "System Status"),
        href: "https://redirhub.statuspage.io/",
        target: "blank",
      },
      {
        label: t(`footer.changelog`, "Changelog"),
        href: "https://headwayapp.co/redirhub-changelog",
        target: "blank",
      },
      {
        label: t(`footer.api`, "API Documentation"),
        href: "https://dev.redirhub.com",
        target: "blank",
      },
    ],
    products: [
      {
        label: t(`footer.free`, "Free Redirect Service"),
        href: getLocalePath("/free-redirect-service"),
      },
      {
        label: t(`footer.url`, "URL Redirect Service"),
        href: getLocalePath("/url-redirect-service"),
      },
      {
        label: t(`footer.301`, "301 Redirect Service"),
        href: getLocalePath("/301-redirect-service"),
      },
      {
        label: t(`footer.checker`, "Redirect Checker"),
        href: "https://findredirect.com/",
        target: "blank",
      },
      {
        label: t(`footer.expander`, "Short URL expander"),
        href: "https://findredirect.com/expander",
        target: "blank",
      },
    ],
    contact: [
      {
        label: t(`footer.login`, "Login"),
        href: "https://dash.redirhub.com/login?redirect=/",
      },
      {
        label: t(`footer.start`, "Start for Free"),
        href: "https://dash.redirhub.com/register",
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
    legal: legalLinks || [],
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
      className={styles.footerContainer}
      pt={{ base: "3rem", md: "80px" }}
    >
      <Container maxW="7xl" px={4} m="auto">
        {!showTabs && <FooterCtaHeader />}
        {showTabs && (
          <Box w="100%" maxW="6xl" mx="auto" mb={14}>
            <Heading
              as="p"
              fontSize={{ base: "2rem", md: "3rem", lg: "3rem" }}
              fontWeight="600"
              color="white"
              lineHeight={{ base: "3rem", md: "3rem", lg: "3rem" }}
              letterSpacing={"-1.8px"}
              textAlign={"center"}
              mb={{ base: "2rem", md: "3rem", lg: "3rem" }}
            >
              Fast, Secure, Effortless Link Management
            </Heading>
            <RedirectWidget />
          </Box>
        )}

        <Container
          maxW="7xl"
          mx="auto"
          bg="linear-gradient(140deg, #FFFFFFC9 0%, #FFFFFFA3 100%)"
          borderRadius="24px"
          p={10}
        >
          <Grid
            templateColumns={{ base: "1fr", md: "1fr", lg: "repeat(5, 1fr)" }}
            gap={8}
            mb={8}
          >
            <Stack
              gap={4}
              alignItems={{
                base: "center",
                md: "center",
                lg: "flex-start",
              }}
            >
              <Flex align="center" gap={2} mb={2}>
                <Link href={getLocalePath("/")}>
                  <Image
                    src="/assets/images/logo.png"
                    alt={getAppName()}
                    width={160}
                    height={50}
                    style={{ height: "auto" }}
                  />
                </Link>
              </Flex>

              <Flex gap={6}>
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
                <LanguageSelector openDirection="top" />
              </Box>
            </Stack>

            {/* Company */}
            <FooterLinkColumn title="Company" links={footerLinks.company} />

            {/* Resources */}
            <FooterLinkColumn title="Resources" links={footerLinks.resources} />

            {/* Products */}
            <FooterLinkColumn title="Products" links={footerLinks.products} />

            <FooterLinkColumn title="Contact" links={footerLinks.contact} />
          </Grid>

          {/* Bottom Bar */}
          <FooterBottomBar footerLinks={footerLinks} />
        </Container>
      </Container>
    </Box>
  );
}
