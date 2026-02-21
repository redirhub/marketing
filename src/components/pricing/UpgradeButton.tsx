import { Icon } from '@chakra-ui/react';
import { FiArrowRight } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import { AppLink } from '../ui/AppLink';
import { URL_DASHBOARD, URL_DASHBOARD_REGISTER } from '@/lib/utils/constants';
import { UpgradeButtonPlan } from '@/lib/utils/pricingHelpers';

const PLAN_ENTERPRISE_LEVEL = 50;

interface UpgradeButtonProps {
    plan: UpgradeButtonPlan;
    badge?: string | null;
    addon: { code: string } | null;
    isAnnually: boolean;
    currentPlanId?: string;
    width?: 'full' | 'fixed';
    mt?: number;
}

export function UpgradeButton({
    plan,
    addon,
    currentPlanId,
    width = 'full',
    mt,
}: UpgradeButtonProps) {
    const { t } = useTranslation();

    const recommended = plan.recommended ?? false;
    const isEnterprise = plan.level === PLAN_ENTERPRISE_LEVEL;
    const isCurrent = plan?.id === currentPlanId;
    const isDisabled = !!plan?.isUnavailable;

    const getSubscribeUrl = () => {
        if (plan.level === 0) {
            return URL_DASHBOARD_REGISTER;
        }
        const baseUrl = `${URL_DASHBOARD}/subscribe/${plan.id}`;
        if (addon?.code) {
            return `${baseUrl}?addon=${addon.code}`;
        }
        return baseUrl;
    };

    function getButtonText() {
        if (isCurrent) {
            return t('subscription.current-plan', 'Current Plan');
        }
        if (plan?.isUnavailable === true) {
            return t('subscription.unavailable', 'Unavailable');
        }
        if (isEnterprise) {
            return t('shared.chat-with-us', 'Chat with us');
        }
        return t('subscription.get-start', 'Get Started');
    }

    return (
        <AppLink
            href={getSubscribeUrl()}
            w={width === 'full' ? 'full' : undefined}
            minW={width === 'fixed' ? '180px' : undefined}
            maxW={width === 'fixed' ? '180px' : undefined}
            h="48px"
            mt={mt}
            cursor={isDisabled ? 'not-allowed' : 'pointer'}
            bg={isDisabled ? 'gray.100' : recommended ? 'brand.500' : 'white'}
            color={isDisabled ? 'gray.600' : recommended ? 'white' : 'gray.700'}
            border={recommended ? 'none' : '1px solid'}
            borderColor={recommended || isDisabled ? 'gray.300' : '#D5D7DA'}
            borderRadius="12px"
            fontSize="16px"
            fontWeight="600"
            disabled={isDisabled}
            display="flex"
            alignItems="center"
            justifyContent="center"
            _hover={{
                bg: isDisabled ? 'gray.100' : recommended ? 'brand.600' : 'gray.50',
                transform: isDisabled ? 'none' : 'translateY(-1px)',
                textDecoration: 'none',
            }}
        >
            {getButtonText()} {!isDisabled && <Icon as={FiArrowRight} ml={1} />}
        </AppLink>
    );
}
