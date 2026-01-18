"use client";

import TestimonialsSlider from "@/components/home/TestimonialsSlider";
import { Box } from "@chakra-ui/react";

interface TestimonialsSectionProps {
  marginTop?: string | number | object;
  marginBottom?: string | number | object;
}

export default function TestimonialsSection({
  marginTop = 12,
  marginBottom = "0"
}: TestimonialsSectionProps) {
  return (
    <Box
      w="100%"
      px={{ base: 2, md: 2, lg: 0 }}
      mt={marginTop}
    >
      <TestimonialsSlider marginBottom={marginBottom} />
    </Box>
  );
}
