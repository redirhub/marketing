import { Metadata } from "next";
import { getT } from "@/lib/i18n";
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
  const t = await getT();

  return {
    title: t("enterprise.title", "Enterprise Solutions - {{n}}", { n: getAppName() }),
    description: t(
      "enterprise.description",
      "Enterprise redirect management with dedicated support, custom SLAs, and advanced security. Scale your business with {{n}}.",
      { n: getAppName() }
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
