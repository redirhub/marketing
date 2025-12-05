'use client';

import { Box, Container, Flex, Heading, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { getDashboardBase } from '@/lib/utils/constants';

export default function Hero() {
  const { t } = useTranslation('common');

  return (
    <Box bg="gradient-to-b" bgGradient="to-b" gradientFrom="gray.50" gradientTo="white" py={20}>
      <Container maxW="7xl" mx="auto">
        <Flex
          direction="column"
          align="center"
          textAlign="center"
          gap={8}
        >
          {/* Main Heading */}
          <Heading
            as="h1"
            fontSize={{ base: '4xl', md: '5xl', lg: '6xl' }}
            fontWeight="bold"
            lineHeight="tight"
            maxW="4xl"
          >
            {t(`home.hero.title`, 'Your domains. Globally redirected. Instantly.')}
          </Heading>

          {/* Subheading */}
          <Text
            fontSize={{ base: 'lg', md: 'xl' }}
            color="gray.600"
            maxW="2xl"
          >
            {t(`home.hero.subtitle`, 'Manage your redirects, short URLs, and monitor your links with RedirHub')}
          </Text>

          {/* CTAs */}
          <Flex gap={4} flexWrap="wrap" justify="center">
            <Link href={`${getDashboardBase()}/register`}>
              <Box
                as="button"
                px={8}
                py={4}
                borderRadius="lg"
                bg="primary.600"
                color="white"
                fontSize="lg"
                fontWeight="semibold"
                _hover={{ bg: 'primary.700' }}
                transition="all 0.2s"
              >
                {t(`home.hero.cta`, 'Get Started For Free')}
              </Box>
            </Link>
            <Link href="#features">
              <Box
                as="button"
                px={8}
                py={4}
                borderRadius="lg"
                borderWidth="2px"
                borderColor="gray.300"
                fontSize="lg"
                fontWeight="semibold"
                _hover={{ borderColor: 'gray.400', bg: 'gray.50' }}
                transition="all 0.2s"
              >
                {t(`home.hero.ctaSecondary`, 'Learn More')}
              </Box>
            </Link>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
}
