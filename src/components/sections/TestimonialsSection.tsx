import TestimonialsSlider from "@/components/home/TestimonialsSlider";
import { Box } from "@chakra-ui/react";
import {
  getTestimonials,
  formatTestimonialForSlider,
} from "@/lib/sanity/testimonials";

interface TestimonialsSectionProps {
  locale?: string;
  marginTop?: string | number | object;
  marginBottom?: string | number | object;
}

export default async function TestimonialsSection({
  locale = "en",
  marginTop = 12,
  marginBottom = 0,
}: TestimonialsSectionProps) {
  // Fetch testimonials from Sanity CMS
  const testimonialsData = await getTestimonials(locale);

  // Format for slider component
  const testimonials = testimonialsData.map(formatTestimonialForSlider);

  // Fallback if no testimonials found
  if (testimonials.length === 0) {
    return null;
  }

  return (
    <Box w="100%" px={{ base: 2, md: 2, lg: 0 }} mt={marginTop}>
      <TestimonialsSlider
        testimonials={testimonials}
        marginBottom={marginBottom}
      />
    </Box>
  );
}
