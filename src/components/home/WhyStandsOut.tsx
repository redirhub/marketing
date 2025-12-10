"use client";

import {
  Heading,
  SimpleGrid,
  Stack,
  Link as ChakraLink,
  Box,
  Flex,
  Text,
  Icon,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { ArrowForwardIcon } from "@chakra-ui/icons";

// Usage Example Component
import { VStack } from "@chakra-ui/react";
import { ReactNode } from "react";

interface StatsCardProps {
  iconSrc: string;
  iconAlt?: string;
  value: string;
  label: string;
  description: string;
  iconBg?: string;
  iconColor?: string;
}

export default function WhyStandsOut() {
  const statsData = [
    {
      iconSrc: "/assets/images/stands-out/itme-1.svg",
      value: "100M+",
      label: "Rapid requests",
      description:
        "Redirects handled in the last 24 hours, showcasing our platform’s scale and reliability",
      iconBg: "teal.500",
    },
    {
      iconSrc: "/assets/images/stands-out/itme-2.svg",
      value: "500K+",
      label: "Hostnames",
      description:
        "Hostnames actively managed, providing robust answer for businesses",
      iconBg: "teal.500",
    },
    {
      iconSrc: "/assets/images/stands-out/itme-3.svg",

      value: "900K+",
      label: "SSL",
      description:
        "SSL certificates issued in past 60 days, enhancing data security for users",
      iconBg: "teal.500",
    },
    {
      iconSrc: "/assets/images/stands-out/itme-4.svg",

      value: "10+",
      label: "Locations",
      description: "Points of Presence worldwide for reliable, global coverage",
      iconBg: "teal.500",
    },
    {
      iconSrc: "/assets/images/stands-out/itme-5.svg",
      value: "99.99%",
      label: "Uptime",
      description:
        "Uptime guarantee, ensuring consistent access, dependable performance for all users",
      iconBg: "teal.500",
    },
  ];

  return (
    <Box
      w="100%"
      py={{ base: 14, md: 20 }}
      px={{ base: 4, md: 6 }}
      textAlign="center"
      bg={"#fff"}
    >
      <Box w="100%" maxW="7xl" mx="auto" textAlign="center">
        {/* Main Title */}
        <Heading
          fontSize={{ base: "2rem", md: "3rem" }}
          fontWeight={500}
          color="#344054"
          letterSpacing="0.4px"
          mb={16}
        >
          Why RedirHub Stands Out
        </Heading>

        <SimpleGrid columns={{ base: 1, md: 2 }} gap={6} mb={6}>
          <Box
            bg={"#F2F4EF"}
            borderRadius="28px"
            p={{ base: 4, md: 6 }}
            display="flex"
            flexDirection="column"
            textAlign="center"
            gap={6}
          >
            <Image
              src="/assets/images/stands-out/main.svg"
              alt="Why RedirHub stands out"
              width={100}
              height={100}
              style={{
                width: "102px",
                height: "102px",
              }}
            />
            <Stack gap={4} textAlign="left" justify="center">
              <Heading fontWeight={700} fontSize="3.2rem" color="#000">
                90ms
              </Heading>
              <Text color="#667085">Rapid redirect</Text>
              <Text color="#667085">
                Average redirect latency, ensuring quick, seamless user
                experiences
              </Text>

              <ChakraLink
                as={Link}
                href="#"
                fontSize="1.1rem"
                color="#1C6DB6"
                fontWeight="600"
                display="inline-flex"
                alignItems="center"
                gap="6px"
                _hover={{ color: "#667085" }}
              >
                View real-time speed report
                <ArrowForwardIcon boxSize={4} />
              </ChakraLink>
            </Stack>
          </Box>

          <Box maxW="6xl" mx="auto">
            <VStack gap={4} align="stretch">
              {statsData.map((stat, index) => (
                <StatsCard
                  key={index}
                  iconSrc={stat.iconSrc}
                  value={stat.value}
                  label={stat.label}
                  description={stat.description}
                  iconBg={stat.iconBg}
                />
              ))}
            </VStack>
          </Box>
        </SimpleGrid>
      </Box>
    </Box>
  );
}

export const StatsCard = ({
  iconSrc,
  iconAlt = "stat icon",
  value,
  label,
  description,
}: StatsCardProps) => {
  return (
    <Flex
      bg="#F6F8F4"
      borderRadius="20px"
      p="20px"
      align="center"
      gap="20px"
      w="100%"
    >
      {/* Icon */}
      <Box
        w="70px"
        h="70px"
        borderRadius="18px"
        overflow="hidden"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Image
          src={iconSrc}
          alt={iconAlt}
          width={60}
          height={60}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </Box>

      {/* Value + Label */}
      <Box flex="0.7">
        <Text
          fontSize="1.7rem"
          fontWeight="700"
          color="#000"
          lineHeight="1"
          mb="2px"
          textAlign={"left"}
        >
          {value}
        </Text>

        <Text
          fontSize="14px"
          fontWeight="500"
          textAlign={"left"}
          color="#667085"
        >
          {label}
        </Text>
      </Box>

      {/* Description */}
      <Box flex="2.4" pl="10px">
        <Text
          fontSize="1.1rem"
          color="#667085"
          lineHeight="1.7rem"
          fontWeight="400"
          textAlign={"left"}
        >
          {description}
        </Text>
      </Box>
    </Flex>
  );
};
