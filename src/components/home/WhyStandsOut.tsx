"use client";

import {
  Heading,
  SimpleGrid,
  Stack,
  Link as ChakraLink,
  Box,
  Flex,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { VStack } from "@chakra-ui/react";

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
      py={{ base: 10, md: 20 }}
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
          Why RedirHub Stands Out
        </Heading>

        <SimpleGrid columns={{ base: 1, md: 1, lg: 2 }} gap={6} mb={6}>
          <Box
            bg={"#F2F4EF"}
            borderRadius="28px"
            p={{ base: 4, md: 6 }}
            display="flex"
            flexDirection="column"
            textAlign="center"
            gap={6}
          >
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              textAlign="center"
              position="relative"
              boxSize={{ base: "80px", md: "90px", lg: "102px" }}
              flexShrink={0}
            >
              <Image
                src="/assets/images/stands-out/main.svg"
                alt="Why RedirHub stands out"
                fill
                sizes="(max-width: 480px) 80px, 102px"
                style={{ objectFit: "contain" }}
              />
            </Box>
            <Stack gap={{ base: 2, md: 4 }} textAlign="left" justify="center">
              <Heading
                fontWeight={{ base: 600, md: 600, lg: 700 }}
                fontSize={{ base: "2rem", md: "2.2rem", lg: "3.2rem" }}
                color="#000"
              >
                90ms
              </Heading>
              <Text color="#667085">Rapid redirect</Text>
              <Text color="#667085">
                Average redirect latency, ensuring quick, seamless user
                experiences
              </Text>

              <ChakraLink
                as={Link}
                href="https://findredirect.com/uptime"
                target="_blank"
                fontSize={{ base: "0.9rem", md: "1rem" }}
                color="#1C6DB6"
                fontWeight={600}
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
      gap="20px"
      w="100%"
      align={{ base: "left", md: "center" }}
      direction={{ base: "column", md: "row" }}
    >
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

      <Box flex="0.7">
        <Text
          color="#000"
          lineHeight="1"
          mb="2px"
          textAlign={"left"}
          fontWeight={{ base: 600, md: 700 }}
          fontSize={{ base: "1.7rem", md: "1.7rem", lg: "1.7rem" }}
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

      <Box
        flex={{ base: "none", md: "2.4" }}
        w="full"
        pl={{ base: "0", md: "10px" }}
      >
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
