"use client";

import {
  Heading,
  SimpleGrid,
  Stack,
  Link as ChakraLink,
  Box,
  Container,
} from "@chakra-ui/react";
import { PricingCard } from "./PricingCard";

export default function PricingPlan() {
  const pricingData = [
    {
      plan: "Free",
      price: "$0",
      subtext: "Free Forever",
      buttonText: "Get Started For Free",
      features: [
        { text: "5 source domains", isBold: true },
        { text: "100,000 requests / month", isBold: true },
        { text: "Automatic HTTPS" },
        { text: "301/302 redirect" },
      ],
    },
    {
      plan: "Pro",
      price: "$75",
      billingText: "$900 billed annually",
      buttonText: "Try For Free",
      isPopular: true,
      featureHeading: "FEATURES",
      features: [
        { text: "Everything in Basic plus....", isBold: false },
        { text: "200 source domains", isBold: true },
        { text: "20 million requests / mo", isBold: true },
        { text: "10 team members" },
      ],
    },
    // Add Basic and Business plans here...
  ];
  return (
    <Box
      w="100%"
      py={{ base: 10, md: 24 }}
      px={{ base: 4, md: 6 }}
      textAlign="center"
      bg={"#fff"}
    >
      <Box w="100%" maxW="7xl" mx="auto" textAlign="center">
        <Heading
          fontSize={{ base: "1.6rem", md: "2rem", lg: "3rem" }}
          fontWeight={500}
          color="#344054"
          letterSpacing="0.4px"
          mb={{ base: 8, md: 16 }}
        >
          Our Pricing Plan
        </Heading>

        <Container maxW="7xl">
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={6}>
            {pricingData.map((item) => (
              <PricingCard key={item.plan} {...item} />
            ))}
          </SimpleGrid>
        </Container>
      </Box>
    </Box>
  );
}
