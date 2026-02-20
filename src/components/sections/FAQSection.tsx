"use client";

import { Box, Heading } from "@chakra-ui/react";
import { FAQAccordion } from "@/components/home/FAQAccordion";
import { useTranslation } from "react-i18next";
import type { FAQItem } from "@/types/sanity";

interface FAQSectionProps {
  faqs?: FAQItem[] | null;
  backgroundColor?: string;
}

export default function FAQSection({
  faqs,
  backgroundColor = "#F2F4EF"
}: FAQSectionProps) {
  const { t } = useTranslation();

  // Handle null, undefined, or empty arrays
  if (!faqs || faqs.length === 0) {
    return null;
  }

  return (
    <Box
      w="100%"
      pb={{ base: 10, md: 16 }}
      px={{ base: 4, md: 6 }}
      textAlign="center"
      bg={backgroundColor}
    >
      <Heading
        as={"p"}
        fontSize={{ base: "1.5rem", md: "2rem", lg: "3rem" }}
        fontWeight={500}
        color="#344054"
        letterSpacing="0.4px"
        pt={{base: 6, md: 16}}
        mb={16}
      >
          {t("home.faq-title", "Frequently asked questions")}
      </Heading>
      <FAQAccordion items={faqs} />
    </Box>
  );
}
