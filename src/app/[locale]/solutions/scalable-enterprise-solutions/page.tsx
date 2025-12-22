import { Metadata } from "next";
import initTranslations from "@/lib/i18n";
import { getAppName } from "@/lib/utils/constants";
import FeatureBanner from "@/components/share/banners/features/FeatureBanner";
import FAQSection from "@/components/home/FAQSection";
import TestimonialsSlider from "@/components/home/TestimonialsSlider";
import FeatureSplitSection from "@/components/share/features/FeatureSplitSection";
import { Box } from "@chakra-ui/react";

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
    title: `${t("meta-domain-parking.title", "Scalable Enterprise Solutions")} - ${getAppName()}`,
    description: t(
      "meta.domain-parking.description",
      "Simple, transparent enterprise for RedirHub"
    ),
  };
}

export default async function WebsiteMigrations() {
  const APIIntegration = [
    {
      heading: "Full Control :",
      description: "Create, update, and delete redirects via REST APIs.",
    },
    {
      heading: "Custom Workflows :",
      description:
        "Integrate seamlessly with CI/CD pipelines, CRMs, or internal tools.",
    },
    {
      heading: "Reduced Manual Labor :",
      description: "Eliminate repetitive tasks with code-based automation.",
    },
  ];

  const BulkImport = [
    {
      heading: "Instant Scaling :",
      description: "Upload or download thousands of redirect rules at once.",
    },
    {
      heading: "Error Prevention :",
      description: "Validate your CSV files before finalizing changes.",
    },
    {
      heading: "Version Tracking :",
      description: "Keep historical logs for compliance and auditing.",
    },
  ];

  const HighSpeedGlobal = [
    {
      heading: "Ultra-Fast Response :",
      description: "Minimize wait times for users worldwide.",
    },
    {
      heading: "Resilient Architecture :",
      description: "Reroute traffic to the nearest available node.",
    },
    {
      heading: "99.999% Uptime :",
      description: "Ensure consistent, always-online redirect services.",
    },
  ];
  const RedirectSmarter = [
    {
      heading: "Guaranteed Reliability:",
      description: "Protect revenue and user experience with ironclad SLAs.",
    },
    {
      heading: "Priority Support:",
      description: "Access premium, round-the-clock assistance.",
    },
    {
      heading: "Compliance Ready:",
      description: "Meet strict data and security requirements at scale.",
    },
  ];

  const faqData = [
    {
      value: "faq-1",
      question: "What makes RedirHub suitable for enterprise-scale operations?",
      answer:
        "RedirHub provides fast, automated redirects on a global edge network, handling large-scale domain portfolios and high-volume traffic with enterprise-grade reliability.",
    },
    {
      value: "faq-2",
      question: "Can I automate redirects for multiple domains?",
      answer:
        "Yes. Using RedirHub’s API and CSV import/export, you can automate redirect creation, updates, and bulk management, reducing manual work and ensuring consistency across domains.",
    },
    {
      value: "faq-3",
      question: "Can I scale redirects globally without latency issues?",
      answer:
        "Absolutely. RedirHub’s edge network serves redirects from the nearest location to your users, minimizing latency and ensuring a seamless experience worldwide.",
    },
    {
      value: "faq-4",
      question:
        "Does RedirHub support security and compliance for enterprise use?",
      answer:
        "Yes. All redirects include automatic SSL (HTTPS), DDoS protection, and bad bot filtering. Role-based access and audit logs ensure secure collaboration and compliance with enterprise policies.",
    },
    {
      value: "faq-5",
      question: "Can I monitor and report on enterprise redirects?",
      answer:
        "Yes. RedirHub provides real-time analytics across all domains and redirects. You can track traffic, performance, and errors, and export data for reporting or integration with enterprise dashboards.",
    },
  ];

  return (
    <>
      <FeatureBanner
        title="Scalable Enterprise Solutions"
        subtitle="Empower your enterprise with fast, automated redirects on a global edge network—guaranteed uptime and seamless scalability."
        imageSrc="/assets/images/feature/create-redirects.png"
        subtitleWidth={"60%"}
      />

      <Box
        w="100%"
        py={{ base: 14, md: 24 }}
        px={{ base: 2, md: 6 }}
        textAlign="center"
        bg={"#fff"}
      >
        <FeatureSplitSection
          mainTitle="API Integration"
          subTitle="Automate redirect tasks programmatically for large-scale, enterprise needs."
          features={APIIntegration}
          imageSrc="/assets/images/solutions/Maintain-SEO-Rankings.jpeg"
          imageAlt="Maintain-SEO-Rankings"
          subTitleWidth="100%"
        />
        <FeatureSplitSection
          mainTitle="Bulk Import/Export"
          subTitle="Process massive volumes of redirects in seconds to handle big migrations or reorganizations."
          features={BulkImport}
          imageSrc="/assets/images/solutions/Bulk-Import.jpeg"
          imageAlt="Bulk-Import"
          reverseOrder={true}
          subTitleWidth="100%"
          imageBorderRadius="0px 15px 0px 0px"
        />
        <FeatureSplitSection
          mainTitle="High-Speed Global Edge Network"
          subTitle="Leverage a distributed infrastructure to serve redirects with minimal latency."
          features={HighSpeedGlobal}
          imageSrc="/assets/images/solutions/High-Speed-Global-Edge-Network.jpeg"
          imageAlt="High-Speed-Global-Edge-Network"
          subTitleWidth="100%"
        />
        <FeatureSplitSection
          mainTitle="Dedicated Infrastructure for 100% SLAs"
          subTitle="Rely on an enterprise-grade environment built for mission-critical deployments."
          features={RedirectSmarter}
          imageSrc="/assets/images/solutions/UTM-Builder.jpeg"
          imageAlt="UTM-Builder"
          reverseOrder={true}
          subTitleWidth="100%"
          imageBorderRadius="0px 15px 0px 0px"
          removePaddingBottom={true}
        />
        <TestimonialsSlider marginBottom={"20px"} />
      </Box>

      <FAQSection faqData={faqData} />
    </>
  );
}
