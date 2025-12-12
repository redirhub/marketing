"use client";

import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Button,
  Stack,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { PiCheckCircleFill } from "react-icons/pi";

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
      fontSize={{ base: "1.5rem", md: "1.75rem" }}
      mt={{ base: "1px", md: "2px" }}
      color="#E49426"
    >
      <PiCheckCircleFill />
    </Box>
    <Box textAlign="left">
      <Text as="span" fontSize="sm" fontWeight="700" color="#101828">
        {heading}
      </Text>
      <Text as="span" fontSize="sm" color="#667085" display="inline">
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
    bg: "#E49426",
    color: "white",
    _hover: { bg: "#C78121", transform: "translateY(-2px)", boxShadow: "lg" },
  };
  const secondaryStyles = {
    bg: "#fff",
    color: "#16538A",
    border: "1px solid #222B271A",
    _hover: {
      bg: "#16538A",
      color: "#fff",
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
        _active={{ transform: "translateY(0)" }}
        w={{ base: "full", sm: "auto" }}
        {...(isPrimary ? primaryStyles : secondaryStyles)}
        {...rest}
      >
        {label}
      </Button>
    </Link>
  );
};
export default function APIDocumentation() {
  return (
    <Box
      w="100%"
      pb={{ base: 14, md: 20 }}
      px={{ base: 2, md: 6 }}
      textAlign="center"
      bg={"#fff"}
    >
      <Box w="100%" maxW="7xl" mx="auto" textAlign="center">
        {/* Main Title */}
        <Heading
          fontSize={{ base: "1.4rem", md: "2rem", lg: "3rem" }}
          lineHeight={{ base: "1.4rem", md: "3rem" }}
          fontWeight={500}
          color="#344054"
          letterSpacing="0.4px"
          mb={{ base: 4, md: 8, lg: 16 }}
        >
          Explore RedirHub's API Documentation
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
              <Text color="#667085" mb={4}>
                Unleash the full potential of RedirHub with our detailed API
                documentation. Designed to support developers at every stage,
                the documentation provides clear and concise guidance to
                integrate, automate, and optimize your redirect management
                workflows seamlessly.
              </Text>
              <Box as="ul" pl={0} color="#667085" display="grid" rowGap={3}>
                <FeatureListItem
                  heading="Authentication Made Simple:"
                  description="Learn how to securely generate and use API keys for safe and reliable requests."
                />
                <FeatureListItem
                  heading="Error Handling & Troubleshooting:"
                  description="Quickly identify and resolve issues with detailed error codes and explanations."
                />
                <FeatureListItem
                  heading="Pagination & Rate Limits:"
                  description="Efficiently manage large datasets and ensure smooth API interactions with structured guidelines."
                />
                <FeatureListItem
                  heading="Robust Reference Material:"
                  description="Access a comprehensive API reference with examples to kickstart your implementation."
                />
                <FeatureListItem
                  heading="Scalable Solutions"
                  description="Leverage advanced features to automate workflows and scale your redirect management effortlessly."
                />
              </Box>
              <Stack
                direction={{ base: "column", sm: "row" }}
                gap={4}
                align="center"
                mt={8}
              >
                <ActionButton
                  label="Get Started For Free"
                  isPrimary
                  href="https://dash.redirhub.com/register"
                />
                <ActionButton label="Learn More" />
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
              <Image
                src={"/assets/images/api-documentation.jpeg"}
                alt="Redirect feature preview"
                width={640}
                height={420}
                style={{
                  width: "100%",
                  height: "auto",
                }}
              />
            </Box>
          </SimpleGrid>
        </Box>
      </Box>
    </Box>
  );
}
