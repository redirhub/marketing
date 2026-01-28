import { Box, Heading } from "@chakra-ui/react";
import { FAQAccordion } from "@/components/home/FAQAccordion";

interface FAQItem {
  value: string;
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqData: FAQItem[];
  title?: string;
  backgroundColor?: string;
}

export default function FAQSection({
  faqData,
  title = "Frequently asked questions",
  backgroundColor = "#F2F4EF"
}: FAQSectionProps) {
  if (!faqData || faqData.length === 0) {
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
        {title}
      </Heading>
      <FAQAccordion items={faqData} />
    </Box>
  );
}
