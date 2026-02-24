import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PortableText } from '@portabletext/react'
import { Box, Container } from "@chakra-ui/react";
import { fetchLandingPageBySlug, fetchLandingPageTranslations } from "@/lib/services/landingPages";
import { portableTextComponents } from '@/components/blog/PortableTextComponents'
import LandingPageBanner from "@/components/share/banners/landingPage/LandingPageBanner";
import TableOfContents from "@/components/blog/TableOfContents";
import { TestimonialsSection, BlogSection, FAQSection } from "@/components/sections";
import { buildCanonicalUrl, buildHreflangAlternates, buildSocialCards, generateFAQSchema } from '@/lib/utils/seo'
import { APP_NAME } from "@/lib/utils/constants";
import { urlFor } from '@/sanity/lib/image';
import { getT } from "@/lib/i18n";


interface PageProps {
  params: Promise<{
    locale: string
    slug: string[]
  }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const slugPath = slug.join('/');

  // Return 404 metadata for paths with file extensions (assets)
  const lastSegment = slug[slug.length - 1];
  if (lastSegment && /\.[a-zA-Z0-9]+$/.test(lastSegment)) {
    return { title: "Not Found" };
  }

  const page = await fetchLandingPageBySlug(slugPath, locale);
  if (!page) {
    return { title: "Page Not Found" };
  }

  const canonicalUrl = buildCanonicalUrl(locale, `/${slugPath}`)

  const translations = await fetchLandingPageTranslations(slugPath)
  const hreflangAlternates = translations.length > 0
    ? buildHreflangAlternates(translations, '')
    : {}

  const title = `${page.meta?.metaTitle || page.title} - ${APP_NAME}`;
  const description = page.meta?.metaDescription || page.hero.subheadline || `${page.title}`;
  const image = page.meta?.ogImage ? urlFor(page.meta.ogImage).width(1200).height(630).url() : undefined;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      ...hreflangAlternates,
    },
    ...buildSocialCards({
      title,
      description,
      image,
      type: 'article',
    }),
  };
}

export default async function LandingPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const t = getT(locale);
  const slugPath = slug.join('/');

  // Return 404 for paths with file extensions (assets like .png, .jpg, .ico, etc.)
  const lastSegment = slug[slug.length - 1];
  if (lastSegment && /\.[a-zA-Z0-9]+$/.test(lastSegment)) {
    notFound();
  }

  const page = await fetchLandingPageBySlug(slugPath, locale);
  if (!page) {
    notFound();
  }

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
                    components={portableTextComponents(locale)}
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
          <TestimonialsSection locale={locale} marginTop={12} marginBottom={24} />
        </Box>
      )}

      <FAQSection faqs={page.faqs} />

      {showBlogInsight && (
        <BlogSection locale={locale} />
      )}

    </Box>
  );
}
