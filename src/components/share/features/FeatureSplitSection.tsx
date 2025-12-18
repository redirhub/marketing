"use client";

import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Button,
  Stack,
} from "@chakra-ui/react";
import Link from "next/link";
import { PiCheckCircleFill } from "react-icons/pi";
import Image from "next/image";

interface FeatureListItemProps {
  heading: string;
  description: string;
}
const FeatureListItem: React.FC<FeatureListItemProps> = ({
  heading,
  description,
}) => (
  <Box as="li" display="flex" gap={2} listStyleType="none">
    <Box
      flexShrink={0}
      fontSize={{ base: "1.5rem", md: "1.75rem" }}
      mt={{ base: "1px", md: "2px" }}
      color="#E49426"
    >
      <PiCheckCircleFill />
    </Box>
    <Box textAlign="left">
      <Text as="span" fontSize="sm" fontWeight="700" color="#222B27">
        {heading}
      </Text>{" "}
      <Text as="span" fontSize="1rem" color="#222B27" display="inline">
        {description}
      </Text>
    </Box>
  </Box>
);

const ActionButton: React.FC<
  React.ComponentProps<typeof Button> & {
    label: string;
    isPrimary?: boolean;
    href?: string;
  }
> = ({ label, isPrimary = false, href = "#", ...rest }) => {
  const primaryStyles = {
    bg: "#E49426",
    color: "white",
    _hover: { bg: "#C78121", transform: "translateY(-2px)", boxShadow: "lg" },
  };
  const secondaryStyles = {
    bg: "#fff",
    color: "#16538A",
    border: "1px solid #222B271A",
    _hover: {
      bg: "#16538A",
      color: "#fff",
      transform: "translateY(-2px)",
      boxShadow: "lg",
    },
  };

  return (
    <Link href={href} target={isPrimary ? "_blank" : undefined}>
      <Button
        px="24px"
        py="12px"
        fontSize="1rem"
        fontWeight="normal"
        borderRadius="8px"
        transition="all 0.2s"
        _active={{ transform: "translateY(0)" }}
        w={{ base: "full", sm: "auto" }}
        {...(isPrimary ? primaryStyles : secondaryStyles)}
        {...rest}
      >
        {label}
      </Button>
    </Link>
  );
};

interface FeatureSplitSectionProps {
  mainTitle: string;
  subTitle: string;
  features: FeatureListItemProps[];
  imageSrc: string;
  imageAlt: string;
  reverseOrder?: boolean;
  buttonLabel?: string;
  buttonHref?: string;
  subTitleWidth?: string;
}
export default function FeatureSplitSection({
  mainTitle,
  subTitle,
  features,
  imageSrc,
  imageAlt,
  buttonLabel,
  buttonHref,
  reverseOrder = false,
  subTitleWidth = "",
}: FeatureSplitSectionProps) {
  // Determine the grid order based on the reverseOrder prop
  const listOrder = reverseOrder ? 2 : 1;
  const imageOrder = reverseOrder ? 1 : 2;

  // FIX: Dynamically determine the column ratio based on the reverseOrder prop
  const gridTemplateColumns = reverseOrder
    ? "5.5fr 4.5fr" // Reversed: Image (55%) then List (45%)
    : "4.5fr 5.5fr"; // Normal: List (45%) then Image (55%)
  return (
    <>
      <Box
        w="100%"
        pb={{ base: 14, md: 36 }}
        pt={0}
        px={{ base: 2, md: 6 }}
        textAlign="center"
        bg={"#fff"}
      >
        <Box w="100%" maxW="7xl" mx="auto" textAlign="center" mb={10}>
          <Box w="100%" maxW="7xl" mx="auto" textAlign="center">
            <Heading
              fontSize={{ base: "1.4rem", md: "2rem", lg: "3rem" }}
              lineHeight={{ base: "1.4rem", md: "3rem" }}
              fontWeight={500}
              color="#344054"
              letterSpacing="0.4px"
              mb="20px"
            >
              {mainTitle}
            </Heading>
            <Text
              fontSize={{ base: "1rem", md: "1rem" }}
              color="#667085"
              letterSpacing={"0.2px"}
              mb={"12px"}
              w={{ base: "98%", md: subTitleWidth ? subTitleWidth : "50%" }}
              mx={"auto"}
            >
              {subTitle}
            </Text>
          </Box>
        </Box>

        <Box
          w="100%"
          maxW="7xl"
          mx="auto"
          mt={4}
          bg="white"
          borderRadius="12px"
          pt="40px"
          pb="0px"
          pl={{ base: "0px", lg: reverseOrder ? "0px" : "32px" }}
          pr={{ base: "0px", lg: !reverseOrder ? "0px" : "32px" }}
          border={"4px solid"}
          borderColor={"#EAECF0"}
        >
          <SimpleGrid
            columns={{ base: 1, md: 1, lg: 2 }}
            gap={8}
            alignItems="center"
            templateColumns={{
              base: "1fr", // On small screens (base), use a single column (1 fraction)
              lg: gridTemplateColumns, // On large screens (lg), allocate 4 parts to the text, 6 parts to the image (40% / 60%)
            }}
          >
            <Box textAlign="left" order={{ base: 1, lg: listOrder }}>
              <Box as="ul" pl={0} color="#667085" display="grid" rowGap={3}>
                {features.map((feature, index) => (
                  <FeatureListItem
                    key={index}
                    heading={feature.heading}
                    description={feature.description}
                  />
                ))}
              </Box>
              <Stack
                direction={{ base: "column", sm: "row" }}
                gap={4}
                align="center"
                mt={8}
              >
                <ActionButton
                  label="Get Started For Free"
                  isPrimary
                  href="https://dash.redirhub.com/register"
                />
              </Stack>
            </Box>

            <Box
              w="100%"
              h="100%"
              display="flex"
              alignItems="center"
              justifyContent="center"
              order={{ base: -1, lg: imageOrder }}
              mr={!reverseOrder ? { base: 0, lg: "-32px" } : 0}
            >
              {/* <Box
                w="100%"
                h={{ base: "300px", md: "483px" }}
                position="relative"
                borderRadius="8px"
                overflow="hidden"
              > */}
              <Image
                src={imageSrc}
                alt={imageAlt}
                width={620}
                // fill
                height={420}
                style={{
                  // objectFit: "cover",
                  width: "100%",
                  height: "100%",
                }}
              />
              {/* </Box> */}
            </Box>
          </SimpleGrid>
        </Box>
      </Box>
    </>
  );
}
