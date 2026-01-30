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
    title: `${t("meta-domain-parking.title", "Domain Parking")} - ${getAppName()}`,
    description: t(
      "meta.domain-parking.description",
      "Simple, transparent enterprise for RedirHub"
    ),
  };
}

export default async function WebsiteMigrations() {
  const ScaleWithoutLimits = [
    {
      heading: "",
      description:
        "Designed to handle **mass-scale domain portfolios** with high-speed infrastructure",
    },
    {
      heading: "",
      description:
        "**Bulk import, clone,** and manage thousands of redirects in one go",
    },
    {
      heading: "Automated HTTPS",
      description: "for every domain, regardless of scale",
    },
    {
      heading: "",
      description:
        "Purpose-built for **domain parking use cases and high-volume traffic**",
    },
  ];

  const PreserveValue = [
    {
      heading: "",
      description:
        "Ensure all domains redirect to **relevant, working destinations**",
    },
    {
      heading: "",
      description:
        "Protect expired or unused domains from **broken links and lost SEO equity**",
    },
    {
      heading: "",
      description:
        "Serve clean, secure redirects that **pass traffic trust signals**",
    },
    {
      heading: "Avoid browser warnings or downtime",
      description: "with always-on HTTPS and health checks",
    },
  ];

  const OptimizeCosts = [
    {
      heading: "",
      description:
        "No need to maintain your own **servers or DNS infrastructure**",
    },
    {
      heading: "Predictable pricing",
      description: "designed for high-volume redirection",
    },
    {
      heading:
        "Offload traffic filtering, SSL provisioning, and uptime monitoring",
      description: "",
    },
    {
      heading: "Reduce engineering hours",
      description: "spent building and maintaining redirect logic",
    },
  ];
  const RedirectSmarter = [
    {
      heading:
        "Set fallback rules, random redirects, or rotation by region/device",
      description: "",
    },
    {
      heading: "",
      description: "Filter traffic by **path, query, or bot signature**",
    },
    {
      heading: "",
      description:
        "Integrate with **analytics tools** to monitor redirection effectiveness",
    },
    {
      heading: "",
      description:
        "Route parked domains to **ad pages, expired landing pages, or SEO vaults**",
    },
  ];
  const ReliableatAnyVolume = [
    {
      heading: "",
      description: "Global infrastructure with **sub-100ms redirect latency**",
    },
    {
      heading: "Smart failover and load balancing",
      description: "across distributed nodes",
    },
    {
      heading: "Auto-renewing SSL",
      description: "for every domain, with no manual steps",
    },
    {
      heading: "Daily performance monitoring and queue-based domain syncing",
      description: "",
    },
  ];

  const faqData = [
    {
      value: "faq-1",
      question: "How can RedirHub help with domain parking?",
      answer:
        "RedirHub allows you to instantly redirect parked domains to monetized landing pages, affiliate links, or other destinations. Our platform ensures seamless traffic handling without downtime.",
    },
    {
      value: "faq-2",
      question: "Can RedirHub handle high-traffic domain portfolios?",
      answer:
        "Yes. RedirHub’s global edge network can manage millions of hits per day, making it ideal for domain parking businesses with large portfolios or high-traffic domains.",
    },
    {
      value: "faq-3",
      question: "How fast are redirects for parked domains?",
      answer:
        "Redirects are deployed within milliseconds globally, powered by RedirHub’s low-latency infrastructure. Visitors experience instant navigation and improved SEO performance.",
    },
    {
      value: "faq-4",
      question: "Can I manage multiple parked domains efficiently?",
      answer:
        "Absolutely. RedirHub’s dashboard supports bulk redirect management, filtering, and real-time updates, allowing you to handle hundreds or thousands of domains effortlessly.",
    },
    {
      value: "faq-5",
      question: "Can I integrate RedirHub with my existing systems?",
      answer:
        "Yes. RedirHub provides CSV import/export and a robust API, enabling automation, bulk updates, and integration with affiliate networks or domain management tools.",
    },
  ];

  return (
    <>
      <FeatureBanner
        title="Turbocharge your Domain Parking Business with Redirhub"
        subtitle="With RedirHub, you get instant redirects, global infrastructure, and the capacity to handle millions of hits per day. We provide the speed, flexibility, and control your business needs at a fraction of the cost."
        imageSrc="/assets/images/feature/create-redirects.png"
        subtitleWidth={"70%"}
      />

      <Box
        w="100%"
        py={{ base: 14, md: 24 }}
        px={{ base: 2, md: 6 }}
        textAlign="center"
        bg={"#fff"}
      >
        <FeatureSplitSection
          mainTitle="Scale Without Limits"
          subTitle="RedirHub is built to handle portfolios of virtually any size – from a few dozen to hundreds of thousands of domains – without compromising on performance, visibility, or ease of management."
          features={ScaleWithoutLimits}
          imageSrc="/assets/images/solutions/Maintain-SEO-Rankings.jpeg"
          imageAlt="Maintain-SEO-Rankings"
          subTitleWidth="100%"
        />
        <FeatureSplitSection
          mainTitle="Preserve Value"
          subTitle="Ensure your parked domains continue to deliver value by maintaining redirect integrity, SEO trust signals, and a clean user experience across all traffic types."
          features={PreserveValue}
          imageSrc="/assets/images/solutions/UTM-Builder.jpeg"
          imageAlt="UTM-Builder"
          reverseOrder={true}
          subTitleWidth="100%"
          imageBorderRadius="0px 15px 0px 0px"
        />
        <FeatureSplitSection
          mainTitle="Optimize Costs"
          subTitle="Skip the burden of managing internal infrastructure and instead leverage RedirHub’s platform to achieve lower operational overhead and higher ROI on your domain investments."
          features={OptimizeCosts}
          imageSrc="/assets/images/solutions/Optimize-Costs.jpeg"
          imageAlt="Optimize-Costs"
          subTitleWidth="100%"
        />
        <FeatureSplitSection
          mainTitle="Redirect Smarter"
          subTitle="Gain granular control over how domains behave with flexible redirect rules that support monetization strategies, ad traffic rotation, and intelligent fallback logic."
          features={RedirectSmarter}
          imageSrc="/assets/images/solutions/UTM-Builder.jpeg"
          imageAlt="UTM-Builder"
          reverseOrder={true}
          subTitleWidth="100%"
          imageBorderRadius="0px 15px 0px 0px"
        />{" "}
        <FeatureSplitSection
          mainTitle="Reliable at Any Volume"
          subTitle="Whether you manage hundreds or hundreds of thousands of domains, RedirHub’s infrastructure is built to maintain speed, reliability, and security at every level of scale."
          features={ReliableatAnyVolume}
          imageSrc="/assets/images/solutions/Reliable-at-AnyVolume.jpeg"
          imageAlt="Reliable-at-AnyVolume"
          subTitleWidth="100%"
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
