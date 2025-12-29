"use client";

import { Box, Container, Flex, Heading, Text } from "@chakra-ui/react";
import styles from "./BlogBanner.module.css";

const BlogBanner = () => {
  return (
    <>
      <Box pt={20} pb={8} className={styles.container}>
        <Container maxW="7xl" mx="auto" px={{ base: 2, md: 2, lg: 0 }}>
          <Flex direction="column" align="center" textAlign="center" gap={2}>
            <Box>
              <Heading
                as="h6"
                fontSize={{
                  base: "1rem",
                  md: "1rem",
                }}
                fontWeight="600"
                lineHeight="tight"
                maxW="4xl"
                color="#fff"
              >
                Gain Industry Insights
              </Heading>
            </Box>
            <Heading
              as="h1"
              fontSize={{
                base: "2rem",
                md: "2.5rem",
                lg: "3.4rem",
              }}
              fontWeight="600"
              lineHeight="tight"
              maxW="4xl"
              color="#fff"
            >
              Read our blog today
            </Heading>
          </Flex>
        </Container>
      </Box>
    </>
  );
};

export default BlogBanner;
