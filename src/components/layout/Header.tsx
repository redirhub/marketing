/* eslint-disable @next/next/no-img-element */
"use client";

import { Box, Container, Flex } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { getAppName, getDashboardBase } from "@/lib/utils/constants";
import MobileMenu from "./MobileMenu";
import { FiRefreshCw, FiUsers } from "react-icons/fi";
import { useState, useEffect } from "react";
import MenuDropdown from "./MenuDropdown";

interface HeaderProps {
  mode?: "light" | "dark";
}

export default function Header({ mode = "dark" }: HeaderProps) {
  const { t } = useTranslation("common");
  const params = useParams();
  const pathname = usePathname();
  const locale = (params?.locale as string) || "en";
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDark, setIsDark] = useState(mode === "dark");
  const [hasScrolled, setHasScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setIsScrolled(y > 0);
      setHasScrolled(y > 400);
      setIsDark(mode === "dark" ? y < 400 : false);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mode, pathname, locale]);

  const getLocalePath = (path: string) => {
    if (locale === "en") {
      return path;
    }
    return `/${locale}${path}`;
  };

  interface NavItem {
    label: string;
    href?: string;
    items?: any[];
    megaMenu?: {
      columns: {
        header: string;
        items: {
          label: string;
          description?: string;
          icon: string | React.ElementType;
          href: string;
        }[];
      }[];
      footer?: {
        label: string;
        icon: string | React.ElementType;
        href: string;
      }[];
    };
  }

  const navItems: NavItem[] = [
    {
      label: t(`nav.features`, "Features"),
      megaMenu: {
        columns: [
          {
            header: "CREATE",
            items: [
              {
                label: t(`nav.features.create-redirects`, "Create redirects"),
                description: t(
                  `nav.features.create-description`,
                  "Create and deploy all your redirects quickly and easily"
                ),
                icon: "/assets/images/dropdown-icons/switch-horizontal.svg",
                href: getLocalePath("/create-redirects"),
              },
              {
                label: t(`nav.features.manage-redirects`, "Manage redirects"),
                description: t(
                  `nav.features.manage-description`,
                  "Manage all your redirects in one centralized platform"
                ),
                icon: "/assets/images/dropdown-icons/toggle-right.svg",
                href: getLocalePath("/manage-redirects"),
              },
              {
                label: t(`nav.features.analyze-redirects`, "Analyse redirects"), // Note UK spelling in screenshot
                description: t(
                  `nav.features.analyze-description`,
                  "Gain powerful insights from your redirect traffic"
                ),
                icon: "/assets/images/dropdown-icons/line-chart-up.svg",
                href: getLocalePath("/analyze-redirects"),
              },
            ],
          },
          {
            header: "COLLABORATE",
            items: [
              {
                label: t(`nav.features.team-management`, "Team Management"),
                description: t(
                  `nav.features.team-description`,
                  "Collaborate securely across your organization"
                ),
                icon: FiUsers,
                href: getLocalePath("/team-management"),
              },
              {
                label: t(`nav.features.global-scale`, "Global Scale"),
                description: t(
                  `nav.features.global-description`,
                  "Deliver seamless experiences across websites and domains"
                ),
                icon: "/assets/images/dropdown-icons/globe.svg",
                href: getLocalePath("/global-scale"),
              },
              {
                label: t(`nav.features.security-privacy`, "Security & Privacy"),
                description: t(
                  `nav.features.security-description`,
                  "Keep all your audiences and web properties safe"
                ),
                icon: "/assets/images/dropdown-icons/shield-tick.svg",
                href: getLocalePath("/security"),
              },
            ],
          },
        ],
        footer: [
          {
            label: t(`nav.features.dev-resources`, "Dev resources"),
            icon: "/assets/images/dropdown-icons/code.svg",
            href: getLocalePath(""),
          },
          {
            label: t(`nav.features.api-access`, "API access"),
            icon: "/assets/images/dropdown-icons/file-code.svg",
            href: getLocalePath(""),
          },
        ],
      },
    },
    {
      label: t(`nav.solutions`, "Solutions"),
      megaMenu: {
        columns: [
          {
            header: "",
            items: [
              {
                label: t(
                  `nav.features.website-migrations`,
                  "Website Migration"
                ),
                description: t(
                  `nav.features.migration-description`,
                  "Seamless migration while preserving SEO"
                ),
                icon: "/assets/images/dropdown-icons/switch-horizontal.svg",
                href: getLocalePath("/solutions/website-migrations"),
              },
              {
                label: t(`nav.features.domain-parking`, "Domain Parking"),
                description: t(
                  `nav.features.parking-description`,
                  "Centralized redirects and brand defense"
                ),
                icon: "/assets/images/dropdown-icons/server.svg",
                href: getLocalePath("/solutions/domain-parking"),
              },
            ],
          },
          {
            header: "",
            items: [
              {
                label: t(
                  `nav.features.marketing-campaigns`,
                  "Marketing Campaigns"
                ),
                description: t(
                  `nav.features.marketing-description`,
                  "Streamlined link management and A/B testing"
                ),
                icon: "/assets/images/dropdown-icons/announcement.svg",
                href: getLocalePath("/solutions/marketing-campaigns"),
              },
              {
                label: t(
                  `nav.features.scalable-enterprise-solutions`,
                  "Enterprise Solutions"
                ),
                description: t(
                  `nav.features.enterprise-description`,
                  "Global edge network with guaranteed uptime"
                ),
                icon: "/assets/images/dropdown-icons/building.svg",
                href: getLocalePath("/solutions/scalable-enterprise-solutions"),
              },
            ],
          },
        ],
        footer: [
          {
            label: t(`nav.features.whats-new`, "What's new"),
            icon: FiRefreshCw,
            href: getLocalePath(""),
          },
        ],
      },
    },
    { href: getLocalePath("/pricing"), label: t(`nav.pricing`, "Pricing") },
    { href: getLocalePath("/support"), label: t(`nav.support`, "Support") },
    {
      href: getLocalePath("/enterprise"),
      label: t(`nav.enterprise`, "Enterprise"),
    },
  ];
  const isActive = (href: string | undefined) => {
    if (!href) return false;
    return pathname === getLocalePath(href);
  };
  const navActiveStyles = {
    backgroundColor: !isDark
      ? "header.bg.hover.dark"
      : "header.bg.hover.light",
    borderColor: !isDark
      ? "header.bg.border.dark"
      : "header.bg.border.light",
  };

  return (
    <Box
      as="header"
      position="fixed"
      top={0}
      zIndex={1000}
      p={isScrolled ? { base: 2, lg: 1 } : 4}
      transition="all 0.3s ease"
      bg={isScrolled ? "header.bg.scrolled" : "transparent"}
      backdropFilter={isScrolled ? "blur(16px)" : "none"}
      mx="auto"
      w="100%"
      left="0"
      right="0"
      borderBottom={isScrolled ? "1px solid rgba(255, 255, 255, 0.1)" : "none"}
    >
      <Container maxW="7xl" mx="auto">
        <Flex alignItems="center" justify="space-between">
          <Link href={getLocalePath("/")}>
            <Box>
              <img
                src={
                  isDark
                    ? "/assets/images/logo-dark.png"
                    : "/assets/images/logo.png"
                }
                alt={getAppName()}
                width={150}
                height={53}
                style={{ height: "auto" }}
              />
            </Box>
          </Link>
          <MobileMenu navItems={navItems} />

          <Flex
            display={{ base: "none", xl: "flex" }}
            gap={8}
            justify="center"
            align="center"
          >
            {" "}
            {navItems.map((item) => {
              if (item.items || item.megaMenu) {
                return (
                  <MenuDropdown
                    key={item.label}
                    label={item.label}
                    items={item.items}
                    megaMenu={item.megaMenu}
                    isDark={isDark}
                  />
                );
              }
              return (
                <Link key={item.href} href={item.href || "#"}>
                  <Box
                    fontSize="18px"
                    fontWeight="medium"
                    lineHeight="24px"
                    letterSpacing="0.2px"
                    fontFamily="Inter"
                    color={
                      !isDark ? "header.text.dark" : "header.text.light"
                    }
                    padding={"10px 14px 10px 14px"}
                    borderRadius={"12px"}
                    border="1px solid transparent"
                    _hover={navActiveStyles}
                    {...(isActive(item.href) && navActiveStyles)}
                    display="flex"
                    alignItems="center"
                  >
                    {item.label}
                  </Box>
                </Link>
              );
            })}
          </Flex>

          <Flex
            alignItems="center"
            gap={4}
            display={{ base: "none", xl: "flex" }}
          >
            <Link href={`${getDashboardBase()}/login`}>
              <Box
                as="button"
                display="flex"
                justifyContent="center"
                alignItems="center"
                px="24px"
                py="11px"
                minW="106px"
                borderRadius="12px"
                borderWidth="1px"
                borderStyle="solid"
                borderColor={!isDark ? "header.text.dark" : "gray.100"}
                fontSize="15px"
                fontWeight="700"
                lineHeight="20px"
                letterSpacing="0.2px"
                fontFamily="Inter"
                color={!isDark ? "header.text.dark" : "header.text.light"}
                cursor="pointer"
                _hover={{ bg: "rgba(255, 255, 255, 0.1)" }}
              >
                {t(`nav.login`, "Login")}
              </Box>
            </Link>
            <Link href={`${getDashboardBase()}/register`}>
              <Box
                as="button"
                display="flex"
                justifyContent="center"
                alignItems="center"
                px="24px"
                py="12px"
                minW="106px"
                borderRadius="12px"
                bg="brand.solid"
                color="white"
                fontSize="15px"
                fontWeight="700"
                lineHeight="20px"
                letterSpacing="0.2px"
                fontFamily="Inter"
                cursor="pointer"
                _hover={{ bg: "brand.hover" }}
              >
                {t(`nav.start-for-free`, "Start for Free")}
              </Box>
            </Link>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
}
