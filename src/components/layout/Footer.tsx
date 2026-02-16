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
import { getAppName, SOCIAL_HANDLE, URL_API_DEV } from "@/lib/utils/constants";
import { useLocalePath } from "@/lib/hooks/useLocalePath";
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
  const localePath = useLocalePath();

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

  const footerLinks = {
    company: [
      {
        label: t(`nav.support`, "Support"),
        href: localePath("/support"),
      },
      {
        label: t(`nav.pricing`, "Pricing"),
        href: localePath("/pricing"),
      },
      {
        label: t(`nav.request-demo`, "Request a demo"),
        href: localePath("/enterprise"),
      },
      { label: t(`nav.blog`, "Blog"), href: localePath("/blog") },
      {
        label: t(`nav.affiliate-program`, "Affiliate Program"),
        href: "https://redirhub.getrewardful.com/signup",
        target: "blank",
      },
    ],
    resources: [
      {
        label: t(`nav.system-status`, "System Status"),
        href: "https://redirhub.statuspage.io/",
        target: "blank",
      },
      {
        label: t(`nav.changelog`, "Changelog"),
        href: localePath("/changelog"),
      },
      {
        label: t(`nav.api-documentation`, "API Documentation"),
        href: URL_API_DEV,
        target: "blank",
      },
    ],
    products: [
      {
        label: t(`nav.free-redirect-service`, "Free Redirect Service"),
        href: localePath("/free-redirect-service"),
      },
      {
        label: t(`nav.url-redirect-service`, "URL Redirect Service"),
        href: localePath("/url-redirect-service"),
      },
      {
        label: t(`nav.301-redirect-service`, "301 Redirect Service"),
        href: localePath("/301-redirect-service"),
      },
      {
        label: t(`nav.redirect-checker`, "Redirect Checker"),
        href: "https://findredirect.com/",
        target: "blank",
      },
      {
        label: t(`nav.url-expander`, "Short URL expander"),
        href: "https://findredirect.com/expander",
        target: "blank",
      },
    ],
    contact: [
      {
        label: t(`nav.login`, "Login"),
        href: "https://dash.redirhub.com/login?redirect=/",
      },
      {
        label: t(`nav.start-free`, "Start for Free"),
        href: "https://dash.redirhub.com/register",
      },
      {
        label: t(`nav.contact-business`, "Business Email / service[@]redirhub.com"),
      },
      {
        label: t(`nav.contact-abuse`, "Report Abuse / abuse[@]redirhub.com"),
      },
    ],
    legal: legalLinks || [],
  };

  const socialLinks = [
    { icon: FaYoutube, href: "https://youtube.com/@" + SOCIAL_HANDLE, label: "YouTube" },
    { icon: FaXTwitter, href: "https://twitter.com/" + SOCIAL_HANDLE, label: "X (Twitter)" },
    { icon: FaFacebook, href: "https://facebook.com/" + SOCIAL_HANDLE, label: "Facebook" },
    { icon: FaLinkedin, href: "https://linkedin.com/" + SOCIAL_HANDLE, label: "LinkedIn" },
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
              fontSize={{ base: "1.5rem", md: "3rem", lg: "3rem" }}
              fontWeight="600"
              color="white"
              lineHeight={{ base: "2rem", md: "3rem", lg: "3rem" }}
              letterSpacing={{base: "-0.5px", md: "-1.5px"}}
              textAlign={"center"}
              mb={{ base: "2rem", md: "3rem", lg: "3rem" }}
            >
              {t("nav.widget-title", "Fast, Secure, Effortless Link Management")}
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
            templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" , lg: "repeat(5, 1fr)" }}
            gap={8}
            mb={8}
          >
            <Stack
              gap={4}
              alignItems={{
                base: "center",
                md: "flex-start",
                lg: "flex-start",
              }}
            >
              <Flex align="center" gap={2} mb={2}>
                <Link href={localePath("/")}>
                  <Image
                    src="/assets/images/logo.png"
                    alt={getAppName()}
                    width={150}
                    height={53}
                    style={{ height: "auto" }}
                    preload
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
            <FooterLinkColumn title={t("nav.company", "Company")} links={footerLinks.company} />

            {/* Resources */}
            <FooterLinkColumn title={t("nav.resources", "Resources")} links={footerLinks.resources} />

            {/* Products */}
            <FooterLinkColumn title={t("nav.products", "Products")} links={footerLinks.products} />

            <FooterLinkColumn title={t("nav.contact", "Contact")} links={footerLinks.contact} />
          </Grid>

          {/* Bottom Bar */}
          <FooterBottomBar footerLinks={footerLinks} />
        </Container>
      </Container>
    </Box>
  );
}
