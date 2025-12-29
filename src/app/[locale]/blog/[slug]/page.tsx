import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'
import { Box, Container, Heading, Text } from '@chakra-ui/react'
import { fetchPostBySlug, fetchRelatedPosts, calculateReadTime, fetchPostTranslations } from '@/lib/services/blog'
import { urlFor } from '@/sanity/lib/image'
import { portableTextComponents } from '@/components/blog/PortableTextComponents'
import PostHeader from '@/components/blog/PostHeader'
import TableOfContents from '@/components/blog/TableOfContents'
import AuthorBox from '@/components/blog/AuthorBox'
import RelatedArticles from '@/components/blog/RelatedArticles'
import BlogFAQ from '@/components/blog/BlogFAQ'

interface BlogPostPageProps {
  params: Promise<{
    locale: string
    slug: string
  }>
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { locale, slug } = await params
  const post = await fetchPostBySlug(slug, locale)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  const imageUrl = post.image ? urlFor(post.image).width(1200).height(630).url() : undefined

  // Fetch translations for hreflang alternates
  const translations = await fetchPostTranslations(slug)
  const alternates: { languages?: Record<string, string> } = {}

  if (translations.length > 0) {
    alternates.languages = {}
    translations.forEach((translation) => {
      if (alternates.languages) {
        alternates.languages[translation.locale] = `/${translation.locale}/blog/${translation.slug.current}`
      }
    })
  }

  return {
    title: post.title,
    description: post.excerpt || undefined,
    alternates,
    openGraph: {
      title: post.title,
      description: post.excerpt || undefined,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: post.author?.name ? [post.author.name] : undefined,
      images: imageUrl ? [{ url: imageUrl }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt || undefined,
      images: imageUrl ? [imageUrl] : undefined,
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { locale, slug } = await params
  const post = await fetchPostBySlug(slug, locale)

  if (!post) {
    notFound()
  }

  const readTime = post.content ? calculateReadTime(post.content) : 1
  const relatedPosts = post.tags
    ? await fetchRelatedPosts(post._id, post.tags, locale, 3)
    : []

  // Generate Schema.org JSON-LD
  const imageUrl = post.image ? urlFor(post.image).width(1200).height(630).url() : undefined
  const canonicalUrl = `${process.env.NEXT_PUBLIC_SITE_URL || ''}/${locale}/blog/${slug}`

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
        url: `${process.env.NEXT_PUBLIC_SITE_URL || ''}/logo.png`,
      },
    },
    timeRequired: readTime ? `PT${readTime}M` : undefined,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
    keywords: post.tags?.join(', '),
  }

  const faqSchema =
    post.faqs && post.faqs.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: post.faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer,
            },
          })),
        }
      : null

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
                    <Box
                      mb={4}
                      sx={{
                        '& p': {
                          fontSize: { base: 'md', md: 'lg' },
                          lineHeight: '1.8',
                          color: 'gray.700',
                          mb: 4,
                        },
                        '& h1': {
                          fontSize: { base: '2xl', md: '3xl' },
                          fontWeight: 'bold',
                          mt: 10,
                          mb: 4,
                          color: 'gray.900',
                        },
                        '& h4': {
                          fontSize: { base: 'lg', md: 'xl' },
                          fontWeight: 'bold',
                          mt: 6,
                          mb: 3,
                          color: 'gray.900',
                        },
                        '& ul, & ol': {
                          pl: 6,
                          mb: 4,
                        },
                        '& li': {
                          fontSize: { base: 'md', md: 'lg' },
                          color: 'gray.700',
                          mb: 2,
                        },
                        '& a': {
                          color: '#7D65DB',
                          textDecoration: 'underline',
                          _hover: {
                            color: '#6550C0',
                          },
                        },
                        '& img': {
                          my: 4,
                        },
                      }}
                    >
                      <PortableText value={post.content} components={portableTextComponents} />
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
        </Box>
      </Box>
    </>
  )
}
