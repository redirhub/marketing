import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PortableText } from '@portabletext/react'
import { Box, Container } from "@chakra-ui/react";
import { fetchLandingPageBySlug, fetchLandingPageTranslations } from "@/lib/services/landingPages";
import { portableTextComponents } from '@/components/blog/PortableTextComponents'
import { getClient } from '@/lib/preview'
import LandingPageBanner from "@/components/share/banners/landingPage/LandingPageBanner";
import TableOfContents from "@/components/blog/TableOfContents";
import { TestimonialsSection, BlogSection, FAQSection } from "@/components/sections";
import { buildCanonicalUrl, buildHreflangAlternates, generateFAQSchema } from '@/lib/utils/seo'

interface PageProps {
  params: Promise<{
    locale: string
    slug: string
  }>;
  searchParams: Promise<{
    version?: string
  }>;
}

export async function generateMetadata({
  params,
  searchParams,
}: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const searchParamsObj = await searchParams;
  const client = getClient(searchParamsObj);
  const isPreview = searchParamsObj?.version === 'drafts';

  const page = await fetchLandingPageBySlug(slug, locale, client, isPreview);
  if (!page) {
    return { title: "Page Not Found" };
  }

  // Generate canonical URL
  const canonicalUrl = buildCanonicalUrl(locale, `/${slug}`)

  // Fetch translations for hreflang alternates
  const translations = await fetchLandingPageTranslations(slug, client, isPreview)
  const hreflangAlternates = translations.length > 0
    ? buildHreflangAlternates(translations, '')
    : {}

  return {
    title: page.meta?.metaTitle || `${page.title} | RedirHub`,
    description: page.meta?.metaDescription || page.hero.subheadline || `${page.title} with RedirHub.`,
    alternates: {
      canonical: canonicalUrl,
      ...hreflangAlternates,
    },
  };
}

export default async function LandingPage({ params, searchParams }: PageProps) {
  const { locale, slug } = await params;
  const searchParamsObj = await searchParams;
  const client = getClient(searchParamsObj);
  const isPreview = searchParamsObj?.version === 'drafts';

  console.log('=== LANDING PAGE DEBUG ===');
  console.log('Slug:', slug);
  console.log('SearchParams:', searchParamsObj);
  console.log('Version:', searchParamsObj?.version);

  const page = await fetchLandingPageBySlug(slug, locale, client, isPreview);
  if (!page) {
    notFound();
  }

  // Transform FAQs to match FAQAccordion format
  const faqData = page.faqs?.map((faq, index) => ({
    value: `faq-${index}`,
    question: faq.question,
    answer: faq.answer,
  })) || [];

  // Generate FAQ Schema.org JSON-LD
  const faqSchema = generateFAQSchema(page.faqs);

  // Check which optional sections should be shown
  const showTableOfContents = page.sections?.includes('contentTable');
  const showTestimonials = page.sections?.includes('testimonials');
  const showBlogInsight = page.sections?.includes('blogInsight');

  return (
    <Box bg="white">
      {/* FAQ Schema.org JSON-LD */}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {/* Hero Section */}
      <LandingPageBanner hero={page.hero} />

      {/* Rich Content Section */}
      <Container maxW="7xl" mx="auto" px={{ base: 2, md: 2, lg: 0 }} mt={12}>
        <Box
          display="grid"
          gridTemplateColumns={
            showTableOfContents
              ? { base: '1fr', xl: '1fr 280px' }
              : '1fr'
          }
          gap={8}
        >
          {/* Main Content Column */}
          <Box minW="0">
            <Box
              bg="white"
              p={{ base: 6, md: 12 }}
              borderRadius="2xl"
              borderColor="gray.100"
            >
              {page.richContent && (
                <Box fontSize="lg" lineHeight="1.8" color="#344054">
                  <PortableText
                    value={page.richContent}
                    components={portableTextComponents}
                  />
                </Box>
              )}
            </Box>
          </Box>

          {/* Table of Contents - Desktop Only */}
          {showTableOfContents && (
            <Box display={{ base: 'none', xl: 'block' }}>
              <TableOfContents content={page.richContent || []} />
            </Box>
          )}
        </Box>
      </Container>

      {/* Testimonials Section */}
      {showTestimonials && (
        <TestimonialsSection marginTop={12} marginBottom={24} />
      )}

      {/* Blog Insight Section */}
      {showBlogInsight && (
        <BlogSection locale={locale} title="Latest Insights from Our Blog" />
      )}

      {/* FAQs Section */}
      {faqData.length > 0 && (
        <FAQSection faqData={faqData} title="Frequently asked questions" />
      )}
    </Box>
  );
}
