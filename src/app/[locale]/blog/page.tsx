import { Metadata } from "next";
import { getT } from "@/lib/i18n";
import { APP_NAME } from "@/lib/utils/constants";
import BlogList from "@/components/blogs/BlogList";
import BlogBanner from "@/components/share/banners/blog/BlogBanner";
import { buildCanonicalUrl, buildSocialCards } from "@/lib/utils/seo";
import { allLanguages } from "@/sanity/config/i18n";

export const revalidate = 3600; // Revalidate every 1 hour

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

  const t = getT(locale);

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
