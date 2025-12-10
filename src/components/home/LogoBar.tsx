"use client";

import { Image, Box } from "@chakra-ui/react";
import dynamic from "next/dynamic";

const Slider = dynamic(() => import("react-slick"), { ssr: false });
const LOGOS = [
  { id: 1, src: "/assets/images/hero-logs/company-1.png", alt: "A" },
  { id: 2, src: "/assets/images/hero-logs/company-2.png", alt: "B" },
  { id: 3, src: "/assets/images/hero-logs/company-3.png", alt: "C" },
  { id: 4, src: "/assets/images/hero-logs/company-1.png", alt: "D" },
  { id: 5, src: "/assets/images/hero-logs/company-2.png", alt: "E" },
  { id: 6, src: "/assets/images/hero-logs/company-3.png", alt: "F" },
  { id: 7, src: "/assets/images/hero-logs/company-1.png", alt: "G" },
  { id: 8, src: "/assets/images/hero-logs/company-2.png", alt: "H" },
];

const LogoBar = () => {
  const settings = {
    // Basic Slider Settings
    dots: false,
    arrows: false,
    slidesToScroll: 1,
    slidesToShow: 5,
    pauseOnHover: true,

    // Add these autoplay settings:
    autoplay: true,
    autoplaySpeed: 3000, // Change slides every 2 seconds
    speed: 900, // Transition speed in milliseconds
    infinite: true, // Loop continuously

    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  };
  return (
    <Box py={{ base: 6, md: 16 }}>
      <Slider {...settings}>
        {LOGOS.map((logo, index) => (
          <Box key={logo.id + "-" + index}>
            <Box
              p={{ base: 2, md: 4 }}
              // opacity={0.6}
              display="flex !important"
              alignItems="center"
              justifyContent="center"
              height="80px"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                maxH={{ base: "60px", md: "50px" }}
                maxW="100%"
                objectFit="contain"
              />
            </Box>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default LogoBar;
