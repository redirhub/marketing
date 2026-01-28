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
import Image from "next/image";
import TestimonialsSlider from "./TestimonialsSlider";
import { GoCheckCircle } from "react-icons/go";
import Link from "next/link";
import { TabsLayout, TabTriggerButton } from "../ui/TabsLayout";

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
  hideLeanMore?: boolean;
}
interface FeatureContentProps {
  data: FeatureItem;
}
const FeatureListItem: React.FC<FeatureDetail> = ({
  heading,
  description,
}) => (
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
> = ({ label, isPrimary = false, href = "#", ...rest }) => {
  const primaryStyles = {
    bg: "brand.solid",
    color: "white",
    _hover: { bg: "brand.hover", transform: "translateY(-2px)", boxShadow: "lg" },
    _active: {
      bg: "brand.active",
    },
  };
  const secondaryStyles = {
    bg: "white",
    color: "primary.700",
    border: "1px solid",
    borderColor: "gray.100",
    _hover: {
      bg: "primary.700",
      color: "white",
      transform: "translateY(-2px)",
      boxShadow: "lg",
    },
  };

  return (
    <Link href={href} target={isPrimary ? "_blank" : undefined}>
      <Button
        px="24px"
        py="12px"
        fontSize="1rem"
        fontWeight="normal"
        borderRadius="8px"
        transition="all 0.2s"
        w={{ base: "full", sm: "auto" }}
        _active={{ transform: "translateY(0)" }}
        {...(isPrimary ? primaryStyles : secondaryStyles)}
        {...rest}
      >
        {label}
      </Button>
    </Link>
  );
};
const FeatureContent: React.FC<FeatureContentProps> = ({ data }) => {
  const {
    title,
    description,
    features,
    imageSrc,
    imageAlt,
    key,
    hideLeanMore = false,
  } = data;

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
            as={"h2"}
            fontSize={{ base: "1.2rem", md: "1.5rem", lg: "1.8rem" }}
            color="gray.900"
            mb={6}
            fontWeight={600}
          >
            {title}
          </Heading>
          <Text
            color="gray.700"
            mb={4}
            fontSize={"14px"}
            letterSpacing={"0.2px"}
          >
            {description}
          </Text>
          <Box as="ul" pl={0} display="grid" rowGap={3}>
            {/* Using the reusable FeatureListItem */}
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
              label={!hideLeanMore ? "Get Started For Free" : "Learn More"}
              isPrimary
              href="https://dash.redirhub.com/register"
            />
            {!hideLeanMore && <ActionButton label="Learn More" />}
          </Stack>
        </Box>

        {/* Right Side: Image */}
        <Box
          w="100%"
          h="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
          order={{ base: -1, md: -1, lg: 2 }}
          mb={{ base: 2, md: 2, lg: 0 }}
        >
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={640}
            height={420}
            style={{
              width: "100%",
              height: "auto",
            }}
            priority={key === "tab1"}
          />
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default function PowerfulFeatures() {
  const featuresData: FeatureItem[] = [
    {
      key: "tab1",
      tabLabel: "Quick DNS Setup",
      title: "Effortless DNS Configuration",
      description:
        "Simplify DNS setup with RedirHub’s streamlined tools. Configure DNS records quickly and ensure your redirects work seamlessly without technical hurdles.",
      imageSrc: "/assets/images/powerful-features/quick-dns-Setup.png",
      imageAlt: "DNS Configuration dashboard preview",
      features: [
        {
          heading: "Fast and Intuitive Setup:",
          description:
            "No more complex configurations—get your DNS set up in minutes.",
        },
        {
          heading: "Comprehensive Guides:",
          description: "Step-by-step instructions for every configuration.",
        },
        {
          heading: "Reliable Support:",
          description:
            "Our team is ready to assist with any DNS-related queries.",
        },
      ],
    },
    {
      key: "tab2",
      tabLabel: "QR Code",

      title: "Seamless QR Code Integration",
      description:
        "RedirHub lets you generate custom QR codes tied to your redirects, making it easier for users to access your content on the go.",
      imageSrc: "/assets/images/powerful-features/qr-code.png",
      imageAlt: "QR Code generation preview",
      features: [
        {
          heading: "Dynamic QR Codes:",
          description: "Update destination URLs without reprinting the code.",
        },
        {
          heading: "Custom Branding:",
          description: "Add your logo and brand colors to every QR code.",
        },
        {
          heading: "Track Scans:",
          description:
            "Monitor engagement metrics like scan count and locations.",
        },
      ],
      hideLeanMore: true,
    },
    {
      key: "tab3",
      tabLabel: "Team Collaboration",
      title: "Boost Productivity with Team Collaboration",
      description:
        "Manage your redirects more efficiently by enabling your team to work together seamlessly on RedirHub.",
      imageSrc: "/assets/images/powerful-features/team-Collaboration.jpeg",
      imageAlt: "Team collaboration dashboard preview",
      features: [
        {
          heading: "User Roles and Permissions:",
          description: "Assign roles to team members for secure collaboration.",
        },
        {
          heading: "Shared Projects:",
          description:
            "Organize redirects into shared folders for team visibility.",
        },
        {
          heading: "Activity Logs:",
          description: "Keep track of changes made by team members.",
        },
      ],
      hideLeanMore: true,
    },
    {
      key: "tab4",
      tabLabel: "Advanced Redirects",
      title: "Advanced Redirect Options with Custom Codes",
      description:
        "Harness the full power of HTTP status codes to handle a variety of redirect scenarios, from temporary redirects to permanent migrations.",
      imageSrc: "/assets/images/powerful-features/redirect.jpeg",
      imageAlt: "Redirect settings preview",
      features: [
        {
          heading: "Customizable Redirects:",
          description: "Configure 301, 302, and other HTTP codes effortlessly.",
        },
        {
          heading: "SEO-Friendly:",
          description:
            "Optimize search engine visibility with proper redirect handling.",
        },
        {
          heading: "Real-Time Updates:",
          description: "Make changes instantly without downtime.",
        },
      ],
      hideLeanMore: true,
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
          as={"p"}
          fontSize={{ base: "1.5rem", md: "2rem", lg: "3rem" }}
          fontWeight={500}
          color="gray.700"
          lineHeight={{ base: "2.4rem", md: "3rem" }}
          letterSpacing="0.4px"
          mb={{ base: 8, md: 16 }}
        >
          Discover RedirHub's Powerful Features
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

      <TestimonialsSlider />
    </Box>
  );
}
