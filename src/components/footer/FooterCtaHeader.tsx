import { VStack, Heading, Text, Button } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { URL_DASHBOARD_REGISTER, APP_NAME } from "@/lib/utils/constants";
import { useTranslation } from "react-i18next";

export const FooterCtaHeader: React.FC = ({}) => {
  const { t } = useTranslation();
  return (
    <VStack gap={6} textAlign="center" mb={"60px"}>
      <Heading
        as="p"
        fontSize={{ base: "1.5rem", md: "2rem", lg: "3rem" }}
        fontWeight="700"
        color="white"
        lineHeight={{ base: "2rem", md: "2rem", lg: "3rem" }}
        maxW="1000px"
        letterSpacing={"0.8px"}
      >
        {t("nav.footer-cta-title", "Redirect 5x Faster with Built-in Security")}
      </Heading>

      <VStack gap={0} maxW="700px">
        <Text
          textAlign="center"
          color="#FFFFFF"
          fontSize={{ base: "16px", md: "20px" }}
          fontWeight="500"
          letterSpacing="0.2px"
          textShadow="0px 0px 10px rgba(0, 0, 0, 0.3)"
        >
          {t("nav.footer-cta-text", "Experience the power of rapid, secure redirects and effortless management. {{n}} speeds up your workflow while keeping your domain safe.", { n: APP_NAME })}
        </Text>
      </VStack>
      <Link href={URL_DASHBOARD_REGISTER} target={"_blank"}>
       <Button
          bg="brand.500"
          color="white"
          borderColor="brand.500"
          px="24px"
          py="14px"
          minH={'48px'}
          fontSize="1rem"
          fontWeight="semibold"
          borderRadius="8px"
          transition="all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)"
          _hover={{
            borderColor: "brand.600",
            color: "white",
            transform: "translateY(-2px)",
            boxShadow: "0 10px 20px rgba(95, 82, 63, 0.27)",
          }}
          _active={{
            transform: "translateY(0)",
          }}
        >
          {t("nav.footer-cta-button", "Get Started For Free")}
        </Button>
      </Link>
    </VStack>
  );
};
