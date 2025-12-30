import { Metadata } from "next";
import { Box } from "@chakra-ui/react";
import initTranslations from "@/lib/i18n";
import { getAppName } from "@/lib/utils/constants";
import { ServiceInfoCard } from "@/components/share/ServiceInfoCard";
import FAQSection from "@/components/home/FAQSection";
import TestimonialsSlider from "@/components/home/TestimonialsSlider";
import FooterPagesBanner from "@/components/share/banners/footerPages/FooterPagesBanner";
import TextBox from "@/components/free-redirect-service/TextBox";
import PricingPlan from "@/components/free-redirect-service/PricingPlan";
import { fetchFAQSetByPage } from "@/lib/services/faq";

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

export default async function AnalyzeRedirects({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Fetch FAQs from CMS
  const faqSet = await fetchFAQSetByPage('free-redirect-service', locale);

  // Transform to FAQAccordion format (add 'value' field)
  const faqData = faqSet?.faqs.map((faq, index) => ({
    value: `faq-${index + 1}`,
    question: faq.question,
    answer: faq.answer,
  })) || [];

  return (
    <>
      <FooterPagesBanner
        title="Free URL Redirect Service"
        subtitle="Create redirects and try out our features at no cost with RedirHub’s"
        subtitleWidth="100%"
      />
      <PricingPlan />

      <Box bg="#fff">
        <Box
          w="100%"
          pt={{ base: 14, md: 20 }}
          px={{ base: 2, md: 6 }}
          textAlign="center"
          maxW="6xl"
          mx="auto"
        >
          <ServiceInfoCard
            title="Free URL redirect service"
            details="Create redirects for free with RedirHub’s powerful URL redirection service. Say goodbye to confusing pricing plans and hello to a simple, effective solution for managing your website’s URLs. Join thousands of happy users and start redirecting your URLs for free today!"
          />{" "}
          <ServiceInfoCard
            title="What is a URL redirect service?"
            details="A redirect service is a tool that allows you to send your website visitors to a different URL than the one they initially clicked on. It is useful for many reasons, such as when you change the URL of a page on your website, or when you want to send users to an affiliate link. With a redirect service like RedirHub, you can easily manage all of your URL redirection needs in one place."
          />{" "}
          <ServiceInfoCard
            title="Why do we offer free redirect service?"
            details="We believe in giving all users the opportunity to experience the power of our URL management solution. With our free plan, you can create a redirect and see for yourself how easy it is to use and how it can benefit your business."
          />
        </Box>
      </Box>
      <Box
        w="100%"
        py={{ base: 14, md: 12 }}
        px={{ base: 2, md: 6 }}
        textAlign="center"
        bg={"#fff"}
      >
        <TestimonialsSlider marginBottom={"25px"} />
      </Box>
      <TextBox />
      {faqData.length > 0 && <FAQSection faqData={faqData} />}
    </>
  );
}
