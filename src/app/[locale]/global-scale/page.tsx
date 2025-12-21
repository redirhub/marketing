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
    title: `${t("meta.global-scale.title", "global scale")} - ${getAppName()}`,
    description: t(
      "meta.global-scale.description",
      "Simple, transparent enterprise for RedirHub"
    ),
  };
}

export default async function Globalscale() {
  const GlobalCDN = [
    {
      heading: "Edge Network:",
      description:
        "Serve redirects from locations closest to your users for minimal latency",
    },
    {
      heading: "Auto-Scaling:",
      description:
        "Handle traffic spikes effortlessly with dynamic capacity adjustment",
    },
    {
      heading: "High Availability:",
      description:
        "Maintain 99.99% uptime with redundant infrastructure across regions",
    },
  ];

  const WorkspaceOrganization = [
    {
      heading: "Smart Routing:",
      description:
        "Automatically route requests through the fastest available path",
    },
    {
      heading: "Load Balancing:",
      description: "Distribute traffic evenly across our global infrastructure",
    },
    {
      heading: "Caching:",
      description: "Optimize redirect speed with intelligent edge caching",
    },
  ];
  const EnterpriseInfrastructure = [
    {
      heading: "DDoS Protection:",
      description:
        "Advanced protection against distributed denial of service attacks",
    },
    {
      heading: "Failover:",
      description: " Automatic failover to ensure your redirects stay online",
    },
    {
      heading: "24/7 Monitoring:",
      description:
        "Continuous infrastructure monitoring and instant issue response",
    },
  ];

  const faqData = [
    {
      value: "faq-1",
      question: "How does RedirHub handle global traffic?",
      answer:
        "RedirHub uses an edge network with worldwide coverage, ensuring redirects are served from the location nearest to your visitors. This minimizes latency and delivers a seamless experience across all regions.",
    },
    {
      value: "faq-2",
      question: "Can RedirHub handle high-volume redirects?",
      answer:
        "Yes. RedirHub is designed for enterprise-level traffic, handling thousands of redirects per second without performance degradation. It’s suitable for agencies, IT teams, and large domain portfolios.",
    },
    {
      value: "faq-3",
      question:
        "Does RedirHub improve user experience for international audiences?",
      answer:
        "Absolutely. By serving redirects from the closest edge location and providing instant HTTPS, RedirHub ensures fast, secure, and reliable navigation for users worldwide.",
    },
    {
      value: "faq-4",
      question: "How does RedirHub maintain uptime and reliability globally?",
      answer:
        "RedirHub uses redundant servers, failover mechanisms, and real-time monitoring across multiple regions. Even during maintenance or network disruptions, redirects continue to function without downtime.",
    },
    {
      value: "faq-5",
      question: "Can I manage redirects across multiple regions easily?",
      answer:
        "Yes. RedirHub’s dashboard allows you to manage redirects for all domains and regions in one place. You can deploy, edit, or monitor redirects globally in real time. For large-scale operations, you can export redirect data via CSV or integrate with RedirHub API to automate redirect management.",
    },
    {
      value: "faq-6",
      question: "Is RedirHub suitable for enterprise or high-scale projects?",
      answer:
        "Yes. RedirHub’s dashboard allows you to manage redirects for all domains and regions in one place. You can deploy, edit, or monitor redirects globally in real time. For large-scale operations, you can export redirect data via CSV or integrate with RedirHub API to automate redirect management.",
    },
  ];

  return (
    <>
      <FeatureBanner
        title="Global Scale"
        subtitle="Deliver seamless customer experiences across your websites and domains with enterprise-grade infrastructure."
        imageSrc="/assets/images/feature/create-redirects.png"
        subtitleWidth="60%"
      />

      <Box
        w="100%"
        py={{ base: 14, md: 24 }}
        px={{ base: 2, md: 6 }}
        textAlign="center"
        bg={"#fff"}
      >
        <FeatureSplitSection
          mainTitle="Global CDN"
          subTitle="Scale your redirects worldwide with confidence."
          features={GlobalCDN}
          imageSrc="/assets/images/feature/Global-CDN.jpeg"
          imageAlt="Global-CDN"
        />
        <FeatureSplitSection
          mainTitle="Performance Optimization"
          subTitle="Ensure fast and reliable redirects everywhere."
          features={WorkspaceOrganization}
          imageSrc="/assets/images/feature/Performance-Optimization.jpeg"
          imageAlt="Workspace-Organization"
          reverseOrder={true}
          imageBorderRadius="0px 15px 0px 0px"
        />{" "}
        <FeatureSplitSection
          mainTitle="Enterprise Infrastructure"
          subTitle="Built for business-critical operations."
          features={EnterpriseInfrastructure}
          imageSrc="/assets/images/feature/Enterprise-Infrastructure.jpeg"
          imageAlt="Enterprise-Infrastructure"
          removePaddingBottom={true}
        />
      </Box>
      <TestimonialsSlider marginBottom={"20px"} />
      <FAQSection faqData={faqData} />
    </>
  );
}
