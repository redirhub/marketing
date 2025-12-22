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
    title: `${t("meta-website-migrations.title", "Website Migrations")} - ${getAppName()}`,
    description: t(
      "meta.website-migrations.description",
      "Simple, transparent enterprise for RedirHub"
    ),
  };
}

export default async function WebsiteMigrations() {
  const MaintainSEORankings = [
    {
      heading: "Preserve Traffic:",
      description: "Retain your organic traffic with SEO-friendly redirects.",
    },
    {
      heading: "Seamless Transitions:",
      description: "Minimize ranking disruptions during URL changes.",
    },
    {
      heading: "Track Success:",
      description: "Monitor post-migration SEO performance effortlessly.",
    },
  ];

  const BulkRedirects = [
    {
      heading: "Scale Easily:",
      description: "Implement hundreds of redirects in seconds.",
    },
    {
      heading: "SEO Best Practices:",
      description: "Use 301 redirects to maintain authority and rankings.",
    },
    {
      heading: "Error-Free Setup:",
      description: "TAvoid misconfigurations with easy-to-use tools.",
    },
  ];
  const MatchOldPages = [
    {
      heading: "Accurate Mapping:",
      description: "Prevent broken links with precise URL mapping.",
    },
    {
      heading: "User Experience:",
      description: "Ensure visitors seamlessly find what they’re looking for.",
    },
    {
      heading: "Automation:",
      description: "Speed up migrations with bulk redirect tools.",
    },
  ];

  const faqData = [
    {
      value: "faq-1",
      question: "How can RedirHub help with website migrations?",
      answer:
        "RedirHub simplifies migrations by managing all your redirects in one place. You can map old URLs to new destinations, ensuring users and search engines reach the correct pages without downtime.",
    },
    {
      value: "faq-2",
      question: "Will my SEO be affected during migration?",
      answer:
        "No. RedirHub supports 301 permanent redirects, which preserve link equity and search engine rankings. Properly configured redirects ensure your SEO remains intact during and after migration.",
    },
    {
      value: "faq-3",
      question: "Can I migrate multiple domains or subdomains at once?",
      answer:
        "Yes. RedirHub supports bulk redirect management, making it easy to migrate large websites or multiple domains simultaneously while maintaining consistent routing and tracking.",
    },
    {
      value: "faq-4",
      question: "How fast are redirects applied during migration?",
      answer:
        "Yes. RedirHub allows you to audit and monitor redirects in real time, quickly identifying and fixing broken links to prevent 404 errors and protect your SEO.",
    },
    {
      value: "faq-5",
      question: "Can I automate migrations with RedirHub?",
      answer:
        "Absolutely. Using the RedirHub API and CSV import/export, you can automate bulk redirects, making large-scale migrations faster, accurate, and less prone to human error.",
    },
  ];

  return (
    <>
      <FeatureBanner
        title="Website Migrations"
        subtitle="Transform your website migration into a seamless process while preserving SEO and user experience."
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
          mainTitle="Maintain SEO Rankings"
          subTitle="Ensure your website migration doesn’t impact your visibility in search engines."
          features={MaintainSEORankings}
          imageSrc="/assets/images/solutions/Maintain-SEO-Rankings.jpeg"
          imageAlt="Maintain-SEO-Rankings
"
        />
        <FeatureSplitSection
          mainTitle="Bulk 301 Redirects"
          subTitle="Apply multiple redirects efficiently to save time and maintain consistency."
          features={BulkRedirects}
          imageSrc="/assets/images/solutions/Bulk-301-Redirects.jpeg"
          imageAlt="Bulk-301-Redirects"
          reverseOrder={true}
          imageBorderRadius="0px 15px 0px 0px"
        />
        <FeatureSplitSection
          mainTitle="Match Old Pages to New URLs"
          subTitle="Redirect users and search engines smoothly from old pages to new destinations."
          features={MatchOldPages}
          imageSrc="/assets/images/solutions/Match-Old-Pages-New-URLs.jpeg"
          imageAlt="Match-Old-Pages-New-URLs"
          removePaddingBottom={true}
        />
        <TestimonialsSlider marginBottom={"20px"} />
      </Box>
      <FAQSection faqData={faqData} />
    </>
  );
}
