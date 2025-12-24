import { Metadata } from "next";
import { Box } from "@chakra-ui/react";
import initTranslations from "@/lib/i18n";
import { getAppName } from "@/lib/utils/constants";
import FeatureBanner from "@/components/share/banners/features/FeatureBanner";
import { ServiceInfoCard } from "@/components/share/ServiceInfoCard";
import FooterPagesBanner from "@/components/share/banners/footerPages/FooterPagesBanner";

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
    title: `${t("meta.301-redirect-service-title", "301 Redirect Service")} - ${getAppName()}`,
    description: t(
      "meta.301-redirect-service.description",
      "Simple, transparent enterprise for RedirHub"
    ),
  };
}

export default async function AnalyzeRedirects() {
  return (
    <>
      <FooterPagesBanner
        title="301 Redirect Service"
        subtitle="Looking to redirect traffic from your old domain to a new one using 301? Make the process simple and efficient with RedirHub’s"
        subtitleWidth="100%"
      />

      <Box
        w="100%"
        pt={{ base: 14, md: 24 }}
        px={{ base: 2, md: 6 }}
        textAlign="center"
        maxW="7xl"
        mx="auto"
      >
        <ServiceInfoCard
          title="When you need a 301 redirect service?"
          details="Our 301 redirect service is useful in various situations such as website migrations, changing URL structures, managing redirects for affiliate links or offline campaign, and simplifying the process of updating multiple links. It can save time and improve user experience while maintaining search engine rankings."
        />{" "}
        <ServiceInfoCard
          title="What is a 301 redirect service?"
          details="A 301 redirect service is a method used by developers to redirect website visitors permanently from one URL to another. This technique helps ensure that search engine rankings are maintained, and that users are directed to the correct webpage, even if the URL has been changed or moved."
        />{" "}
        <ServiceInfoCard
          title="Why use a redirect service?"
          details="Our URL redirect service can help you manage multiple redirects from one centralized platform. It allows you to easily update or modify redirects without changing the links on your website or social media platforms. Our redirect service also provides analytics and tracking features to monitor your redirects’ performance, making it easier to optimize your marketing campaigns for better results."
        />
      </Box>
    </>
  );
}
