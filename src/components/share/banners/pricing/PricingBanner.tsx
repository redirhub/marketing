"use client";

import { Box, Container, Flex, Heading, Text } from "@chakra-ui/react";
import styles from "../../../sections/Hero.module.css";

interface PricingBannerProps {
    title: string;
    mainTitle: string;
    subtitle: string;
}

export default function PricingBanner({
    title,
    mainTitle,
    subtitle,
}: PricingBannerProps) {
    return (
        <Box pt={28} pb={{ base: 40, md: '400px' }} className={styles.heroContainer}>
            <Container maxW="7xl" mx="auto" px={{ base: 2, md: 2, lg: 0 }}>
                <Flex direction="column" align="center" textAlign="center" gap={"8px"}>
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
                        mb={{ base: 4, md: 2 }}
                        letterSpacing={"-1.8px"}
                    >
                        {title}
                    </Heading>

                    <Heading
                        as="h2"
                        fontSize={{
                            base: "1.5rem",
                            md: "2.5rem",
                            lg: "44px",
                        }}
                        fontWeight="600"
                        lineHeight="1.2"
                        maxW="5xl"
                        color="whiteAlpha.88"
                        fontFamily="'Inter', sans-serif"
                    >
                        {mainTitle}
                    </Heading>

                    <Text
                        fontSize={{ base: "14px", md: "20px" }}
                        fontWeight="500"
                        lineHeight="1.5"
                        color="white"
                        maxW="3xl"
                        fontFamily="'Inter', sans-serif"
                        mt={{ base: '4px', md: "10px" }}
                    >
                        {subtitle}
                    </Text>
                </Flex>
            </Container>
        </Box>
    );
}
