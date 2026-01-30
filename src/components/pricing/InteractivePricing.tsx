"use client";

import { useState } from "react";
import { Box, Flex, Text, Switch, HStack, Badge, SimpleGrid } from "@chakra-ui/react";
import { TabsLayout, TabTriggerButton } from "@/components/ui/TabsLayout";
import HostnameSlider from "./HostnameSlider";
import PricingPlanCard from "./PricingPlanCard";
import AddOns from "./AddOns";
import PlansComparisonTable, { ProductTab } from "./PlansComparisonTable";
import { pricingPlans } from "./pricingData";
import { redirectData, getRecommendedRedirectPlan } from "./redirectPlanData";
import { shortenUrlData } from "./shortenUrlPlanData";
import { monitorData } from "./monitorPlanData";
import { ProductConfig, redirectConfig, shortenConfig, monitorConfig } from "./productConfigs";

// Helper function to map plans to display format
function mapPlanToDisplay(
    plan: any,
    index: number,
    allPlans: any[],
    config: ProductConfig,
    isAnnually: boolean,
    hostnameValue: number,
    manualRecommendedId: string | null
) {
    // Find previous plan
    let previousPlanName = null;
    let prevPlan = null;
    if (plan.level > 0) {
        prevPlan = allPlans.find(p => p.level === plan.level - 1 || (index > 0 && p === allPlans[index - 1]));
        if (prevPlan) previousPlanName = prevPlan.label;
    }

    // Get feature IDs from previous plan to filter out (features only, not limits)
    const prevFeatureIds = new Set<string>();
    if (prevPlan) {
        prevPlan.features.forEach((f: any) => prevFeatureIds.add(f.id));
    }

    // Enterprise plans have level >= 50
    const isEnterprise = plan.level >= 50;

    // Calculate addon if the product has addons
    let addon = null;
    let minHosts = 0;
    let maxHosts = null;
    if (config.hasAddons && config.getAddon) {
        const hostsLimit = plan.limits.find((l: any) => l.id === 'hosts');
        minHosts = hostsLimit?.from || 15;
        maxHosts = plan.addons.length > 0 ? plan.addons[plan.addons.length - 1].metric_1 : null;
        addon = config.getAddon(plan, hostnameValue, minHosts);
    }

    // Get pricing
    const pricing = config.getPricing(plan, isAnnually, addon);

    // Get isUnavailable status
    const isUnavailable = config.getIsUnavailable
        ? config.getIsUnavailable(plan, hostnameValue, addon, minHosts, maxHosts)
        : false;

    // Map limits to features
    const mappedFeatures = [
        ...plan.limits
            .filter((l: any) => {
                // Always show primary features
                if (l.primary) return true;
                // Filter out features from previous plan
                if (prevFeatureIds.has(l.id)) return false;
                // Apply product-specific filter (e.g., filter 'hosts' for redirects)
                if (config.shouldFilterLimit && config.shouldFilterLimit(l)) return false;
                return true;
            })
            .map((l: any) => {
                // Check for product-specific text override
                let text = l.text_list;
                if (config.getLimitTextOverride) {
                    const override = config.getLimitTextOverride(plan, l, addon);
                    if (override) text = override;
                }
                return {
                    text,
                    included: true,
                    isHighlighted: l.primary
                };
            }),
        ...plan.features
            .filter((f: any) => !prevFeatureIds.has(f.id))
            .map((f: any) => ({
                text: f.label,
                included: true,
                isHighlighted: false
            }))
    ];

    // Get range text
    const rangeText = config.getRange(plan, config.data);

    // Build CTA text
    const ctaText = plan.price === 0
        ? 'Start for Free'
        : ((typeof plan.price === 'number' && plan.price > 100)
            ? 'Chat with us'
            : `Get Started with ${plan.label}`);

    // Handle recommended logic
    const recommended = config.hasAddons
        ? undefined
        : plan.id === (manualRecommendedId || config.data.plans.find((p: any) => p.badge === 'Popular')?.id);

    return {
        id: plan.id,
        name: plan.label,
        priceMonthly: isEnterprise ? "Custom pricing" : pricing,
        priceAnnually: isEnterprise ? "Custom pricing" : pricing,
        range: rangeText,
        ctaText,
        features: mappedFeatures,
        everythingInPlanName: previousPlanName,
        isUnavailable,
        recommended,
        addon,
        level: plan.level
    };
}



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
        const configMap: Record<string, ProductConfig> = {
            'redirects': redirectConfig,
            'shorten': shortenConfig,
            'monitor': monitorConfig
        };

        const config = configMap[activeTab];
        if (!config) return pricingPlans;

        return config.data.plans.map((plan, index, allPlans) =>
            mapPlanToDisplay(plan, index, allPlans, config, isAnnually, hostnameValue, manualRecommendedId)
        );
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
                                addon={(plan as any).addon}
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
