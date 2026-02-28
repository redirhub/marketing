import { useTranslation } from 'react-i18next';
import { APP_NAME } from '@/lib/utils/constants';
import { AddOn, AddonItemData, getAddonMeta, PlanAddonCode } from '@/components/pricing/AddonToPlan/addOn';

export function useAddonItems(addons: AddOn[] | PlanAddonCode[] | undefined, isAnnually: boolean): AddonItemData[] {
    const { t } = useTranslation();

    if (!addons) return [];

    return addons.map(addonOrCode => {
        const addon: AddOn = 'price' in addonOrCode
            ? addonOrCode
            : { ...addonOrCode, price: 0, annual_price: 0 };

        const meta = getAddonMeta(addon);

        const displayPrice = !addon.price ? 0 :
            isAnnually && addon.annual_price
                ? Math.round(addon.annual_price / 12)
                : Math.round(addon.price);

        const titleKey = `subscription.addon-${addon.code}-title`;
        const descriptionKey = `subscription.addon-${addon.code}-description`;
        const title = t(titleKey, meta.title);
        const description = t(descriptionKey, meta.description, { n: APP_NAME });

        return {
            addon,
            title,
            description,
            icon: addon.icon || meta.icon,
            displayPrice,
            public: meta.public,
        };
    });
}
