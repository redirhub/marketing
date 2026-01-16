'use client'

import { Box, Flex, Heading, Container, Text } from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'
import { FiArrowLeft } from 'react-icons/fi'
import { urlFor } from '@/sanity/lib/image'
import { SanityImageAsset } from '@/types/sanity'

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
  tags,
  image,
  locale = 'en',
}: PostHeaderProps) {
  const imageUrl = image ? urlFor(image).width(1600).height(900).url() : null

  return (
    <Box
      as="header"
      mb={8}
      bg="#f8f9fa"
      w="100vw"
      position="relative"
      left="50%"
      right="50%"
      ml="-50vw"
      mr="-50vw"
    >
      <Container maxW="900px" px={{ base: 4, md: 6 }} py={{ base: 8, md: 12 }}>
        <Box textAlign="center">
          {/* Back to Blog Link and Tags */}
          <Flex gap={3} mb={6} flexWrap="wrap" alignItems="center" justifyContent="center">
            {/* Back to Blog Link */}
            <Link
              href={`/${locale}/blog`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.875rem',
                fontWeight: 600,
                color: '#718096',
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
            >
              <FiArrowLeft size={16} />
              Blog
            </Link>

            {/* Separator */}
            {tags && tags.length > 0 && (
              <Text fontSize="sm" color="gray.400">
                |
              </Text>
            )}

            {/* Tags */}
            {tags && tags.length > 0 && (
              <Flex gap={1} flexWrap="wrap">
                {tags.slice(0, 3).map((tag, index) => (
                  <Box key={tag}>
                    <Link
                      href={`/${locale}/blog/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                      style={{
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        color: '#718096',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        textDecoration: 'none',
                        transition: 'color 0.2s',
                      }}
                    >
                      {tag}
                    </Link>
                    {index < Math.min(tags.length, 3) - 1 && (
                      <Text as="span" fontSize="sm" color="gray.600" mx={1}>
                        ,
                      </Text>
                    )}
                  </Box>
                ))}
              </Flex>
            )}
          </Flex>

          {/* Title */}
          <Heading
            as="h1"
            fontSize={{ base: '32px', md: '40px', lg: '48px' }}
            fontWeight="800"
            lineHeight="1.15"
            mb={6}
            color="#1a202c"
            letterSpacing="-0.02em"
          >
            {title}
          </Heading>

          {/* Metadata: Date and Read Time */}
          <Flex align="center" gap={2} fontSize="md" color="gray.600" fontWeight="400" justifyContent="center" mb={8}>
            {publishedAt && (
              <>
                <Text>
                  {new Date(publishedAt).toLocaleDateString(locale, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </Text>
                {readTimeMinutes && <Text>•</Text>}
              </>
            )}
            {readTimeMinutes && <Text>{readTimeMinutes} min read</Text>}
          </Flex>

          {/* Featured Image */}
          {imageUrl && (
            <Box
              borderRadius="12px"
              overflow="hidden"
              boxShadow="lg"
              position="relative"
              w="100%"
              maxW="900px"
              mx="auto"
              paddingBottom="56.25%"
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
          )}
        </Box>
      </Container>
    </Box>
  )
}
