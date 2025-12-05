'use client';

import { Box, Container, Flex, Spacer } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getAppName, getDashboardBase } from '@/lib/utils/constants';

export default function Header() {
  const { t } = useTranslation('common');
  const params = useParams();
  const locale = params?.locale as string || 'en';

  // Helper to generate URLs - hide /en for default locale
  const getLocalePath = (path: string) => {
    if (locale === 'en') {
      return path;
    }
    return `/${locale}${path}`;
  };

  const navItems = [
    { href: getLocalePath('/features'), label: t(`nav.features`, 'Features') },
    { href: getLocalePath('/pricing'), label: t(`nav.pricing`, 'Pricing') },
    { href: getLocalePath('/legal'), label: t(`nav.legal`, 'Legal') },
  ];

  return (
    <Box
      as="header"
      position="sticky"
      top={0}
      zIndex={1000}
      bg="white"
      borderBottomWidth="1px"
      borderColor="gray.200"
      py={4}
    >
      <Container maxW="7xl" mx="auto">
        <Flex alignItems="center">
          {/* Logo */}
          <Link href={getLocalePath('/')}>
            <Box fontWeight="bold" fontSize="xl" color="primary.600">
              {getAppName()}
            </Box>
          </Link>

          {/* Desktop Navigation */}
          <Flex display={{ base: 'none', md: 'flex' }} gap={8} ml={12}>
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Box
                  fontSize="sm"
                  fontWeight="medium"
                  color="gray.700"
                  _hover={{ color: 'primary.600' }}
                >
                  {item.label}
                </Box>
              </Link>
            ))}
          </Flex>

          <Spacer />

          {/* CTA Buttons */}
          <Flex alignItems="center" gap={4}>
            <Link href={`${getDashboardBase()}/login`}>
              <Box
                as="button"
                px={4}
                py={2}
                borderRadius="md"
                borderWidth="1px"
                borderColor="gray.300"
                fontSize="sm"
                fontWeight="medium"
                _hover={{ bg: 'gray.50' }}
                display={{ base: 'none', sm: 'block' }}
              >
                {t(`nav.login`, 'Login')}
              </Box>
            </Link>
            <Link href={`${getDashboardBase()}/register`}>
              <Box
                as="button"
                px={4}
                py={2}
                borderRadius="md"
                bg="primary.600"
                color="white"
                fontSize="sm"
                fontWeight="medium"
                _hover={{ bg: 'primary.700' }}
                display={{ base: 'none', sm: 'block' }}
              >
                {t(`nav.getStarted`, 'Get Started')}
              </Box>
            </Link>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
}
