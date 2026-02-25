import { Metadata } from "next";
import Hero from "@/components/home/Hero";
import { getT } from "@/lib/i18n";
import { APP_NAME } from "@/lib/utils/constants";
import ChooseUs from "@/components/home/ChooseUs";
import WhyStandsOut from "@/components/home/WhyStandsOut";
import PowerfulFeatures from "@/components/home/PowerfulFeatures";
import APIDocumentation from "@/components/home/APIDocumentation";
import { BlogSection, FAQSection, TestimonialsSection } from "@/components/sections";
import { buildCanonicalUrl, buildStaticHreflangAlternates, buildSocialCards, generateFAQSchema } from '@/lib/utils/seo'
import { allLanguages } from '@/sanity/config/i18n'
import { getTestimonials, formatTestimonialForSlider } from "@/lib/sanity/testimonials";
import { fetchLandingPageBySlug } from "@/lib/services/landingPages";
import { fetchBlogPosts } from "@/lib/services/blog";
import { urlFor } from "@/sanity/lib/image";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = getT(locale);

  // Generate canonical URL and hreflang alternates for home page
  const canonicalUrl = buildCanonicalUrl(locale, '/')
  const hreflangAlternates = buildStaticHreflangAlternates(allLanguages, '/')

  const homePageData = await fetchLandingPageBySlug("homepage", locale);

  const title = homePageData?.meta?.metaTitle
    ?? t("nav.home-title", "{{n}} - Fast & Secure URL Redirect Management", { n: APP_NAME });
  const description = homePageData?.meta?.metaDescription
    ?? t(
      "nav.home-description",
      "Enterprise-grade URL redirect service. Manage redirects, track analytics, and scale globally with {{n}}. Trusted by businesses worldwide.",
      { n: APP_NAME }
    );
  const ogImage = homePageData?.meta?.ogImage
    ? urlFor(homePageData.meta.ogImage).width(1200).height(630).url()
    : undefined;

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
      image: ogImage,
      type: 'website',
    }),
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = getT(locale);

  // Fetch home page content from CMS (English only — locale handled by i18n)
  const homePageData = await fetchLandingPageBySlug("homepage", locale);

  // Fetch blog posts for BlogSection
  const blogPosts = await fetchBlogPosts(locale, 3);

  // Generate FAQ Schema.org JSON-LD
  const faqSchema = generateFAQSchema(homePageData?.faqs);

  return (
    <>
      {/* FAQ Schema.org JSON-LD */}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <Hero content={homePageData?.hero} />
      <WhyStandsOut />
      <ChooseUs />
      <PowerfulFeatures />
      <TestimonialsSection locale={locale} bg="white" marginTop={0} marginBottom={24} />
      <APIDocumentation />
      <BlogSection locale={locale} posts={blogPosts} />
      <FAQSection faqs={homePageData?.faqs} />
    </>
  );
}
