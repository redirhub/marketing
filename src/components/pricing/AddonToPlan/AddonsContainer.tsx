"use client";

import { Box, Heading, Text, Flex, Stack } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { AddonsContainerProps } from './addOn';


export function AddonsContainer({
    isLoading,
    isEmpty,
    headerRight,
    skeletonComponent,
    children,
    containerProps = {}
}: AddonsContainerProps) {
    const { t } = useTranslation();

    if (isLoading) {
        return (
            <Box w="full" border={'1px solid'} borderColor={'#D5D7DA'} borderRadius="20px" p={5} {...containerProps}>
                <Flex justify="space-between" align="start" mb={4}>
                    <Stack gap={1}>
                        <Heading as="h3" fontSize="xl" fontWeight="600" color="gray.darkGray">
                            {t('subscription.addons-heading', 'Pro Add-Ons')}
                        </Heading>
                        <Text fontSize="14px" fontWeight="400" color="gray.blueGray">
                            {t('subscription.addons-subtitle', 'Enhance your Pro plan with powerful features')}
                        </Text>
                    </Stack>
                    {headerRight}
                </Flex>
                {skeletonComponent}
            </Box>
        );
    }

    if (isEmpty) {
        return null;
    }

    return (
        <Box w="full" border={'1px solid'} borderColor={'#D5D7DA'} bg={'white'} borderRadius="20px" p={5} {...containerProps}>
            <Flex justify="space-between" align="start" mb={4}>
                <Stack gap={1}>
                    <Heading as="h3" fontSize="xl" fontWeight="600" color="#181D27">
                        {t('subscription.addons-heading', 'Pro Add-Ons')}
                    </Heading>
                    <Text fontSize="14px" fontWeight="400" color="gray.blueGray">
                        {t('subscription.addons-subtitle', 'Enhance your Pro plan with powerful features')}
                    </Text>
                </Stack>
                {headerRight}
            </Flex>
            {children}
        </Box>
    );
}
