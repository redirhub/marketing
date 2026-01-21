"use client";

import { Box, VStack, Heading, Text, Button, List, Icon, Badge, Flex, Stack } from "@chakra-ui/react";
import { PricingPlan } from "./pricingData";
import { FiCheck, FiArrowRight } from "react-icons/fi";

interface PricingPlanCardProps {
    plan: PricingPlan;
    isAnnually: boolean;
    recommended?: boolean;
    everythingInPlanName?: string | null;
}

export default function PricingPlanCard({ plan, isAnnually, recommended, everythingInPlanName }: PricingPlanCardProps) {
    const price = isAnnually ? plan.priceAnnually : plan.priceMonthly;
    const isCustom = typeof price === 'string';

    return (
        <Box
            flex="1"
            bg={recommended ? "brand.cardActiveBg" : "white"}
            borderRadius="24px"
            border="1px solid"
            borderColor={recommended ? "brand.500" : "gray.borderLight"}
            position="relative"
            transition="all 0.3s"
            boxShadow={recommended ? "0px 12px 16px -4px rgba(16, 24, 40, 0.08), 0px 4px 6px -2px rgba(16, 24, 40, 0.03)" : "none"}
            display="flex"
            flexDirection="column"
            maxW={{ base: "full", md: "370px" }}
        >
            {recommended && (
                <Badge
                    position="absolute"
                    top={6}
                    right={6}
                    bg="brand.50"
                    color="warning.900"
                    borderRadius="full"
                    px={3}
                    py={1}
                    fontSize="14px"
                    fontWeight="500"
                    border="1.5px solid"
                    borderColor="warning.800"
                    textTransform="none"
                >
                    Recommended
                </Badge>
            )}

            <Stack
                gap={1}
                p={6}
                spaceY={4}
                minH={'255px'}
                display="flex"
                flexDirection="column"
            >
                <Heading as="h3" fontSize="18px" lineHeight="28px" fontWeight="600" color="gray.darkGray">
                    {plan.name}
                </Heading>

                <Flex align="baseline" direction={isCustom ? "column" : "row"} gap={1}>
                    {!isCustom && (
                        <Text fontSize="16px" lineHeight="24px" fontWeight="500" color="gray.textMedium">
                            from
                        </Text>
                    )}
                    <Flex align="baseline" gap={1}>
                        <Text fontSize={isCustom ? "26px" : "34px"} fontWeight="600" color="gray.darkGray" lineHeight="1.2">
                            {!isCustom && (
                                <Text as="span" color="gray.textMedium">
                                    $
                                </Text>
                            )}
                            {price}
                        </Text>
                    </Flex>

                    {!isCustom && (
                        <Text fontSize="16px" lineHeight="24px" fontWeight="500" whiteSpace={'nowrap'} color="gray.textMedium">
                            {isAnnually ? "annually" : "per month"}
                        </Text>
                    )}
                </Flex>

                <Flex direction={'column'} justify={'space-between'} flex="1">
                    <Text fontSize="16px" fontWeight="500" color="gray.blueGray">
                        {plan.range}
                    </Text>
                    <Button
                        w="full"
                        h="48px"
                        bg={recommended ? "brand.500" : "white"}
                        color={recommended ? "white" : "gray.900"}
                        border={recommended ? "none" : "1px solid"}
                        borderColor={recommended ? "none" : "gray.borderLight"}
                        borderRadius="12px"
                        fontSize="16px"
                        fontWeight="600"
                        _hover={{
                            bg: recommended ? "brand.600" : "gray.50",
                            transform: "translateY(-1px)",
                        }}
                    >
                        {plan.ctaText}  <Icon as={FiArrowRight} ml={1} />
                    </Button>
                </Flex>
            </Stack>
            <Box
                borderBottom="1px solid"
                borderColor="gray.borderLight"
            />
            <VStack align="start" gap={4} flex="1" p={6}>
                <Text fontSize="16px" fontWeight="600" color="gray.700" textTransform="uppercase" letterSpacing="wider">
                    Features
                </Text>
                {everythingInPlanName && (
                    <Text fontSize="15px" fontWeight="500" color="gray.700" mt={-2}>
                        Everything in <Text as="span" fontWeight="600">{everythingInPlanName}</Text> plus....
                    </Text>
                )}
                <List.Root gap={3} variant="plain">
                    {plan.features.map((feature, index) => (
                        <List.Item key={index} display="flex" alignItems="center" gap={3}>
                            <Box
                                bg={feature.isHighlighted ? "success.500" : (feature.included ? "success.50" : "success.800")}
                                borderRadius="full"
                                p={1}
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                boxSize={5}
                            >
                                <Icon
                                    as={FiCheck}
                                    color={feature.isHighlighted ? "white" : (feature.included ? "success.500" : "gray.300")}
                                    boxSize={3.5}
                                    strokeWidth={3.5}
                                />
                            </Box>
                            <Text fontSize="14px" fontWeight="500" color="gray.700">
                                {feature.text}
                            </Text>
                        </List.Item>
                    ))}
                </List.Root>
            </VStack>
        </Box>
    );
}
