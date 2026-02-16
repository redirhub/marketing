import { Metadata } from "next";
import { getT } from "@/lib/i18n";
import { APP_NAME } from "@/lib/utils/constants";
import { buildCanonicalUrl, buildStaticHreflangAlternates, buildSocialCards } from "@/lib/utils/seo";
import { allLanguages } from "@/sanity/config/i18n";
import BookADemo from "@/components/enterprise/BookADemo";
import StandsOut from "@/components/enterprise/StandsOut";
import EnterpriseBanner from "@/components/share/banners/enterprise/EnterpriseBanner";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getT();

  const title = t("nav.enterprise-title", "Enterprise Solutions - {{n}}", { n: APP_NAME });
  const description = t(
    "nav.enterprise-description",
    "Enterprise redirect management with dedicated support, custom SLAs, and advanced security. Scale your business with {{n}}.",
    { n: APP_NAME }
  );

  return {
    title,
    description,
    alternates: {
      canonical: buildCanonicalUrl(locale, '/enterprise'),
      ...buildStaticHreflangAlternates(allLanguages, '/enterprise'),
    },
    ...buildSocialCards({
      title,
      description,
    }),
  };
}

export default function PricingPage() {
  return (
    <>
      <EnterpriseBanner />
      <BookADemo />
      <StandsOut />
    </>
  );
}
