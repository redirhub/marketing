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
import { HiCheckCircle } from "react-icons/hi";

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
}: PricingCardProps) => {
  return (
    <Box
      bg="white"
      borderRadius="24px"
      border="1px solid"
      borderColor="gray.100"
      p={8}
      shadow="xl"
      position="relative"
      textAlign="left"
      flex="1"
      transition="transform 0.2s"
      _hover={{ transform: "translateY(-4px)" }}
    >
      {isPopular && (
        <Badge
          position="absolute"
          top={6}
          right={6}
          colorScheme="green"
          borderRadius="full"
          px={3}
          textTransform="capitalize"
          variant="subtle"
          bg="#E6F9F0"
          color="#12B76A"
        >
          Popular
        </Badge>
      )}

      <VStack align="start" gap={1} mb={6}>
        <Heading size="sm" color="#344054" fontWeight="700">
          {plan}
        </Heading>
        <HStack align="baseline" gap={1} mt={4}>
          <Text fontSize="4xl" fontWeight="700" color="#101828">
            {price}
          </Text>
          {price !== "$0" && (
            <Text fontSize="sm" color="#475467">
              per month
            </Text>
          )}
        </HStack>
        <Text fontSize="sm" color="#475467" minH="20px">
          {subtext || billingText}
        </Text>
      </VStack>

      <Button
        w="full"
        h="52px"
        borderRadius="8px"
        variant={isPopular ? "solid" : "outline"}
        bg={isPopular ? "#E49426" : "transparent"}
        color={isPopular ? "white" : "#2E90FA"}
        borderColor={isPopular ? "#E49426" : "#D1E9FF"}
        _hover={{
          bg: isPopular ? "#C78121" : "blue.50",
        }}
        mb={8}
      >
        {buttonText}
      </Button>

      <VStack align="start" gap={4}>
        {featureHeading && (
          <Text
            fontSize="xs"
            fontWeight="700"
            color="#344054"
            textTransform="uppercase"
          >
            {featureHeading}
          </Text>
        )}
        <List.Root gap={3}>
          {features.map((feature, index) => (
            <ListItem
              key={index}
              display="flex"
              alignItems="center"
              color="#475467"
              fontSize="sm"
            >
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
