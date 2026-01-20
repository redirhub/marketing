import { Metadata } from "next";
import initTranslations from "@/lib/i18n";
import { getAppName } from "@/lib/utils/constants";
import BlogList from "@/components/blogs/BlogList";
import BlogBanner from "@/components/share/banners/blog/BlogBanner";
import { buildCanonicalUrl } from '@/lib/utils/seo'
import { allLanguages } from '@/sanity/config/i18n'

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;

  const { resources } = await initTranslations(locale, ["common"]);
  const t = (key: string, fallback: string) => {
    const translation = resources?.[locale]?.common?.[key];
    return translation || fallback;
  };

  // Generate canonical URL with pagination support
  const basePath = '/blog';
  const queryParam = currentPage > 1 ? `?page=${currentPage}` : '';
  const canonicalUrl = buildCanonicalUrl(locale, `${basePath}${queryParam}`);

  // Build hreflang alternates with pagination for all locales
  const languages: Record<string, string> = {};
  allLanguages.forEach((lang) => {
    const path = `${basePath}${queryParam}`;
    if (lang === 'en') {
      languages['en'] = path;
      languages['x-default'] = path;
    } else {
      languages[lang] = `/${lang}${path}`;
    }
  });

  return {
    title: `${t("meta.blog.title", "Support")} - ${getAppName()}`,
    description: t(
      "meta.support.description",
      "Simple, transparent enterprise for RedirHub"
    ),
    alternates: {
      canonical: canonicalUrl,
      languages,
    },
  };
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  // Await the params from the URL
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;
  return (
    <>
      <BlogBanner />
      <BlogList currentPage={currentPage} />
    </>
  );
}
