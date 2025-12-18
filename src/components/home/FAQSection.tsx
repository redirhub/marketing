import { Box, Heading } from "@chakra-ui/react";
import { FAQAccordion } from "./FAQAccordion";
interface FAQItem {
  value: string;
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqData: FAQItem[];
}

export default function FAQSection({ faqData }: FAQSectionProps) {
  return (
    <>
      <Box
        w="100%"
        pb={{ base: 10, md: 16 }}
        px={{ base: 4, md: 6 }}
        textAlign="center"
        bg={"#F2F4EF"}
      >
        <Heading
          fontSize={{ base: "2rem", md: "3rem" }}
          fontWeight={500}
          color="#344054"
          letterSpacing="0.4px"
          mt={20}
          mb={16}
        >
          Frequently asked questions
        </Heading>
        <FAQAccordion items={faqData} />
      </Box>
    </>
  );
}
