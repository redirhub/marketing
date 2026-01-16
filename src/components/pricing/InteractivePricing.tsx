"use client";

import { useState } from "react";
import { Box, Flex, Text, Switch, HStack, Badge, SimpleGrid } from "@chakra-ui/react";
import { TabsLayout, TabTriggerButton } from "@/components/ui/TabsLayout";
import HostnameSlider from "./HostnameSlider";
import PricingPlanCard from "./PricingPlanCard";
import AddOns from "./AddOns";
import { pricingPlans, getRecommendedPlan } from "./pricingData";

export default function InteractivePricing() {
    const [activeTab, setActiveTab] = useState("redirects");
    const [isAnnually, setIsAnnually] = useState(false);
    const [hostnameValue, setHostnameValue] = useState(0);

    const recommendedPlanId = getRecommendedPlan(hostnameValue);

    const tabHeader = (
        <>
            <TabTriggerButton value="redirects" label="Redirects" />
            <TabTriggerButton value="shorten" label="Shorten URL" />
            <TabTriggerButton value="monitor" label="Monitor" />
        </>
    );

    const tabBody = (
        <Box>
            <Flex direction={{ base: "column", lg: "row" }} gap={8} align={{ base: "stretch", lg: "flex-start" }}>
                <Box flex="1">
                    <HostnameSlider value={hostnameValue} onChange={setHostnameValue} />
                    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6} mt={8}>
                        {pricingPlans.map((plan) => (
                            <PricingPlanCard
                                key={plan.id}
                                plan={plan}
                                isAnnually={isAnnually}
                                recommended={plan.id === recommendedPlanId}
                            />
                        ))}
                    </SimpleGrid>
                    <AddOns isAnnually={isAnnually} />
                </Box>
            </Flex>
        </Box>
    );

    const headerRight = (
        <HStack gap={4}>
            <Text
                fontSize="16px"
                lineHeight="24px"
                fontWeight={!isAnnually ? "600" : "400"}
                color={!isAnnually ? "gray.darkGray" : "gray.blueGray"}
                cursor="pointer"
                onClick={() => setIsAnnually(false)}
            >
                Monthly
            </Text>
            <Switch.Root
                checked={isAnnually}
                onCheckedChange={(e) => setIsAnnually(e.checked)}
                colorPalette="primary"
                size="lg"
            >
                <Switch.HiddenInput />
                <Switch.Control cursor="pointer">
                    <Switch.Thumb />
                </Switch.Control>
            </Switch.Root>
            <HStack gap={2}>
                <Text
                    fontSize="16px"
                    lineHeight="24px"
                    fontWeight={isAnnually ? "600" : "400"}
                    color={isAnnually ? "gray.darkGray" : "gray.blueGray"}
                    cursor="pointer"
                    onClick={() => setIsAnnually(true)}
                >
                    Annually
                </Text>
                <Badge
                    bg="success.50"
                    color="success.900"
                    borderRadius="full"
                    px="8px"
                    py="2px"
                    fontSize="12px"
                    lineHeight="18px"
                    fontWeight="500"
                    border="1px solid"
                    borderColor="success.200"
                    textTransform="none"
                >
                    Save 20%
                </Badge>
            </HStack>
        </HStack>
    );

    return (
        <Box position="relative" mt={{ base: "-125px", md: "-350px" }} pb={20} px={4} zIndex={99}>
            <TabsLayout
                defaultValue="redirects"
                value={activeTab}
                onValueChange={setActiveTab}
                tabHeader={tabHeader}
                tabBody={tabBody}
                headerRight={headerRight}
                maxW="1200px"
            />
        </Box>
    );
}
