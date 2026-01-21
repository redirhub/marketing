import { PortableTextComponents } from '@portabletext/react'
import { Box, Heading, Text, Code, Image as ChakraImage } from '@chakra-ui/react'
import { urlFor } from '@/sanity/lib/image'
import { GoCheckCircle } from 'react-icons/go'

// Track heading index for unique IDs
let currentHeadingIndex = -1

export const portableTextComponents: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <Heading
        as="h1"
        fontSize={{ base: '2xl', md: '3xl' }}
        fontWeight="bold"
        mt={10}
        mb={4}
        color="gray.900"
        css={{ scrollMarginTop: '100px' }}
      >
        {children}
      </Heading>
    ),
    h2: ({ children }) => {
      currentHeadingIndex++
      return (
        <Heading
          as="h2"
          id={`heading-${currentHeadingIndex}`}
          fontSize={{ base: '2xl', md: '3xl' }}
          fontWeight="bold"
          mt={10}
          mb={4}
          color="gray.900"
          css={{ scrollMarginTop: '100px' }}
        >
          {children}
        </Heading>
      )
    },
    h3: ({ children }) => {
      currentHeadingIndex++
      return (
        <Heading
          as="h3"
          id={`heading-${currentHeadingIndex}`}
          fontSize={{ base: 'xl', md: '2xl' }}
          fontWeight="bold"
          mt={6}
          mb={3}
          color="gray.900"
          css={{ scrollMarginTop: '100px' }}
        >
          {children}
        </Heading>
      )
    },
    h4: ({ children }) => (
      <Heading
        as="h4"
        fontSize={{ base: 'lg', md: 'xl' }}
        fontWeight="bold"
        mt={6}
        mb={3}
        color="gray.900"
      >
        {children}
      </Heading>
    ),
    normal: ({ children }) => (
      <Text fontSize={{ base: 'md', md: 'lg' }} lineHeight="1.8" color="gray.700" mb={4}>
        {children}
      </Text>
    ),
    blockquote: ({ children }) => (
      <Box
        borderLeft="4px solid"
        borderColor="blue.500"
        pl={4}
        py={2}
        my={4}
        fontStyle="italic"
        bg="transparent"
      >
        {children}
      </Box>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <Box as="ul" mb={4} pl={6}>
        {children}
      </Box>
    ),
    number: ({ children }) => (
      <Box as="ol" mb={4} pl={6}>
        {children}
      </Box>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <Box as="li" display="flex" gap={2} alignItems="center" fontSize={{ base: 'md', md: 'lg' }} color="gray.700" mb={2}>
        <GoCheckCircle style={{ flexShrink: 0 }} color="#E49426" />
        <Box>{children}</Box>
      </Box>
    ),
    number: ({ children }) => (
      <Box as="li" fontSize={{ base: 'md', md: 'lg' }} color="gray.700" mb={2}>
        {children}
      </Box>
    ),
  },
  marks: {
    strong: ({ children }) => <strong>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    code: ({ children }) => (
      <Code
        px={2}
        py={1}
        fontSize="sm"
        bg="gray.100"
        _dark={{ bg: 'gray.700' }}
        borderRadius="md"
      >
        {children}
      </Code>
    ),
    link: ({ value, children }) => {
      const target = (value?.href || '').startsWith('http') ? '_blank' : undefined
      return (
        <a
          href={value?.href}
          target={target}
          rel={target === '_blank' ? 'noopener noreferrer' : undefined}
          style={{ color: '#7D65DB', textDecoration: 'underline' }}
        >
          {children}
        </a>
      )
    },
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) {
        return null
      }

      const src = value?.asset
        ? urlFor(value).width(1200).fit('max').url()
        : value?.url

      if (!src) return null

      return (
        <Box my={6} textAlign="center">
          <ChakraImage
            src={src}
            alt={value?.alt || value?.caption || 'Blog post image'}
            mx="auto"
            maxH="640px"
            maxWidth="800px"
            w="100%"
            objectFit="contain"
            loading="lazy"
          />
          {value?.caption && (
            <Text mt={2} fontSize="sm" color="gray.500">
              {value.caption}
            </Text>
          )}
        </Box>
      )
    },
  },
}
