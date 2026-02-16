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
    title: `${t("nav.manage-redirects-title", "Manage redirects")} - ${APP_NAME}`,
    description: t(
      "nav.manage-redirects-description",
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

  // Fetch FAQs from CMS
  const faqSet = await fetchFAQSetByPage('manage-redirects', locale);

  // Transform to FAQAccordion format (add 'value' field)
  const faqData = faqSet?.faqs.map((faq, index) => ({
    value: `faq-${index + 1}`,
    question: faq.question,
    answer: faq.answer,
  })) || [];
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
        <Box pt={{ base: 6, md: 0 }}>
          <TestimonialsSlider marginBottom={"20px"} />
        </Box>
      </Box>

      {faqData.length > 0 && <FAQSection faqData={faqData} />}
    </>
  );
}
