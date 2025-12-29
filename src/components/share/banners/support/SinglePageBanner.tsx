"use client";

import { Box, Container, Heading, Text, Flex, Badge } from "@chakra-ui/react";
import styles from "../blog/BlogBanner.module.css";
import { FaArrowLeftLong } from "react-icons/fa6";
import NextLink from "next/link";

interface SinglePageBannerProps {
  title: string;
  category: string;
}

export default function SinglePageBanner({
  title,
  category,
}: SinglePageBannerProps) {
  return (
    <>
      <Box pb={{ base: 14, md: 10 }} className={styles.container}>
        <Container maxW="7xl" mx="auto" px={{ base: 2, md: 2, lg: 0 }}>
          <Flex
            direction="row"
            justifyContent={"space-between"}
            alignItems={"center"}
            px={{ base: 0, md: 10 }}
            mb={10}
          >
            <NextLink
              href="/support"
              passHref
              style={{ textDecoration: "none" }}
            >
              <Flex
                alignItems="center"
                gap={2}
                display="flex"
                color="#fff"
                fontWeight="500"
                transition="all 0.2s ease-in-out"
                _hover={{
                  textDecoration: "none",
                  transform: "scale(1.1)",
                  opacity: 0.8,
                }}
              >
                <FaArrowLeftLong />
                <Text as="span">Back to Support</Text>
              </Flex>
            </NextLink>

            <Box
              bg="#fff6ed"
              color="#d65334"
              p="5px 15px 5px 15px"
              borderRadius="25px"
              textTransform="capitalize"
              fontSize="16px"
            >
              {category}
            </Box>
          </Flex>
          <Flex direction="column" align="center" textAlign="center" gap={2}>
            <Heading
              as="h1"
              fontSize={{
                base: "1.2rem",
                md: "2.4rem",
                lg: "3rem",
              }}
              fontWeight="900"
              lineHeight="tight"
              maxW={{ base: "full", md: "4xl" }}
              color="#fff"
            >
              {title}{" "}
            </Heading>
          </Flex>
        </Container>
      </Box>
    </>
  );
}
