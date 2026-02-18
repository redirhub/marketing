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
import { APP_NAME } from "@/lib/utils/constants";

interface PageProps {
  params: Promise<{
    locale: string
    slug: string[]
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
  const slugPath = slug.join('/');
  const searchParamsObj = await searchParams;
  const client = getClient(searchParamsObj);
  const isPreview = searchParamsObj?.version === 'drafts';

  const page = await fetchLandingPageBySlug(slugPath, locale, client, isPreview);
  if (!page) {
    return { title: "Page Not Found" };
  }

  const canonicalUrl = buildCanonicalUrl(locale, `/${slugPath}`)

  const translations = await fetchLandingPageTranslations(slugPath, client, isPreview)
  const hreflangAlternates = translations.length > 0
    ? buildHreflangAlternates(translations, '')
    : {}

  return {
    title: `${page.meta?.metaTitle || page.title} - ${APP_NAME}`,
    description: page.meta?.metaDescription || page.hero.subheadline || `${page.title}`,
    alternates: {
      canonical: canonicalUrl,
      ...hreflangAlternates,
    },
  };
}

export default async function LandingPage({ params, searchParams }: PageProps) {
  const { locale, slug } = await params;
  const slugPath = slug.join('/');
  const searchParamsObj = await searchParams;
  const client = getClient(searchParamsObj);
  const isPreview = searchParamsObj?.version === 'drafts';

  const page = await fetchLandingPageBySlug(slugPath, locale, client, isPreview);
  if (!page) {
    notFound();
  }

  const faqData = page.faqs?.map((faq, index) => ({
    value: `faq-${index}`,
    question: faq.question,
    answer: faq.answer,
  })) || [];

  const faqSchema = generateFAQSchema(page.faqs);

  const showTableOfContents = page.sections?.includes('contentTable');
  const showTestimonials = page.sections?.includes('testimonials');
  const showBlogInsight = page.sections?.includes('blogInsight');

  return (
    <Box bg="white">
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <LandingPageBanner hero={page.hero} />

      <Container maxW="7xl" mx="auto" px={{ base: 3, md: 4, lg: 6 }} mt={12}>
        <Box
          display="grid"
          gridTemplateColumns={
            showTableOfContents
              ? { base: '1fr', xl: '1fr 280px' }
              : '1fr'
          }
          gap={8}
        >
          <Box minW="0">
            <Box
              bg="white"
              pr={{ base: 0, lg: 2 }}
              borderRadius="2xl"
              borderColor="gray.100"
            >
              {page.content && (
                <Box fontSize="lg" lineHeight="1.8" color="#344054">
                  <PortableText
                    value={page.content}
                    components={portableTextComponents()}
                  />
                </Box>
              )}
            </Box>
          </Box>

          {showTableOfContents && (
            <Box display={{ base: 'none', xl: 'block' }}>
              <TableOfContents content={page.content || []} />
            </Box>
          )}
        </Box>
      </Container>

      {showTestimonials && (
        <Box px={{ base: 3, md: 4, lg: 6 }}>
          <TestimonialsSection marginTop={12} marginBottom={24} />
        </Box>
      )}

      {showBlogInsight && (
        <BlogSection locale={locale} title="Latest Insights from Our Blog" />
      )}

      {faqData.length > 0 && (
        <FAQSection faqData={faqData} title="Frequently asked questions" />
      )}
    </Box>
  );
}
