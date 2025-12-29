"use client";

import { Box, Text, Flex } from "@chakra-ui/react";
import Link from "next/link";

interface ArticleItemProps {
  title: string;
  category: string;
  slug: string;
}

export function ArticleItem({ title, category, slug }: ArticleItemProps) {
  return (
    <Box
      w="full"
      role="group"
      borderRadius={"12px"}
      borderBottom="1px solid"
      borderColor="#EAECF0"
      _last={{ borderBottom: "none" }}
    >
      <Link
        href={`/support/${slug}`}
        passHref
        style={{ textDecoration: "none" }}
      >
        <Flex
          direction={{ base: "column-reverse", md: "row" }}
          align={{ base: "center", md: "center" }}
          justify="space-between"
          py={6}
          gap={{ base: 4, md: 0 }}
          cursor="pointer"
          transition="all 0.2s"
        >
          <Text
            fontSize={{ base: "1rem", md: "1rem" }}
            fontWeight="600"
            color="#344054"
            transition="color 0.2s"
            _hover={{ color: "#D65334" }}
          >
            {title}
          </Text>

          <Box
            p="5px 15px 5px 15px"
            borderRadius="25px"
            bg="#FFF6ED"
            color="#B93815"
            textTransform="capitalize"
          >
            <Box as="span" color={"#D65334"}>
              {category}
            </Box>
          </Box>
        </Flex>
      </Link>
    </Box>
  );
}
