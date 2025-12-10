import { Metadata } from "next";
import Hero from "@/components/home/Hero";
import KeyMetrics from "@/components/home/KeyMetrics";
import initTranslations from "@/lib/i18n";
import { getAppName } from "@/lib/utils/constants";
import ChooseUs from "@/components/home/ChooseUs";
import WhyStandsOut from "@/components/home/WhyStandsOut";
import PowerfulFeatures from "@/components/home/PowerfulFeatures";
import Blogs from "@/components/home/Blogs";
import APIDocumentation from "@/components/home/APIDocumentation";

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
    title: `${getAppName()} - ${t("meta.home.title", "Modern URL Management")}`,
    description: t(
      "meta.home.description",
      "Manage redirects, short URLs, and monitor your links with ease"
    ),
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <>
      <Hero />
      <WhyStandsOut />
      <ChooseUs />
      <PowerfulFeatures />
      <APIDocumentation />
      <Blogs />
    </>
  );
}
