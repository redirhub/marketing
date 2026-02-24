import { Metadata } from "next";
import { APP_NAME } from "@/lib/utils/constants";
import { buildCanonicalUrl, buildStaticHreflangAlternates, buildSocialCards } from "@/lib/utils/seo";
import { allLanguages } from "@/sanity/config/i18n";
import ChangelogBanner from "@/components/changelog/ChangelogBanner";
import InfiniteScrollChangelog from "@/components/changelog/InfiniteScrollChangelog";
import { fetchChangelogEntries } from "@/lib/services/changelog";
import { getT } from "@/lib/i18n";

export const revalidate = 86400; // Revalidate every 24 hours

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getT();

  const title = t("nav.changelog-title", "Changelog - {{n}}", { n: APP_NAME });
  const description = t("nav.changelog-description", "Stay updated with the latest features, improvements, and fixes to {{n}}", { n: APP_NAME });

  return {
    title,
    description,
    alternates: {
      canonical: buildCanonicalUrl(locale, '/changelog'),
      ...buildStaticHreflangAlternates(allLanguages, '/changelog'),
    },
    ...buildSocialCards({
      title,
      description,
      type: 'website',
    }),
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
