import { Metadata } from "next";
import { Box } from "@chakra-ui/react";
import initTranslations from "@/lib/i18n";
import { getAppName } from "@/lib/utils/constants";
import FeatureBanner from "@/components/share/banners/features/FeatureBanner";
import TestimonialsSlider from "@/components/home/TestimonialsSlider";
import FAQSection from "@/components/home/FAQSection";
import FeatureSplitSection from "@/components/share/features/FeatureSplitSection";
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
    title: `${t("meta.Analyze-Redirects.title", "Analyze redirects")} - ${getAppName()}`,
    description: t(
      "meta.Analyze-Redirects.description",
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
  const TrafficOverview = [
    {
      heading: "Total Clicks:",
      description:
        "Track the total number of redirect clicks and view hourly distribution",
    },
    {
      heading: "Unique Visitors:",
      description: "Monitor unique visitors accessing your redirects",
    },
    {
      heading: "QR Scans:",
      description:
        "Track QR code scan performance if enabled for your redirects",
    },
  ];
  const VisitDetails = [
    {
      heading: "Recent Activity:",
      description:
        "View real-time log of recent visits with timestamp and location",
    },
    {
      heading: "Device Info:",
      description:
        "See which devices and browsers are accessing your redirects",
    },
    {
      heading: "Location Data:",
      description: "Track visitor locations with country and city breakdown",
    },
  ];
  const TechnicalAnalysis = [
    {
      heading: "Protocol Stats:",
      description: "Monitor HTTP vs HTTPS usage across your redirects",
    },
    {
      heading: "Browser Analytics:",
      description: "Track which browsers and versions access your redirects",
    },
    {
      heading: "Domain Insights:",
      description:
        "Analyze traffic patterns across different domains and subdomains",
    },
  ];

  // Fetch FAQs from CMS
  const faqSet = await fetchFAQSetByPage('analyze-redirects', locale);

  // Transform to FAQAccordion format (add 'value' field)
  const faqData = faqSet?.faqs.map((faq, index) => ({
    value: `faq-${index + 1}`,
    question: faq.question,
    answer: faq.answer,
  })) || [];

  return (
    <>
      <FeatureBanner
        title="Analyze Redirects"
        subtitle="Transform your redirect data into actionable insights with comprehensive analytics and real-time monitoring."
        imageSrc="/assets/images/feature/create-redirects.png"
        subtitleWidth="100%"
      />
      <Box
        w="100%"
        py={{ base: 14, md: 24 }}
        px={{ base: 2, md: 6 }}
        textAlign="center"
        bg={"#fff"}
      >
        <FeatureSplitSection
          mainTitle="Traffic Overview"
          subTitle="Get detailed insights into your redirect performance."
          features={TrafficOverview}
          imageSrc="/assets/images/feature/Traffic-Overview.jpeg"
          imageAlt="Traffic-Overview"
        />
        <FeatureSplitSection
          mainTitle="Visit Details"
          subTitle="Monitor detailed information about each redirect access."
          features={VisitDetails}
          imageSrc="/assets/images/feature/Visit-Details.jpeg"
          imageAlt="Visit-Details"
          reverseOrder={true}
          imageBorderRadius="0px 15px 0px 0px"
        />
        <FeatureSplitSection
          mainTitle="Technical Analysis"
          subTitle="Understand the technical aspects of your redirects."
          features={TechnicalAnalysis}
          imageSrc="/assets/images/feature/Technical-Analysis.jpeg"
          imageAlt="Technical-Analysis"
          removePaddingBottom={true}
        />
        <TestimonialsSlider marginBottom={"20px"} />
      </Box>
      {faqData.length > 0 && <FAQSection faqData={faqData} />}
    </>
  );
}
