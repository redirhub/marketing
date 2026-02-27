"use client";

import React from 'react';
import { Box, Text, Flex, Button, Heading } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { BsPlus } from 'react-icons/bs';
import { AddonItemData, CheckIcon } from './addOn';

interface AddonButtonProps {
  isSelected: boolean;
  isAvailable: boolean;
  onToggle: () => void;
  t: (key: string, defaultValue: string) => string;
}

export const AddonButton: React.FC<AddonButtonProps> = ({ isSelected, isAvailable, onToggle, t }) => {
    return isSelected ? (
        <Button
            variant="ghost"
            size="sm"
            borderRadius="10px"
            color="#099250"
            bg="#FFFFFF"
            fontWeight="500"
            border="1px solid"
            borderColor="#E9EAEB"
            fontSize="14px"
            onClick={onToggle}
            px={2.5}
            minW="60px"
            disabled={!isAvailable}
        >
            <CheckIcon width="18px" height="18px" />
            {t('shared.added', 'Added')}
        </Button>
    ) : (
        <Button
            variant="outline"
            size="sm"
            bg="#FFE6D5"
            border="none"
            borderRadius="10px"
            color="#FF4405"
            fontWeight="500"
            fontSize="14px"
            onClick={onToggle}
            _hover={{ bg: isAvailable ? 'brand.200' : '#FFE6D5' }}
            px={3}
            minW="100px"
            disabled={!isAvailable}
        >
            <BsPlus size="22" />
            {t('subscription.add-to-plan', 'Add to plan')}
        </Button>
    );
};

interface AddonCardSelectionProps {
  item: AddonItemData;
  isSelected: boolean;
  isAvailable: boolean;
  onToggle: (code: string) => void;
}

export function AddonCardSelection({ item, isSelected, isAvailable, onToggle }: AddonCardSelectionProps) {
    const { t } = useTranslation();

    return (
        <Flex
            borderRadius="16px"
            p={3.5}
            bg={'gray.50'}
            border="1px solid"
            borderColor="#D5D7DA"
            transition="all 0.3s"
            align="center"
            gap={4}
            opacity={isAvailable ? 1 : 0.5}
            cursor={isAvailable ? 'default' : 'not-allowed'}
        >
            <Box bg="#D1E9FF" borderRadius="12px" p={3} display="flex" alignItems="center" justifyContent="center">
                {item.icon}
            </Box>

            <Box flex={1} minW={0}>
                <Text fontSize="15px" fontWeight="600" color="#181D27" mb={0.5}>
                    {item.title}
                </Text>
                <Text fontSize="13px" fontWeight="400" color="#717680" lineHeight="1.4" lineClamp={2}>
                    {item.description}
                </Text>
            </Box>

            <Flex align="baseline" gap={0.5} flexShrink={0} minW="80px" justify="flex-end">
                <Text fontSize="14px" fontWeight="500" color="#535862">
                    $
                </Text>
                <Text fontSize="20px" fontWeight="600" color="#181D27">
                    {item.displayPrice}
                </Text>
                <Text fontSize="13px" fontWeight="400" color="#717680">
                    {t('subscription.price-per-month-suffix', '/mo')}
                </Text>
            </Flex>

            <AddonButton isSelected={isSelected} isAvailable={isAvailable} onToggle={() => onToggle(item.addon.code)} t={t} />
        </Flex>
    );
}

interface AddonCardDisplayProps {
  item: AddonItemData;
}

export function AddonCardDisplay({ item }: AddonCardDisplayProps) {
    const { t } = useTranslation();

    return (
        <Box
            background={'linear-gradient(180deg, #FFFFFF 0%, #F5F5F5 100%)'}
            borderRadius="16px"
            p={4}
            border="1px solid"
            borderColor="gray.300"
            transition="all 0.3s"
            _hover={{ borderColor: 'gray.200', transform: 'translateY(-2px)' }}
        >
            <Flex justify="space-between" align="start" mb={3}>
                <Box bg="#D1E9FF" borderRadius="12px" p={3} display="flex" alignItems="center" justifyContent="center">
                    {item.icon}
                </Box>
                <Flex align="baseline" gap={1}>
                    <Text fontSize="24px" fontWeight="600" color="#535862">
                        $
                        <Text as="span" color="gray.900" ml={1}>
                            {item.displayPrice}
                        </Text>
                    </Text>
                    <Text fontSize="14px" fontWeight="500" color="gray.500">
                        {t('shared.price-per-month-suffix', '/mo')}
                    </Text>
                </Flex>
            </Flex>

            <Heading as="h4" fontSize="16px" fontWeight="600" color="#181D27">
                {item.title}
            </Heading>
            <Text fontSize="14px" fontWeight="400" color="gray.blueGray" lineHeight="1.5">
                {item.description}
            </Text>
        </Box>
    );
}

export function AddonSimpleCardDisplay({ item }: AddonCardDisplayProps) {
    return (
        <Box
            background={'linear-gradient(180deg, #FFFFFF 0%, #F5F5F5 100%)'}
            borderRadius="16px"
            p={4}
            border="1px solid"
            borderColor="gray.300"
        >
            <Flex align="center" gap={4}>
                <Box bg="#D1E9FF" borderRadius="12px" p={3} display="flex" alignItems="center" justifyContent="center">
                    {item.icon}
                </Box>
                <Box>
                    <Heading as="h4" fontSize="16px" fontWeight="600" color="#181D27" lineHeight="1.2">
                        {item.title}
                    </Heading>
                    <Text fontSize="14px" fontWeight="400" color="gray.blueGray" lineHeight="1.5" lineClamp={2}>
                        {item.description}
                    </Text>
                </Box>
            </Flex>
        </Box>
    );
}
