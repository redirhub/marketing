/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client'
import { Box, Heading, Text, Button, VStack, Icon } from '@chakra-ui/react'
import { HiArrowRight } from 'react-icons/hi'
import Link from 'next/link'
import { FiArrowRight } from 'react-icons/fi'
import { URL_DASHBOARD_REGISTER, APP_NAME } from '@/lib/utils/constants'
import { useTranslation } from 'react-i18next'

interface CTAProps {
    variant?: 'default' | 'custom'
    title?: string
    text?: string
    url?: string
    headingFontSize?: { base: string; md: string }
    textFontSize?: string
}

const DEFAULT_URL = URL_DASHBOARD_REGISTER

const InlineCTA = ({
    variant = 'default',
    title,
    text,
    url,
    headingFontSize = { base: '24px', md: '30px' },
    textFontSize = '18px',
}: CTAProps) => {
    const { t } = useTranslation()
    const DEFAULT_TITLE = t('home.inline-cta-title', 'Start Making 5x Faster Redirects with {{n}}', { n: APP_NAME })
    const DEFAULT_TEXT = t('home.inline-cta-text', 'Get redirects in under 100 ms – with automatic HTTPS, analytics, and zero configuration.')
    const ctaTitle = variant === 'default' ? DEFAULT_TITLE : (title || DEFAULT_TITLE)
    const ctaText = variant === 'default' ? DEFAULT_TEXT : (text || DEFAULT_TEXT)
    const ctaUrl = variant === 'default' ? DEFAULT_URL : (url || DEFAULT_URL)
    return (
        <Box
            background="gradients.ctaBackground"
            border="1px solid #E9EAEB"
            borderRadius="24px"
            px={4}
            py={6}
            my={8}
            textAlign="center"
            position="relative"
            overflow="hidden"
            maxW="740px"
            mx="auto"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
        >
            <VStack gap={4} maxW="600px">
                <Heading
                    as="h3"
                    fontFamily="'Inter', sans-serif"
                    fontSize={headingFontSize}
                    fontWeight="600"
                    color="gray.darkGray"
                    lineHeight="38px"
                >
                    {ctaTitle}
                </Heading>

                <Text
                    fontFamily="'Inter', sans-serif"
                    fontSize={textFontSize}
                    fontWeight="400"
                    color="gray.blueGray"
                    lineHeight="28px"
                >
                    {ctaText}
                </Text>

                <Button
                    as={Link}
                    // @ts-expect-error
                    href={ctaUrl}
                    size="lg"
                    bg="brand.500"
                    color="white"
                    fontSize="md"
                    fontWeight="medium"
                    px={'18px'}
                    borderRadius={'12px'}
                    h="56px"
                    _hover={{ bg: '#E04B00' }}
                    rightIcon={<HiArrowRight />}
                    mt={4}
                >
                    {t('home.inline-cta-button', 'Get Started Free')}  <Icon as={FiArrowRight} />
                </Button>
            </VStack>
        </Box>
    )
}

export default InlineCTA
