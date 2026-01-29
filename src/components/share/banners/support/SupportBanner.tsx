"use client";

import { Box, Container, Flex, Heading, Text } from "@chakra-ui/react";
import styles from "../blog/BlogBanner.module.css";

const SupportBanner = () => {
  return (
    <>
      <Box pt={24} pb={{ base: 14, md: 10 }} className={styles.container}>
        <Container maxW="7xl" mx="auto" px={{ base: 2, md: 2, lg: 0 }}>
          <Flex direction="column" align="center" textAlign="center" gap={2}>
            <Box>
              <Heading
                as="h6"
                fontSize={{
                  base: ".9rem",
                  md: "1rem",
                  lg: "1rem",
                }}
                fontWeight="600"
                lineHeight="tight"
                maxW="4xl"
                color="#fff"
                mt={{base: 2, md: 5}}
              >
                Get All Your Questions Answered With The
              </Heading>
            </Box>
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
              RedirHub Support
            </Heading>
            <Text
              fontSize={{ base: "1rem", md: "1.15rem" }}
              color="#FFFFFF"
              maxW={{ base: "full", md: "4xl" }}
              letterSpacing={"0.2px"}
              fontWeight={400}
              mt={{base: 0, md: 4}}
              textAlign={{ base: "center", md: "center" }}
            >
              Get All Your Questions Answered With The RedirHub Support Explore
              our resources for expert articles, guides, and tutorials to help
              you make the most of RedirHub. Find tips, best practices, and
              troubleshooting advice to optimize your URL management and improve
              your site’s performance.
            </Text>
          </Flex>
        </Container>
      </Box>
    </>
  );
};

export default SupportBanner;
