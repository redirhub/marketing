"use client";

import { Box, Heading, Text, Button, Flex } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";

interface Props {
  title: string;
  subtitle?: string;
  buttonTitle?: string;
  buttonLink?: string;
  imageSrc: string;
  background?: string;
  maxWidth?: string;
}

export default function ChooseUsBox({
  title,
  subtitle,
  buttonTitle,
  buttonLink,
  imageSrc,
  background = "#fff",
  maxWidth = "6xl",
}: Props) {
  return (
    <Box
      bg={background}
      borderRadius="xl"
      border="4px solid"
      borderColor="#222B271A"
      maxW={maxWidth}
      mx="auto"
      mt={10}
    >
      {/* Top Section */}
      <Flex
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        align={{ base: "start", md: "center" }}
        px={{ base: 4, md: 8 }}
        pt={{ base: 4, md: 8 }}
        pb={{ base: 1, md: 2 }}
      >
        <Box flex="1">
          <Heading
            fontSize={{ base: "1.9rem", md: "1.9rem" }}
            fontWeight="600"
            color="#000"
            textAlign={"left"}
          >
            {title}
          </Heading>
        </Box>

        {buttonTitle && buttonLink && (
          <Link href={buttonLink}>
            <Button
              mt={{ base: 4, md: 0 }}
              variant="outline"
              borderColor="gray.300"
              p={"10px"}
              borderRadius="md"
              fontSize={"12px"}
              color="#101828"
              letterSpacing={"0.2px"}
              bg="#fff"
              _hover={{ bg: "#16538A00", color: "#1C6DB6" }}
            >
              {buttonTitle}
            </Button>
          </Link>
        )}
      </Flex>

      <Flex
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        align={{ base: "start", md: "center" }}
        mb={6}
        px={{ base: 4, md: 8 }}
      >
        {subtitle && (
          <Text color="gray.600" mt={2} maxW="md" textAlign={"left"}>
            {subtitle}
          </Text>
        )}
      </Flex>
      {/* Image / Table Section */}
      <Box bg="white" borderRadius="lg" p={6}>
        <Image
          src={imageSrc}
          alt={title}
          width={1200}
          height={600}
          style={{
            width: "100%",
            height: "auto",
            borderRadius: "8px",
            border: "1px solid #222B271A",
          }}
        />
      </Box>
    </Box>
  );
}
