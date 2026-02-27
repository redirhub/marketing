"use client";

import { useState, useMemo } from "react";
import { Box, Flex, Text, Switch, HStack, Badge, SimpleGrid } from "@chakra-ui/react";
import { TabsLayout, TabTriggerButton } from "@/components/ui/TabsLayout";
import DynamicSlider from "./DynamicSlider";
import PricingPlanCard from "./PricingPlanCard";
import { UpgradeButton } from "./UpgradeButton";
import PlansComparisonTable from "./PlansComparisonTable";
import { getRecommendedRedirectPlan, getRedirectSliderConfig, getDynamicComparisonPlans, getDynamicComparisonData } from "./redirectPlanData";
import { shortenUrlData } from "./shortenUrlPlanData";
import { monitorData } from "./monitorPlanData";
import { ProductConfig, redirectConfig, shortenConfig, monitorConfig } from "./productConfigs";
import { mapPlanToDisplay, DisplayPlan } from "@/lib/utils/pricingHelpers";
import { useTranslation } from "react-i18next";
import { ADDON_METADATA } from "./AddonToPlan/addOn";
import { AddonsDisplay } from "./AddonToPlan";


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

    const configMap: Record<string, ProductConfig> = {
        'redirects': redirectConfig,
        'shorten': shortenConfig,
        'monitor': monitorConfig,
    };
    const currentConfig = configMap[activeTab] || redirectConfig;

    const displayPlans: DisplayPlan[] = currentConfig.data.plans.map((plan, index, allPlans) =>
        mapPlanToDisplay(plan, index, allPlans, currentConfig, isAnnually, hostnameValue, manualRecommendedId)
    );
    const addonCodes = Object.keys(ADDON_METADATA).filter(code =>
        currentConfig.hasAddons || code === 'sso'
    );
    const addonsData = addonCodes.map(code => {
        const price = ADDON_METADATA[code]?.price ?? 0;
        return { code, price, annual_price: price * 10 };
    });
    const comparisonPlans = currentConfig.data.plans;
    const comparisonData = currentConfig.data.comparison || [];
    const comparisonProduct = activeTab === 'redirects' ? 'redirect' : activeTab
    const dynamicComparisonPlans = useMemo(() => {
        if (activeTab !== 'redirects') return comparisonPlans;
        return getDynamicComparisonPlans(comparisonPlans, hostnameValue, redirectConfig.getAddon);
    }, [activeTab, comparisonPlans, hostnameValue]);

    const dynamicComparisonData = useMemo(() => {
        if (activeTab !== 'redirects') return comparisonData;
        return getDynamicComparisonData(comparisonData, comparisonPlans, hostnameValue, redirectConfig.getAddon);
    }, [activeTab, comparisonData, comparisonPlans, hostnameValue]);

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
                                plan={plan}
                                isAnnually={isAnnually}
                                recommended={plan.id === recommendedPlanId}
                                everythingInPlanName={plan.everythingInPlanName}
                                isDynamicPricing={activeTab === 'redirects'}
                                addon={plan.addon}
                                renderCTA={({ plan: ctaPlan, isAnnually: ctaAnnually, addon: ctaAddon }) => (
                                    <UpgradeButton
                                        plan={ctaPlan}
                                        isAnnually={ctaAnnually}
                                        addon={ctaAddon || null}
                                    />
                                )}
                            />
                        ))}
                    </SimpleGrid>
                    {addonsData.length > 0 && (
                        <AddonsDisplay
                            addons={addonsData}
                            isLoading={false}
                            isAnnually={isAnnually}
                        />
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
            <Box px={{ base: 4, xl: 8 }}>
                <PlansComparisonTable
                    plans={dynamicComparisonPlans}
                    product={comparisonProduct}
                    comparison={dynamicComparisonData}
                    isAnnually={isAnnually}
                    renderButton={(plan, context) => {
                        const displayPlan = displayPlans.find((p) => p.id === plan.id);
                        return (
                            <UpgradeButton
                                plan={plan}
                                addon={displayPlan?.addon || null}
                                isAnnually={isAnnually}
                                width="fixed"
                                mt={context === 'header' ? 1.5 : undefined}
                            />
                        );
                    }}
                />
            </Box>
        </Box>
    );
}
