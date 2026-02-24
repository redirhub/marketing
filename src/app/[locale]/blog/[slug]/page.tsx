import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'
import { Box, Container } from '@chakra-ui/react'
import { fetchPostBySlug, fetchRelatedPosts, calculateReadTime, fetchPostTranslations } from '@/lib/services/blog'
import { urlFor } from '@/sanity/lib/image'
import { portableTextComponents } from '@/components/blog/PortableTextComponents'
import { getClient } from '@/lib/preview'
import PostHeader from '@/components/blog/PostHeader'
import TableOfContents from '@/components/blog/TableOfContents'
import AuthorBox from '@/components/blog/AuthorBox'
import RelatedArticles from '@/components/blog/RelatedArticles'
import BlogFAQ from '@/components/blog/BlogFAQ'
import { buildCanonicalUrl, buildStaticHreflangAlternates, buildSocialCards, generateFAQSchema } from '@/lib/utils/seo'
import InactivityPopup from '@/components/popups/InactivityPopup'
import { APP_NAME, APP_URL } from '@/lib/utils/constants'
import { allLanguages } from '@/sanity/config/i18n'

export const revalidate = 3600; // Revalidate every 1 hour

interface BlogPostPageProps {
  params: Promise<{
    locale: string
    slug: string
  }>
  searchParams: Promise<{
    version?: string
  }>
}

export async function generateMetadata({
  params,
  searchParams,
}: BlogPostPageProps): Promise<Metadata> {
  const { locale, slug } = await params
  const client = getClient(await searchParams)
  const post = await fetchPostBySlug(slug, locale, client)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  const imageUrl = post.image ? urlFor(post.image).width(1200).height(630).url() : undefined

  return {
    title: `${post.title} - ${APP_NAME}`,
    description: post.excerpt || undefined,
    alternates: {
      canonical: buildCanonicalUrl(locale, `/blog/${slug}`),
      ...buildStaticHreflangAlternates(allLanguages, `/blog/${slug}`),
    },
    ...buildSocialCards({
      title: post.title,
      description: post.excerpt || undefined,
      image: imageUrl,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: post.author?.name ? [post.author.name] : undefined,
    }),
  }
}

export default async function BlogPostPage({ params, searchParams }: BlogPostPageProps) {
  const { locale, slug } = await params
  const client = getClient(await searchParams)
  const post = await fetchPostBySlug(slug, locale, client)

  if (!post) {
    notFound()
  }

  const readTime = post.content ? calculateReadTime(post.content) : 1
  const relatedPosts = post.tags
    ? await fetchRelatedPosts(post._id, post.tags, locale, 3, client)
    : []

  // Generate Schema.org JSON-LD
  const imageUrl = post.image ? urlFor(post.image).width(1200).height(630).url() : undefined
  const canonicalUrl = buildCanonicalUrl(locale, `/blog/${slug}`)

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt || post.title,
    image: imageUrl,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: post.author
      ? {
          '@type': 'Person',
          name: post.author.name,
          ...(post.author.image && {
            image: urlFor(post.author.image).width(200).height(200).url(),
          }),
        }
      : undefined,
    publisher: {
      '@type': 'Organization',
      name: 'RedirHub',
      logo: {
        '@type': 'ImageObject',
        url: `${APP_URL}/logo.png`,
      },
    },
    timeRequired: readTime ? `PT${readTime}M` : undefined,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
    keywords: post.tags?.join(', '),
  }

  const faqSchema = generateFAQSchema(post.faqs)
  return (
    <>
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <Box as="article">
        {/* Post Header */}
        <PostHeader
          title={post.title}
          author={post.author}
          publishedAt={post.publishedAt}
          readTimeMinutes={readTime}
          tags={post.tags}
          image={post.image}
          locale={locale}
        />

        {/* Main Content Area */}
        <Box maxW="1100px" mx="auto" px={{ base: 4, md: 6 }} py={10}>
          <Box
            display="grid"
            gridTemplateColumns={{ base: '1fr', xl: '1fr 280px' }}
            gap={8}
          >
            {/* Main Content Column */}
            <Box minW="0">
              <Container maxW="800px" px={0}>
                <article>
                  {/* Post Content */}
                  {post.content && (
                    <Box mb={4}>
                      <PortableText value={post.content} components={portableTextComponents(locale)} />
                    </Box>
                  )}

                  {/* FAQ Section */}
                  {post.faqs && post.faqs.length > 0 && (
                    <BlogFAQ faqs={post.faqs} />
                  )}

                  {/* Author Box */}
                  <AuthorBox author={post.author} />
                </article>
              </Container>
            </Box>

            {/* Table of Contents - Desktop Only */}
            <Box display={{ base: 'none', xl: 'block' }}>
              <TableOfContents content={post.content || []} />
            </Box>
          </Box>

          {/* Related Articles - Full Width */}
          {relatedPosts.length > 0 && (
            <Box mt={12}>
              <RelatedArticles posts={relatedPosts} locale={locale} />
            </Box>
          )}
          <InactivityPopup />
        </Box>
      </Box>
    </>
  )
}
