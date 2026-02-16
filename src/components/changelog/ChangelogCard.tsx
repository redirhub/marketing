"use client";

import { Box, Heading, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { formatDate } from "@/lib/services/changelog";
import { ChangelogEntry } from "@/types/sanity";

interface ChangelogCardProps {
  entry: ChangelogEntry;
  locale?: string;
}

export const ChangelogCard = ({ entry, locale = "en" }: ChangelogCardProps) => {
  const href = locale === "en" ? `/changelog/${entry.slug.current}` : `/${locale}/changelog/${entry.slug.current}`;

  return (
    <NextLink href={href} style={{ textDecoration: "none" }}>
      <Box
        bg="white"
        borderRadius="12px"
        border="1px solid"
        borderColor="gray.200"
        p={6}
        cursor="pointer"
        _hover={{
          borderColor: "primary.600",
          boxShadow: "sm",
        }}
        transition="all 0.2s"
        h="full"
      >
        {/* Date */}
        <Text
          fontSize="sm"
          color="gray.500"
          mb={3}
        >
          {formatDate(entry.publishedAt)}
        </Text>

        {/* Title */}
        <Heading
          as="h3"
          fontSize="xl"
          fontWeight="700"
          lineHeight="1.4"
          mb={2}
          color="gray.900"
        >
          {entry.title}
        </Heading>

        {/* Description */}
        <Text
          fontSize="md"
          color="gray.600"
          lineHeight="1.6"
          lineClamp={3}
        >
          {entry.description}
        </Text>
      </Box>
    </NextLink>
  );
};
