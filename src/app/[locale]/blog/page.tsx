import { Metadata } from "next";
import { getT } from "@/lib/i18n";
import { APP_NAME } from "@/lib/utils/constants";
import BlogList from "@/components/blogs/BlogList";
import BlogBanner from "@/components/share/banners/blog/BlogBanner";
import { buildCanonicalUrl } from "@/lib/utils/seo";
import { allLanguages } from "@/sanity/config/i18n";

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

  const t = await getT();

  // Generate canonical URL with pagination support
  const basePath = "/blog";
  const queryParam = currentPage > 1 ? `?page=${currentPage}` : "";
  const canonicalUrl = buildCanonicalUrl(locale, `${basePath}${queryParam}`);

  // Build hreflang alternates with pagination for all locales
  const languages: Record<string, string> = {};
  allLanguages.forEach((lang) => {
    const path = `${basePath}${queryParam}`;
    if (lang === "en") {
      languages["en"] = path;
      languages["x-default"] = path;
    } else {
      languages[lang] = `/${lang}${path}`;
    }
  });

  return {
    title: t("nav.blog-title", "Blog - {{n}}", { n: APP_NAME }),
    description: t("nav.blog-description", "Latest guides, tutorials, and insights on URL redirects, SEO best practices, and web performance optimization."),
    alternates: {
      canonical: canonicalUrl,
      languages,
    },
  };
}

export default async function BlogPage({
  params,
  searchParams
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { locale } = await params;
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;
  return (
    <>
      <BlogBanner />
      <BlogList currentPage={currentPage} locale={locale} />
    </>
  );
}
