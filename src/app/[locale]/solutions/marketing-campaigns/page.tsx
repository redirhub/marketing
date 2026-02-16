import { Metadata } from "next";
import { getT } from "@/lib/i18n";
import { APP_NAME } from "@/lib/utils/constants";
import { buildCanonicalUrl, buildStaticHreflangAlternates } from "@/lib/utils/seo";
import { allLanguages } from "@/sanity/config/i18n";
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
  const t = await getT();

  return {
    title: `${t("meta-marketing-campaigns.title", "Marketing Campaigns")} - ${APP_NAME}`,
    description: t(
      "nav.marketing-campaigns-description",
      "Simple, transparent enterprise for RedirHub"
    ),
    alternates: {
      canonical: buildCanonicalUrl(locale, '/solutions/marketing-campaigns'),
      ...buildStaticHreflangAlternates(allLanguages, '/solutions/marketing-campaigns'),
    },
  };
}

export default async function WebsiteMigrations() {
  const CreateShortLinks = [
    {
      heading: "Boost Engagement:",
      description: "Short, memorable links drive higher click-through rates.",
    },
    {
      heading: "Brand Reinforcement:",
      description: "Custom domains keep ads looking polished and professional.",
    },
    {
      heading: "Multi-Channel Use:",
      description: "Ideal for social media, email, and online ads.",
    },
  ];

  const UTMBuilder = [
    {
      heading: "Consistent Tagging:",
      description: "Automatically apply standard UTM parameters",
    },
    {
      heading: "Detailed Insights:",
      description:
        "Compare link clicks, conversions, and sources in one place.",
    },
    {
      heading: "Simplify Reporting:",
      description: "Make data-driven decisions with accurate metrics.",
    },
  ];
  const SplitTesting = [
    {
      heading: "Seamless Rotation:",
      description: "Randomly direct traffic to different variations",
    },
    {
      heading: "Actionable Data:",
      description: "Identify winning headlines, designs, or offers.",
    },
    {
      heading: "Optimize in Real Time:",
      description: "Quickly swap or refine test variations.",
    },
  ];
  const TrackCampaign = [
    {
      heading: "Granular Stats:",
      description: "View clicks, user locations, device types, and more.",
    },
    {
      heading: "ROI Evaluation:",
      description:
        "Pinpoint successful channels and focus resources effectively.",
    },
    {
      heading: "Easy Integration:",
      description: "Connect data to your preferred analytics or CRM tools.",
    },
  ];

  const faqData = [
    {
      value: "faq-1",
      question: "How can RedirHub help manage marketing campaign links?",
      answer:
        "RedirHub allows you to create and manage campaign-specific redirects easily. You can track performance, update destinations instantly, and ensure all links are secure with automatic HTTPS.",
    },
    {
      value: "faq-2",
      question: "Can I run A/B testing with my redirects?",
      answer:
        "Yes. RedirHub supports data-driven A/B testing, allowing you to split traffic across different URLs and analyze performance. This helps optimize landing pages and improve conversion rates.",
    },
    {
      value: "faq-3",
      question: "Can I monitor campaign performance in real time?",
      answer:
        "Absolutely. RedirHub provides real-time analytics for every redirect, showing hits, referral sources, and geographic traffic. This enables immediate insights and faster campaign optimization.",
    },
    {
      value: "faq-4",
      question: "Does RedirHub support multiple domains and campaigns at once?",
      answer:
        "Yes. You can manage multiple domains and campaigns from one dashboard, filter redirects by campaign, and group links for easier organization and reporting.",
    },
    {
      value: "faq-5",
      question: "Can I export campaign data for further analysis?",
      answer:
        "Yes. RedirHub allows you to export redirect and campaign data in CSV format. You can use this data with your marketing dashboards or BI tools for deeper insights.",
    },
    {
      value: "faq-6",
      question: "Can I automate campaign redirects?",
      answer:
        "Yes. Using the RedirHub API, you can automate redirect creation, updates, and A/B testing, making campaign management faster and reducing manual work.",
    },
  ];

  return (
    <>
      <FeatureBanner
        title="Marketing Campaigns"
        subtitle="Amplify your campaign reach with streamlined link management, data-driven A/B testing, and real-time insights."
        imageSrc="/assets/images/feature/create-redirects.png"
        subtitleWidth="40%"
      />

      <Box
        w="100%"
        py={{ base: 14, md: 24 }}
        px={{ base: 2, md: 6 }}
        textAlign="center"
        bg={"#fff"}
      >
        <FeatureSplitSection
          mainTitle="Create Short Links for Ads"
          subTitle="Easily convert lengthy URLs into concise, branded links for your marketing efforts."
          features={CreateShortLinks}
          imageSrc="/assets/images/solutions/Maintain-SEO-Rankings.jpeg"
          imageAlt="Maintain-SEO-Rankings"
        />
        <FeatureSplitSection
          mainTitle="UTM Builder"
          subTitle="Add tracking parameters to every link to measure individual campaign performance."
          features={UTMBuilder}
          imageSrc="/assets/images/solutions/UTM-Builder.jpeg"
          imageAlt="UTM-Builder"
          reverseOrder={true}
          subTitleWidth={"100%"}
          imageBorderRadius="0px 15px 0px 0px"
        />
        <FeatureSplitSection
          mainTitle="Random Redirects for A/B Split Testing"
          subTitle="Test multiple landing pages to see which version yields the best conversions."
          features={SplitTesting}
          imageSrc="/assets/images/solutions/SplitTesting.jpeg"
          imageAlt="Match-Old-Pages-New-URLs"
        />
        <FeatureSplitSection
          mainTitle="Track Campaign Performance"
          subTitle="Monitor how each campaign performs through robust analytics and real-time dashboards."
          features={TrackCampaign}
          imageSrc="/assets/images/solutions/UTM-Builder.jpeg"
          imageAlt="UTM-Builder"
          reverseOrder={true}
          subTitleWidth={"100%"}
          imageBorderRadius="0px 15px 0px 0px"
          removePaddingBottom={true}
        />
        <Box pt={{ base: 6, md: 0 }}>
          <TestimonialsSlider marginBottom={"20px"} />
        </Box>
      </Box>

      <FAQSection faqData={faqData} />
    </>
  );
}
