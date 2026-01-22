/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client'
import { Box, Heading, Text, Button, VStack, Icon } from '@chakra-ui/react'
import { HiArrowRight } from 'react-icons/hi'
import Link from 'next/link'
import { FiArrowRight } from 'react-icons/fi'

interface BlogCTAProps {
    headingFontSize?: { base: string; md: string }
    textFontSize?: string
}

const BlogCTA = ({
    headingFontSize = { base: '24px', md: '30px' },
    textFontSize = '18px',
}: BlogCTAProps) => {
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
                    Start Making 5x Faster Redirects with RedirHub
                </Heading>

                <Text
                    fontFamily="'Inter', sans-serif"
                    fontSize={textFontSize}
                    fontWeight="400"
                    color="gray.blueGray"
                    lineHeight="28px"
                >
                    Get redirects in under 100 ms – with automatic HTTPS, analytics, and zero
                    configuration.
                </Text>

                <Button
                    as={Link}
                    // @ts-expect-error
                    href="https://dash.redirhub.com/register"
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
                    Get Started Free  <Icon as={FiArrowRight} />
                </Button>
            </VStack>
        </Box>
    )
}

export default BlogCTA
