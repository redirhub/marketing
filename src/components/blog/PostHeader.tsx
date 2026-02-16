'use client'

import { Box, Flex, Heading, Container, Text } from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'
import { FiArrowLeft } from 'react-icons/fi'
import { urlFor } from '@/sanity/lib/image'
import { SanityImageAsset } from '@/types/sanity'
import { ClockIcon } from '@sanity/icons'
import { CalendarIcon } from '@chakra-ui/icons'
import { useTranslation } from 'react-i18next'
import { useLocalePath } from '@/lib/hooks/useLocalePath'

interface PostHeaderProps {
  title: string
  author?: { name: string }
  publishedAt: string
  readTimeMinutes: number
  tags?: string[]
  image?: SanityImageAsset
  locale?: string
}

export default function PostHeader({
  title,
  publishedAt,
  readTimeMinutes,
  image,
  locale = 'en',
}: PostHeaderProps) {
  const { t } = useTranslation()
  const localePath = useLocalePath()
  const imageUrl = image ? urlFor(image).width(1600).height(900).url() : null

  return (
    <Box
      as="header"
      pb={2}
      pt={20}
      bg="linear-gradient(163deg, #1c6db6 0%, #20a795 86%)"
      w="100%"
      position="relative"
      left="50%"
      right="50%"
      ml="-50vw"
      mr="-50vw"
    >
      <Container maxW="1220px" mx={'auto'} px={{ base: 4, md: 6 }} py={{ base: 8, md: 12 }}>
        {/* Main Layout: Text Left, Image Right */}
        <Flex
          gap={{ base: 6, md: 8, lg: 12 }}
          direction={{ base: 'column', lg: 'row' }}
          align={{ base: 'stretch', lg: 'flex-start' }}
        >
          {/* Left Content: Text Section */}
          <Box flex={{ base: 1, lg: '0 1 55%' }} textAlign="left">
            <Flex gap={3} my={6} flexWrap="wrap" alignItems="center" justifyContent="flex-start">
              {/* Back to Blog Link */}
              <Link
                href={localePath('/blog')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '18px',
                  fontWeight: 600,
                  color: 'white',
                  textDecoration: 'none',
                  transition: 'opacity 0.2s',
                }}
              >
                <FiArrowLeft size={20} />
                {t('nav.blog', 'Blog')}
              </Link>
            </Flex>

            {/* Title */}
            <Heading
              as="h1"
              fontSize={{ base: '24px', md: '28px', lg: '36px' }}
              fontWeight="700"
              lineHeight={{ base: '32px', md: '36px', lg: '44px' }}
              mb={6}
              color="white"
              letterSpacing="-0.02em"
            >
              {title}
            </Heading>

            {/* Metadata: Date and Read Time */}
            <Flex
              align="center"
              gap={4}
              fontSize="sm"
              color="#ffffffcc"
              fontWeight="400"
              justifyContent="flex-start"
              flexWrap="wrap"
            >
              {publishedAt && (
                <>
                  <Flex align="center" gap={1.5}>
                    <CalendarIcon width={5} height={5} />
                    <Text>
                      {new Date(publishedAt).toLocaleDateString(locale, {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </Text>
                  </Flex>
                  {readTimeMinutes && (
                    <Flex align="center" gap={1}>
                      <ClockIcon width={24} height={24} />
                      <Text>{t('home.mins-read', '{{minutes}} mins read', { minutes: readTimeMinutes })}</Text>
                    </Flex>
                  )}
                </>
              )}
            </Flex>
          </Box>

          {/* Right Content: Image Section */}
          {imageUrl && (
            <Box flex={{ base: 1, lg: '0 1 60%' }} position="relative">
              <Box
                borderRadius="24px"
                overflow="hidden"
                boxShadow="lg"
                position="relative"
                w="100%"
                h={'330px'}
                // paddingBottom="62.5%"
                bg="gray.100"
              >
                <Image
                  src={imageUrl}
                  alt={title}
                  fill
                  style={{ objectFit: 'cover', position: 'absolute' }}
                  priority
                />
              </Box>
            </Box>
          )}
        </Flex>
      </Container>
    </Box>
  )
}
