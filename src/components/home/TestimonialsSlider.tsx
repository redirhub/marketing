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
import Slider from "react-slick";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import styles from "./Testimonials.module.css";
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

function CustomPrevArrow(props: any) {
  const { onClick } = props;

  return (
    <IconButton
      aria-label="Previous testimonial"
      display={{ base: "none", md: "none", lg: "inline-flex" }}
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
      display={{ base: "none", md: "none", lg: "inline-flex" }}
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

interface Props {
  marginBottom?: string;
}

export default function TestimonialsSlider({ marginBottom }: Props) {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  const baseVerticalPadding = { base: 10, md: 14, lg: 24 };
  const baseVerticalMargin = { base: 0, md: 8, lg: 14 };
  return (
    <Box
      py={baseVerticalPadding}
      position="relative"
      overflow="hidden"
      borderRadius={{ base: "3xl", lg: "3xl" }}
      mt={baseVerticalMargin}
      mb={marginBottom ? marginBottom : baseVerticalMargin}
      maxW="7xl"
      mx="auto"
      borderRight={"32px"}
      pl={{ base: 0, md: "10px", lg: "100px" }}
      className={styles.container}
    >
      <Container
        maxW="6xl"
        position="relative"
        className="testimonials-controiner"
      >
        <Heading
          as="h2"
          fontSize={{ base: "1rem", md: "2.2rem", lg: "2.5rem" }}
          fontWeight={500}
          color="white"
          mb={{ base: 4, md: 12 }}
          textAlign={{ base: "center", md: "center", lg: "left" }}
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

                  <Text
                    fontSize={{ base: "1rem", md: "1.4rem" }}
                    fontWeight={400}
                    color="1.4rem"
                    textAlign={"left"}
                    mb={8}
                  >
                    {testimonial.quote}
                  </Text>

                  <Flex
                    gap={4}
                    direction={{ base: "column", md: "row" }}
                    align={{ base: "center", md: "center" }}
                    justify={{ base: "center", md: "flex-start" }}
                  >
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
                        fontSize={{ base: "1rem", md: "1.6rem" }}
                        fontWeight="bold"
                        color="#333"
                        textAlign={{ base: "center", md: "left" }}
                      >
                        {testimonial.name}
                      </Text>
                      <Text
                        fontSize="1rem"
                        color="#667085"
                        textAlign={{ base: "center", md: "left" }}
                      >
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
        @media (max-width: 768px) {
          .slick-list {
            overflow: hidden !important;
          }
        }
      `}</style>
    </Box>
  );
}
