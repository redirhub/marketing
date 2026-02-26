"use client";

import { Box, Text, Flex, Icon, Badge, Accordion } from '@chakra-ui/react';
import { useMemo, useCallback, ReactNode, useState, useEffect } from 'react';
import { HiMinus } from 'react-icons/hi2';
import { FiHelpCircle } from 'react-icons/fi';
import { Tooltip } from '@/components/ui/tooltip';
import { useTranslation } from 'react-i18next';
import { ComparisonRow } from './PlansComparisonTable';

interface PlanItem {
    id: string;
    label: string;
    badge: string | null;
    level: number;
    price: number;
    annual_price: number;
}

const CheckIcon = () => (
    <Box>
        <img src='/assets/images/check-icon.png' width={20} height={20} alt="Check icon" />
    </Box>
);

const DashIcon = () => <Icon as={HiMinus} color="gray.400" boxSize={5} />;

interface MobilePlansComparisonTableProps {
    plans: PlanItem[];
    product?: string;
    comparison: ComparisonRow[];
    isAnnually: boolean;
    checkIcon?: ReactNode;
    renderButton?: (plan: PlanItem, context: 'header' | 'footer') => ReactNode;
}

export function MobilePlansComparisonTable({
    plans,
    product,
    comparison,
    isAnnually,
    checkIcon = <CheckIcon />,
    renderButton,
}: MobilePlansComparisonTableProps) {
    const { t } = useTranslation();
    const [activePlanIndex, setActivePlanIndex] = useState(0);

    useEffect(() => {
        setActivePlanIndex(0);
    }, [plans]);

    const activePlan = plans[activePlanIndex] ?? plans[0];

    const groupedComparison = useMemo(() =>
        comparison.reduce((acc, row) => {
            const category = row.category || 'Other';
            (acc[category] ??= []).push(row);
            return acc;
        }, {} as Record<string, ComparisonRow[]>),
    [comparison]);

    const renderCellValue = useCallback((row: ComparisonRow, planId: string) => {
        const planValue = row.plans[planId];
        if (!planValue) return <DashIcon />;

        const { value } = planValue;

        if (row.type === 'bool') {
            return value === true ? <>{checkIcon}</> : <DashIcon />;
        }

        if (typeof value === 'string' && value !== '') {
            return (
                <Text fontSize="13px" color="gray.700" textAlign="right">
                    {value}
                </Text>
            );
        }

        if (typeof value === 'number') {
            return (
                <Text fontSize="13px" color="gray.700" textAlign="right">
                    {String(value)}
                </Text>
            );
        }

        return <DashIcon />;
    }, [checkIcon]);

    if (!activePlan) return null;

    const categories = Object.entries(groupedComparison);

    return (
        <Box>
            <Box
                overflowX="auto"
                css={{ scrollbarWidth: 'none', '&::-webkit-scrollbar': { display: 'none' } }}
                mb={4}
            >
                <Flex gap={0} borderBottom="2px solid" borderColor="gray.200" minW={{ base: 'max-content', md: 'unset' }} w="full">
                    {plans.map((plan, index) => (
                        <Box
                            key={plan.id}
                            as="button"
                            px={4}
                            py={3}
                            fontSize="14px"
                            fontWeight={activePlanIndex === index ? '600' : '500'}
                            color={activePlanIndex === index ? 'brand.500' : 'gray.400'}
                            borderBottom="2px solid"
                            borderColor={activePlanIndex === index ? 'brand.500' : 'transparent'}
                            mb="-2px"
                            onClick={() => setActivePlanIndex(index)}
                            whiteSpace="nowrap"
                            transition="all 0.15s"
                            cursor="pointer"
                            bg="transparent"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            flex={{ base: 'none', md: '1' }}
                            gap={1.5}
                        >
                            {plan.label}
                            {plan.badge && (
                                <Badge
                                    bg="green.50"
                                    border="1px solid"
                                    borderColor="success.800"
                                    color="success.700"
                                    borderRadius="full"
                                    px={2}
                                    py={0.5}
                                    fontSize="11px"
                                    fontWeight="500"
                                >
                                    {plan.badge}
                                </Badge>
                            )}
                        </Box>
                    ))}
                </Flex>
            </Box>

            <Box bg="white" borderRadius="12px" p={4} mb={4}>
                <Flex align="baseline" gap={1.5} mb={3} flexWrap="wrap">
                    <Text fontSize="22px" fontWeight="700" color="gray.700" lineHeight="1">
                        {activePlan.level >= 50
                            ? t('subscription.custom-pricing', 'Custom')
                            : `$${isAnnually ? (activePlan.annual_price / 12).toFixed(0) : activePlan.price}`}
                    </Text>
                    {activePlan.level < 50 && (
                        <Text fontSize="14px" color="gray.500">
                            {t('subscription.per-month', 'per month')}
                        </Text>
                    )}
                    {isAnnually && activePlan.level < 50 && (
                        <Text fontSize="12px" color="gray.400" w="full">
                            {t('subscription.billed-annually', '${{amount}} billed annually', { amount: activePlan.annual_price })}
                        </Text>
                    )}
                </Flex>
                {renderButton && renderButton(activePlan, 'header')}
            </Box>

            <Accordion.Root multiple defaultValue={[]}>
                {categories.map(([category, rows]) => (
                    <Accordion.Item
                        key={category}
                        value={category}
                        border="none"
                        mb={2}
                        bg="white"
                        borderRadius="12px"
                        overflow="hidden"
                    >
                        <Accordion.ItemTrigger
                            px={4}
                            py={3.5}
                            _hover={{ bg: 'gray.50' }}
                            borderRadius="12px"
                            cursor={'pointer'}
                        >
                            <Flex flex="1" align="center" gap={2}>
                                <Text
                                    fontSize="13px"
                                    fontWeight="600"
                                    color="gray.600"
                                    textTransform="uppercase"
                                    letterSpacing="0.05em"
                                    whiteSpace={'nowrap'}
                                >
                                    {category}
                                </Text>
                                <Text fontSize="12px" color="gray.400" fontWeight="400">
                                    ({rows.length})
                                </Text>
                            </Flex>
                            <Accordion.ItemIndicator />
                        </Accordion.ItemTrigger>
                        <Accordion.ItemContent px={0} pb={2} pt={0}>
                            {rows.map((row, index) => (
                                <Flex
                                    key={row.id}
                                    align="center"
                                    justify="space-between"
                                    px={4}
                                    py={3}
                                    bg={index % 2 === 0 ? 'gray.50' : 'white'}
                                    borderTop="1px solid"
                                    borderColor="gray.100"
                                    gap={3}
                                >
                                    <Flex align="center" gap={1.5} flex="1" minW={0}>
                                        <Text
                                            fontSize="13px"
                                            fontWeight="500"
                                            color="gray.700"
                                            textTransform="capitalize"
                                            lineClamp={2}
                                        >
                                            {row.label}
                                        </Text>
                                        {row.tooltip && (
                                            <Tooltip
                                                content={row.tooltip}
                                                contentProps={{
                                                    p: 2,
                                                    bg: 'gray.500',
                                                    color: 'white',
                                                    borderRadius: 'md',
                                                }}
                                            >
                                                <Icon
                                                    as={FiHelpCircle}
                                                    color="gray.400"
                                                    boxSize={3.5}
                                                    cursor="help"
                                                    flexShrink={0}
                                                />
                                            </Tooltip>
                                        )}
                                    </Flex>
                                    <Flex flexShrink={0} justify="flex-end">
                                        {renderCellValue(row, activePlan.id)}
                                    </Flex>
                                </Flex>
                            ))}
                        </Accordion.ItemContent>
                    </Accordion.Item>
                ))}
            </Accordion.Root>

            {renderButton && (
                <Box mt={6} borderTop="1px solid" borderColor="gray.300" pt={6}>
                    {renderButton(activePlan, 'footer')}
                </Box>
            )}
        </Box>
    );
}
