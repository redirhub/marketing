"use client";

import {
  Tabs,
  Box,
  Heading,
  Text,
  SimpleGrid,
  Button,
  Stack,
} from "@chakra-ui/react";
import FrameImage from "../share/features/FrameImage";
import { useTranslation } from "react-i18next";
import { GoCheckCircle } from "react-icons/go";
import Link from "next/link";
import { TabsLayout, TabTriggerButton } from "../ui/TabsLayout";
import { URL_DASHBOARD_REGISTER } from "@/lib/utils/constants";
import TestimonialsSlider from "./TestimonialsSlider";

interface TestimonialData {
  id: string | number;
  quote: string;
  name: string;
  role: string;
  avatar: string;
}

interface FeatureDetail {
  heading: string;
  description: string;
}

interface FeatureItem {
  key: string;
  tabLabel: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  features: FeatureDetail[];
  learnMoreHref: string;
}

interface FeatureContentProps {
  data: FeatureItem;
}

const FeatureListItem: React.FC<FeatureDetail> = ({ heading, description }) => (
  <Box as="li" display="flex" gap={2} listStyleType="none">
    <Box
      flexShrink={0}
      fontSize={{ base: "16px", md: "16px" }}
      mt={{ base: "5px", md: "4px" }}
      color="brand.solid"
    >
      <GoCheckCircle />
    </Box>
    <Box>
      <Text as="span" fontSize="1rem" fontWeight="700" color="gray.800">
        {heading}
      </Text>
      <Text
        as="span"
        fontSize="1rem"
        letterSpacing={"0.2px"}
        color="gray.800"
        display="inline"
      >
        {" "}
        {description}
      </Text>
    </Box>
  </Box>
);

const ActionButton: React.FC<
  React.ComponentProps<typeof Button> & {
    label: string;
    isPrimary?: boolean;
    href?: string;
  }
> = ({ label, isPrimary = false, href = "#", ...rest }) => (
  <Link href={href} target={isPrimary ? "_blank" : undefined}>
    <Button
      variant={isPrimary ? "primary" : "secondary"}
      px="24px"
      py="12px"
      fontSize="1rem"
      w={{ base: "full", sm: "auto" }}
      {...rest}
    >
      {label}
    </Button>
  </Link>
);

const FeatureContent: React.FC<FeatureContentProps> = ({ data }) => {
  const { t } = useTranslation();
  const { title, description, features, imageSrc, imageAlt, learnMoreHref } = data;

  return (
    <Box
      w="100%"
      maxW="7xl"
      mx="auto"
      mt={4}
      bg="white"
      mb={{ base: 6, md: 0 }}
      borderRadius="lg"
      p={{ base: 4, md: 6 }}
      px={{ base: 2, md: 6 }}
    >
      <SimpleGrid columns={{ base: 1, md: 1, lg: 2 }} gap={8}>
        <Box textAlign="left" order={{ base: 1, md: 1, lg: 1 }}>
          <Heading
            as="h2"
            fontSize={{ base: "1.2rem", md: "1.5rem", lg: "1.8rem" }}
            color="gray.900"
            mb={4}
            fontWeight={600}
          >
            {title}
          </Heading>
          <Text color="gray.700" mb={4} fontSize={"15px"} letterSpacing={"0.2px"}>
            {description}
          </Text>
          <Box as="ul" pl={0} display="grid" rowGap={3}>
            {features.map((feature, index) => (
              <FeatureListItem
                key={index}
                heading={feature.heading}
                description={feature.description}
              />
            ))}
          </Box>
          <Stack
            direction={{ base: "column", sm: "row" }}
            gap={4}
            align="center"
            mt={8}
          >
            <ActionButton
              label={t("home.features-get-started", "Get Started For Free")}
              isPrimary
              href={URL_DASHBOARD_REGISTER}
            />
            <ActionButton
              label={t("nav.learn-more", "Learn More")}
              href={learnMoreHref}
            />
          </Stack>
        </Box>

        <Box
          w="100%"
          h="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
          order={{ base: -1, md: -1, lg: 2 }}
          mb={{ base: 2, md: 2, lg: 0 }}
        >
          <FrameImage src={imageSrc} alt={imageAlt} />
        </Box>
      </SimpleGrid>
    </Box>
  );
};

interface PowerfulFeaturesProps {
  testimonials: TestimonialData[];
}

export default function PowerfulFeatures({ testimonials }: PowerfulFeaturesProps) {
  const { t } = useTranslation();

  const featuresData: FeatureItem[] = [
    {
      key: "tab1",
      tabLabel: t("home.features-create-tab", "Create Redirects"),
      title: t("home.features-create-title", "Live Worldwide the Moment You Save"),
      description: t(
        "home.features-create-desc",
        "Set up any redirect in seconds — from a single page forward to an entire wildcard domain. No config files, no tickets to IT, no deployment pipeline."
      ),
      imageSrc: "/assets/images/powerful-features/redirect.jpeg",
      imageAlt: "Create redirects dashboard — 301, 302, and wildcard redirect setup",
      learnMoreHref: "/create-redirects",
      features: [
        {
          heading: t("home.features-create-types", "301, 302, 307, 308:"),
          description: t(
            "home.features-create-types-desc",
            "Pick the right redirect type for every use case — permanent migrations, temporary campaigns, or method-preserving forwards."
          ),
        },
        {
          heading: t("home.features-create-wildcard", "Wildcard domains:"),
          description: t(
            "home.features-create-wildcard-desc",
            "Point an entire domain or subdomain to a new destination with one rule — *.brand.com covered in seconds."
          ),
        },
        {
          heading: t("home.features-create-csv", "Bulk CSV import:"),
          description: t(
            "home.features-create-csv-desc",
            "Upload hundreds of redirects in one file — preview before publishing, live in one click."
          ),
        },
      ],
    },
    {
      key: "tab2",
      tabLabel: t("home.features-manage-tab", "Manage Redirects"),
      title: t("home.features-manage-title", "Find, Edit, and Monitor Any Redirect Instantly"),
      description: t(
        "home.features-manage-desc",
        "Search your entire redirect inventory, update destinations without a deployment, and catch broken links before your users do."
      ),
      imageSrc: "/assets/images/powerful-features/filter-redirects.jpg",
      imageAlt: "Redirect management dashboard — search, filter, and bulk edit redirects",
      learnMoreHref: "/manage-redirects",
      features: [
        {
          heading: t("home.features-manage-search", "Global search & filters:"),
          description: t(
            "home.features-manage-search-desc",
            "Find any redirect by source, destination, tag, or domain — across your whole account."
          ),
        },
        {
          heading: t("home.features-manage-health", "Destination health checks:"),
          description: t(
            "home.features-manage-health-desc",
            "Automated alerts when a destination URL goes down — with fallback support to catch traffic automatically."
          ),
        },
        {
          heading: t("home.features-manage-bulk", "Bulk operations:"),
          description: t(
            "home.features-manage-bulk-desc",
            "Enable, disable, retag, or update destinations across multiple redirects in one action."
          ),
        },
      ],
    },
    {
      key: "tab3",
      tabLabel: t("home.features-team-tab", "Team Access"),
      title: t("home.features-team-title", "Marketers Move Fast. Infrastructure Stays Protected."),
      description: t(
        "home.features-team-desc",
        "Assign each team member exactly the access they need — full admin, edit-only, or view-only — down to the domain level."
      ),
      imageSrc: "/assets/images/powerful-features/team-collaboration.jpg",
      imageAlt: "Team access controls — role-based permissions for redirect management",
      learnMoreHref: "/team-management",
      features: [
        {
          heading: t("home.features-team-roles", "Role-based permissions:"),
          description: t(
            "home.features-team-roles-desc",
            "Define what each person can see and change — no shared credentials, no over-permissioning."
          ),
        },
        {
          heading: t("home.features-team-domains", "Domain-level control:"),
          description: t(
            "home.features-team-domains-desc",
            "Restrict access per domain — a team managing one brand has no visibility into another."
          ),
        },
        {
          heading: t("home.features-team-revoke", "Instant revocation:"),
          description: t(
            "home.features-team-revoke-desc",
            "Remove a team member's access immediately — their changes remain, their access doesn't."
          ),
        },
      ],
    },
    {
      key: "tab4",
      tabLabel: t("home.features-qr-tab", "QR Codes"),
      title: t("home.features-qr-title", "Change the Destination Without Reprinting"),
      description: t(
        "home.features-qr-desc",
        "Every QR code is a redirect. Update where it points anytime from the dashboard — the printed code stays the same."
      ),
      imageSrc: "/assets/images/powerful-features/qr-code.png",
      imageAlt: "Dynamic QR code tied to a redirect — update destination without reprinting",
      learnMoreHref: "/create-redirects",
      features: [
        {
          heading: t("home.features-qr-dynamic", "Dynamic codes:"),
          description: t(
            "home.features-qr-dynamic-desc",
            "Update the destination URL behind any QR code at any time — no reprint, no reissue."
          ),
        },
        {
          heading: t("home.features-qr-branding", "Custom branding:"),
          description: t(
            "home.features-qr-branding-desc",
            "Embed your logo and match your brand colours — print-ready in PNG or SVG."
          ),
        },
        {
          heading: t("home.features-qr-track", "Scan tracking:"),
          description: t(
            "home.features-qr-track-desc",
            "Monitor scan count, location, and device data — separate from URL click-throughs."
          ),
        },
      ],
    },
  ];

  return (
    <Box
      w="100%"
      py={{ base: 14, md: 20 }}
      px={{ base: 2, md: 6 }}
      textAlign="center"
      bg="white"
    >
      <Box w="100%" maxW="7xl" mx="auto" textAlign="center">
        <Heading
          as="p"
          fontSize={{ base: "1.5rem", md: "2rem", lg: "3rem" }}
          fontWeight={500}
          color="gray.700"
          lineHeight={{ base: "2.4rem", md: "3rem" }}
          letterSpacing="0.4px"
          mb={{ base: 8, md: 16 }}
        >
          {t("home.features-title", "Everything you need to manage URL redirects")}
        </Heading>
      </Box>

      <Box w="100%" maxW="7xl" mx="auto">
        <TabsLayout
          defaultValue="tab1"
          maxW="auto"
          bg="transparent"
          border="none"
          boxShadow="none"
          p={0}
          tabHeader={featuresData.map((feature) => (
            <TabTriggerButton
              key={feature.key}
              value={feature.key}
              label={feature.tabLabel}
            />
          ))}
          tabBody={featuresData.map((feature) => (
            <Tabs.Content key={feature.key} value={feature.key}>
              <FeatureContent data={feature} />
            </Tabs.Content>
          ))}
        />
      </Box>

      <TestimonialsSlider testimonials={testimonials} />
    </Box>
  );
}
