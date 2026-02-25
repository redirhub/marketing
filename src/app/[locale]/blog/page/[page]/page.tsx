import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getT } from "@/lib/i18n";
import { APP_NAME } from "@/lib/utils/constants";
import BlogList from "@/components/blogs/BlogList";
import BlogBanner from "@/components/share/banners/blog/BlogBanner";
import { buildCanonicalUrl, buildSocialCards } from "@/lib/utils/seo";
import { allLanguages } from "@/sanity/config/i18n";

interface BlogPageProps {
  params: Promise<{
    locale: string;
    page: string;
  }>;
}

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const { locale, page } = await params;
  const currentPage = Number(page);

  if (isNaN(currentPage) || currentPage < 1) {
    return { title: "Not Found" };
  }

  const t = getT(locale);

  // Generate canonical URL with pagination support
  const basePath = "/blog";
  const pagePath = currentPage > 1 ? `/page/${currentPage}` : "";
  const canonicalUrl = buildCanonicalUrl(locale, `${basePath}${pagePath}`);

  // Build hreflang alternates with pagination for all locales
  const languages: Record<string, string> = {};
  allLanguages.forEach((lang) => {
    const path = `${basePath}${pagePath}`;
    if (lang === "en") {
      languages["en"] = path;
      languages["x-default"] = path;
    } else {
      languages[lang] = `/${lang}${path}`;
    }
  });

  const title = t("nav.blog-title", "Blog - {{n}}", { n: APP_NAME });
  const description = t("nav.blog-description", "Latest guides, tutorials, and insights on URL redirects, SEO best practices, and web performance optimization.");

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages,
    },
    ...buildSocialCards({
      title,
      description,
    }),
  };
}

export default async function BlogPaginatedPage({
  params,
}: BlogPageProps) {
  const { locale, page } = await params;
  const currentPage = Number(page);

  if (isNaN(currentPage) || currentPage < 1) {
    notFound();
  }

  const basePath = locale === 'en' ? '/blog' : `/${locale}/blog`;

  return (
    <>
      <BlogBanner />
      <BlogList currentPage={currentPage} locale={locale} basePath={basePath} />
    </>
  );
}
