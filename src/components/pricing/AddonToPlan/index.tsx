"use client";

import { useState } from 'react';
import { Text, Stack, SimpleGrid } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useAddonItems } from '@/lib/hooks/useAddonItems';
import { AddonsContainer } from './AddonsContainer';
import { AddonCardSelection, AddonCardDisplay, AddonSimpleCardDisplay } from './AddonCards';
import { AddonsDisplayProps, AddonsSimpleDisplayProps, AddonToPlanProps } from './addOn';

export default function AddonToPlan({ addons, isLoading, onSkip, onAddonsChange, isAvailable = true, annualCoefficient }: AddonToPlanProps) {
    const { t } = useTranslation();
    const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
    const [isSkipped, setIsSkipped] = useState(false);

    const addonItems = useAddonItems(addons, false);

    const handleSkip = () => {
        setIsSkipped(true);
        onSkip?.();
    };

    const handleToggleAddon = (addonCode: string) => {
        if (!isAvailable) return;
        setSelectedAddons(prev => {
            const newSelection = prev.includes(addonCode)
                ? prev.filter(code => code !== addonCode)
                : [...prev, addonCode];
            onAddonsChange?.(newSelection);
            return newSelection;
        });
    };

    if (isSkipped) {
        return null;
    }

    const headerRight = (
        <Text
            fontSize="14px"
            fontWeight="500"
            color="#535862"
            cursor="pointer"
            onClick={handleSkip}
            _hover={{ color: '#181D27' }}
        >
            {t('shared.skip', 'Skip')}
        </Text>
    );

    return (
        <AddonsContainer
            isLoading={isLoading}
            isEmpty={!addons || addons.length === 0}
            headerRight={headerRight}
            skeletonComponent={null}
            containerProps={{ mb: 5 }}
        >
            <Stack gap={3}>
                {addonItems.map((item, index) => (
                    <AddonCardSelection
                        key={item.addon.code || index}
                        item={item}
                        isSelected={selectedAddons.includes(item.addon.code)}
                        isAvailable={isAvailable}
                        onToggle={handleToggleAddon}
                    />
                ))}
            </Stack>
        </AddonsContainer>
    );
}

export function AddonsDisplay({ addons, isLoading, isAnnually = false }: AddonsDisplayProps) {
    const addonItems = useAddonItems(addons, isAnnually);

    return (
        <AddonsContainer
            isLoading={isLoading}
            isEmpty={!addons || addons.length === 0}
            skeletonComponent={null}
            containerProps={{ mt: 12, borderRadius: '24px', p: 6 }}
        >
            <SimpleGrid columns={{ base: 1, lg: 3 }} gap={4}>
                {addonItems.map((item, index) => (
                    <AddonCardDisplay key={item.addon.code || index} item={item} />
                ))}
            </SimpleGrid>
        </AddonsContainer>
    );
}

export function AddonsSimpleDisplay({ addons }: AddonsSimpleDisplayProps) {
    const $codes = addons.map(code => ({ code }));
    const addonItems = useAddonItems($codes, false)?.filter(item => item.public) || [];

    return (
        <SimpleGrid columns={1} gap={4} mt={8}>
            {addonItems.map((item, index) => (
                <AddonSimpleCardDisplay key={item.addon.code || index} item={item} />
            ))}
        </SimpleGrid>
    );
}
