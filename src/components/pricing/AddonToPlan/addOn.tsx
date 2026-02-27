"use client";

import SignOnIcon from '@/components/icons/add-on/sign-on-icon';
import ServerIcon from '@/components/icons/add-on/server-icon';
import ClusterIcon from '@/components/icons/add-on/cluster-icon';
import { PlanAddon, PlanAddonCode } from '@/components/pricing/pricingData';
import { ReactNode } from 'react';



export type AddOn = PlanAddon;
export type { PlanAddonCode };

export interface AddonMeta {
    title: string;
    description: string;
    price?: number;
    icon: ReactNode;
    public?: boolean;
}

export interface AddonItemData {
    addon: AddOn;
    title: string;
    description: string;
    icon: ReactNode;
    displayPrice: number;
    public?: boolean;
}

export interface AddonsDisplayProps {
    addons: PlanAddon[];
    isLoading: boolean;
    isAnnually?: boolean;
    annualCoefficient?: number;
}
export interface AddonsSimpleDisplayProps {
    addons: string[];
}


export interface AddonToPlanProps {
    addons: PlanAddon[];
    isLoading: boolean;
    onSkip?: () => void;
    onAddonsChange?: (selectedAddons: string[]) => void;
    isAvailable?: boolean;
    annualCoefficient?: number;
}

export interface AddonsContainerProps {
    isLoading: boolean;
    isEmpty: boolean;
    headerRight?: React.ReactNode;
    skeletonComponent: React.ReactNode;
    children: React.ReactNode;
    containerProps?: Record<string, any>;
}


export const CheckIcon = ({ width = '16px', height = '16px' }: { width?: string; height?: string }) => (
    <svg viewBox="0 0 24 24" width={width} height={height} xmlns="http://www.w3.org/2000/svg">
        <path
            fill="currentColor"
            d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"
        />
    </svg>
);


export const ADDON_METADATA: Record<string, AddonMeta> = {
    sso: {
        title: 'Single Sign-On (SSO)',
        description: 'Team login through your organization account using SAML authentication.',
        price: 200,
        icon: <SignOnIcon />,
        public: true
    },
    nameserver: {
        title: 'Custom Name Servers',
        description: 'Point entire domains to {{n}} using dedicated NS records for seamless DNS integration.',
        price: 100,
        icon: <ServerIcon />,
        public: true
    },
    cluster: {
        title: 'Dedicated Cluster',
        description: '2 IP nodes with Auto-Redirect — any domain pointed to this server follows your preset rules automatically.',
        price: 300,
        icon: <ClusterIcon />,
        public: true
    }
};

export const DEFAULT_ADDON_META: AddonMeta = {
    title: 'Add-On',
    description: 'Enhance your plan with this feature.',
    icon: <ServerIcon />
};

export const getAddonMeta = (addon: AddOn): AddonMeta => {
    return ADDON_METADATA[addon.code] || {
        ...DEFAULT_ADDON_META,
        title: addon.code.charAt(0).toUpperCase() + addon.code.slice(1).replace(/-/g, ' '),
        description: addon.description || DEFAULT_ADDON_META.description,
        public: false
    };
};
