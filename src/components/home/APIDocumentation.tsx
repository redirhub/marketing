"use client";

import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Button,
  Stack,
} from "@chakra-ui/react";
import FrameImage from "../share/features/FrameImage";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { GoCheckCircle } from "react-icons/go";
import { APP_NAME, URL_DASHBOARD_REGISTER } from "@/lib/utils/constants";

interface FeatureListItemProps {
  heading: string;
  description: string;
}

const FeatureListItem: React.FC<FeatureListItemProps> = ({
  heading,
  description,
}) => (
  <Box as="li" display="flex" gap={2} listStyleType="none">
    <Box
      flexShrink={0}
      fontSize={{ base: "16px", md: "16px" }}
      mt={{ base: "5px", md: "4px" }}
      color="#E49426"
    >
      <GoCheckCircle />
    </Box>
    <Box textAlign="left">
      <Text as="span" fontSize="1rem" fontWeight="700" color="#222b27">
        {heading}{" "}
      </Text>
      <Text
        as="span"
        fontSize="1rem"
        display="inline"
        color="#222b27"
        letterSpacing={"0.2px"}
      >
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
  return (
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
};
export default function APIDocumentation() {
  const { t } = useTranslation();

  return (
    <Box
      w="100%"
      pb={{ base: 14, md: 20 }}
      px={{ base: 2, md: 6 }}
      textAlign="center"
      bg={"#fff"}
    >
      <Box w="100%" maxW="7xl" mx="auto" textAlign="center">
        <Heading
          as={"h2"}
          fontSize={{ base: "1.5rem", md: "2rem", lg: "3rem" }}
          lineHeight={{ base: "1.4rem", md: "3rem" }}
          fontWeight={500}
          color="#344054"
          letterSpacing="0.4px"
          mb={{ base: 4, md: 8, lg: 16 }}
        >
          {t("home.api-title", "Explore {{n}}'s API Documentation", { n: APP_NAME })}
        </Heading>
      </Box>

      <Box w="100%" maxW="7xl" mx="auto">
        <Box
          w="100%"
          maxW="7xl"
          mx="auto"
          mt={4}
          bg="white"
          borderRadius="lg"
          p={{ base: 4, md: 6 }}
        >
          <SimpleGrid
            columns={{ base: 1, md: 1, lg: 2 }}
            gap={8}
            alignItems="center"
          >
            <Box textAlign="left" order={{ base: 1, md: 1 }}>
              <Text
                color="#344054"
                mb={4}
                fontSize={"1rem"}
                letterSpacing={"0.2px"}
                lineHeight={"1.7rem"}
              >
                {t("home.api-desc", "Unleash the full potential of RedirHub with our detailed API documentation. Designed to support developers at every stage, the documentation provides clear and concise guidance to integrate, automate, and optimize your redirect management workflows seamlessly.")}
              </Text>
              <Box as="ul" pl={0} color="#667085" display="grid" rowGap={3}>
                <FeatureListItem
                  heading={t("home.api-auth", "Authentication Made Simple:")}
                  description={t("home.api-auth-desc", "Learn how to securely generate and use API keys for safe and reliable requests.")}
                />
                <FeatureListItem
                  heading={t("home.api-error", "Error Handling & Troubleshooting:")}
                  description={t("home.api-error-desc", "Quickly identify and resolve issues with detailed error codes and explanations.")}
                />
                <FeatureListItem
                  heading={t("home.api-pagination", "Pagination & Rate Limits:")}
                  description={t("home.api-pagination-desc", "Efficiently manage large datasets and ensure smooth API interactions with structured guidelines.")}
                />
                <FeatureListItem
                  heading={t("home.api-reference", "Robust Reference Material:")}
                  description={t("home.api-reference-desc", "Access a comprehensive API reference with examples to kickstart your implementation.")}
                />
                <FeatureListItem
                  heading={t("home.api-scalable", "Scalable Solutions:")}
                  description={t("home.api-scalable-desc", "Leverage advanced features to automate workflows and scale your redirect management effortlessly.")}
                />
              </Box>
              <Stack
                direction={{ base: "column", sm: "row" }}
                gap={4}
                align="center"
                mt={8}
              >
                <ActionButton
                  label={t("nav.get-started", "Get Started For Free")}
                  isPrimary
                  href={URL_DASHBOARD_REGISTER}
                />
                <ActionButton label={t("nav.learn-more", "Learn More")} />
              </Stack>
            </Box>

            <Box
              w="100%"
              h="100%"
              display="flex"
              alignItems="center"
              justifyContent="center"
              order={{ base: -1, md: -1, lg: 2 }}
            >
              <FrameImage
                src="/assets/images/api-documentation.jpeg"
                alt="Redirect feature preview"
              />
            </Box>
          </SimpleGrid>
        </Box>
      </Box>
    </Box>
  );
}
