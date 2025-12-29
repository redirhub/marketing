"use client";

import { Box, Container, Flex, Spacer, Menu } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { getAppName, getDashboardBase } from "@/lib/utils/constants";
import { FaChevronDown } from "react-icons/fa";
import { useState } from "react";

function FeaturesDropdown({
  label,
  items,
}: {
  label: string;
  items: Array<{ href: string; label: string }>;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Menu.Root
      open={isOpen}
      onOpenChange={(e) => setIsOpen(e.open)}
      positioning={{ placement: "bottom-start" }}
    >
      <Menu.Trigger asChild>
        <Box
          as="button"
          fontSize="sm"
          fontWeight="medium"
          color="gray.700"
          _hover={{ color: "primary.600" }}
          display="flex"
          alignItems="center"
          gap={1}
        >
          {label}
          <Box
            as="span"
            display="inline-flex"
            transform={isOpen ? "rotate(180deg)" : "rotate(0deg)"}
            transition="transform 0.2s ease-in-out"
          >
            <FaChevronDown size={12} />
          </Box>
        </Box>
      </Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content
          minW="200px"
          bg="white"
          boxShadow="lg"
          borderRadius="md"
          border="1px solid"
          borderColor="gray.100"
          p={1}
        >
          {items.map((subItem) => (
            <Menu.Item key={subItem.href} value={subItem.href} asChild>
              <Link href={subItem.href}>
                <Box
                  fontSize="sm"
                  color="#000"
                  _hover={{ color: "primary.600" }}
                  py={2}
                  px={3}
                  cursor={"pointer"}
                >
                  {subItem.label}
                </Box>
              </Link>
            </Menu.Item>
          ))}
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>
  );
}

export default function Header() {
  const { t } = useTranslation("common");
  const params = useParams();
  const locale = (params?.locale as string) || "en";

  // Helper to generate URLs - hide /en for default locale
  const getLocalePath = (path: string) => {
    if (locale === "en") {
      return path;
    }
    return `/${locale}${path}`;
  };

  const navItems = [
    {
      label: t(`nav.features`, "Features"),
      items: [
        {
          href: getLocalePath("/create-redirects"),
          label: t(`nav.features.create-redirects`, "Create redirects"),
        },
        {
          href: getLocalePath("/manage-redirects"),
          label: t(`nav.features.manage-redirects`, "Manage Redirects"),
        },
        {
          href: getLocalePath("/analyze-redirects"),
          label: t(`nav.features.analyze-redirects`, "Analyze Redirects"),
        },
        {
          href: getLocalePath("/team-management"),
          label: t(`nav.features.team-management`, "Team Management"),
        },
        {
          href: getLocalePath("/global-scale"),
          label: t(`nav.features.global-scale`, "Global Scale"),
        },
        {
          href: getLocalePath("/security"),
          label: t(`nav.features.security-privacy`, "Security & Privacy"),
        },
      ],
    },
    {
      label: t(`nav.solutions`, "Solutions"),
      items: [
        {
          href: getLocalePath("/solutions/website-migrations"),
          label: t(`nav.features.website-migrations`, "Website Migrations"),
        },
        {
          href: getLocalePath("/solutions/marketing-campaigns"),
          label: t(`nav.features.marketing-campaigns`, "Marketing Campaigns"),
        },
        {
          href: getLocalePath("/solutions/domain-parking"),
          label: t(`nav.features.domain-parking`, "Domain Parking"),
        },
        {
          href: getLocalePath("/solutions/scalable-enterprise-solutions"),
          label: t(
            `nav.features.scalable-enterprise-solutions`,
            "Scalable Enterprise Solutions"
          ),
        },
      ],
    },
    { href: getLocalePath("/pricing"), label: t(`nav.pricing`, "Pricing") },
    { href: getLocalePath("/support"), label: t(`nav.support`, "Support") },
    {
      href: getLocalePath("/enterprise"),
      label: t(`nav.enterprise`, "Enterprise"),
    },
  ];

  return (
    <Box
      as="header"
      position="sticky"
      top={0}
      zIndex={1000}
      bg="white"
      borderBottomWidth="1px"
      borderColor="gray.200"
      py={4}
    >
      <Container maxW="7xl" mx="auto">
        <Flex alignItems="center">
          <Link href={getLocalePath("/")}>
            <Box>
              <Image
                src="/assets/images/RedirHub.png"
                alt={getAppName()}
                width={120}
                height={40}
                style={{ height: "auto" }}
              />
            </Box>
          </Link>

          {/* Desktop Navigation */}
          <Flex display={{ base: "none", md: "flex" }} gap={8} ml={12}>
            {navItems.map((item, index) => {
              // If item has sub-items, render as dropdown
              if (item.items) {
                return (
                  <FeaturesDropdown
                    key={item.label}
                    label={item.label}
                    items={item.items}
                  />
                );
              }
              // Regular link item
              return (
                <Link key={item.href} href={item.href}>
                  <Box
                    fontSize="sm"
                    fontWeight="medium"
                    color="gray.700"
                    _hover={{ color: "primary.600" }}
                  >
                    {item.label}
                  </Box>
                </Link>
              );
            })}
          </Flex>

          <Spacer />

          {/* CTA Buttons */}
          <Flex alignItems="center" gap={4}>
            <Link href={`${getDashboardBase()}/login`}>
              <Box
                as="button"
                px={4}
                py={2}
                borderRadius="md"
                borderWidth="1px"
                borderColor="gray.300"
                fontSize="sm"
                fontWeight="medium"
                _hover={{ bg: "gray.50" }}
                display={{ base: "none", sm: "block" }}
              >
                {t(`nav.login`, "Login")}
              </Box>
            </Link>
            <Link href={`${getDashboardBase()}/register`}>
              <Box
                as="button"
                px={4}
                py={2}
                borderRadius="md"
                bg="primary.600"
                color="white"
                fontSize="sm"
                fontWeight="medium"
                _hover={{ bg: "primary.700" }}
                display={{ base: "none", sm: "block" }}
              >
                {t(`nav.getStarted`, "Get Started")}
              </Box>
            </Link>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
}
