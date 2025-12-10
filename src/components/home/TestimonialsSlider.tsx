"use client";

import React from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  Flex,
  Avatar,
  IconButton,
} from "@chakra-ui/react";
import Slider from "react-slick";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import styles from "./Testimonials.module.css";
import { FaQuoteRight } from "react-icons/fa";
import { ImQuotesRight } from "react-icons/im";

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

// Custom arrow components
function CustomPrevArrow(props: any) {
  const { onClick } = props;

  return (
    <IconButton
      aria-label="Previous testimonial"
      onClick={onClick}
      position="absolute"
      top="-80px"
      right="80px"
      zIndex={2}
      bg="white"
      color="blue.600"
      size="lg"
      borderRadius="md"
      boxShadow="md"
      _hover={{ bg: "gray.50", transform: "scale(1.05)" }}
      _active={{ bg: "gray.100" }}
      transition="all 0.2s"
    >
      <ChevronLeftIcon boxSize={6} />
    </IconButton>
  );
}
function CustomNextArrow(props: any) {
  const { onClick } = props;

  return (
    <IconButton
      aria-label="Next testimonial"
      onClick={onClick}
      position="absolute"
      top="-80px"
      right="20px"
      zIndex={2}
      bg="white"
      color="blue.600"
      size="lg"
      borderRadius="md"
      boxShadow="md"
      _hover={{ bg: "gray.50", transform: "scale(1.05)" }}
      _active={{ bg: "gray.100" }}
      transition="all 0.2s"
    >
      <ChevronRightIcon boxSize={6} />
    </IconButton>
  );
}
export default function TestimonialsSlider() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };
  return (
    <Box
      py={{ base: 16, md: 20 }}
      position="relative"
      overflow="hidden"
      borderRadius={{ base: "0", lg: "3xl" }}
      my={{ base: 0, lg: 12 }}
      maxW="7xl"
      mx="auto"
      borderRight={"32px"}
      pl={"100px"}
      className={styles.container}
    >
      <Container maxW="6xl" position="relative">
        <Heading
          as="h2"
          fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
          fontWeight="bold"
          color="white"
          mb={12}
          textAlign="left"
        >
          Why Our Customers Love RedirHub
        </Heading>

        <Box position="relative">
          <Slider {...settings}>
            {testimonials.map((testimonial) => (
              <Box key={testimonial.id} px={4}>
                <Box
                  bg="white"
                  borderRadius="2xl"
                  p={{ base: 8, md: 10 }}
                  boxShadow="xl"
                  w="100%"
                  h="100%"
                >
                  {/* Quote Icon */}
                  <Box
                    as="span"
                    fontSize="6xl"
                    color="blue.200"
                    lineHeight="1"
                    fontFamily="Georgia, serif"
                    display="block"
                    mb={4}
                  >
                    <ImQuotesRight />
                  </Box>

                  {/* Testimonial Text */}
                  <Text
                    fontSize={{ base: "1.4rem", md: "1.4rem" }}
                    fontWeight={400}
                    color="1.4rem"
                    textAlign={"left"}
                    // lineHeight="2.7rem"
                    mb={8}
                  >
                    {testimonial.quote}
                  </Text>

                  {/* Author Info */}
                  <Flex align="center" gap={4}>
                    <Avatar.Root
                      w={"90px"}
                      h="90px"
                      borderRadius={"0"}
                      bg="#fff"
                    >
                      <Avatar.Fallback name={testimonial.name} />
                      <Avatar.Image src={testimonial.avatar} />
                    </Avatar.Root>
                    <Box>
                      <Text
                        fontSize="1.6rem"
                        fontWeight="bold"
                        color="#333"
                        textAlign={"left"}
                      >
                        {testimonial.name}
                      </Text>
                      <Text fontSize="1rem" color="#667085">
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
          overflow: visible !important;
        }

        .slick-track {
          display: flex !important;
        }

        .slick-slide {
          opacity: 0.4;
          transition: opacity 0.3s ease;
        }

        .slick-slide.slick-active {
          opacity: 1;
        }
      `}</style>
    </Box>
  );
}
