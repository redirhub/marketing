"use client";

import { Box, Heading, SimpleGrid } from "@chakra-ui/react";
import ChooseUsBox from "./ChooseUsBox";

export default function ChooseUs() {
  return (
    <Box
      w="100%"
      py={{ base: 10, md: 12, lg: 16 }}
      px={{ base: 4, md: 6 }}
      textAlign="center"
      bg={"#F2F4EF"}
    >
      <Box w="100%" maxW="7xl" mx="auto" textAlign="center">
        {/* Main Title */}
        <Heading
          fontSize={{ base: "2rem", md: "3rem" }}
          fontWeight={500}
          lineHeight={{ base: "2rem", md: "3rem" }}
          color="#344054"
          letterSpacing="0.4px"
          mb={{ base: 4, md: 6 }}
        >
          Why should you choose us?
        </Heading>

        <SimpleGrid
          columns={{ base: 1, md: 2 }}
          gap={{ base: 2, md: 6 }}
          mb={6}
        >
          <ChooseUsBox
            title="HTTPS everywhere"
            subtitle="Automatically secure all your redirects with HTTPS for a better user experience and SEO."
            buttonTitle="Explore Links Management"
            buttonLink="/manage-redirects"
            imageSrc="/assets/images/why-us-1.png"
          />
          <ChooseUsBox
            title="Easy Setup"
            subtitle="Simplify your setup with easy DNS configuration, nameservers, API integration and multi-user support."
            buttonTitle="Explore Links Management"
            buttonLink="/create-redirects"
            imageSrc="/assets/images/why-us-2.png"
          />
        </SimpleGrid>

        {/* Second Row: Single Image */}

        <ChooseUsBox
          title="Real-Time Control and Analytics"
          subtitle="Optimize your redirects with real-time analytics and instant updates, empowering smarter decisions and better performance."
          buttonTitle="Explore Links Analysis"
          buttonLink="/analyze-redirects"
          imageSrc="/assets/images/why-us-3.png"
          maxWidth="7xl"
        />
      </Box>
    </Box>
  );
}
