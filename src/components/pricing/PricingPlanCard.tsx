import { Box, VStack, Heading, Text, Icon, Badge, Flex, Stack } from '@chakra-ui/react';
import { FiCheck } from 'react-icons/fi';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { PricingPlan } from './pricingData';

interface PricingPlanCardProps {
    plan: PricingPlan;
    isAnnually: boolean;
    recommended?: boolean;
    everythingInPlanName?: string | null;
    isDynamicPricing?: boolean;
    addon?: { code: string } | null;
    minH?: string;
    renderCTA?: (props: {
        plan: PricingPlan;
        isAnnually: boolean;
        isUnavailable?: boolean;
        isRecommended?: boolean;
        addon?: { code: string } | null;
    }) => ReactNode;
    renderSwitch?: ReactNode;
}

export default function PricingPlanCard({ plan, isAnnually, minH = '245px', everythingInPlanName, addon, renderCTA, renderSwitch }: PricingPlanCardProps) {
    const { t } = useTranslation();
    const isEnterprise = (plan.level ?? 0) >= 50;

    const monthlyPrice = plan.priceMonthly ?? 0;
    const annualPrice = plan.priceAnnually ?? 0;

    const price = isEnterprise ? t('subscription.custom-pricing', 'Custom Pricing') : (isAnnually ? annualPrice : monthlyPrice);
    const isCustom = isEnterprise || typeof price === 'string';

    const displayPrice = isAnnually && !isCustom && typeof price === 'number'
        ? (price / 12).toFixed(0)
        : price;
    const annualBillingAmount = isAnnually && !isCustom && typeof price === 'number' ? price : null;

    return (
        <Box
            flex="1"
            bg={plan.isUnavailable ? '#F9FAFB' : (plan.recommended ? '#FFF4ED' : 'white')}
            borderRadius="24px"
            border="1.8px solid"
            borderColor={plan.isUnavailable ? '#D0D5DD' : (plan.recommended ? 'brand.500' : '#D5D7DA')}
            position="relative"
            transition="all 0.3s"
            boxShadow={plan.recommended && !plan.isUnavailable ? '0px 12px 16px -4px rgba(16, 24, 40, 0.08), 0px 4px 6px -2px rgba(16, 24, 40, 0.03)' : 'none'}
            display="flex"
            flexDirection="column"
            maxW={{ base: 'full', md: '370px' }}
            opacity={plan.isUnavailable ? 0.6 : 1}
        >
            {plan.recommended && (
                <Badge
                    position="absolute"
                    top={3.5}
                    right={2}
                    bg="brand.50"
                    color="warning.900"
                    borderRadius="full"
                    px={2}
                    py={1}
                    fontSize="14px"
                    fontWeight="500"
                    border="1.5px solid"
                    borderColor="warning.800"
                    textTransform="none"
                >
                    {t('shared.recommended-badge', 'Recommended')}
                </Badge>
            )}

            <Stack
                gap={2}
                p={6}
                minH={minH}
                display="flex"
                flexDirection="column"
            >
                <Heading as="h3" fontSize="18px" lineHeight="28px" fontWeight="600" color="gray.700">
                    {plan.name}
                </Heading>

                <Flex align="baseline" direction={isCustom ? 'column' : 'row'} gap={2} flexWrap="wrap">

                    <Flex align="baseline" gap={1}>
                        <Text fontSize={isCustom ? '26px' : '34px'} fontWeight="600" color="gray.700" lineHeight="1.2">
                            {!isCustom && (
                                <Text as="span" color="gray.500">
                                    $
                                </Text>
                            )}
                            {displayPrice}
                        </Text>
                    </Flex>

                    {!isCustom && (
                        <Text fontSize="16px" lineHeight="24px" fontWeight="500" whiteSpace={'nowrap'} color="gray.textMedium">
                            {t('subscription.per-month', 'per month')}
                        </Text>
                    )}

                    {annualBillingAmount !== null && (
                        <Text fontSize="13px" lineHeight="20px" fontWeight="400" color="gray.500" width="100%">
                            {t('subscription.billed-annually', '${{amount}} billed annually', { amount: annualBillingAmount })}
                        </Text>
                    )}
                </Flex>

                <Flex direction={'column'} justify={'space-between'} flex="1">
                    <Text fontSize="16px" fontWeight="500" color="gray.700">
                        {plan.features.length > 0 ? plan.features[0].text : ''}
                    </Text>

                    {renderCTA && (
                        <Box mt={3}>
                            {renderCTA({ plan, isAnnually, addon })}
                        </Box>
                    )}

                    {renderSwitch && (
                        <Box mt={2}>
                            {renderSwitch}
                        </Box>
                    )}
                </Flex>
            </Stack>
            <Box
                borderBottom="1px solid"
                borderColor="gray.200"
            />
            <VStack align="start" gap={4} flex="1" p={6}>
                <Text fontSize="16px" fontWeight="600" color="gray.700" textTransform="uppercase">
                    {t('subscription.features-heading', 'Features')}
                </Text>
                {isEnterprise ? (
                    <Text fontSize="15px" fontWeight="400" color="gray.700" mt={-2}>
                        {t('subscription.everything-included', 'Everything included')}
                    </Text>
                ) : (
                    everythingInPlanName && (
                        <Text fontSize="15px" fontWeight="400" color="gray.700" mt={-2}>
                            {t('subscription.everything-in-plan', 'Everything in {{planName}} plus....', { planName: everythingInPlanName })}
                        </Text>
                    )
                )}
                <Box as="ul" listStyleType="none" p={0} m={0} display="flex" flexDirection="column" gap={3}>
                    {plan.features.slice(1).map((feature, index) => (
                        <Box as="li" key={index} display="flex" alignItems="center" gap={3}>
                            <Box
                                bg={feature.isHighlighted ? 'success.500' : (feature.included ? 'green.100' : 'success.800')}
                                borderRadius="full"
                                p={1}
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                boxSize={5}
                            >
                                <Icon
                                    as={FiCheck}
                                    color={feature.isHighlighted ? 'white' : (feature.included ? 'success.500' : 'gray.300')}
                                    boxSize={3.5}
                                    strokeWidth={3.5}
                                />
                            </Box>
                            <Text fontSize="15px" fontWeight={feature.isHighlighted ? '500' : '400'} color="gray.700">
                                {feature.text}
                            </Text>
                        </Box>
                    ))}
                </Box>
            </VStack>
        </Box>
    );
}
