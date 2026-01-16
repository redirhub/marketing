"use client";

import { Box, Image, Text, Heading } from "@chakra-ui/react";
import { motion } from "framer-motion";
import NextLink from "next/link";

const MotionBox = motion.create(Box);

interface BlogCardProps {
  imageSrc: string;
  imageAlt?: string;
  category?: string;
  date?: string;
  title: string;
  excerpt?: string;
  link?: string;
  isBlogPage?: boolean;
}

export const BlogCard = ({
  imageSrc,
  imageAlt = "Blog post image",
  category,
  date,
  title,
  excerpt,
  link = "#",
}: BlogCardProps) => {
  return (
    <NextLink href={link} style={{ textDecoration: 'none' }}>
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        w="100%"
        bg="white"
        borderRadius="16px"
        overflow="hidden"
        cursor="pointer"
        maxH={'450px'}
        _hover={{
          transform: "translateY(-8px)",
          boxShadow: "0 12px 40px rgba(0, 0, 0, 0.12)",
        }}
        boxShadow="0 4px 12px rgba(0, 0, 0, 0.08)"
        display="block"
        css={{ transition: "all 0.3s ease" }}
      >
      {/* Featured Image */}
      <Box
        position="relative"
        w="100%"
        paddingBottom="60%"
        overflow="hidden"
        bg="gray.100"
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          position="absolute"
          top="0"
          left="0"
          w="100%"
          h="100%"
          objectFit="cover"
        />
      </Box>

      {/* Content */}
      <Box p={6}>
        {/* Category/Tags */}
          <Text
            fontSize="xs"
            fontWeight="700"
            textTransform="uppercase"
            letterSpacing="0.05em"
            color="gray.600"
            mb={3}
          >
            {category}
          </Text>

        {/* Title */}
        <Heading
          as="h3"
          fontSize={{ base: "xl", md: "2xl" }}
          fontWeight="700"
          lineHeight="1.3"
          mb={2}
          color="gray.900"
          lineClamp={2}
        >
          {title}
        </Heading>

        {/* Excerpt */}
        {excerpt && (
          <Text
            fontSize="md"
            color="gray.600"
            lineHeight="1.6"
            lineClamp={2}
            mb={2}
          >
            {excerpt}
          </Text>
        )}

        {/* Date - only show if provided */}
        {date && (
          <Text fontSize="sm" color="gray.500">
            {date}
          </Text>
        )}
      </Box>
    </MotionBox>
    </NextLink>
  );
};
