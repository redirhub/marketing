export interface PlanFeature {
  text: string;
  included: boolean;
  isHighlighted?: boolean;
}

export interface PricingPlan {
  name: string;
  id: 'basic' | 'pro' | 'enterprise';
  priceMonthly: number | string;
  priceAnnually: number | string; 
  range: string;
  features: PlanFeature[];
  ctaText: string;
  recommended?: boolean;
  everythingInPlanName?: string | null;
}

export const sliderTicks = [
  { value: 0, label: '0' },
  { value: 15, label: '15' },
  { value: 100, label: '100' },
  { value: 1000, label: '1K' },
  { value: 10000, label: '10K' },
  { value: 50000, label: '50K' },
];

export const pricingPlans: PricingPlan[] = [
  {
    name: 'Basic',
    id: 'basic',
    priceMonthly: 10,
    priceAnnually: 8,
    range: '1 - 25 source URLs',
    ctaText: 'Get Started with Basic',
    features: [
      { text: '15-100 source domains', included: true, isHighlighted: true },
      { text: '1-6 million requests/mo', included: true, isHighlighted: true },
      { text: '1 team members', included: true },
      { text: 'Full HTTPS', included: true },
      { text: 'Frame', included: true },
      { text: 'Path-based redirect', included: true },
      { text: 'Basic analytics', included: true },
    ],
  },
  {
    name: 'Pro',
    id: 'pro',
    priceMonthly: 90,
    priceAnnually: 75,
    range: '26 - 50K source URLs',
    ctaText: 'Get Started with Pro',
    features: [
      { text: '200 source domains', included: true, isHighlighted: true },
      { text: '20 million requests/mo', included: true, isHighlighted: true },
      { text: '10 team members', included: true },
      { text: 'Detailed analytics', included: true },
      { text: 'Bulk manage', included: true },
      { text: 'Multiple destinations', included: true },
      { text: 'Custom HTML', included: true },
      { text: 'Wildcards domain', included: true },
    ],
  },
  {
    name: 'Enterprise',
    id: 'enterprise',
    priceMonthly: 'Custom pricing',
    priceAnnually: 'Custom pricing',
    range: '50K - ∞ source URLs',
    ctaText: 'Chat with us',
    features: [
      { text: 'Unlimited src domains', included: true, isHighlighted: true },
      { text: '100,000,000 requests/mo', included: true, isHighlighted: true },
      { text: '20 team members', included: true },
      { text: 'Raw log export', included: true },
      { text: 'More analytics history', included: true },
      { text: 'CVS import', included: true },
      { text: 'Tagging', included: true },
      { text: 'Security plugins', included: true },
    ],
  },
];

export const addOnsData = [
  {
    title: "Single Sign-On (SSO)",
    description: "Team login through your organization account using SAML authentication.",
    priceMonthly: 35,
    priceAnnually: 29,
    iconType: "sso",
  },
  {
    title: "Custom Name Servers",
    description: "Point entire domains to RedirHub using dedicated NS records for seamless DNS integration.",
    priceMonthly: 59,
    priceAnnually: 49,
    iconType: "dns",
  },
  {
    title: "Dedicated Cluster",
    description: "2 IP nodes with Auto-Redirect — any domain pointed to this server follows your preset rules automatically.",
    priceMonthly: 119,
    priceAnnually: 99,
    iconType: "cluster",
  },
];

export const getRecommendedPlan = (sliderValue: number): string => {
  if (sliderValue < 40) return 'basic';
  if (sliderValue < 80) return 'pro';
  return 'enterprise';
};
