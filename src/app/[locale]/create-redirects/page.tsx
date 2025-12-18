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
    title: `${t("meta-create-redirects.title", "create-redirects")} - ${getAppName()}`,
    description: t(
      "meta.create-redirects.description",
      "Simple, transparent enterprise for RedirHub"
    ),
  };
}

export default async function PricingPage() {
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
        " Stay ahead of broken links with automated checks, notifications, and fallback options for broken destinations.",
    },
    {
      heading: "Bot Security:",
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

  const faqData = [
    {
      value: "faq-1",
      question: "How do I create a redirect in RedirHub?",
      answer:
        "Creating a redirect takes seconds. Add your domain, choose a destination URL, select 301 or 302, and click Create. Your redirect is deployed instantly across our global edge network with automatic HTTPS.",
    },
    {
      value: "faq-2",
      question: "How fast do redirects deploy after I create or update them?",
      answer:
        "Redirects deploy globally within seconds. RedirHub’s edge network updates in near real-time, so any change—new redirect or updated destination—propagates instantly without DNS delays.",
    },
    {
      value: "faq-3",
      question: "Does RedirHub support both 301 and 302 redirect types?",
      answer:
        "Absolutely. You can choose 301 (permanent) for SEO and site migrations, or 302 (temporary) for short-term routing, testing, or campaign links. Switching types is instant and can be done anytime.",
    },
    {
      value: "faq-4",
      question: "Do I need any server setup or hosting to deploy redirects?",
      answer:
        "No server or hosting setup is required. RedirHub handles everything on the backend. You simply point your domain’s DNS to RedirHub, and we take care of certificates, security, and routing automatically.",
    },
    {
      value: "faq-5",
      question: "Can I bulk create or update redirects for larger projects?",
      answer:
        "Yes. RedirHub supports managing multiple redirects efficiently, ideal for agencies, IT teams, and domain migrations. Bulk operations, grouped management, and hostname-based pricing make large-scale redirect management easy and cost-effective.",
    },
  ];

  return (
    <>
      <FeatureBanner
        title="Create Individual Redirects"
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
        />{" "}
        <FeatureSplitSection
          mainTitle="Domain Configuration"
          subTitle="Manage redirect settings across multiple domains and subdomains"
          features={DomainConfiguration}
          imageSrc="/assets/images/feature/Domain-Configuration.png"
          imageAlt="Domain-Configuration"
        />
      </Box>
      <TestimonialsSlider marginBottom={"20px"} />
      <FAQSection faqData={faqData} />
    </>
  );
}
