import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Box, Container, Heading, SimpleGrid, Text, VStack, Avatar } from '@chakra-ui/react'
import { BlogCard } from '@/components/home/BlogCard'
import PaginationControls from '@/components/ui/PaginationControls'
import { urlFor } from '@/sanity/lib/image'
import { client } from '@/sanity/lib/client'

interface AuthorPageProps {
  params: Promise<{
    locale: string
    slug: string
  }>
  searchParams: Promise<{
    page?: string
  }>
}

const PER_PAGE = 12

export async function generateMetadata({
  params,
}: AuthorPageProps): Promise<Metadata> {
  const { slug } = await params

  // Fetch author info
  const authorQuery = `*[
    _type == "author" &&
    slug.current == $slug
  ][0] {
    _id,
    name,
    slug,
    image,
    bio
  }`

  const author = await client.fetch(authorQuery, { slug })

  if (!author) {
    return {
      title: 'Author Not Found',
    }
  }

  return {
    title: `${author.name}'s Posts`,
    description: author.bio || `Browse all blog posts by ${author.name}`,
  }
}

export default async function AuthorPage({
  params,
  searchParams,
}: AuthorPageProps) {
  const { locale, slug } = await params
  const { page } = await searchParams

  const currentPage = Number(page) || 1

  // Fetch author info
  const authorQuery = `*[
    _type == "author" &&
    slug.current == $slug
  ][0] {
    _id,
    name,
    slug,
    image,
    bio
  }`

  const author = await client.fetch(authorQuery, { slug })

  if (!author) {
    notFound()
  }

  // Count total posts by author
  const totalCountQuery = `count(*[
    _type == "post" &&
    defined(slug.current) &&
    locale == $locale &&
    author._ref == $authorId
  ])`

  const totalCount = await client.fetch(totalCountQuery, {
    locale,
    authorId: author._id,
  })

  const totalPages = Math.max(1, Math.ceil(totalCount / PER_PAGE))
  const safePage = Math.min(currentPage, totalPages)
  const start = (safePage - 1) * PER_PAGE
  const end = start + PER_PAGE

  // Fetch posts
  const postsQuery = `*[
    _type == "post" &&
    defined(slug.current) &&
    locale == $locale &&
    author._ref == $authorId
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

  const posts = await client.fetch(postsQuery, {
    locale,
    authorId: author._id,
  })

  return (
    <Box w="100%" py={8} bg="white">
      <Container maxW="7xl" mx="auto" px={{ base: 4, md: 6 }}>
        {/* Author Hero Section */}
        <Box
          bg="linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)"
          borderRadius="2xl"
          p={{ base: 8, md: 12 }}
          mb={12}
          mt={4}
          textAlign="center"
        >
          <VStack gap={4}>
            <Avatar.Root
              size="2xl"
              css={{
                border: '4px solid',
                borderColor: '#D6BCFA',
              }}
            >
              <Avatar.Fallback name={author.name} />
              {author.image && (
                <Avatar.Image
                  src={urlFor(author.image).width(200).height(200).url()}
                  alt={author.name}
                />
              )}
            </Avatar.Root>
            <Heading
              as="h1"
              fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
              fontWeight="800"
              color="gray.900"
            >
              {author.name}
            </Heading>
            {author.bio && (
              <Text
                fontSize={{ base: 'md', md: 'lg' }}
                color="gray.700"
                maxW="2xl"
                lineHeight="1.75"
              >
                {author.bio}
              </Text>
            )}
            <Text fontSize="sm" color="gray.600" fontWeight="600">
              {totalCount} {totalCount === 1 ? 'post' : 'posts'}
            </Text>
          </VStack>
        </Box>

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
