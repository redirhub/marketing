import { Metadata } from "next";
import { getT } from "@/lib/i18n";
import { APP_NAME } from "@/lib/utils/constants";
import FeatureBanner from "@/components/share/banners/features/FeatureBanner";
import FAQSection from "@/components/home/FAQSection";
import TestimonialsSlider from "@/components/home/TestimonialsSlider";
import FeatureSplitSection from "@/components/share/features/FeatureSplitSection";
import { Box } from "@chakra-ui/react";
import { fetchFAQSetByPage } from "@/lib/services/faq";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getT();

  return {
    title: `${t("meta-create-redirects.title", "Create redirects")} - ${APP_NAME}`,
    description: t(
      "nav.create-redirects-description",
      "Simple, transparent enterprise for RedirHub"
    ),
  };
}

export default async function PricingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const CreateIndividualRedirects = [
    {
      heading: "Quick Setup:",
      description:
        "Create redirects in seconds with our streamlined interface and instant validation",
    },
    {
      heading: "Flexible Redirect Types:",
      description:
        " Choose between 301 permanent redirects and 302 temporary redirects based on your needs",
    },
    {
      heading: "Instant Validation:",
      description:
        "Real-time URL validation ensures your redirects are properly formatted and functional",
    },
  ];

  const URLPathCustomization = [
    {
      heading: "Forwarded Options:",
      description:
        "Choose which parts of the URL to forward to the destination, including path forwarding (a.com/one/two → b.com/one/two) and query forwarding (a.com/?one=two → b.com/?one=two).",
    },
    {
      heading: "UTM Builder:",
      description:
        "Automatically append UTM parameters (source, medium, campaign, term, content) to your destination URL on every redirect.",
    },
    {
      heading: "Regular Expressions:",
      description:
        "Use regex patterns to create flexible redirect rules that match multiple URLs.",
    },
    {
      heading: "Wildcard Support:",
      description:
        "Implement wildcard matching to handle dynamic URL structures efficiently.",
    },
    {
      heading: "Path Parameters:",
      description:
        "Maintain URL parameters and path structures in your redirects automatically.",
    },
  ];
  const BulkImportExport = [
    {
      heading: "CSV Import:",
      description:
        "Upload CSV files to create multiple redirects in one operation.",
    },
    {
      heading: "Batch Processing:",
      description: "Edit, update, or delete multiple redirects simultaneously.",
    },
    {
      heading: "Validation & Review:",
      description: "Preview and validate all redirects before deployment.",
    },
  ];
  const BotProtectionMonitoring = [
    {
      heading: "URL Monitoring:",
      description:
        "Stay ahead of broken links with automated checks, notifications, and fallback options for broken destinations.",
    },
    {
      heading: "Bot Security:",
      description:
        "Control bot access with multiple protection layers including crawler blocking and JavaScript challenges.",
    },
    {
      heading: "Platform Handling:",
      description:
        "Customize redirect behavior for specific platforms like WeChat to ensure optimal user experience.",
    },
    {
      heading: "Tag Management:",
      description:
        "Create and organize redirects with custom tags for better management and filtering.",
    },
  ];
  const DomainConfiguration = [
    {
      heading: "Multi-domain Support:",
      description:
        "Create and manage redirects across all your domains from one interface.",
    },
    {
      heading: "Custom Rules:",
      description: "Set domain-specific redirect rules and default behaviors.",
    },
    {
      heading: "SSL Support:",
      description:
        "Automatic HTTPS redirect handling and SSL certificate management.",
    },
  ];

  // Fetch FAQs from CMS
  const faqSet = await fetchFAQSetByPage('create-redirects', locale);

  // Transform to FAQAccordion format (add 'value' field)
  const faqData = faqSet?.faqs.map((faq, index) => ({
    value: `faq-${index + 1}`,
    question: faq.question,
    answer: faq.answer,
  })) || [];

  return (
    <>
      <FeatureBanner
        title="Create and Deploy Redirects"
        subtitle="Transform your link management with powerful, intuitive
redirect creation tools that put you in control"
        imageSrc="/assets/images/feature/create-redirects.png"
      />

      <Box
        w="100%"
        py={{ base: 14, md: 24 }}
        px={{ base: 2, md: 6 }}
        textAlign="center"
        bg={"#fff"}
      >
        <FeatureSplitSection
          mainTitle="Create Individual Redirects"
          subTitle="Set up redirects with our easy-to-use interface. Configure source
URLs, destination paths, and redirect types in seconds"
          features={CreateIndividualRedirects}
          imageSrc="/assets/images/feature/Create-Individual-Redirects.png"
          imageAlt="Create-Individual-Redirects"
        />
        <FeatureSplitSection
          mainTitle="URL Path Customization"
          subTitle="Create powerful redirect rules using pattern matching and regular expressions."
          features={URLPathCustomization}
          imageSrc="/assets/images/feature/URL-Path-Customization.png"
          imageAlt="URL-Path-Customization"
          reverseOrder={true}
          imageWidth="500px"
        />
        <FeatureSplitSection
          mainTitle="Bulk Import & Export"
          subTitle="Manage multiple redirects efficiently with our bulk operation tools"
          features={BulkImportExport}
          imageSrc="/assets/images/feature/Bulk-Import-Export.png"
          imageAlt="Bulk-Import-Export"
        />
        <FeatureSplitSection
          mainTitle="Bot Protection & Monitoring"
          subTitle="Configure advanced security measures and link monitoring for your redirects"
          features={BotProtectionMonitoring}
          imageSrc="/assets/images/feature/Bot-Protection-Monitoring.png"
          imageAlt="Bot-Protection-Monitoring"
          reverseOrder={true}
          imageWidth="500px"
        />{" "}
        <FeatureSplitSection
          mainTitle="Domain Configuration"
          subTitle="Manage redirect settings across multiple domains and subdomains"
          features={DomainConfiguration}
          imageSrc="/assets/images/feature/Domain-Configuration.png"
          imageAlt="Domain-Configuration"
        />
        <TestimonialsSlider marginBottom={"20px"} />
      </Box>
      {faqData.length > 0 && <FAQSection faqData={faqData} />}
    </>
  );
}
