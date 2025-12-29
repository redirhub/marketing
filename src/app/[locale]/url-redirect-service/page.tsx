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
    title: `${t("meta.domain-and-url-redirect-service-title", "Domain and URL redirect service")} - ${getAppName()}`,
    description: t(
      "meta.domain-and-url-redirect-service.description",
      "Simple, transparent enterprise for RedirHub"
    ),
  };
}

export default async function AnalyzeRedirects() {
  return (
    <>
      <FooterPagesBanner
        title="URL Redirect Service"
        subtitle="Looking to redirect traffic from your old domain to a new one? Make the process simple and efficient with RedirHub’s"
        subtitleWidth="100%"
      />

      <Box
        w="100%"
        pt={{ base: 14, md: 20 }}
        px={{ base: 2, md: 6 }}
        textAlign="center"
        maxW="7xl"
        mx="auto"
      >
        <ServiceInfoCard
          title="When you need a URL redirect service?"
          details="Our URL redirect service is useful in various situations such as website migrations, changing URL structures, managing redirects for affiliate links or offline campaign, and simplifying the process of updating multiple links. It can save time and improve user experience while maintaining search engine rankings."
        />{" "}
        <ServiceInfoCard
          title="What is a URL redirect service?"
          details="A redirect service is a tool that allows you to send your website visitors to a different URL than the one they initially clicked on. It is useful for many reasons, such as when you change the URL of a page on your website, or when you want to send users to an affiliate link. With a redirect service like RedirHub, you can easily manage all of your URL redirection needs in one place."
        />{" "}
        <ServiceInfoCard
          title="Why use a redirect service?"
          details="Our URL redirect service can help you manage multiple redirects from one centralized platform. It allows you to easily update or modify redirects without changing the links on your website or social media platforms. Our redirect service also provides analytics and tracking features to monitor your redirects’ performance, making it easier to optimize your marketing campaigns for better results."
        />
      </Box>
    </>
  );
}
