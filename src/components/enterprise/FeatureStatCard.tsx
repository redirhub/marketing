"use client";

import {
  Box,
  Stack,
  Heading,
  Text,
  Flex,
  Link as ChakraLink,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import Image from "next/image";

interface FeatureStatCardProps {
  icon: React.ReactNode | string;
  statValue: string;
  title: string;
  description: string;
  linkHref?: string;
  linkLabel?: string;
  isFeatured?: boolean;
}

export const FeatureStatCard = ({
  icon,
  statValue,
  title,
  description,
  linkHref,
  linkLabel,
  isFeatured = false,
}: FeatureStatCardProps) => {
  const renderIcon = () => {
    if (typeof icon === "string") {
      return (
        <Box position="relative" w="100%" h="100%">
          <Image src={icon} alt={title} fill style={{ objectFit: "contain" }} />
        </Box>
      );
    }
    return icon;
  };
  return (
    <Box
      bg={"#F2F4EF"}
      borderRadius="32px"
      p={"14px"}
      pb="28px"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      height="100%"
    >
      <Stack gap={4}>
        <Flex align="center" gap={5}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            position="relative"
            boxSize={{ base: "60px", md: "60px" }}
            flexShrink={0}
            overflow="hidden"
          >
            {renderIcon()}
          </Box>

          <Box>
            <Heading
              fontWeight={700}
              fontSize={{ base: "1.2rem", md: "1.6rem" }}
              color="#101828"
              lineHeight="1"
            >
              {statValue}
            </Heading>
            <Text color="#667085" fontWeight={400} fontSize={"1rem"} mt={1}>
              {title}
            </Text>
          </Box>
        </Flex>

        <Box>
          <Text
            color="#667085"
            fontSize={"1rem"}
            lineHeight="tall"
            letterSpacing={"0.2px"}
            mb={6}
          >
            {description}
          </Text>
          {linkHref && linkLabel && (
            <ChakraLink
              as={Link}
              href={linkHref}
              target="_blank"
              fontSize={{ base: "0.9rem", md: "1rem" }}
              color="#1C6DB6"
              fontWeight={600}
              display="inline-flex"
              alignItems="center"
              gap="6px"
              _hover={{ color: "#667085" }}
            >
              View real-time speed report
              <FaArrowRightLong />
            </ChakraLink>
          )}
        </Box>
      </Stack>
    </Box>
  );
};
