"use client";

import { Box, Container, Flex, Heading, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import styles from "../../../sections/Hero.module.css";
import { CustomerLogosSection } from "@/components/sections";

export default function EnterpriseBanner() {
  const { t } = useTranslation("common");

  return (
    <Box pt={28} className={styles.heroContainer}>
      <Container maxW="7xl" mx="auto" px={{ base: 2, md: 2, lg: 0 }}>
        <Flex direction="column" align="center" textAlign="center" gap={8}>
          <Box>
            <Heading
              as="h1"
              fontSize={{
                base: "2rem",
                md: "2.5rem",
                lg: "3.2rem",
              }}
              fontWeight="600"
              lineHeight="tight"
              maxW="4xl"
              color="#fff"
              mb={{ base: 4, md: 0 }}
              letterSpacing={"-1.8px"}
            >
              Reach Out to RedirHub
            </Heading>
            <Text
              fontSize={{ base: "lg", md: "1rem" }}
              color="#FFFFFFBA"
              maxW="4xl"
              letterSpacing={"0.2px"}
              mt={4}
            >
              Organize a demo or get help purchasing the product
            </Text>
          </Box>
        </Flex>
        <CustomerLogosSection />
      </Container>
    </Box>
  );
}
