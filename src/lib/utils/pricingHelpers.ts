import { ProductConfig } from "@/components/pricing/productConfigs";

export interface DisplayPlan {
    id: string;
    name: string;
    priceMonthly: number | string;
    priceAnnually: number | string;
    range: string;
    ctaText: string;
    features: { text: string; included: boolean; isHighlighted: boolean }[];
    everythingInPlanName: string | null;
    isUnavailable: boolean;
    recommended: boolean | undefined;
    addon: { code: string } | null;
    level: number;
}
export interface UpgradeButtonPlan {
    id: string;
    level?: number;
    recommended?: boolean;
    isUnavailable?: boolean;
}
// Helper function to map plans to display format
export function mapPlanToDisplay(
    plan: any,
    index: number,
    allPlans: any[],
    config: ProductConfig,
    isAnnually: boolean,
    hostnameValue: number,
    manualRecommendedId: string | null
) {
    let previousPlanName = null;
    let prevPlan = null;
    if (plan.level > 0) {
        prevPlan = allPlans.find(p => p.level === plan.level - 1 || (index > 0 && p === allPlans[index - 1]));
        if (prevPlan) previousPlanName = prevPlan.label;
    }
    const prevFeatureIds = new Set<string>();
    if (prevPlan) {
        prevPlan.features.forEach((f: any) => prevFeatureIds.add(f.id));
    }
    const isEnterprise = plan.level >= 50;

    let addon = null;
    let minHosts = 0;
    let maxHosts = null;
    if (config.hasAddons && config.getAddon) {
        const hostsLimit = plan.limits.find((l: any) => l.id === 'hosts');
        minHosts = hostsLimit?.from || 15;
        maxHosts = plan.addons.length > 0 ? plan.addons[plan.addons.length - 1].metric_1 : null;
        addon = config.getAddon(plan, hostnameValue, minHosts);
    }

    const pricing = config.getPricing(plan, isAnnually, addon);
    const isUnavailable = config.getIsUnavailable
        ? config.getIsUnavailable(plan, hostnameValue, addon, minHosts, maxHosts)
        : false;

    const mappedFeatures = [
        ...plan.limits
            .filter((l: any) => {
                if (l.primary) return true;
                if (prevFeatureIds.has(l.id)) return false;
                if (config.shouldFilterLimit && config.shouldFilterLimit(l)) return false;
                return true;
            })
            .map((l: any) => {
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

    const rangeText = config.getRange(plan, config.data);

    const ctaText = plan.price === 0
        ? 'Start for Free'
        : ((typeof plan.price === 'number' && plan.price > 100)
            ? 'Chat with us'
            : `Get Started with ${plan.label}`);

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
    } satisfies DisplayPlan;
}