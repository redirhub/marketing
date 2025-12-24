"use client";

import { Heading, SimpleGrid, Box, Container } from "@chakra-ui/react";
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
        { text: "Frame masked redirect" },
        { text: "QR Code generation" },
        { text: "Path/Query forwarding" },
      ],
    },
    {
      plan: "Basic",
      price: "$8",
      prefix: "starts at",
      priceSuffix: "per month",
      billingText: "$100 billed annually",
      buttonText: "Try For Free",
      isPopular: false,
      featureHeading: "FEATURES",
      featureSubHeading: `<p>Everything in <b>Free</b> plus....</p>`,
      features: [
        { text: "15 source domains", isBold: true },
        { text: "1 million requests / mo", isBold: true },
        { text: "1 team members" },
        { text: "Full HTTPS" },
        { text: "Frame" },
        { text: "Path-based redirect" },
        { text: "Basic analytics" },
      ],
    },
    {
      plan: "Pro",
      price: "$75",
      priceSuffix: "per month",
      billingText: "$900 billed annually",
      buttonText: "Try For Free",
      isPopular: true,
      featureHeading: "FEATURES",
      featureSubHeading: `<p>Everything in <b>Basic</b> plus....</p>`,
      features: [
        { text: "200 source domains", isBold: true },
        { text: "20 million requests / mo", isBold: true },
        { text: "10 team members" },
        { text: "Detailed analytics" },
        { text: "Bulk manage" },
        { text: "Multiple destinations" },
        { text: "Custom HTML" },
        { text: "Wildcards domain" },
      ],
    },
    {
      plan: "Business",
      price: "$158",
      priceSuffix: "per month",
      billingText: "$1900 billed annually",
      buttonText: "Try For Free",
      isPopular: false,
      featureHeading: "FEATURES",
      featureSubHeading: `<p>Everything in <b>Pro</b> plus....</p>`,
      features: [
        { text: "1000 source domains", isBold: true },
        { text: "50 million requests / mo", isBold: true },
        { text: "20 team members" },
        { text: "Raw log export" },
        { text: "More analytics history" },
        { text: "CVS import" },
        { text: "Tagging" },
        { text: "Security plugins" },
        { text: "Redirect to the fastest" },
      ],
    },
  ];
  return (
    <Box
      w="100%"
      pt={{ base: 10, md: 24 }}
      px={{ base: 4, md: 6 }}
      pb={{ base: 10, md: 8 }}
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
