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
    title: `${t("meta.manage-redirects.title", "manage-redirects")} - ${getAppName()}`,
    description: t(
      "meta.manage-redirects.description",
      "Simple, transparent enterprise for RedirHub"
    ),
  };
}

export default async function PricingPage() {
  const SearchFilter = [
    {
      heading: "Global Search:",
      description:
        "Find any redirect instantly with comprehensive search across URLs, tags, and descriptions",
    },
    {
      heading: "Smart Filters:",
      description:
        "Filter redirects by status, type, creation date, or performance metrics",
    },
    {
      heading: "Bulk Selection:",
      description:
        "Select and manage multiple redirects simultaneously for efficient operations",
    },
  ];
  const StatusManagement = [
    {
      heading: "Path Parameters:",
      description:
        "Maintain URL parameters and path structures in your redirects automatically",
    },
    {
      heading: "Quick Actions:",
      description: "Enable, disable, or pause redirects with a single click",
    },
    {
      heading: "Version History:",
      description: "Track changes and updates with detailed revision history",
    },
  ];
  const BulkOperations = [
    {
      heading: "Batch Updates:",
      description:
        " Modify multiple redirects simultaneously with bulk edit capabilities",
    },
    {
      heading: "Mass Actions:",
      description:
        "Apply actions like enable/disable, delete, or tag to multiple redirects at once",
    },
    {
      heading: "Export Options:",
      description:
        "Download redirect data in various formats for backup or analysis",
    },
  ];
  const PerformanceTracking = [
    {
      heading: "Usage Statistics:",
      description: "Track redirect usage patterns and response times",
    },
    {
      heading: "Error Monitoring:",
      description: "Identify and troubleshoot failed redirects quickly",
    },
    {
      heading: "Health Checks:",
      description:
        "Regular automated checks ensure your redirects are working properly",
    },
  ];

  const faqData = [
    {
      value: "faq-1",
      question: "How can I manage my existing redirects with RedirHub?",
      answer:
        "RedirHub’s dashboard gives you full control over all your redirects. You can view, edit, or delete any redirect instantly. Changes are applied globally in seconds via our edge network, no DNS changes needed.",
    },
    {
      value: "faq-2",
      question: "Can I track and monitor redirect performance?",
      answer:
        "Yes. RedirHub provides analytics on redirect traffic and usage. You can monitor hits, detect broken links, and analyze which redirects drive the most engagement, helping optimize SEO and IT routing.",
    },
    {
      value: "faq-3",
      question: "How do real-time updates work in RedirHub?",
      answer:
        "When you update a redirect—whether changing the destination, type, or settings—RedirHub instantly propagates the change across all edge locations. Your users always get the latest version without delay.",
    },
    {
      value: "faq-4",
      question: "Is it possible to organize redirects for multiple domains?",
      answer:
        "Yes. You can group redirects by domain, hostname, or campaign, making it easy to manage large portfolios. Filters, search, and bulk actions simplify management for agencies and IT teams.",
    },
    {
      value: "faq-5",
      question: "How secure is my redirect infrastructure?",
      answer:
        "All redirects are served over automatic HTTPS, ensuring encryption and security by default. RedirHub also protects against misconfigurations or invalid redirects, keeping your domains safe and reliable.",
    },
    {
      value: "faq-6",
      question: "Can I change redirect types or destinations without downtime?",
      answer:
        "Absolutely. RedirHub allows you to switch between 301 and 302 redirects or update the destination URL instantly. Updates are seamless, with no downtime, ensuring uninterrupted user experience and SEO integrity.",
    },
  ];
  return (
    <>
      <FeatureBanner
        title="Manage Redirects"
        subtitle="Take control of your redirect infrastructure with powerful management tools and real-time updates."
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
          mainTitle="Search and Filter"
          subTitle="Access and organize your redirects with powerful search capabilities."
          features={SearchFilter}
          imageSrc="/assets/images/feature/Search-Filter.jpg"
          imageAlt="Search-Filter"
          imageBorderRadius="12px 0px 0px 0px"
        />{" "}
        <FeatureSplitSection
          mainTitle="Status Management"
          subTitle="Keep your redirects organized and up to date."
          features={StatusManagement}
          imageSrc="/assets/images/feature/Status-Management.jpeg"
          imageAlt="Search-Filter"
          reverseOrder={true}
          imageBorderRadius="0px 15px 0px 0px"
        />
        <FeatureSplitSection
          mainTitle="Bulk Operations"
          subTitle="Efficiently manage multiple redirects at once."
          features={BulkOperations}
          imageSrc="/assets/images/feature/Bulk-Operations.jpg"
          imageAlt="Search-Filter"
          imageBorderRadius="12px 0px 0px 0px"
        />{" "}
        <FeatureSplitSection
          mainTitle="Performance Tracking"
          subTitle="Monitor and optimize your redirect performance."
          features={PerformanceTracking}
          imageSrc="/assets/images/feature/Performance-Tracking.jpeg"
          imageAlt="Search-Filter"
          reverseOrder={true}
          imageBorderRadius="0px 15px 0px 0px"
          removePaddingBottom={true}
        />
      </Box>

      <TestimonialsSlider marginBottom={"20px"} />
      <FAQSection faqData={faqData} />
    </>
  );
}
