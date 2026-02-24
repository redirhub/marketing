import { Metadata } from 'next'
import { Box, Container, Heading, VStack, Text } from '@chakra-ui/react'
import { ArticleItem } from '@/components/support/ArticleItem'
import { fetchSupportArticlesByTag, fetchAllSupportTags } from '@/lib/services/support'
import SupportBanner from '@/components/share/banners/support/SupportBanner'
import { denormalizeTag, formatTagForDisplay, normalizeTag } from '@/lib/utils/tagsHelpers'
import { allLanguages } from '@/sanity/config/i18n'


interface TagPageProps {
  params: Promise<{
    locale: string
    tag: string
  }>
}

export async function generateStaticParams() {
  // Fetch all unique tags from English only (tags are same across all locales)
  const tags = await fetchAllSupportTags('en');

  // Generate paths for all locales with the same tags
  return tags.flatMap((tag: string) =>
    allLanguages.map((locale) => ({
      locale,
      tag: normalizeTag(tag),
    }))
  );
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
