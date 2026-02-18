import { Metadata } from 'next'
import { Box, Container, Heading, SimpleGrid, Text } from '@chakra-ui/react'
import { BlogCard } from '@/components/home/BlogCard'
import PaginationControls from '@/components/ui/PaginationControls'
import { fetchPostsByTag } from '@/lib/services/blog'
import { urlFor } from '@/sanity/lib/image'
import { client } from '@/sanity/lib/client'
import { buildCanonicalUrl, buildStaticHreflangAlternates, buildSocialCards } from '@/lib/utils/seo'
import { allLanguages } from '@/sanity/config/i18n'

interface TagPageProps {
  params: Promise<{
    locale: string
    tag: string
  }>
  searchParams: Promise<{
    page?: string
  }>
}

const PER_PAGE = 12

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
  const { locale, tag: tagSlug } = await params
  const tag = denormalizeTag(tagSlug)
  const displayTag = formatTagForDisplay(tag)

  const title = `Posts tagged with "${displayTag}"`;
  const description = `Browse all blog posts tagged with "${displayTag}"`;

  return {
    title,
    description,
    alternates: {
      canonical: buildCanonicalUrl(locale, `/blog/tag/${tagSlug}`),
      ...buildStaticHreflangAlternates(allLanguages, `/blog/tag/${tagSlug}`),
    },
    ...buildSocialCards({
      title,
      description,
      type: 'website',
    }),
  }
}

export default async function TagPage({ params, searchParams }: TagPageProps) {
  const { locale, tag: tagSlug } = await params
  const { page } = await searchParams

  const tag = denormalizeTag(tagSlug)
  const displayTag = formatTagForDisplay(tag)
  const currentPage = Number(page) || 1

  // Count total posts with this tag
  const totalCountQuery = `count(*[
    _type == "post" &&
    defined(slug.current) &&
    locale == $locale &&
    $tag in tags
  ])`

  const totalCount = await client.fetch(totalCountQuery, {
    locale,
    tag,
  } as Record<string, any>)

  const totalPages = Math.max(1, Math.ceil(totalCount / PER_PAGE))
  const safePage = Math.min(currentPage, totalPages)
  const start = (safePage - 1) * PER_PAGE
  const end = start + PER_PAGE

  // Fetch posts
  const postsQuery = `*[
    _type == "post" &&
    defined(slug.current) &&
    locale == $locale &&
    $tag in tags
  ] | order(publishedAt desc) [${start}...${end}] {
    _id,
    title,
    slug,
    excerpt,
    image,
    publishedAt,
    locale,
    tags,
    author->{
      name,
      image,
      slug
    }
  }`

  const posts = await client.fetch(postsQuery, { locale, tag } as Record<string, any>)

  return (
    <Box w="100%" py={8} bg="white">
      <Container maxW="7xl" mx="auto" px={{ base: 4, md: 6 }}>
        {/* Page Title */}
        <Heading
          as="h1"
          textAlign="center"
          fontSize={{ base: '40px', md: '60px', xl: '80px' }}
          fontWeight="800"
          color="#222"
          py={6}
          mt={6}
        >
          Posts tagged with{' '}
          <Box as="span" color="#7D65DB">
            #{displayTag}
          </Box>
        </Heading>

        {/* Posts Grid */}
        {posts.length === 0 ? (
          <Box textAlign="center" py={20}>
            <Text fontSize="2xl" color="gray.600">
              No posts available yet. Check back soon!
            </Text>
          </Box>
        ) : (
          <>
            <SimpleGrid
              columns={{ base: 1, md: 2, lg: 3 }}
              gap={{ base: 6, md: 6 }}
              mt={8}
            >
              {posts.map((post: any) => (
                <BlogCard
                  key={post._id}
                  imageSrc={
                    post.image
                      ? urlFor(post.image).width(800).height(450).url()
                      : '/images/blog-placeholder.jpg'
                  }
                  imageAlt={post.title}
                  category={post.tags?.[0]}
                  date={new Date(post.publishedAt).toLocaleDateString(locale, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                  title={post.title}
                  excerpt={post.excerpt}
                  link={`/${locale}/blog/${post.slug.current}`}
                  isBlogPage={true}
                />
              ))}
            </SimpleGrid>

            {/* Pagination */}
            <PaginationControls currentPage={safePage} totalPages={totalPages} />
          </>
        )}
      </Container>
    </Box>
  )
}
