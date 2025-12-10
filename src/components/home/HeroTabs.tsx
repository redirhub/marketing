"use client";

import {
  Tabs,
  Box,
  Heading,
  Text,
  HStack,
  Icon,
  SimpleGrid,
  Input,
  Button,
  Stack,
  Portal,
  Select,
  createListCollection,
} from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { SearchIcon } from "@chakra-ui/icons";
import { FaExpandArrowsAlt } from "react-icons/fa";
import { FaLink } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";

export default function HeroTabs() {
  const frameworks = createListCollection({
    items: [
      { label: "6x.work", value: "system" },
      { label: "Connect your domain", value: "Custom" },
    ],
  });
  return (
    <Box w="100%" maxW="6xl" mx="auto">
      <Tabs.Root defaultValue="tab1" variant="enclosed">
        <Tabs.List
          w="40%"
          fontSize={{ base: "md", md: "lg" }}
          gap={"10px"}
          bg="#FFFFFF61"
          p={"5px"}
          borderRadius="full"
          mb={1}
        >
          <Tabs.Trigger
            value="tab1"
            flex={1}
            px={4}
            py={3}
            borderRadius="full"
            color="#344054"
            transition="all 0.3s ease"
            _hover={{
              // transform: "translateY(-2px)",
              bg: "rgba(255, 255, 255, 0.5)",
            }}
            _selected={{
              bg: "white",
              color: "#344054",
              fontWeight: "semibold",
              "& svg": { color: "#E49426" },
            }}
          >
            <HStack gap={3} justify="center">
              <Icon as={FaExpandArrowsAlt} boxSize={4} color="currentColor" />
              <Text fontSize={"14px"} fontWeight={"400"}>
                Redirect
              </Text>
            </HStack>
          </Tabs.Trigger>
          <Tabs.Trigger
            value="tab2"
            flex={1}
            px={4}
            py={3}
            borderRadius="full"
            color="#344054"
            transition="all 0.3s ease"
            _hover={{
              // transform: "translateY(-2px)",
              bg: "rgba(255, 255, 255, 0.5)",
            }}
            _selected={{
              bg: "white",
              color: "#344054",
              fontWeight: "semibold",
              "& svg": { color: "#E49426" },
            }}
          >
            <HStack gap={2} justify="center">
              <Icon as={FaLink} boxSize={4} color="currentColor" />
              <Text fontSize={"14px"} fontWeight={"400"}>
                Shorten URL
              </Text>
            </HStack>
          </Tabs.Trigger>
          <Tabs.Trigger
            value="tab3"
            flex={1}
            px={4}
            py={3}
            borderRadius="full"
            color="#344054"
            transition="all 0.3s ease"
            _hover={{
              // transform: "translateY(-2px)",
              bg: "rgba(255, 255, 255, 0.5)",
            }}
            _selected={{
              bg: "white",
              color: "#344054",
              fontWeight: "semibold",
              "& svg": { color: "#E49426" },
            }}
          >
            <HStack gap={2} justify="center">
              <Icon as={IoIosSearch} boxSize={4} color="currentColor" />
              <Text fontSize={"14px"} fontWeight={"400"}>
                Checker
              </Text>
            </HStack>
          </Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="tab1">
          <Box
            w="100%"
            maxW="4xl"
            mx="auto"
            p={6}
            mt={4}
            bg="white"
            borderRadius="24px"
            border="1px solid #222B271A"
            boxShadow="0px 51px 44px -25px rgba(0, 0, 0, 0.17)"
            display="flex"
            flexDirection="column"
            flexGrow={1}
            alignSelf="stretch"
            flexWrap={{ base: "wrap", md: "nowrap" }}
          >
            <Stack gap={4}>
              <Box textAlign="left">
                <Heading
                  fontSize="1.5rem"
                  textAlign="left"
                  fontWeight={"600"}
                  letterSpacing={"0.4px"}
                  color="#333"
                >
                  Create redirects for free
                </Heading>
                <Text color="#667085" fontSize="1rem" mt={1}>
                  No Credit Card Needed. Change destination at anytime.
                </Text>
              </Box>

              <SimpleGrid
                columns={{ base: 1, md: 5 }} // total 100% split into 5 parts
                gap={3}
                w="100%"
                gridTemplateColumns={{ base: "1fr", md: "2fr 2fr 1fr" }} // 40% 40% 20%
              >
                <FormControl>
                  <FormLabel
                    fontSize="1rem"
                    fontWeight="500"
                    pb="5px"
                    letterSpacing={"0.2px"}
                    color="#333"
                  >
                    Destination URL
                  </FormLabel>
                  <Input
                    bg="#ffffff"
                    border="1px solid"
                    borderColor="#D0D5DD"
                    borderRadius="12px"
                    // py={4}
                    h={"47px"}
                    px={3}
                    fontSize="sm"
                    placeholder="www.olddomain.com"
                    _placeholder={{
                      color: "gray.400",
                      opacity: 1,
                    }}
                    _focus={{
                      borderColor: "blue.500",
                      boxShadow: "0 0 0 1px #3182ce",
                    }}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel
                    fontSize="1rem"
                    fontWeight="500"
                    pb="5px"
                    letterSpacing={"0.2px"}
                    color="#333"
                  >
                    Custom slug
                  </FormLabel>
                  <Input
                    bg="#ffffff"
                    border="1px solid"
                    borderColor="#D0D5DD"
                    borderRadius="12px"
                    h={"47px"}
                    px={3}
                    fontSize="sm"
                    _placeholder={{
                      color: "gray.400",
                      opacity: 1,
                    }}
                    _focus={{
                      borderColor: "blue.500",
                      boxShadow: "0 0 0 1px #3182ce",
                    }}
                    placeholder="https://www.newdomain.com"
                  />
                </FormControl>
                <HStack
                  justify={{ base: "flex-start", md: "flex-end" }}
                  align="flex-end"
                >
                  <Button
                    colorScheme="blue"
                    px={2}
                    py={2}
                    w={{ base: "full", md: "full" }}
                    bg="#E49426"
                    color="#fff"
                    borderRadius={"12px"}
                    h={"47px"}
                    fontWeight={"700"}
                    fontSize={"1rem"}
                    _hover={{
                      bg: "#C78121",
                    }}
                  >
                    Redirect for free
                  </Button>
                </HStack>
              </SimpleGrid>
            </Stack>
          </Box>
        </Tabs.Content>

        <Tabs.Content value="tab2">
          <Box
            w="100%"
            maxW="4xl"
            mx="auto"
            p={6}
            mt={4}
            bg="white"
            borderRadius="24px"
            border="1px solid #222B271A"
            boxShadow="0px 51px 44px -25px rgba(0, 0, 0, 0.17)"
            display="flex"
            flexDirection="column"
            flexGrow={1}
            alignSelf="stretch"
            flexWrap={{ base: "wrap", md: "nowrap" }}
          >
            <Stack gap={4}>
              <Box textAlign="left">
                <Heading
                  fontSize="1.5rem"
                  textAlign="left"
                  fontWeight={"600"}
                  letterSpacing={"0.4px"}
                  color="#333"
                >
                  Shorten URLs for free
                </Heading>
                <Text color="#667085" fontSize="1rem" mt={1}>
                  Paste your long URL into the box and click ‘Shorten URL’ to
                  instantly create a shareable link.
                </Text>
              </Box>

              <SimpleGrid
                columns={{ base: 1, md: 5 }}
                gap={3}
                w="100%"
                gridTemplateColumns={{ base: "1fr", md: "2fr 2fr 1fr" }} // 40% 40% 20%
              >
                <FormControl>
                  <FormLabel
                    fontSize="1rem"
                    fontWeight="500"
                    pb="5px"
                    letterSpacing={"0.2px"}
                    color="#333"
                  >
                    Long URL
                  </FormLabel>
                  <Select.Root collection={frameworks} size="sm" width="100%">
                    <Select.HiddenSelect />

                    <Select.Control
                      css={{
                        bg: "#ffffff",
                        border: "1px solid",
                        borderColor: "#D0D5DD",
                        borderRadius: "12px",
                        height: "47px",
                        px: 2,
                        fontSize: "sm",
                        display: "flex",
                        alignItems: "center",
                        _focus: {
                          borderColor: "blue.500",
                          boxShadow: "0 0 0 1px #3182ce",
                        },
                      }}
                    >
                      <Select.Trigger border="none">
                        <Select.ValueText placeholder="https://www.yourlongurl.com" />
                      </Select.Trigger>

                      <Select.IndicatorGroup>
                        <Select.Indicator />
                      </Select.IndicatorGroup>
                    </Select.Control>

                    <Portal>
                      <Select.Positioner>
                        <Select.Content
                          css={{
                            bg: "white",
                            // border: "1px solid #D0D5DD",
                            borderRadius: "12px",
                            maxHeight: "200px",
                            overflowY: "auto",
                          }}
                        >
                          {frameworks.items.map((framework) => (
                            <Select.Item item={framework} key={framework.value}>
                              <Box
                                px={3}
                                py={2}
                                _hover={{ bg: "gray.100" }}
                                w={"100%"}
                              >
                                {framework.label}
                              </Box>
                              <Select.ItemIndicator />
                            </Select.Item>
                          ))}
                        </Select.Content>
                      </Select.Positioner>
                    </Portal>
                  </Select.Root>
                </FormControl>
                <FormControl>
                  <FormLabel
                    fontSize="1rem"
                    fontWeight="500"
                    pb="5px"
                    letterSpacing={"0.2px"}
                    color="#333"
                  >
                    Destination URL
                  </FormLabel>
                  <Input
                    bg="#ffffff"
                    border="1px solid"
                    borderColor="#D0D5DD"
                    borderRadius="12px"
                    // py={4}
                    h={"47px"}
                    px={3}
                    fontSize="sm"
                    placeholder="www.olddomain.com"
                    _placeholder={{
                      color: "gray.400",
                      opacity: 1,
                    }}
                    _focus={{
                      borderColor: "blue.500",
                      boxShadow: "0 0 0 1px #3182ce",
                    }}
                  />
                </FormControl>

                <HStack
                  justify={{ base: "flex-start", md: "flex-end" }}
                  align="flex-end"
                >
                  <Button
                    colorScheme="blue"
                    px={2}
                    py={2}
                    w={{ base: "full", md: "full" }}
                    bg="#E49426"
                    color="#fff"
                    borderRadius={"12px"}
                    h={"47px"}
                    fontWeight={"700"}
                    fontSize={"1rem"}
                    _hover={{
                      bg: "#C78121",
                    }}
                  >
                    Shorten URL
                  </Button>
                </HStack>
              </SimpleGrid>
            </Stack>
          </Box>
        </Tabs.Content>

        <Tabs.Content value="tab3">
          <Box
            w="100%"
            maxW="4xl"
            mx="auto"
            p={6}
            mt={4}
            bg="white"
            borderRadius="24px"
            border="1px solid #222B271A"
            boxShadow="0px 51px 44px -25px rgba(0, 0, 0, 0.17)"
            display="flex"
            flexDirection="column"
            flexGrow={1}
            alignSelf="stretch"
            flexWrap={{ base: "wrap", md: "nowrap" }}
          >
            <Stack gap={4}>
              <Box textAlign="left">
                <Heading
                  fontSize="1.5rem"
                  textAlign="left"
                  fontWeight={"600"}
                  letterSpacing={"0.4px"}
                  color="#333"
                >
                  Check Redirects for Free
                </Heading>
                <Text color="#667085" fontSize="1rem" mt={1}>
                  Enter the URL and press ‘Check Redirect’ to verify the
                  destination and status of the redirect.
                </Text>
              </Box>

              <SimpleGrid
                columns={{ base: 1, md: 5 }}
                gap={3}
                w="100%"
                gridTemplateColumns={{ base: "1fr", md: "3fr  1fr" }}
              >
                <FormControl>
                  <FormLabel
                    fontSize="1rem"
                    fontWeight="500"
                    pb="5px"
                    letterSpacing={"0.2px"}
                    color="#333"
                  >
                    URL{" "}
                  </FormLabel>
                  <Input
                    bg="#ffffff"
                    border="1px solid"
                    borderColor="#D0D5DD"
                    borderRadius="12px"
                    h={"47px"}
                    px={3}
                    fontSize="sm"
                    placeholder="https://redirhub.com"
                    _placeholder={{
                      color: "gray.400",
                      opacity: 1,
                    }}
                    _focus={{
                      borderColor: "blue.500",
                      boxShadow: "0 0 0 1px #3182ce",
                    }}
                  />
                </FormControl>

                <HStack
                  justify={{ base: "flex-start", md: "flex-end" }}
                  align="flex-end"
                >
                  <Button
                    colorScheme="blue"
                    px={2}
                    py={2}
                    w={{ base: "full", md: "full" }}
                    bg="#E49426"
                    color="#fff"
                    borderRadius={"12px"}
                    h={"47px"}
                    fontWeight={"700"}
                    fontSize={"1rem"}
                    _hover={{
                      bg: "#C78121",
                    }}
                  >
                    Check Redirect
                  </Button>
                </HStack>
              </SimpleGrid>
            </Stack>
          </Box>
        </Tabs.Content>
      </Tabs.Root>
    </Box>
  );
}
