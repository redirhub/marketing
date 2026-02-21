"use client";

import { Box, Heading, Text, Flex, Icon, Badge, Table } from '@chakra-ui/react';
import { useMemo, useCallback, Fragment, ReactNode } from 'react';
import { HiMinus } from 'react-icons/hi2';
import { FiHelpCircle } from 'react-icons/fi';
import { Tooltip } from '@/components/ui/tooltip';
import { useTranslation } from 'react-i18next';
import { MobilePlansComparisonTable } from './MobilePlansComparisonTable';

export type ProductTab = 'redirect' | 'shorten' | 'monitor';

interface PlanItem {
    id: string;
    label: string;
    badge: string | null;
    level: number;
    price: number;
    annual_price: number;
}

interface ComparisonPlanValue {
    value: boolean | string | number | null;
}

export interface ComparisonRow {
    id: string;
    feature?: string;
    category: string;
    label: string;
    tooltip: string | null;
    type: 'limit' | 'bool' | 'text' | 'param';
    plans: Record<string, ComparisonPlanValue>;
}

const CheckIcon = () => (
    <Box>
        <img src='/assets/images/check-icon.png' width={20} height={20} alt="Check icon" />
    </Box>
);

const DashIcon = () => <Icon as={HiMinus} color="gray.400" boxSize={5} />;

interface PlansComparisonTableProps {
    plans: PlanItem[];
    product?: string;
    comparison: ComparisonRow[];
    isAnnually: boolean;
    checkIcon?: ReactNode;
    renderButton?: (plan: PlanItem, context: 'header' | 'footer') => ReactNode;
}

export default function PlansComparisonTable({
    plans,
    product,
    comparison,
    isAnnually,
    checkIcon = <CheckIcon />,
    renderButton,
}: PlansComparisonTableProps) {
    const { t } = useTranslation();

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
                <Text fontSize="14px" color="gray.700" textAlign="center">
                    {value}
                </Text>
            );
        }

        if (typeof value === 'number') {
            return (
                <Text fontSize="14px" color="gray.700" textAlign="center">
                    {String(value)}
                </Text>
            );
        }

        return <DashIcon />;
    }, [checkIcon]);

    const tableContent = (
        <Box
            background={'#F2F4EF'}
            display={{ base: 'none', lg: 'block' }}
            maxH={{ base: '86vh', '2xl': '82vh' }}
            overflow="auto"
            position="relative"
            css={{
                scrollbarWidth: 'none',
                '&::-webkit-scrollbar': { display: 'none' },
            }}
        >
            <Table.Root size="md" css={{ borderCollapse: 'separate', borderSpacing: 0 }}>
                <Table.Header>
                    <Table.Row bg="#F2F4EF" position="sticky" top={0} zIndex={10}>
                        <Table.ColumnHeader
                            background="#F2F4EF"
                            border={'none'}
                            borderBottom={'1px solid'}
                            borderBottomColor={'gray.300'}
                        />
                        {plans.map((plan) => (
                            <Table.ColumnHeader
                                key={plan.id}
                                textAlign="center"
                                background="#F2F4EF"
                                border={'none'}
                                borderBottom={'1px solid'}
                                borderBottomColor={'gray.300'}
                                p={2}
                            >
                                <Flex align="center" justifyContent={'flex-start'} gap={1.5}>
                                    <Text fontSize="16px" fontWeight="600" color="gray.700">
                                        {plan.label}
                                    </Text>
                                    {plan.badge && (
                                        <Badge
                                            bg="green.50"
                                            border={'1px solid'}
                                            borderColor={'success.800'}
                                            color="success.700"
                                            borderRadius="full"
                                            px={2.5}
                                            py={0.5}
                                            fontSize="12px"
                                            fontWeight="500"
                                        >
                                            {plan.badge}
                                        </Badge>
                                    )}
                                </Flex>
                            </Table.ColumnHeader>
                        ))}
                    </Table.Row>
                    <Table.Row
                        bg="#F2F4EF"
                        position="sticky"
                        top="38px"
                        zIndex={9}
                        boxShadow="0px 2px 4px rgba(0, 0, 0, 0.05)"
                    >
                        <Table.ColumnHeader background="#F2F4EF" border={'none'} />
                        {plans.map((plan) => (
                            <Table.ColumnHeader
                                key={`price-${plan.id}`}
                                textAlign="center"
                                background="#F2F4EF"
                                border={'none'}
                                p={3}
                            >
                                <Flex direction="column" gap={1.5} background={'#F2F4EF'}>
                                    <Flex align="baseline" gap={1.5} pb={0.5} pt={1} flexWrap="wrap">
                                        <Text
                                            fontSize={{ base: '16px', md: '18px' }}
                                            fontWeight="600"
                                            whiteSpace='nowrap'
                                            color="gray.700"
                                            lineHeight="1"
                                        >
                                            {plan.level >= 50
                                                ? t('subscription.custom-pricing', 'Custom')
                                                : `$${isAnnually ? (plan.annual_price / 12).toFixed(0) : plan.price}`}
                                        </Text>
                                        {plan.level < 50 && (
                                            <Text fontSize="14px" color="gray.700">
                                                {t('subscription.per-month', 'per month')}
                                            </Text>
                                        )}
                                        {isAnnually && plan.level < 50 && (
                                            <Text fontSize="12px" color="gray.500" w="full" textAlign="left">
                                                {t('subscription.billed-annually', '${{amount}} billed annually', { amount: plan.annual_price })}
                                            </Text>
                                        )}
                                    </Flex>
                                    {renderButton && renderButton(plan, 'header')}
                                </Flex>
                            </Table.ColumnHeader>
                        ))}
                    </Table.Row>
                </Table.Header>

                <Table.Body background={'transparent'}>
                    {Object.entries(groupedComparison).map(([category, rows], categoryIndex) => (
                        <Fragment key={category}>
                            <Table.Row background={'transparent'}>
                                <Table.Cell
                                    colSpan={plans.length + 1}
                                    bg="transparent"
                                    pt={6}
                                    pb={3}
                                    px={4}
                                    border="none"
                                    {...(categoryIndex > 0 && { borderTop: '1px solid', borderColor: 'gray.300' })}
                                >
                                    <Text
                                        fontSize="14px"
                                        fontWeight="600"
                                        color="gray.500"
                                        textTransform="uppercase"
                                        letterSpacing="0.05em"
                                    >
                                        {category}
                                    </Text>
                                </Table.Cell>
                            </Table.Row>
                            {rows.map((row, index) => (
                                <Table.Row key={row.id} bg={index % 2 === 0 ? 'white' : 'transparent'} transition="background 0.2s">
                                    <Table.Cell p={5} border={'none'} bg={index % 2 === 0 ? 'white' : 'transparent'}>
                                        <Flex align="center" gap={1}>
                                            <Text fontSize="14px" fontWeight="500" whiteSpace={'nowrap'} color="gray.700" textTransform={'capitalize'}>
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
                                                    <Icon as={FiHelpCircle} color="gray.400" boxSize={4} cursor="help" />
                                                </Tooltip>
                                            )}
                                        </Flex>
                                    </Table.Cell>
                                    {plans.map((plan) => (
                                        <Table.Cell
                                            key={`${row.id}-${plan.id}`}
                                            textAlign="center"
                                            bg={index % 2 === 0 ? 'white' : 'transparent'}
                                            py={4}
                                            border={'none'}
                                        >
                                            <Flex justify="center">{renderCellValue(row, plan.id)}</Flex>
                                        </Table.Cell>
                                    ))}
                                </Table.Row>
                            ))}
                        </Fragment>
                    ))}

                    <Table.Row bg="transparent">
                        <Table.Cell border="none" borderTop="1px solid" borderColor="gray.300" py={6} bg="transparent" />
                        {plans.map((plan) => (
                            <Table.Cell
                                key={`cta-${plan.id}`}
                                textAlign="center"
                                border={'none'}
                                borderTop="1px solid"
                                borderColor="gray.300"
                                py={6}
                            >
                                {renderButton && renderButton(plan, 'footer')}
                            </Table.Cell>
                        ))}
                    </Table.Row>
                </Table.Body>
            </Table.Root>
        </Box>
    );

    return (
        <Box w="full" mt={16} bg="#F2F4EF" borderRadius={{ base: '18px', md: '32px' }} px={{ base: 4, md: 8 }} py={12}>
            <Heading
                as="h2"
                fontSize={{ base: '24px', md: '38px' }}
                fontWeight="600"
                color="gray.700"
                textAlign="center"
                mb={8}
            >
                {t('subscription.plans-compared-heading', 'Our Plans Compared')}
            </Heading>
            <>
                <Box display={{ base: 'block', lg: 'none' }}>
                    <MobilePlansComparisonTable
                        plans={plans}
                        product={product}
                        comparison={comparison}
                        isAnnually={isAnnually}
                        checkIcon={checkIcon}
                        renderButton={renderButton}
                    />
                </Box>
                {tableContent}
            </>
        </Box>
    );
}
