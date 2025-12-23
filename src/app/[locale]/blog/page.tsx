import { Metadata } from "next";
import initTranslations from "@/lib/i18n";
import { getAppName } from "@/lib/utils/constants";
import BlogList from "@/components/blogs/BlogList";
import BlogBanner from "@/components/share/banners/blog/BlogBanner";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { resources } = await initTranslations(locale, ["common"]);
  const t = (key: string, fallback: string) => {
    const translation = resources?.[locale]?.common?.[key];
    return translation || fallback;
  };

  return {
    title: `${t("meta.blog.title", "Support")} - ${getAppName()}`,
    description: t(
      "meta.support.description",
      "Simple, transparent enterprise for RedirHub"
    ),
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
