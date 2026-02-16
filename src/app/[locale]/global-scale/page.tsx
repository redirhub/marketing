import { Metadata } from "next";
import { Box } from "@chakra-ui/react";
import { getT } from "@/lib/i18n";
import { APP_NAME } from "@/lib/utils/constants";
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
  const t = await getT();

  return {
    title: `${t("nav.global-scale-title", "Global scale")} - ${APP_NAME}`,
    description: t(
      "nav.global-scale-description",
      "Simple, transparent enterprise for RedirHub"
    ),
  };
}

export default async function Globalscale({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale} = await params;
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

  // Fetch FAQs from CMS
  const faqSet = await fetchFAQSetByPage('global-scale', locale);

  // Transform to FAQAccordion format (add 'value' field)
  const faqData = faqSet?.faqs.map((faq, index) => ({
    value: `faq-${index + 1}`,
    question: faq.question,
    answer: faq.answer,
  })) || [];

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
        <Box pt={{base: 6, md: 0}}>
          <TestimonialsSlider marginBottom={"20px"} />
        </Box>
      </Box>
      {faqData.length > 0 && <FAQSection faqData={faqData} />}
    </>
  );
}
