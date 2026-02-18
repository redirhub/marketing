import { Metadata } from "next";
import { getT } from "@/lib/i18n";
import { APP_NAME } from "@/lib/utils/constants";
import { buildCanonicalUrl, buildStaticHreflangAlternates, buildSocialCards } from "@/lib/utils/seo";
import { allLanguages } from "@/sanity/config/i18n";
import BookADemo from "@/components/enterprise/BookADemo";
import StandsOut from "@/components/enterprise/StandsOut";
import LandingPageBanner from "@/components/share/banners/landingPage/LandingPageBanner";

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

export default async function PricingPage() {
  const t = await getT();

  const hero = {
    headline: t("enterprise.banner-title", "Reach Out to {{n}}", { n: APP_NAME }),
    subheadline: t("enterprise.banner-subtitle", "Organize a demo or get help purchasing the product"),
    bannerStyle: "dark" as const,
    heroSections: ["customerLogos"] as Array<"redirect" | "customerLogos">,
  };

  return (
    <>
      <LandingPageBanner hero={hero} />
      <BookADemo />
      <StandsOut />
    </>
  );
}
