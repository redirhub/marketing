"use client";

import {
  Box,
  Container,
  Heading,
  Text,
  Flex,
  Avatar,
  IconButton,
} from "@chakra-ui/react";
import { useState } from "react";
import Slider from "react-slick";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import styles from "./Testimonials.module.css";
import Image from "next/image";

const testimonials = [
  {
    id: 1,
    quote: `“I’ve been using this for a while, and it’s great—easy to manage and track URLs with no hassle. Simple, reliable, and effective.”	`,
    name: "Chris Panton",
    role: "Building world's best Ecom market",
    avatar: "/assets/images/TestimonialsSlider/test-1.svg",
  },
  {
    id: 2,
    quote: `It works like a charm, redirecting domain names with SSL is a huge pain. I have to do it frequently, often at mass and it was hours of work. Now it is few clicks.`,
    name: "Zsolt Bikadi",
    role: "",
    avatar: "/assets/images/TestimonialsSlider/test-2.jpeg",
  },
  {
    id: 3,
    quote: `Extremely easy to set up and reporting on redirects that have never had access to before. Easier to sleep now knowing that if a redirect link ever gets broken I will be notified via email.5 tacos PLUS on this one`,
    name: "InSearchOf",
    role: "",
    avatar: "/assets/images/TestimonialsSlider/test-3.jpeg",
  },
  {
    id: 4,
    quote: `“Great tool for redirecting domains with https, without the additional cost of a cert. Simple to setup and it walks you through each step. No guessing what needs to be done!”`,
    name: "MarketedPotential",
    role: "",
    avatar: "/assets/images/TestimonialsSlider/test-4.png",
  },
];

function CustomPrevArrow(props: any) {
  const { onClick, currentSlide, className } = props;
  const isSlickDisabled = className?.includes("slick-disabled");
  const isDisabled = isSlickDisabled || currentSlide === 0;

  return (
    <IconButton
      aria-label="Previous testimonial"
      display="inline-flex"
      onClick={onClick}
      disabled={isDisabled}
      position="absolute"
      top={{ base: "-60px", md: "-80px" }}
      right={{ base: "85px", md: "105px" }}
      zIndex={2}
      bg={isDisabled ? "rgba(255, 255, 255, 0.4)" : "rgba(255, 255, 255, 0.84)"}
      color="#344054"
      size={{ base: "md", md: "lg" }}
      border={isDisabled ? "1px solid rgba(255, 255, 255, 0.24)" : "1px solid rgba(255, 255, 255, 0.72)"}
      borderRadius="12px"
      _hover={{
        bg: isDisabled ? "rgba(255, 255, 255, 0.4)" : "white",
      }}
      _disabled={{
        opacity: 0.5,
        cursor: "not-allowed",
      }}
      transition="all 0.2s"
    >
      <ChevronLeftIcon boxSize={6} />
    </IconButton>
  );
}

function CustomNextArrow(props: any) {
  const { onClick, className } = props;
  const isSlickDisabled = className?.includes("slick-disabled");
  const isDisabled = isSlickDisabled;

  return (
    <IconButton
      display="inline-flex"
      aria-label="Next testimonial"
      onClick={onClick}
      disabled={isDisabled}
      position="absolute"
      top={{ base: "-60px", md: "-80px" }}
      right={{ base: "25px", md: "45px" }}
      zIndex={2}
      bg={isDisabled ? "rgba(255, 255, 255, 0.4)" : "rgba(255, 255, 255, 0.84)"}
      color="#344054"
      border={isDisabled ? "1px solid rgba(255, 255, 255, 0.24)" : "1px solid rgba(255, 255, 255, 0.72)"}
      size={{ base: "md", md: "lg" }}
      borderRadius="12px"
      _hover={{
        bg: isDisabled ? "rgba(255, 255, 255, 0.4)" : "white",
      }}
      _disabled={{
        opacity: 0.5,
        cursor: "not-allowed",
      }}
      transition="all 0.2s"
    >
      <ChevronRightIcon boxSize={6} />
    </IconButton>
  );
}

interface Props {
  marginBottom?: string;
}

export default function TestimonialsSlider({ marginBottom }: Props) {
  const [, setCurrentSlide] = useState(0);
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1.5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    afterChange: (current: number) => setCurrentSlide(current),
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1.2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1.1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const baseVerticalPadding = { base: '34px', md: '44px', lg: '60px' };
  const baseVerticalMargin = { base: 0, md: 8, lg: 14 };
  return (
    <Box
      py={baseVerticalPadding}
      position="relative"
      overflow="hidden"
      borderRadius={"32px"}
      mt={baseVerticalMargin}
      mb={marginBottom ? marginBottom : baseVerticalMargin}
      maxW="7xl"
      mx="auto"
      className={styles.container}
    >
      <Container
        position="relative"
        className="testimonials-container"
      >
        <Heading
          as="h2"
          fontSize={{ base: "24px", md: "34px", lg: "40px" }}
          fontWeight={600}
          color="rgba(255, 255, 255, 0.88)"
          mb={{ base: 6, md: 12 }}
          pl={{ base: "25px", md: "45px" }}
          pr={{ base: "110px", md: "110px", lg: "0px" }}
          textAlign="left"
        >
          Why Our Customers Love{" "}
          <Text as="span" color={'#FFFFFF'} fontSize={{ base: "24px", md: "34px", lg: "40px" }} fontWeight={800}>
            RedirHub
          </Text>
        </Heading>

        <Box position="relative">
          <Slider {...settings}>
            {testimonials.map((testimonial, index) => (
              <Box
                key={testimonial.id}
                px={3}
                pl={index === 0 ? { base: "25px", md: "45px" } : 3}
                pr={index === testimonials.length - 1 ? { base: "25px", md: "45px" } : 3}
              >
                <Box
                  className="testimonial-card"
                  borderRadius="30px"
                  p={{ base: 6, md: 8 }}
                  w="100%"
                  overflowX={'auto'}
                  height="100%"
                  minH="386px"
                  maxH={'386px'}
                  display="flex"
                  flexDirection="column"
                  justifyContent="space-between"
                >
                  <Box flex="1" display="flex" flexDirection="column">
                    <Box>
                      <Image
                        src="/assets/images/format-quote.png"
                        alt="Quote"
                        width={60}
                        height={60}
                      />
                    </Box>

                    <Box flex="1" display="flex" alignItems="center" pt={-2}>
                      <Text
                        fontSize={{ base: "18px", md: "22px", lg: "26px" }}
                        fontWeight={500}
                        textAlign={"left"}
                        fontFamily={"Inter"}
                        color="#344054"
                        lineHeight={{ base: "140%", md: "160%" }}
                        fontStyle={"italic"}
                      >
                        {testimonial.quote}
                      </Text>
                    </Box>
                  </Box>

                  <Flex gap={4} align="center">
                    <Avatar.Root w={"90px"} h="90px" borderRadius={"12px"}>
                      <Avatar.Fallback name={testimonial.name} />
                      <Avatar.Image
                        src={testimonial.avatar}
                        style={{ borderRadius: "12px" }}
                      />
                    </Avatar.Root>
                    <Box>
                      <Text
                        fontSize={{ base: "1.1rem", md: "1.2rem" }}
                        fontWeight="700"
                        color="#101828"
                        textAlign={'left'}
                      >
                        {testimonial.name}
                      </Text>
                      <Text fontSize="0.95rem" color="#667085">
                        {testimonial.role}
                      </Text>
                    </Box>
                  </Flex>
                </Box>
              </Box>
            ))}
          </Slider>
        </Box>
      </Container>

      {/* Custom CSS for slider */}
      <style jsx global>{`
        .slick-slider {
          position: relative;
        }

        .slick-list {
          overflow: hidden !important;
        }

        .slick-track {
          display: flex !important;
        }

        .slick-slide {
          transition: all 0.3s ease;
        }

        .slick-slide .testimonial-card {
           background: rgba(255, 255, 255, 0.7) !important;
           backdrop-filter: blur(4px);
           transition: all 0.3s ease;
        }

        .slick-slide.slick-current .testimonial-card {
           background: #ffffff !important;
           backdrop-filter: none;
        }
        @media (max-width: 768px) {
          .slick-list {
            overflow: hidden !important;
          }
        }
      `}</style>
    </Box>
  );
}
