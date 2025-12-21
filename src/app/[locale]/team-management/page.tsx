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
    title: `${t("meta.Analyze-Redirects.title", "Team management")} - ${getAppName()}`,
    description: t(
      "meta.Analyze-Redirects.description",
      "Simple, transparent enterprise for RedirHub"
    ),
  };
}

export default async function AnalyzeRedirects() {
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

  const faqData = [
    {
      value: "faq-1",
      question: "How can I add team members to my RedirHub account?",
      answer:
        "You can invite team members via email and assign roles with specific permissions. RedirHub ensures that each member only accesses the tools and domains relevant to their role.",
    },
    {
      value: "faq-2",
      question: "Can I control access for different team members?",
      answer:
        "Yes. RedirHub provides role-based access management. You can set permissions for creating, editing, or deleting redirects, as well as viewing analytics, keeping your redirect infrastructure secure.",
    },
    {
      value: "faq-3",
      question: "Does RedirHub track team activity?",
      answer:
        "Absolutely. RedirHub logs actions by team members, including changes to redirects, settings, or analytics. This audit trail helps maintain accountability and operational transparency.",
    },
    {
      value: "faq-4",
      question: "Can multiple users collaborate on large domain portfolios?",
      answer:
        "Yes. RedirHub’s dashboard supports multiple users working simultaneously. Teams can manage redirects, update destinations, and monitor analytics in real time, improving efficiency and coordination.",
    },
  ];

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
          subTitle="Keep your team’s work structured and efficient."
          features={WorkspaceOrganization}
          imageSrc="/assets/images/feature/Workspace-Organization.jpeg"
          imageAlt="Workspace-Organization"
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
