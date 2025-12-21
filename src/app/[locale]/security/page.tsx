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
    title: `${t("meta.global-scale.title", "Security & privacy")} - ${getAppName()}`,
    description: t(
      "meta.global-scale.description",
      "Simple, transparent enterprise for RedirHub"
    ),
  };
}

export default async function Globalscale() {
  const UserAccessProtection = [
    {
      heading: "Bot Protection:",
      description:
        "Block malicious bots while allowing legitimate crawlers with advanced detection",
    },
    {
      heading: "Rate Limiting:",
      description:
        "Prevent abuse with customizable rate limits and throttling controls",
    },
    {
      heading: "IP Filtering:",
      description:
        "Control access with IP allowlists and blocklists for specific redirects",
    },
  ];

  const SSLManagement = [
    {
      heading: "Auto SSL:",
      description:
        "Automatic SSL certificate provisioning and renewal for all domains",
    },
    {
      heading: "HTTPS Enforcement:",
      description:
        "Force secure connections with automatic HTTP to HTTPS upgrades",
    },
    {
      heading: "Custom Certificates:",
      description:
        "Support for custom SSL certificates and advanced configurations",
    },
  ];
  const dataProtection = [
    {
      heading: "Encryption:",
      description:
        "End-to-end encryption for all redirect configurations and analytics",
    },
    {
      heading: "Access Logs:",
      description:
        "Detailed audit trails of all security-related events and changes",
    },
    {
      heading: "Privacy Controls:",
      description: "Configurable data retention and privacy settings",
    },
  ];

  const faqData = [
    {
      value: "faq-1",
      question: "How does RedirHub secure my redirects?",
      answer:
        "All redirects are protected with automatic SSL (HTTPS), ensuring encryption and safe connections for all users. RedirHub safeguards your domains against interception and tampering.",
    },
    {
      value: "faq-2",
      question: "Does RedirHub protect against malicious traffic?",
      answer:
        "Yes. RedirHub includes bad bot filtering to block automated abuse and unwanted traffic. This helps maintain website performance and protects SEO integrity.",
    },
    {
      value: "faq-3",
      question: "How does RedirHub defend against DDoS attacks?",
      answer:
        "RedirHub uses enterprise-grade DDoS protection, including network-level mitigation and traffic filtering. Your redirects remain available and performant even under attack.",
    },
    {
      value: "faq-4",
      question: "Can I monitor security and access activity?",
      answer:
        "Absolutely. RedirHub logs all actions in the dashboard, including redirect updates and API access. You can track team activity, detect anomalies, and ensure secure collaboration.",
    },
  ];

  return (
    <>
      <FeatureBanner
        title="Security & Privacy"
        subtitle="Keep all your audiences and web properties safe with enterprise-grade security features."
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
          mainTitle="User Access Protection"
          subTitle="Secure your redirects against unauthorized access."
          features={UserAccessProtection}
          imageSrc="/assets/images/feature/User-Access-Protection.jpeg"
          imageAlt="User-Access-Protection"
        />
        <FeatureSplitSection
          mainTitle="SSL Management"
          subTitle="Ensure secure connections across all redirects."
          features={SSLManagement}
          imageSrc="/assets/images/feature/SSL-Management.jpeg"
          imageAlt="Workspace-Organization"
          reverseOrder={true}
        />{" "}
        <FeatureSplitSection
          mainTitle="Data Protection"
          subTitle="Keep your redirect data secure and compliant."
          features={dataProtection}
          imageSrc="/assets/images/feature/Data-Protection.jpeg"
          imageAlt="Data-Protection"
          removePaddingBottom={true}
        />
      </Box>
      <TestimonialsSlider marginBottom={"20px"} />
      <FAQSection faqData={faqData} />
    </>
  );
}
