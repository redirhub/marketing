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
      mt={{ base: 4, md: 10 }}
    >
      <Flex
        direction={{ base: "column", md: "column", lg: "row" }}
        justify="space-between"
        align={{ base: "start", md: "start", lg: "center" }}
        px={{ base: 4, md: 8 }}
        pt={{ base: 4, md: 8 }}
        pb={{ base: 1, md: 2 }}
        wrap="wrap"
      >
        <Box flex="1" order={{ base: 1, md: 1 }}>
          <Heading
            fontSize={{ base: "1rem", md: "1.2rem", lg: "1.5rem" }}
            fontWeight="600"
            color="#333"
            textAlign={"left"}
          >
            {title}
          </Heading>
        </Box>

        {buttonTitle && buttonLink && (
          <Box
            order={{ base: -1, md: -1, lg: 3 }}
            w={{ base: "full", md: "auto" }}
            mb={{ base: 3, md: 2, lg: 0 }}
          >
            <Link href={buttonLink}>
              <Button
                mt={{ base: 4, md: 2, lg: 0 }}
                w={{ base: "full", md: "auto" }}
                variant="outline"
                borderColor="gray.300"
                p={"10px"}
                textAlign={"left"}
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
          </Box>
        )}
      </Flex>

      <Flex
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        align={{ base: "start", md: "center" }}
        mb={6}
        px={{ base: 4, md: 8 }}
        order={{ base: 2, md: 2, lg: 2 }}
      >
        {subtitle && (
          <Text
            color="#667085"
            mt={2}
            textAlign={"left"}
            fontSize={"15px"}
            fontWeight={400}
          >
            {subtitle}
          </Text>
        )}
      </Flex>
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
