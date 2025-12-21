import { Metadata } from "next";
import { Box } from "@chakra-ui/react";
import initTranslations from "@/lib/i18n";
import { getAppName } from "@/lib/utils/constants";
import FeatureBanner from "@/components/share/banners/features/FeatureBanner";
import TestimonialsSlider from "@/components/home/TestimonialsSlider";
import FAQSection from "@/components/home/FAQSection";
import FeatureSplitSection from "@/components/share/features/FeatureSplitSection";

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

export default async function AnalyzeRedirects() {
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
  const faqData = [
    {
      value: "faq-1",
      question: "What analytics does RedirHub provide for my redirects?",
      answer:
        "RedirHub tracks redirect traffic, user locations, hit counts, and referral sources. You get a clear picture of how your redirects perform, helping optimize campaigns, SEO, and IT routing strategies.",
    },
    {
      value: "faq-2",
      question: "Can I see real-time data for my redirects?",
      answer:
        "Yes. RedirHub offers real-time monitoring, showing up-to-the-second redirect activity. You can instantly detect traffic spikes, errors, or misconfigurations and take immediate action.",
    },
    {
      value: "faq-3",
      question: "How does redirect data help improve SEO?",
      answer:
        "By analyzing redirect performance, you can identify broken links, optimize 301 vs. 302 usage, and ensure proper indexing by search engines. RedirHub analytics helps you maintain link equity and improve search rankings.",
    },
    {
      value: "faq-4",
      question: "Does RedirHub support HTTPS for every domain?",
      answer:
        "Yes! RedirHub automatically provisions and manages SSL/TLS certificates for all domains using Let's Encrypt. Your redirects are always secure with HTTPS, protecting your users and maintaining SEO rankings.",
    },
    {
      value: "faq-5",
      question: "Can I track redirects across multiple domains?",
      answer:
        "Yes. RedirHub aggregates analytics across all connected domains, hostnames, and campaigns. You can filter, group, and compare performance across large portfolios for better decision-making.",
    },
    {
      value: "faq-6",
      question: "Does RedirHub provide alerts for redirect issues?",
      answer:
        "Absolutely. RedirHub can notify you of broken or misconfigured redirects, downtime, or unusual traffic patterns. These alerts help you maintain seamless redirection and a smooth user experience.",
    },
    {
      value: "faq-7",
      question: "Can I export redirect analytics data?",
      answer:
        "Yes. RedirHub allows you to export reports in CSV or JSON formats. This makes it easy to integrate with your SEO tools, dashboards, or IT monitoring systems for deeper analysis and reporting.",
    },
  ];
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
      </Box>
      <TestimonialsSlider marginBottom={"20px"} />
      <FAQSection faqData={faqData} />
    </>
  );
}
