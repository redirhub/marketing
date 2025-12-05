'use client';

import { Box, Container, Flex, Grid, Stack, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getAppName } from '@/lib/utils/constants';

export default function Footer() {
  const { t } = useTranslation('common');
  const params = useParams();
  const locale = params?.locale as string || 'en';
  const currentYear = new Date().getFullYear();

  // Helper to generate URLs - hide /en for default locale
  const getLocalePath = (path: string) => {
    if (locale === 'en') {
      return path;
    }
    return `/${locale}${path}`;
  };

  const footerLinks = {
    product: [
      { label: t(`footer.features`, 'Features'), href: getLocalePath('/features') },
      { label: t(`footer.pricing`, 'Pricing'), href: getLocalePath('/pricing') },
    ],
    legal: [
      { label: t(`footer.privacy`, 'Privacy Policy'), href: getLocalePath('/legal/privacy-policy') },
      { label: t(`footer.terms`, 'Terms of Service'), href: getLocalePath('/legal/terms-of-service') },
    ],
  };

  return (
    <Box as="footer" bg="gray.900" color="white" py={12} mt="auto">
      <Container maxW="7xl" mx="auto">
        <Grid
          templateColumns={{ base: '1fr', md: 'repeat(4, 1fr)' }}
          gap={8}
          mb={8}
        >
          {/* Brand */}
          <Stack>
            <Text fontSize="xl" fontWeight="bold" color="primary.400">
              {getAppName()}
            </Text>
            <Text fontSize="sm" color="gray.400">
              {t(`footer.tagline`, 'Modern URL management and redirect tracking')}
            </Text>
          </Stack>

          {/* Product Links */}
          <Stack>
            <Text fontWeight="semibold" mb={2}>
              {t(`footer.product`, 'Product')}
            </Text>
            {footerLinks.product.map((link) => (
              <Link key={link.href} href={link.href}>
                <Text fontSize="sm" color="gray.400" _hover={{ color: 'white' }}>
                  {link.label}
                </Text>
              </Link>
            ))}
          </Stack>

          {/* Legal Links */}
          <Stack>
            <Text fontWeight="semibold" mb={2}>
              {t(`footer.legal`, 'Legal')}
            </Text>
            {footerLinks.legal.map((link) => (
              <Link key={link.href} href={link.href}>
                <Text fontSize="sm" color="gray.400" _hover={{ color: 'white' }}>
                  {link.label}
                </Text>
              </Link>
            ))}
          </Stack>
        </Grid>

        {/* Bottom Bar */}
        <Flex
          direction={{ base: 'column', md: 'row' }}
          justify="space-between"
          align="center"
          pt={8}
          borderTopWidth="1px"
          borderColor="gray.800"
        >
          <Text fontSize="sm" color="gray.400">
            © {currentYear} {getAppName()}. {t(`footer.rights`, 'All rights reserved.')}
          </Text>
        </Flex>
      </Container>
    </Box>
  );
}
