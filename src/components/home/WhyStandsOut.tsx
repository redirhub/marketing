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
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { VStack } from "@chakra-ui/react";
import {
  HostnamesIcon,
  MainIcon,
  RapidRequestsIcon,
  SSLIcon,
  UptimeIcon,
  LocationsIcon,
} from "@/components/icons";

interface StatsCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  description: string;
  iconBg?: string;
  iconColor?: string;
}

export default function WhyStandsOut() {
  const { t } = useTranslation();

  const statsData = [
    {
      icon: <RapidRequestsIcon />,
      value: "100M+",
      label: t("home.why-rapid-requests", "Rapid requests"),
      description: t(
        "home.why-rapid-requests-desc",
        "Redirects handled in the last 24 hours, showcasing our platform's scale and reliability"
      ),
      iconBg: "teal.500",
    },
    {
      icon: <HostnamesIcon />,
      value: "500K+",
      label: t("home.why-hostnames", "Hostnames"),
      description: t(
        "home.why-hostnames-desc",
        "Hostnames actively managed, providing robust answer for businesses"
      ),
      iconBg: "teal.500",
    },
    {
      icon: <SSLIcon />,
      value: "900K+",
      label: t("home.why-ssl", "SSL"),
      description: t(
        "home.why-ssl-desc",
        "SSL certificates issued in past 60 days, enhancing data security for users"
      ),
      iconBg: "teal.500",
    },
    {
      icon: <LocationsIcon />,
      value: "10+",
      label: t("home.why-locations", "Locations"),
      description: t("home.why-locations-desc", "Points of Presence worldwide for reliable, global coverage"),
      iconBg: "teal.500",
    },
    {
      icon: <UptimeIcon />,
      value: "99.99%",
      label: t("home.why-uptime", "Uptime"),
      description: t(
        "home.why-uptime-desc",
        "Uptime guarantee, ensuring consistent access, dependable performance for all users"
      ),
      iconBg: "teal.500",
    },
  ];

  return (
    <Box
      w="100%"
      py={{ base: 10, md: 24 }}
      px={{ base: 4, md: 6 }}
      textAlign="center"
      bg={"#fff"}
      pb={{ base: 16, md: 20 }}
    >
      <Box w="100%" maxW="7xl" mx="auto" textAlign="center">
        <Heading
          fontSize={{ base: "1.5rem", md: "2rem", lg: "2.8rem" }}
          fontWeight={500}
          color="#344054"
          letterSpacing="0.4px"
          mb={{ base: 8, md: 14 }}
        >
          {t("home.why-stands-out-title", "Why RedirHub Stands Out")}
        </Heading>

        <SimpleGrid columns={{ base: 1, md: 1, lg: 2 }} gap={6} mb={6}>
          <Box
            bg={"#F2F4EF"}
            borderRadius="28px"
            p={{ base: 4, md: 6 }}
            display="flex"
            flexDirection="column"
            justifyContent={'center'}
            alignItems={{ base: 'center', md: 'baseline' }}
            textAlign="center"
            gap={6}
          >
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              textAlign="center"
              position="relative"
              boxSize={{ base: "80px", md: "90px", lg: "100px" }}
              flexShrink={0}
              mb={4}
            >
              <MainIcon />
            </Box>
            <Stack gap={{ base: 2, md: 4 }} textAlign={{ base: "center", md: "left" }} justify="center">
              <Heading
                as={"p"}
                fontWeight={{ base: 600, md: 600, lg: 700 }}
                fontSize={{ base: "2rem", md: "2.2rem", lg: "3rem" }}
                color="#000"
              >
                90ms
              </Heading>
              <Text color="#667085" fontSize={{ base: "1rem", md: "1rem" }}>
                {t("home.why-rapid-redirect", "Rapid redirect")}
              </Text>
              <Text color="#667085" fontSize={{ base: "1rem", md: "1.1rem" }}>
                {t("home.why-rapid-desc", "Average redirect latency, ensuring quick, seamless user experiences")}
              </Text>

              <ChakraLink
                as={Link}
                textAlign={{ base: "center", md: "left" }}
                href="https://findredirect.com/uptime"
                target="_blank"
                fontSize={{ base: "0.9rem", md: "1rem" }}
                color="#1C6DB6"
                justifyContent={{ base: 'center', md: 'start' }}
                fontWeight={600}
                display="inline-flex"
                alignItems="center"
                gap="6px"
                _hover={{ color: "#667085" }}
              >
                {t("home.why-speed-report", "View real-time speed report")}
                <ArrowForwardIcon boxSize={4} />
              </ChakraLink>
            </Stack>
          </Box>

          <Box maxW="6xl" mx="auto">
            <VStack gap={4} align="stretch">
              {statsData.map((stat, index) => (
                <StatsCard
                  key={index}
                  icon={stat.icon}
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
  icon,
  value,
  label,
  description,
}: StatsCardProps) => {
  return (
    <Flex
      bg="#F6F8F4"
      borderRadius="32px"
      p="14px"
      gap="20px"
      w="100%"
      align={{ base: "center", md: "center" }}
      direction={{ base: "column", md: "row" }}
    >
      <Box
        w="65px"
        h="65px"
        borderRadius="18px"
        overflow="hidden"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        {icon}
      </Box>

      <Box flex="0.7">
        <Text
          color="#333"
          lineHeight="1"
          mb="2px"
          textAlign={{ base: "center", md: "left" }}
          fontWeight={{ base: 600, md: 700 }}
          fontSize={{ base: "1.5rem", md: "1.5rem" }}
        >
          {value}
        </Text>

        <Text
          fontSize="14px"
          fontWeight="500"
          textAlign={{ base: "center", md: "left" }}
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
          lineHeight="1.4rem"
          fontWeight="400"
          textAlign={{ base: "center", md: "left" }}
        >
          {description}
        </Text>
      </Box>
    </Flex>
  );
};
