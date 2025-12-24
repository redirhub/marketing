"use client";
import {
  Box,
  VStack,
  Text,
  Heading,
  Button,
  List,
  ListItem,
  Badge,
  HStack,
} from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";
import { FaRegCheckCircle } from "react-icons/fa";

interface PricingFeature {
  text: string;
  isBold?: boolean;
}

interface PricingCardProps {
  plan: string;
  price: string;
  subtext?: string;
  billingText?: string;
  buttonText: string;
  features: PricingFeature[];
  isPopular?: boolean;
  featureHeading?: string;
  featureSubHeading?: string;
  prefix?: string;
  priceSuffix?: string;
}

export const PricingCard = ({
  plan,
  price,
  subtext,
  billingText,
  buttonText,
  features,
  isPopular = false,
  featureHeading,
  prefix,
  priceSuffix,
  featureSubHeading,
}: PricingCardProps) => {
  return (
    <Box
      bg="white"
      borderRadius="24px"
      border="1px solid"
      borderColor="#EAECF0"
      p={"20px"}
      shadow="0px 10px 10px -5px rgba(0, 0, 0, 0.22)"
      position="relative"
      textAlign="left"
      flex="1"
      transition="transform 0.2s"
      _hover={{ transform: "translateY(-4px)" }}
    >
      {isPopular && (
        <Box
          position="absolute"
          top={6}
          right={6}
          colorScheme="green"
          borderRadius="full"
          p="5px 10px 5px 10px"
          textTransform="capitalize"
          bg="#ecfdf3"
          color="#027A48"
          borderColor="#d1fadf"
          fontSize="0.7rem"
          fontWeight={500}
          borderStyle={"solid"}
          fill="#027A48"
        >
          Popular
        </Box>
      )}

      <VStack align="start" gap={1} mb={6}>
        <Text
          fontSize="1.125rem"
          color="#333"
          fontWeight="700"
          letterSpacing={"0.2px"}
        >
          {plan}
        </Text>

        <HStack align="center" gap={1} mt={2}>
          {prefix && (
            <Text fontSize="1rem" color="#101828" fontWeight="500">
              {prefix}
            </Text>
          )}

          <Text
            fontSize="2.6rem"
            fontWeight="600"
            color="#101828"
            lineHeight={"2.8rem"}
            letterSpacing={"-1.8px"}
          >
            {price}
          </Text>

          {/* Handle "per month" */}
          {priceSuffix && (
            <Text fontSize="1rem" color="#101828" fontWeight="500">
              {priceSuffix}
            </Text>
          )}
        </HStack>

        <Text fontSize="0.9rem" color="#797a7c" mt={2}>
          {subtext || billingText}
        </Text>
      </VStack>

      <Button
        w="full"
        h="45px"
        borderRadius="8px"
        bg={isPopular ? "#E49426" : "transparent"}
        color={isPopular ? "#fff" : "#1C6DB6"}
        borderColor={isPopular ? "#E49426" : "#C9DCED"}
        _hover={{
          bg: isPopular ? "#C78121" : "#1c6db6",
          color: "white",
        }}
        fontWeight={600}
        letterSpacing={"0.02px"}
        mb={8}
      >
        {buttonText}
      </Button>

      <VStack align="start" gap={2}>
        {featureHeading && (
          <Text
            fontSize="1rem"
            fontWeight="700"
            color="#000"
            textTransform="uppercase"
          >
            {featureHeading}
          </Text>
        )}{" "}
        {featureSubHeading && (
          <Box
            as="div"
            fontSize="0.9rem"
            color="#475467"
            css={{
              b: { color: "#101828", fontWeight: "700" },
              p: { margin: 0 },
            }}
            dangerouslySetInnerHTML={{ __html: featureSubHeading }}
          />
        )}
        <List.Root gap={4}>
          {features.map((feature, index) => (
            <ListItem
              key={index}
              display="flex"
              alignItems="center"
              color={feature.isBold ? "#000" : "#475467"}
              fontSize="sm"
              gap={2}
              css={{
                "& svg": {
                  color: feature.isBold ? "#12b76a" : "#d1fadf",
                  fontSize: "1.3rem",
                },
              }}
            >
              {feature.isBold ? <FaCheckCircle /> : <FaRegCheckCircle />}

              <Text fontWeight={feature.isBold ? "700" : "400"}>
                {feature.text}
              </Text>
            </ListItem>
          ))}
        </List.Root>
      </VStack>
    </Box>
  );
};
