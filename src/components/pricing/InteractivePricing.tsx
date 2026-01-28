"use client";

import { useState } from "react";
import { Box, Flex, Text, Switch, HStack, Badge, SimpleGrid } from "@chakra-ui/react";
import { TabsLayout, TabTriggerButton } from "@/components/ui/TabsLayout";
import HostnameSlider from "./HostnameSlider";
import PricingPlanCard from "./PricingPlanCard";
import AddOns from "./AddOns";
import PlansComparisonTable, { ProductTab } from "./PlansComparisonTable";
import { pricingPlans } from "./pricingData";
import { redirectData, getRecommendedRedirectPlan, calculatePlanPricing } from "./redirectPlanData";
import { shortenUrlData } from "./shortenUrlPlanData";
import { monitorData } from "./monitorPlanData";



export default function InteractivePricing() {
    const [activeTab, setActiveTab] = useState("redirects");
    const [isAnnually, setIsAnnually] = useState(false);
    const [hostnameValue, setHostnameValue] = useState(5);
    const [manualRecommendedId, setManualRecommendedId] = useState<string | null>(null);
    const handleTabChange = (val: string) => {
        setActiveTab(val);
        setManualRecommendedId(null);
    };
    let recommendedPlanId = '';
    if (activeTab === 'redirects') {
        recommendedPlanId = getRecommendedRedirectPlan(hostnameValue);
    } else if (activeTab === 'shorten') {
        recommendedPlanId = shortenUrlData.plans.find(p => p.badge === 'Popular')?.id || '';
    } else if (activeTab === 'monitor') {
        recommendedPlanId = monitorData.plans.find(p => p.badge === 'Popular')?.id || '';
    }

    const getDisplayPlans = () => {
        if (activeTab === 'redirects') {
            return redirectData.plans.map((plan, index, allPlans) => {
                let previousPlanName = null;
                if (plan.level > 0) {
                    const prevPlan = allPlans.find(p => p.level === plan.level - 1 || (index > 0 && p === allPlans[index - 1]));
                    if (prevPlan) previousPlanName = prevPlan.label;
                }

                const mappedFeatures = [
                    ...plan.limits.map(l => ({
                        text: l.text_list,
                        included: true,
                        isHighlighted: true
                    })),
                    ...plan.features.map(f => ({
                        text: f.label,
                        included: true,
                        isHighlighted: false
                    }))
                ];
                const { totalPrice, isUnavailable } = calculatePlanPricing(plan, hostnameValue, isAnnually);
                const isEnterprise = plan.label === "Enterprise";

                return {
                    id: plan.id,
                    name: plan.label,
                    priceMonthly: isEnterprise ? "Custom pricing" : totalPrice,
                    priceAnnually: isEnterprise ? "Custom pricing" : totalPrice,
                    range: (redirectData.comparison.find(c => c.id === 'basic.records')?.plans[plan.id]?.value as string) || '',
                    ctaText: plan.price === 0 ? 'Start for Free' : ((typeof plan.price === 'number' && plan.price > 100) ? 'Chat with us' : `Get Started with ${plan.label}`),
                    features: mappedFeatures,
                    everythingInPlanName: previousPlanName,
                    isUnavailable,
                };
            });
        } else if (activeTab === 'shorten') {
            return shortenUrlData.plans.map((plan, index, allPlans) => {
                let previousPlanName = null;
                if (plan.level > 0) {
                    const prevPlan = allPlans.find(p => p.level === plan.level - 1 || (index > 0 && p === allPlans[index - 1]));
                    if (prevPlan) previousPlanName = prevPlan.label;
                }

                const mappedFeatures = [
                    ...plan.limits.map(l => ({
                        text: l.text_list,
                        included: true,
                        isHighlighted: true
                    })),
                    ...plan.features.map(f => ({
                        text: f.label,
                        included: true,
                        isHighlighted: false
                    }))
                ];

                const isEnterprise = plan.label === "Enterprise";

                return {
                    id: plan.id,
                    name: plan.label,
                    priceMonthly: isEnterprise ? "Custom pricing" : plan.price,
                    priceAnnually: isEnterprise ? "Custom pricing" : plan.annual_price,
                    range: (shortenUrlData.comparison.find(c => c.id === 'basic.records')?.plans[plan.id]?.value as string) || '',
                    ctaText: plan.price === 0 ? 'Start for Free' : ((typeof plan.price === 'number' && plan.price > 100) ? 'Chat with us' : `Get Started with ${plan.label}`),
                    features: mappedFeatures,
                    everythingInPlanName: previousPlanName,
                    recommended: plan.id === (manualRecommendedId || shortenUrlData.plans.find(p => p.badge === 'Popular')?.id)
                };
            });
        } else if (activeTab === 'monitor') {
            return monitorData.plans.map((plan, index, allPlans) => {
                let previousPlanName = null;
                if (plan.level > 0) {
                    const prevPlan = allPlans.find(p => p.level === plan.level - 1 || (index > 0 && p === allPlans[index - 1]));
                    if (prevPlan) previousPlanName = prevPlan.label;
                }

                const mappedFeatures = [
                    ...plan.limits.map(l => ({
                        text: l.text_list,
                        included: true,
                        isHighlighted: true
                    })),
                    ...plan.features.map(f => ({
                        text: f.label,
                        included: true,
                        isHighlighted: false
                    }))
                ];
                const isEnterprise = plan.label === "Enterprise";

                return {
                    id: plan.id,
                    name: plan.label,
                    priceMonthly: isEnterprise ? "Custom pricing" : plan.price,
                    priceAnnually: isEnterprise ? "Custom pricing" : plan.annual_price,
                    range: plan.limits.find(l => l.id === 'tasks')?.text_list || '',
                    ctaText: plan.price === 0 ? 'Start for Free' : ((typeof plan.price === 'number' && plan.price > 100) ? 'Chat with us' : `Get Started with ${plan.label}`),
                    features: mappedFeatures,
                    everythingInPlanName: previousPlanName,
                    recommended: plan.id === (manualRecommendedId || monitorData.plans.find(p => p.badge === 'Popular')?.id)
                };
            });
        }
        return pricingPlans;
    };

    const displayPlans = getDisplayPlans();

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
                    {activeTab === 'redirects' && (
                        <HostnameSlider value={hostnameValue} onChange={setHostnameValue} />
                    )}
                    <SimpleGrid
                        columns={{ base: 1, md: 2, lg: 3, xl: 4 }}
                        gap={4}
                        mt={8}
                    >
                        {displayPlans.map((plan) => (
                            <PricingPlanCard
                                key={plan.id}
                                plan={plan as any}
                                isAnnually={isAnnually}
                                recommended={plan.id === recommendedPlanId}
                                everythingInPlanName={plan.everythingInPlanName}
                                isUnavailable={(plan as any).isUnavailable}
                                isDynamicPricing={activeTab === 'redirects'}
                            />
                        ))}
                    </SimpleGrid>
                    {activeTab === 'redirects' && (
                        <AddOns isAnnually={isAnnually} />
                    )}
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
        <Box position="relative" mt={{ base: "-125px", md: "-350px" }} pb={20} px={5} zIndex={99}>
            <TabsLayout
                defaultValue="redirects"
                value={activeTab}
                onValueChange={handleTabChange}
                tabHeader={tabHeader}
                tabBody={tabBody}
                headerRight={headerRight}
                maxW="1180px"
            />
            <PlansComparisonTable isAnnually={isAnnually} product={activeTab === 'redirects' ? 'redirect' : activeTab as ProductTab} />
        </Box>
    );
}
