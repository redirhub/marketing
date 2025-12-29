"use client";

import { Box, Container, Flex, Heading, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import styles from "../../../home/Hero.module.css";
import RedirectForm from "./RedirectForm";

interface Props {
  title: string;
  subtitle: string;
  subtitleWidth?: string;
}

export default function FooterPagesBanner({
  title,
  subtitle,
  subtitleWidth = "",
}: Props) {
  const { t } = useTranslation("common");

  return (
    <Box pt={20} className={styles.heroContainer}>
      <Container maxW="7xl" mx="auto" px={{ base: 2, md: 2, lg: 0 }}>
        <Flex direction="column" align="center" textAlign="center" gap={2}>
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
          >
            {title}
          </Heading>
          <Text
            fontSize={{ base: "1rem", md: "1rem" }}
            color="#FFFFFFBA"
            w={{ base: "100%", md: subtitleWidth ? subtitleWidth : "35%" }}
            letterSpacing={"0.2px"}
            mb={"12px"}
          >
            {subtitle}
          </Text>
        </Flex>
        <RedirectForm />
      </Container>
    </Box>
  );
}
