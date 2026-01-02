import { Metadata } from 'next'
import { Box, Container, Heading, VStack, Text } from '@chakra-ui/react'
import { ArticleItem } from '@/components/support/ArticleItem'
import { fetchSupportArticlesByTag } from '@/lib/services/support'
import SupportBanner from '@/components/share/banners/support/SupportBanner'

interface TagPageProps {
  params: Promise<{
    locale: string
    tag: string
  }>
}

// Helper function to denormalize tag (convert URL slug back to tag)
function denormalizeTag(slug: string): string {
  return decodeURIComponent(slug).replace(/-/g, ' ')
}

// Helper function to format tag for display
function formatTagForDisplay(tag: string): string {
  // If non-ASCII (Chinese, etc.), use as is
  if (/[^\x00-\x7F]/.test(tag)) {
    return tag
  }
  // Otherwise capitalize first letter of each word
  return tag
    .split(' ')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

export async function generateMetadata({
  params,
}: TagPageProps): Promise<Metadata> {
  const { tag: tagSlug } = await params
  const tag = denormalizeTag(tagSlug)
  const displayTag = formatTagForDisplay(tag)

  return {
    title: `Support Articles tagged with "${displayTag}"`,
    description: `Browse all support articles tagged with "${displayTag}"`,
  }
}

export default async function SupportTagPage({ params }: TagPageProps) {
  const { locale, tag: tagSlug } = await params

  const tag = denormalizeTag(tagSlug)
  const displayTag = formatTagForDisplay(tag)

  const articles = await fetchSupportArticlesByTag(tag, locale)

  return (
    <>
      <SupportBanner />
      <Box w="100%" py={8} bg="white">
        <Container maxW="7xl" mx="auto" px={{ base: 4, md: 6 }}>
          {/* Page Title */}
          <Heading
            as="h1"
            textAlign="center"
            fontSize={{ base: '2xl', md: '4xl' }}
            fontWeight="700"
            color="#101828"
            mb={8}
          >
            Support Articles tagged with{' '}
            <Box as="span" color="#7D65DB">
              #{displayTag}
            </Box>
          </Heading>

          {/* Articles List */}
          {articles.length === 0 ? (
            <Box textAlign="center" py={20}>
              <Text fontSize="xl" color="gray.600">
                No support articles found with this tag.
              </Text>
            </Box>
          ) : (
            <VStack align="stretch" gap={4}>
              {articles.map((article: any) => (
                <ArticleItem
                  key={article._id}
                  title={article.title}
                  slug={article.slug.current}
                  locale={locale}
                />
              ))}
            </VStack>
          )}
        </Container>
      </Box>
    </>
  )
}
