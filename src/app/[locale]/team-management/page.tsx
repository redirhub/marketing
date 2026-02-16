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
    title: `${t("nav.analyze-redirects-title", "Team management")} - ${APP_NAME}`,
    description: t(
      "nav.analyze-redirects-description",
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
  const AccessControl = [
    {
      heading: "Role Assignment:",
      description: "Create and assign custom roles with specific permissions",
    },
    {
      heading: "User Groups:",
      description:
        "Organize team members into groups for easier permission management",
    },
    {
      heading: "Granular Controls:",
      description:
        "Set precise access levels for different redirect features and actions",
    },
  ];

  const WorkspaceOrganization = [
    {
      heading: "Shared Workspaces:",
      description: "Create dedicated spaces for different teams or projects",
    },
    {
      heading: "Resource Sharing:",
      description: "Share redirect configurations and templates across teams",
    },
    {
      heading: "Caching:",
      description: "Optimize redirect speed with intelligent edge caching",
    },
  ];

  // Fetch FAQs from CMS
  const faqSet = await fetchFAQSetByPage('team-management', locale);

  // Transform to FAQAccordion format (add 'value' field)
  const faqData = faqSet?.faqs.map((faq, index) => ({
    value: `faq-${index + 1}`,
    question: faq.question,
    answer: faq.answer,
  })) || [];

  return (
    <>
      <FeatureBanner
        title="Team Management"
        subtitle="Collaborate securely across your organization with powerful team management tools."
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
          mainTitle="Access Control"
          subTitle="Manage team permissions effectively."
          features={AccessControl}
          imageSrc="/assets/images/feature/Access-Control.jpeg"
          imageAlt="Access-Control"
        />
        <FeatureSplitSection
          mainTitle="Workspace Organization"
          subTitle="Keep your team's work structured and efficient."
          features={WorkspaceOrganization}
          imageSrc="/assets/images/feature/Workspace-Organization.jpeg"
          imageAlt="Workspace-Organization"
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
