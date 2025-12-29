import { PortableTextComponents } from '@portabletext/react'
import { Box, Heading, Text, Code } from '@chakra-ui/react'
import { urlFor } from '@/sanity/lib/image'
import Image from 'next/image'

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
      <Text fontSize="lg" lineHeight="1.8" mb={4}>
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
        bg="gray.50"
        _dark={{ bg: 'gray.800' }}
      >
        {children}
      </Box>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <Box as="ul" mb={4} pl={8} css={{ '& li': { marginBottom: '0.5rem' } }}>
        {children}
      </Box>
    ),
    number: ({ children }) => (
      <Box as="ol" mb={4} pl={8} css={{ '& li': { marginBottom: '0.5rem' } }}>
        {children}
      </Box>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <Box as="li" fontSize="lg" lineHeight="1.8">
        {children}
      </Box>
    ),
    number: ({ children }) => (
      <Box as="li" fontSize="lg" lineHeight="1.8">
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
          style={{ color: '#3182ce', textDecoration: 'underline' }}
        >
          {children}
        </a>
      )
    },
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) {
        return null
      }

      const imageUrl = urlFor(value).width(800).height(450).url()

      return (
        <Box my={6} borderRadius="lg" overflow="hidden">
          <Image
            src={imageUrl}
            alt={value.alt || 'Blog post image'}
            width={800}
            height={450}
            style={{ width: '100%', height: 'auto' }}
          />
          {value.alt && (
            <Text fontSize="sm" color="gray.600" textAlign="center" mt={2} fontStyle="italic">
              {value.alt}
            </Text>
          )}
        </Box>
      )
    },
  },
}
