import { Box, Flex, Heading, Text, Avatar } from '@chakra-ui/react'
import { urlFor } from '@/sanity/lib/image'

interface AuthorBoxProps {
  author?: {
    name: string
    bio?: string
    image?: any
    title?: string
  }
}

export default function AuthorBox({ author }: AuthorBoxProps) {
  if (!author) return null

  const avatarUrl = author.image ? urlFor(author.image).width(200).height(200).url() : undefined

  return (
    <Box
      bg="linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)"
      borderRadius="xl"
      p={{ base: 6, md: 8 }}
      my={10}
    >
      <Flex gap={6} align="start" direction={{ base: 'column', sm: 'row' }}>
        {/* Avatar */}
        <Avatar.Root
          size="2xl"
          css={{
            border: '4px solid white',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            flexShrink: 0,
          }}
        >
          <Avatar.Fallback name={author.name} />
          {avatarUrl && <Avatar.Image src={avatarUrl} alt={author.name} />}
        </Avatar.Root>

        {/* Author Info */}
        <Box flex="1">
          <Box mb={2}>
            <Heading
              as="p"
              fontSize={{ base: 'xl', md: '2xl' }}
              fontWeight="700"
              color="gray.900"
              mb={1}
            >
              {author.name}
            </Heading>
            {author.title && (
              <Text fontSize={{ base: 'md', md: 'lg' }} color="gray.600" fontWeight="500">
                {author.title}
              </Text>
            )}
          </Box>

          {/* Bio */}
          {author.bio && (
            <Text fontSize={{ base: 'sm', md: 'md' }} color="gray.700" lineHeight="1.7" mt={3}>
              {author.bio}
            </Text>
          )}
        </Box>
      </Flex>
    </Box>
  )
}
