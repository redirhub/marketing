import { FAQAccordion } from "./FAQAccordion";
interface FAQItem {
  value: string;
  question: string;
  answer: string;
}

export default function FAQSection() {
  const faqData: FAQItem[] = [
    {
      value: "faq-1", // Unique value for each item
      question: "What is a redirect, and what domains can I use with RedirHub?",
      answer:
        "A redirect automatically sends visitors from one URL to another. With RedirHub, you can use any domain you own to create redirects. Our platform supports all top-level domains (TLDs) and provides seamless redirect management for your websites.",
    },
    {
      value: "faq-2",
      question: "What is RedirHub and how does it work?",
      answer:
        "RedirHub is a powerful redirect management platform that allows you to create, manage, and monitor URL redirects effortlessly. Simply add your domain, set up your redirect rules, and our global network handles the rest with lightning-fast performance.",
    },
    {
      value: "faq-3",
      question: "How fast are RedirHub's redirects?",
      answer:
        "RedirHub's redirects are extremely fast, typically completing in under 50ms. Our global CDN network ensures low latency worldwide, with edge servers strategically positioned to provide optimal performance no matter where your visitors are located.",
    },
    {
      value: "faq-4",
      question: "Does RedirHub support HTTPS for every domain?",
      answer:
        "Yes! RedirHub automatically provisions and manages SSL/TLS certificates for all domains using Let's Encrypt. Your redirects are always secure with HTTPS, protecting your users and maintaining SEO rankings.",
    },
    {
      value: "faq-5",
      question: "Can I change my redirect destination at any time?",
      answer:
        "Absolutely! You can update your redirect destinations anytime through our intuitive dashboard. Changes take effect immediately across our global network, giving you complete flexibility to manage your redirects without any downtime.",
    },
    {
      value: "faq-6",
      question:
        "Is RedirHub suitable for SEO, domain migration, and IT redirection?",
      answer:
        "Yes, RedirHub is perfect for all these use cases. We support proper 301 (permanent) and 302 (temporary) redirects, preserve SEO value during domain migrations, and provide enterprise-grade reliability for IT infrastructure redirection needs.",
    },
  ];

  return <FAQAccordion items={faqData} />;
}
