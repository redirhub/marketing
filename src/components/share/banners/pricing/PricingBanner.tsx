"use client";

import { Box, Container, Flex, Heading, Text } from "@chakra-ui/react";
import styles from "../../../home/Hero.module.css";

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
        <Box pt={{ base: 28, md: 32 }} pb={{ base: 40, md: '400px' }} className={styles.heroContainer}>
            <Container maxW="7xl" mx="auto" px={{ base: 2, md: 2, lg: 0 }}>
                <Flex direction="column" align="center" textAlign="center" gap={"8px"}>
                    <Heading
                        as="h1"
                        fontSize={{
                            base: "2rem",
                            md: "4rem",
                            lg: "64px",
                        }}
                        fontWeight="800"
                        lineHeight="1.2"
                        color="white"
                        mb={0}
                        fontFamily="'Inter', sans-serif"
                    >
                        {title}
                    </Heading>

                    <Heading
                        as="h2"
                        fontSize={{
                            base: "1.5rem",
                            md: "3rem",
                            lg: "48px",
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
                        mt={{ base: '4px', md: "12px" }}
                    >
                        {subtitle}
                    </Text>
                </Flex>
            </Container>
        </Box>
    );
}
