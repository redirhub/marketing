"use client";

import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Button,
  Stack,
} from "@chakra-ui/react";
import FrameImage from "./FrameImage";
import Link from "next/link";
import { GoCheckCircle } from "react-icons/go";
import { URL_DASHBOARD_REGISTER } from "@/lib/utils/constants";

interface FeatureListItemProps {
  heading: string;
  description: string;
}
const FeatureListItem: React.FC<FeatureListItemProps> = ({
  heading,
  description,
}) => {
  const renderBoldText = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <Text as="span" fontWeight="700" color="#222B27" key={index}>
            {part.slice(2, -2)}
          </Text>
        );
      }
      return part;
    });
  };
  return (
    <>
      <Box as="li" display="flex" gap={2} listStyleType="none">
        <Box
          flexShrink={0}
          fontSize={{ base: "16px", md: "16px" }}
          mt={{ base: "5px", md: "4px" }}
          color="#E49426"
        >
          <GoCheckCircle />
        </Box>
        <Box textAlign="left">
          {heading && (
            <Text
              as="span"
              fontSize="1rem"
              fontWeight="700"
              color="#222b27"
              letterSpacing={"0.2px"}
            >
              {heading}{" "}
            </Text>
          )}
          <Text
            as="span"
            fontSize="1rem"
            color="#222B27"
            display="inline"
            letterSpacing={"0.2px"}
          >
            {renderBoldText(description)}
          </Text>{" "}
        </Box>
      </Box>
    </>
  );
};

const ActionButton: React.FC<
  React.ComponentProps<typeof Button> & {
    label: string;
    isPrimary?: boolean;
    href?: string;
  }
> = ({ label, isPrimary = false, href = "#", ...rest }) => {
  return (
    <Box w={{ base: "100%", md: "auto" }}>
      <Link href={href} target={isPrimary ? "_blank" : undefined}>
        <Button
          variant={isPrimary ? "primary" : "secondary"}
          px="24px"
          py="12px"
          fontSize="1rem"
          w={{ base: "full", md: "auto" }}
          {...rest}
        >
          {label}
        </Button>
      </Link>
    </Box>
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
  imageWidth?: string;
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
  imageWidth = "478px",
}: FeatureSplitSectionProps) {
  // Determine the grid order based on the reverseOrder prop
  const listOrder = reverseOrder ? 2 : 1;
  const imageOrder = reverseOrder ? 1 : 2;

  // FIX: Dynamically determine the column ratio based on the reverseOrder prop
  const gridTemplateColumns = reverseOrder
    ? "5.7fr 4.3fr" // Reversed: Image (55%) then List (45%)
    : "4.3fr 5.7fr"; // Normal: List (45%) then Image (55%)
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
              fontSize={{ base: "1.4rem", md: "2rem", lg: "2.6rem" }}
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
              w={{ base: "100%", md: subTitleWidth ? subTitleWidth : "50%" }}
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
          mt={{ base: 0, md: 4 }}
          bg="white"
          borderRadius="12px"
          pt={{ base: "28px", md: "48px" }}
          pb={{ base: "28px", md: "0" }}
          pl={{ base: "15px", lg: reverseOrder ? "0px" : "32px" }}
          pr={{ base: "15px", lg: !reverseOrder ? "0px" : "32px" }}
          border={"4px solid"}
          borderColor={"#EAECF0"}
        >
          <SimpleGrid
            columns={{ base: 1, md: 1, lg: 2 }}
            gap={{ base: 4, md: 10 }}
            alignItems="center"
            templateColumns={{
              base: "1fr", // On small screens (base), use a single column (1 fraction)
              lg: gridTemplateColumns, // On large screens (lg), allocate 4 parts to the text, 6 parts to the image (40% / 60%)
            }}
          >
            <Box textAlign="left" order={{ base: 1, lg: listOrder }}>
              <Box as="ul" pl={0} color="#667085" display="grid" rowGap={4}>
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
                my={8}
              >
                <ActionButton
                  label="Get Started For Free"
                  isPrimary
                  href={URL_DASHBOARD_REGISTER}
                />
              </Stack>
            </Box>

            <Box
              w="100%"
              h={"auto"}
              order={{ base: -1, lg: imageOrder }}
              mr={!reverseOrder ? { base: 0, lg: "-32px" } : 0}
            >
              <FrameImage src={imageSrc} alt={imageAlt} />
            </Box>
          </SimpleGrid>
        </Box>
      </Box>
    </>
  );
}
