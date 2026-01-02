import { Box, Heading, Flex } from '@chakra-ui/react'
import Link from 'next/link'
import { FiArrowRight } from 'react-icons/fi'
import { BlogCard } from '@/components/home/BlogCard'
import { PostPreview } from '@/types/sanity'
import { urlFor } from '@/sanity/lib/image'

interface RelatedArticlesProps {
  posts: PostPreview[]
  locale?: string
}

export default function RelatedArticles({ posts, locale = 'en' }: RelatedArticlesProps) {
  if (!posts || posts.length === 0) return null

  return (
    <Box as="section" mt={16} mb={8}>
      <Flex justify="space-between" align="center" mb={4}>
        <Heading as="h2" fontSize={{ base: '2xl', md: '3xl' }} fontWeight="800" color="gray.900">
          Related Articles
        </Heading>

        <Link
          href={`/${locale}/blog`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '1rem',
            fontWeight: 600,
            color: '#7D65DB',
            textDecoration: 'none',
            transition: 'color 0.2s',
          }}
        >
          View All Articles
          <FiArrowRight size={18} />
        </Link>
      </Flex>

      <Box display="grid" gridTemplateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={8}>
        {posts.slice(0, 3).map((post) => (
          <BlogCard
            key={post._id}
            imageSrc={post.image ? urlFor(post.image).width(800).height(600).url() : '/images/blog-placeholder.jpg'}
            category={post.tags?.[0] || 'Blog'}
            date={new Date(post.publishedAt).toLocaleDateString(locale, {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
            title={post.title}
            link={`/${locale}/blog/${post.slug.current}`}
          />
        ))}
      </Box>
    </Box>
  )
}
