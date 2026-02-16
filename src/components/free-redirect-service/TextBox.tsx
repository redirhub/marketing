"use client";

import { Box, Button, Container, Heading } from "@chakra-ui/react";
import styles from "../home/Testimonials.module.css";
import Link from "next/link";
import { URL_DASHBOARD_REGISTER } from "@/lib/utils/constants";

export default function TextBox() {
  return (
    <Box className={styles.container}>
      <Box
        py={{ base: "10%", md: "10%" }}
        position="relative"
        overflow="hidden"
        maxW="6xl"
        mx="auto"
      >
        <Container maxW="4xl" mx="auto" textAlign="center">
          <Heading
            as="p"
            fontSize={{ base: "1rem", md: "36px" }}
            fontWeight={400}
            mb={{ base: 4, md: 8 }}
            textAlign={{ base: "center", md: "center" }}
            color="#FFFFFF"
            lineHeight={"50px"}
          >
            Ready to upgrade your redirects to under 100 ms – up to 4× faster
            than competitors, with automatic HTTPS?
          </Heading>
          <Link href={URL_DASHBOARD_REGISTER} target={"_blank"}>
            <Button
              bg="#E49426"
              color="white"
              px="24px"
              h="45px"
              fontSize="1rem"
              fontWeight="semibold"
              borderRadius="8px"
              _hover={{
                bg: "#C78121",
                transform: "translateY(-2px)",
                boxShadow: "lg",
              }}
              _active={{
                bg: "orange.700",
                transform: "translateY(0)",
              }}
              transition="all 0.2s"
            >
              Get Started For Free
            </Button>
          </Link>
        </Container>
      </Box>
    </Box>
  );
}
