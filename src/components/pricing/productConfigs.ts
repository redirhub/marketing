import { redirectData, calculatePlanPricing } from './redirectPlanData';
import { shortenUrlData } from './shortenUrlPlanData';
import { monitorData } from './monitorPlanData';

export interface ProductConfig {
  data: { plans: any[], comparison?: any[] };
  hasAddons: boolean;
  getPricing: (plan: any, isAnnually: boolean, addon: any) => number | string;
  getRange: (plan: any, data: any) => string;
  getIsUnavailable?: (plan: any, hostnameValue: number, addon: any, minHosts: number, maxHosts: number | null) => boolean;
  getLimitTextOverride?: (plan: any, limit: any, addon: any) => string | null;
  shouldFilterLimit?: (limit: any) => boolean;
  getAddon?: (plan: any, hostnameValue: number, minHosts: number) => any;
}

// Redirect product configuration
export const redirectConfig: ProductConfig = {
  data: redirectData,
  hasAddons: true,

  getPricing: (plan, isAnnually, addon) => {
    const { totalPrice } = calculatePlanPricing(plan, isAnnually, addon);
    return totalPrice;
  },

  getRange: (plan) => {
    return plan.limits[0]?.text_list || '';
  },

  getIsUnavailable: (plan, hostnameValue, addon, minHosts, maxHosts) => {
    if (minHosts > 0) {
      const maxCapacity = maxHosts || minHosts;
      if (hostnameValue > maxCapacity) {
        return true;
      }
    }
    return false;
  },

  getLimitTextOverride: (plan, limit, addon) => {
    const isBasic = plan.label === "Basic";
    if (isBasic && addon) {
      if (limit.id === 'records') {
        return `${addon.metric_2} source urls`;
      }
      if (limit.id === 'visits') {
        return `${addon.metric_3} million requests / mo`;
      }
    }
    return null;
  },

  shouldFilterLimit: (limit) => {
    // Filter out 'hosts' limit as it's shown dynamically
    return limit.id === 'hosts';
  },

  getAddon: (plan, hostnameValue, minHosts) => {
    if (hostnameValue > minHosts && plan.addons?.length) {
      const sortedAddons = [...plan.addons].sort(
        (a, b) => a.metric_1 - b.metric_1
      );

      return (
        sortedAddons.find(a => a.metric_1 >= hostnameValue) ||
        sortedAddons[sortedAddons.length - 1]
      );
    }
    return null;
  }
};

// Shorten URL product configuration
export const shortenConfig: ProductConfig = {
  data: shortenUrlData,
  hasAddons: false,

  getPricing: (plan, isAnnually) => {
    return isAnnually ? plan.annual_price : plan.price;
  },

  getRange: (plan, data) => {
    return (data.comparison.find((c: any) => c.id === 'basic.records')?.plans[plan.id]?.value as string) || '';
  }
};

// Monitor product configuration
export const monitorConfig: ProductConfig = {
  data: monitorData,
  hasAddons: false,

  getPricing: (plan, isAnnually) => {
    return isAnnually ? plan.annual_price : plan.price;
  },

  getRange: (plan) => {
    return plan.limits.find((l: any) => l.id === 'tasks')?.text_list || '';
  }
};
