"use client";

import { Image, Box } from "@chakra-ui/react";
import dynamic from "next/dynamic";

const Slider = dynamic(() => import("react-slick"), { ssr: false });

const LOGOS = [
  { id: 1, src: "/assets/images/hero-logs/company-2.png", alt: "A" },
  { id: 2, src: "/assets/images/hero-logs/company-1.png", alt: "B" },
  { id: 3, src: "/assets/images/hero-logs/company-3.png", alt: "C" },
  { id: 4, src: "/assets/images/hero-logs/company-4.png", alt: "D" },
  { id: 5, src: "/assets/images/hero-logs/company-5.png", alt: "E" },
  { id: 6, src: "/assets/images/hero-logs/company-2.png", alt: "F" },
  { id: 7, src: "/assets/images/hero-logs/company-1.png", alt: "G" },
  { id: 8, src: "/assets/images/hero-logs/company-3.png", alt: "H" },
];

interface CustomerLogosSectionProps {
  paddingY?: string | number | object;
}

export default function CustomerLogosSection({
  paddingY = { base: 6, md: 10, lg: 16 }
}: CustomerLogosSectionProps) {
  const settings = {
    // Basic Slider Settings
    dots: false,
    arrows: false,
    slidesToScroll: 1,
    slidesToShow: 5,
    pauseOnHover: true,

    // Add these autoplay settings:
    autoplay: true,
    autoplaySpeed: 3000, // Change slides every 3 seconds
    speed: 900, // Transition speed in milliseconds
    infinite: true, // Loop continuously

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <Box py={paddingY} maxW={'1200px'} mx="auto">
      <Slider {...settings}>
        {LOGOS.map((logo, index) => (
          <Box key={logo.id + "-" + index} px={4}>
            <Box
              display="flex !important"
              alignItems="center"
              justifyContent="center"
              height="80px"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                h={{ base: "60px", lg: "100px" }}
                maxW={{ base: "100px", md: "125px", lg: "160px" }}
                objectFit="contain"
              />
            </Box>
          </Box>
        ))}
      </Slider>
    </Box>
  );
}
