"use client";

import { Image, Box } from "@chakra-ui/react";
import dynamic from "next/dynamic";

const Slider = dynamic(() => import("react-slick"), { ssr: false });

const UNIQUE_LOGOS = [
  { id: 1, src: "/assets/images/hero-logs/company-1.png", alt: "Schi" },
  { id: 2, src: "/assets/images/hero-logs/company-2.png", alt: "Duende" },
  { id: 3, src: "/assets/images/hero-logs/company-3.png", alt: "Ally" },
  { id: 4, src: "/assets/images/hero-logs/company-4.png", alt: "Serb" },
  { id: 5, src: "/assets/images/hero-logs/company-5.png", alt: "Expiredomain" },
];

// Duplicate for infinite slider
const LOGOS = [...UNIQUE_LOGOS, ...UNIQUE_LOGOS];

interface CustomerLogosSectionProps {
  paddingY?: string | number | object;
  marginY?: string | number | object;
}

export default function CustomerLogosSection({
  paddingY = { base: 1, md: 2, lg: 4 },
  marginY = { base: 1, md: 2, lg: 4 }
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
    <Box py={paddingY} my={marginY} maxW={'1188px'} mx="auto">
      {/* Mobile: static 3-column grid showing all logos at once */}
      <Box
        display={{ base: "grid", md: "none" }}
        gridTemplateColumns="repeat(3, 1fr)"
        gap={4}
        px={2}
      >
        {UNIQUE_LOGOS.map((logo) => (
          <Box
            key={logo.id}
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="70px"
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              h="50px"
              maxW="100px"
              objectFit="contain"
            />
          </Box>
        ))}
      </Box>

      {/* Tablet/desktop: auto-playing slider */}
      <Box display={{ base: "none", md: "block" }}>
        <Slider {...settings}>
          {LOGOS.map((logo, index) => (
            <Box key={logo.alt + "-" + index} px={4}>
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
                  maxW={{ base: "100px", md: "125px", lg: "150px" }}
                  objectFit="contain"
                />
              </Box>
            </Box>
          ))}
        </Slider>
      </Box>
    </Box>
  );
}
