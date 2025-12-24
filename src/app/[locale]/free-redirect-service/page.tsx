import { Metadata } from "next";
import { Box } from "@chakra-ui/react";
import initTranslations from "@/lib/i18n";
import { getAppName } from "@/lib/utils/constants";
import { ServiceInfoCard } from "@/components/share/ServiceInfoCard";
import FAQSection from "@/components/home/FAQSection";
import TestimonialsSlider from "@/components/home/TestimonialsSlider";
import FooterPagesBanner from "@/components/share/banners/footerPages/FooterPagesBanner";
import TextBox from "@/components/free-redirect-service/TextBox";
import PricingPlan from "@/components/free-redirect-service/PricingPlan";

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
    title: `${t("meta.domain-and-url-redirect-service-title", "Domain and URL redirect service")} - ${getAppName()}`,
    description: t(
      "meta.domain-and-url-redirect-service.description",
      "Simple, transparent enterprise for RedirHub"
    ),
  };
}

export default async function AnalyzeRedirects() {
  const faqData = [
    {
      value: "faq-1",
      question: "What is a URL redirect?",
      answer:
        "A URL redirect, also known as URL forwarding, is a technique used to send users from one URL to another automatically. It’s commonly used for website migrations, marketing campaigns, and fixing broken links.",
    },
    {
      value: "faq-2",
      question: "How do I redirect a URL?",
      answer:
        "You can redirect a URL by configuring your server, using a redirection service like RedirHub, or adding redirect rules through your website's CMS or hosting provider.",
    },
    {
      value: "faq-3",
      question: "What are examples of URL redirection?",
      answer: `
    <p style="margin-bottom: 10px;">Examples include:</p>
    <ul style="margin-left: 20px; list-style-type: disc;">
      <li>Redirecting <u>oldwebsite.com</u> to <u>newwebsite.com</u>.</li>
      <li>Redirecting <u>example.com/page</u> to <u>example.com/new-page</u>.</li>
      <li>Shortened links like bit.ly/redirect redirecting to a full URL.</li>
    </ul>
  `,
    },
    {
      value: "faq-4",
      question: "What is the best way to manage URL redirects?",
      answer:
        "Using a dedicated tool like RedirHub ensures that your redirects are efficient, properly tracked, and easily managed—without any technical complexity. With out-of-the-box HTTPS support, advanced analytics, and a blazing-fast edge network, RedirHub offers a seamless, secure experience for your redirection needs.",
    },
    {
      value: "faq-5",
      question: "Can URL redirects affect SEO?",
      answer:
        "Yes, improper redirects can harm SEO. Use 301 redirects for permanent changes and 302 for temporary ones to ensure search engines index your content correctly.",
    },
    {
      value: "faq-6",
      question: "What tools are best for managing large-scale URL redirects?",
      answer:
        "Tools like RedirHub offer advanced management capabilities, including bulk redirect handling, automated workflows, comprehensive analytics, and seamless HTTPS support—all designed to streamline high-volume redirection projects with ease and security.",
    },
  ];
  return (
    <>
      <FooterPagesBanner
        title="Free URL Redirect Service"
        subtitle="Create redirects and try out our features at no cost with RedirHub’s"
        subtitleWidth="100%"
      />
      <PricingPlan />

      <Box bg="#fff">
        <Box
          w="100%"
          pt={{ base: 14, md: 20 }}
          px={{ base: 2, md: 6 }}
          textAlign="center"
          maxW="6xl"
          mx="auto"
        >
          <ServiceInfoCard
            title="Free URL redirect service"
            details="Create redirects for free with RedirHub’s powerful URL redirection service. Say goodbye to confusing pricing plans and hello to a simple, effective solution for managing your website’s URLs. Join thousands of happy users and start redirecting your URLs for free today!"
          />{" "}
          <ServiceInfoCard
            title="What is a URL redirect service?"
            details="A redirect service is a tool that allows you to send your website visitors to a different URL than the one they initially clicked on. It is useful for many reasons, such as when you change the URL of a page on your website, or when you want to send users to an affiliate link. With a redirect service like RedirHub, you can easily manage all of your URL redirection needs in one place."
          />{" "}
          <ServiceInfoCard
            title="Why do we offer free redirect service?"
            details="We believe in giving all users the opportunity to experience the power of our URL management solution. With our free plan, you can create a redirect and see for yourself how easy it is to use and how it can benefit your business."
          />
        </Box>
      </Box>
      <Box
        w="100%"
        py={{ base: 14, md: 12 }}
        px={{ base: 2, md: 6 }}
        textAlign="center"
        bg={"#fff"}
      >
        <TestimonialsSlider marginBottom={"25px"} />
      </Box>
      <TextBox />
      <FAQSection faqData={faqData} />
    </>
  );
}
