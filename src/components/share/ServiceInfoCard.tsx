"use client";

import { Box, Heading, Text } from "@chakra-ui/react";

interface ServiceInfoCardProps {
  title: string;
  details: string;
}

export const ServiceInfoCard = ({ title, details }: ServiceInfoCardProps) => {
  return (
    <Box
      as="section"
      bg="white"
      border="1px solid"
      borderColor="#222B271A"
      borderRadius="12px"
      pt="48px"
      pb="40px"
      pl="32px"
      pr="20px"
      width="100%"
      transition="all 0.2s ease-in-out"
      mb="20px"
    >
      <Heading
        as="h3"
        fontSize={{ base: "1.25rem", md: "1.5rem" }}
        fontWeight="600"
        color="#101828"
        mb={"20px"}
        lineHeight="1.2"
        letterSpacing="0.04px"
        textAlign={"left"}
      >
        {title}
      </Heading>
      <Text
        fontSize={{ base: "1rem", md: "1.1rem" }}
        color="#475467"
        lineHeight="1.7rem"
        textAlign={"left"}
        letterSpacing={"0.2px"}
      >
        {details}
      </Text>
    </Box>
  );
};
