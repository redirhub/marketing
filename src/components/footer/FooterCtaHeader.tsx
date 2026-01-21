import { VStack, Heading, Text, Button } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

export const FooterCtaHeader: React.FC = ({}) => {
  return (
    <VStack gap={6} textAlign="center" mb="60px">
      <Heading
        as="p"
        fontSize={{ base: "2rem", md: "3rem", lg: "3rem" }}
        fontWeight="600"
        color="white"
        lineHeight={{ base: "3rem", md: "3rem", lg: "3rem" }}
        maxW="900px"
        letterSpacing={"-1.8px"}
      >
        Redirect 5x Faster with Built-in Security
      </Heading>

      <VStack gap={0} maxW="700px">
        <Text
          textAlign="center"
          color="#FFFFFFD1"
          fontSize={{ base: "1rem", md: "1.1rem" }}
          fontWeight="500"
          letterSpacing="0.2px"
          textShadow="0px 0px 10px rgba(0, 0, 0, 0.3)"
        >
          Experience the power of rapid, secure redirects and effortless
          management.
        </Text>
        <Text
          textAlign="center"
          color="#FFFFFFD1"
          fontSize="1.1rem"
          fontWeight="500"
          letterSpacing="0.2px"
          textShadow="0px 0px 10px rgba(0, 0, 0, 0.3)"
        >
          RedirHub speeds up your workflow while keeping your domain safe.
        </Text>
      </VStack>
      <Link href={"https://dash.redirhub.com/register"} target={"_blank"}>
        <Button
          bg="#E49426"
          color="white"
          px="24px"
          py="12px"
          fontSize="1rem"
          fontWeight="semibold"
          borderRadius="8px"
          boxShadow="md"
          _hover={{
            bg: "#C78121",
            transform: "translateY(-2px)",
            boxShadow: "xl",
          }}
          _active={{
            bg: "orange.700",
            transform: "translateY(0)",
            boxShadow: "md",
          }}
          transition="all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)"
        >
          Get Started For Free
        </Button>
      </Link>
    </VStack>
  );
};
