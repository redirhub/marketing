import { Metadata } from "next";
import { getAppName } from "@/lib/utils/constants";
import { buildCanonicalUrl, buildStaticHreflangAlternates } from "@/lib/utils/seo";
import { allLanguages } from "@/sanity/config/i18n";
import ChangelogBanner from "@/components/changelog/ChangelogBanner";
import InfiniteScrollChangelog from "@/components/changelog/InfiniteScrollChangelog";
import { fetchChangelogEntries } from "@/lib/services/changelog";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: `Changelog - ${getAppName()}`,
    description: "Stay updated with the latest features, improvements, and fixes to RedirHub",
    alternates: {
      canonical: buildCanonicalUrl(locale, '/changelog'),
      ...buildStaticHreflangAlternates(allLanguages, '/changelog'),
    },
  };
}

export default async function ChangelogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const { entries, nextCursor } = await fetchChangelogEntries(locale, 10);

  return (
    <>
      <ChangelogBanner />
      <InfiniteScrollChangelog
        initialEntries={entries}
        initialCursor={nextCursor}
        locale={locale}
      />
    </>
  );
}
