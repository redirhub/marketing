"use client";

import { useState } from "react";
import { Box, Flex, Text, Switch, HStack, Badge, SimpleGrid } from "@chakra-ui/react";
import { TabsLayout, TabTriggerButton } from "@/components/ui/TabsLayout";
import DynamicSlider from "./DynamicSlider";
import PricingPlanCard from "./PricingPlanCard";
import { UpgradeButton } from "./UpgradeButton";
import AddOns from "./AddOns";
import PlansComparisonTable, { ProductTab } from "./PlansComparisonTable";
import { pricingPlans } from "./pricingData";
import { getRecommendedRedirectPlan, getRedirectSliderConfig } from "./redirectPlanData";
import { shortenUrlData } from "./shortenUrlPlanData";
import { monitorData } from "./monitorPlanData";
import { ProductConfig, redirectConfig, shortenConfig, monitorConfig } from "./productConfigs";
import { mapPlanToDisplay } from "@/lib/utils/pricingHelpers";
import { useTranslation } from "react-i18next";


export default function InteractivePricing() {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState("redirects");
    const [isAnnually, setIsAnnually] = useState(false);
    const [hostnameValue, setHostnameValue] = useState(15);
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
            <TabTriggerButton value="redirects" label={t("pricing.tab-redirects", "Redirects")} />
            <TabTriggerButton value="shorten" label={t("pricing.tab-shorten", "Shorten URL")} />
            <TabTriggerButton value="monitor" label={t("pricing.tab-monitor", "Monitor")} />
        </>
    );

    const tabBody = (
        <Box>
            <Flex direction={{ base: "column", lg: "row" }} gap={8} align={{ base: "stretch", lg: "flex-start" }}>
                <Box flex="1">
                    {activeTab === 'redirects' && (
                        <DynamicSlider value={hostnameValue} onChange={setHostnameValue} sliderConfig={getRedirectSliderConfig()} />
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
                                isDynamicPricing={activeTab === 'redirects'}
                                addon={(plan as any).addon}
                                renderCTA={({ plan, isAnnually, addon }) => (
                                    <UpgradeButton
                                        plan={plan as any}
                                        isAnnually={isAnnually}
                                        addon={addon || null}
                                    />
                                )}
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
                {t("pricing.billing-monthly", "Monthly")}
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
                    {t("pricing.billing-annually", "Annually")}
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
                    {t("pricing.save-badge", "Save 20%")}
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
