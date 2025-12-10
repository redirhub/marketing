"use client";

import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Button,
  Stack,
} from "@chakra-ui/react";
import Image from "next/image";
import { RxCheckCircled } from "react-icons/rx";
import { PiCheckCircleFill } from "react-icons/pi";

export default function APIDocumentation() {
  return (
    <Box
      w="100%"
      pb={{ base: 14, md: 20 }}
      px={{ base: 4, md: 6 }}
      textAlign="center"
      bg={"#fff"}
    >
      <Box w="100%" maxW="7xl" mx="auto" textAlign="center">
        {/* Main Title */}
        <Heading
          fontSize={{ base: "2rem", md: "3rem" }}
          fontWeight={500}
          color="#344054"
          letterSpacing="0.4px"
          mb={16}
        >
          Explore RedirHub's API Documentation
        </Heading>
      </Box>

      <Box w="100%" maxW="7xl" mx="auto">
        <Box
          w="100%"
          maxW="7xl"
          mx="auto"
          mt={4}
          bg="white"
          borderRadius="lg"
          p={{ base: 4, md: 6 }}
        >
          <SimpleGrid columns={{ base: 1, md: 2 }} gap={8} alignItems="center">
            <Box textAlign="left">
              <Text color="#667085" mb={4}>
                Unleash the full potential of RedirHub with our detailed API
                documentation. Designed to support developers at every stage,
                the documentation provides clear and concise guidance to
                integrate, automate, and optimize your redirect management
                workflows seamlessly.
              </Text>
              <Box as="ul" pl={0} color="#667085" display="grid" rowGap={3}>
                <Box
                  as="li"
                  display="flex"
                  alignItems="flex-start"
                  gap={2}
                  listStyleType="none"
                >
                  <PiCheckCircleFill
                    color="#E49426"
                    style={{ marginTop: "2px", fontSize: "28px" }}
                  />{" "}
                  <Box>
                    <Text
                      as="span"
                      fontSize={"14px"}
                      fontWeight="700"
                      color="#101828"
                    >
                      Authentication Made Simple:
                    </Text>{" "}
                    Learn how to securely generate and use API keys for safe and
                    reliable requests.
                  </Box>
                </Box>
                <Box
                  as="li"
                  display="flex"
                  alignItems="flex-start"
                  gap={2}
                  listStyleType="none"
                >
                  <PiCheckCircleFill
                    color="#E49426"
                    style={{ marginTop: "2px", fontSize: "28px" }}
                  />{" "}
                  <Box>
                    <Text
                      as="span"
                      fontSize={"14px"}
                      fontWeight="700"
                      color="#101828"
                    >
                      Error Handling & Troubleshooting:
                    </Text>{" "}
                    Quickly identify and resolve issues with detailed error
                    codes and explanations.
                  </Box>
                </Box>
                <Box
                  as="li"
                  display="flex"
                  alignItems="flex-start"
                  gap={2}
                  listStyleType="none"
                >
                  <PiCheckCircleFill
                    color="#E49426"
                    style={{ marginTop: "2px", fontSize: "28px" }}
                  />{" "}
                  <Box>
                    <Text
                      as="span"
                      fontSize={"14px"}
                      fontWeight="700"
                      color="#101828"
                    >
                      Pagination & Rate Limits:
                    </Text>{" "}
                    Efficiently manage large datasets and ensure smooth API
                    interactions with structured guidelines.{" "}
                  </Box>
                </Box>{" "}
                <Box
                  as="li"
                  display="flex"
                  alignItems="flex-start"
                  gap={2}
                  listStyleType="none"
                >
                  <PiCheckCircleFill
                    color="#E49426"
                    style={{ marginTop: "2px", fontSize: "28px" }}
                  />{" "}
                  <Box>
                    <Text
                      as="span"
                      fontSize={"14px"}
                      fontWeight="700"
                      color="#101828"
                    >
                      Robust Reference Material:
                    </Text>{" "}
                    Access a comprehensive API reference with examples to
                    kickstart your implementation.
                  </Box>
                </Box>{" "}
                <Box
                  as="li"
                  display="flex"
                  alignItems="flex-start"
                  gap={2}
                  listStyleType="none"
                >
                  <PiCheckCircleFill
                    color="#E49426"
                    style={{ marginTop: "2px", fontSize: "28px" }}
                  />{" "}
                  <Box>
                    <Text
                      as="span"
                      fontSize={"14px"}
                      fontWeight="700"
                      color="#101828"
                    >
                      Scalable Solutions
                    </Text>{" "}
                    Leverage advanced features to automate workflows and scale
                    your redirect management effortlessly.
                  </Box>
                </Box>
              </Box>
              <Stack
                direction={{ base: "column", sm: "row" }}
                gap={4}
                align="center"
                mt={8}
              >
                <Button
                  bg="#E49426"
                  color="white"
                  px="24px"
                  py="12px"
                  fontSize="1rem"
                  fontWeight="normal"
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

                <Button
                  bg="#fff"
                  color="#16538A"
                  px="24px"
                  py="12px"
                  fontSize="1rem"
                  fontWeight="normal"
                  borderRadius="8px"
                  border="1px solid #222B271A"
                  _hover={{
                    bg: "#16538A",
                    transform: "translateY(-2px)",
                    boxShadow: "lg",
                    color: "#fff",
                  }}
                  _active={{
                    bg: "#16538A",
                    transform: "translateY(0)",
                  }}
                  transition="all 0.2s"
                >
                  Learn More
                </Button>
              </Stack>
            </Box>

            <Box
              w="100%"
              h="100%"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Image
                src={"/assets/images/api-documentation.jpeg"}
                alt="Redirect feature preview"
                width={640}
                height={420}
                style={{
                  width: "100%",
                  height: "auto",
                }}
              />
            </Box>
          </SimpleGrid>
        </Box>
      </Box>
    </Box>
  );
}
