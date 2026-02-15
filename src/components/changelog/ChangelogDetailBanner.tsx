"use client";

import { Box, Container, Heading, Text, Flex } from "@chakra-ui/react";
import styles from "../share/banners/blog/BlogBanner.module.css";
import { FaArrowLeftLong } from "react-icons/fa6";
import NextLink from "next/link";

interface ChangelogDetailBannerProps {
  title: string;
  date: string;
  backHref: string;
}

export default function ChangelogDetailBanner({
  title,
  date,
  backHref,
}: ChangelogDetailBannerProps) {
  return (
    <Box pb={{ base: 14, md: 10 }} pt={24} className={styles.container}>
      <Container maxW="7xl" mx="auto" px={{ base: 2, md: 2, lg: 0 }}>
        <Flex
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          px={{ base: 0, md: 10 }}
          mb={10}
          mt={5}
        >
          <NextLink
            href={backHref}
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
              <Text as="span">Back to Changelog</Text>
            </Flex>
          </NextLink>

          <Box
            bg="#fff6ed"
            color="#d65334"
            p="5px 15px 5px 15px"
            borderRadius="25px"
            fontSize="16px"
          >
            {date}
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
            fontWeight="700"
            lineHeight="tight"
            maxW={{ base: "full", md: "4xl" }}
            color="#fff"
          >
            {title}
          </Heading>
        </Flex>
      </Container>
    </Box>
  );
}
