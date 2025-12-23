import { Metadata } from "next";
import initTranslations from "@/lib/i18n";
import { getAppName } from "@/lib/utils/constants";
import BookADemo from "@/components/enterprise/BookADemo";
import StandsOut from "@/components/enterprise/StandsOut";
import EnterpriseBanner from "@/components/share/banners/enterprise/EnterpriseBanner";

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
    title: `${t("meta.enterprise.title", "Enterprise")} - ${getAppName()}`,
    description: t(
      "meta.enterprise.description",
      "Simple, transparent enterprise for RedirHub"
    ),
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
