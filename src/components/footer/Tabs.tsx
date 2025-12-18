"use client";

import {
  Tabs,
  Box,
  Text,
  SimpleGrid,
  Portal,
  Select,
  createListCollection,
  Heading,
} from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { FaExpandArrowsAlt } from "react-icons/fa";
import { FaLink } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import { IconType } from "react-icons";
import { useState } from "react";
import {
  ApiResponse,
  checkRedirect,
  createRedirect,
  shortenUrl,
  ShortenUrlParams,
} from "@/app/api/redirhub";
import {
  CustomInput,
  CustomTabTrigger,
  PrimaryActionButton,
  TabContentWrapper,
} from "../home/HeroTabs";

export default function FooterTabs() {
  const [redirectFrom, setRedirectFrom] = useState("");
  const [redirectTo, setRedirectTo] = useState("");
  const [shortenDomain, setShortenDomain] =
    useState<ShortenUrlParams["domain"]>("system");
  const [shortenUrlValue, setShortenUrlValue] = useState("");
  const [checkerUrl, setCheckerUrl] = useState("");

  const [apiStatus, setApiStatus] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [value, setValue] = useState<string | null>("tab1");

  const frameworks = createListCollection({
    items: [
      { label: "6x.work", value: "system" },
      { label: "Connect your domain", value: "Custom" },
    ],
  });

  const handleApiResponse = (response: ApiResponse, targetUrl?: string) => {
    setIsLoading(false);

    if (response.success) {
      const msg = response.data?.message || response.data?.data?.message || "";
      let redirectUrl = response.data?.data?.data?.redirect_url;

      if (redirectUrl) {
        let finalUrl = "https://findredirect.com/";

        if (
          redirectUrl.startsWith("http://") ||
          redirectUrl.startsWith("https://")
        ) {
          finalUrl = redirectUrl;
        } else {
          finalUrl += `?url=${redirectUrl}`;
        }

        if (targetUrl && !finalUrl.includes(encodeURIComponent(targetUrl))) {
          finalUrl += finalUrl.includes("?") ? "&" : "?";
          finalUrl += `target=${encodeURIComponent(targetUrl)}`;
        }

        window.location.href = finalUrl;
        return;
      }

      setApiStatus(msg || "Success!");
      clearInputs();
      return;
    } else {
      let errorMessage =
        response.error || response.message || "Unknown API Error";

      try {
        const jsonMatch = errorMessage.match(/HTTP Error \d+:\s*(\{.*\})/);
        if (jsonMatch && jsonMatch[1]) {
          const errorData = JSON.parse(jsonMatch[1]);
          errorMessage = errorData.message || errorMessage;
        }
      } catch (e) {
        // If parsing fails, use the original error message
        console.error("Error parsing error message:", e);
      }
      setApiStatus(errorMessage);
    }
  };
  const handleRedirectSubmit = async () => {
    if (!redirectFrom || !redirectTo)
      return setApiStatus("Please fill both Redirect URL fields.");
    setIsLoading(true);
    const response = await createRedirect({
      from: redirectFrom,
      to: redirectTo,
    });
    handleApiResponse(response);
  };

  const handleShortenSubmit = async () => {
    if (!shortenUrlValue) return setApiStatus("Please enter the Long URL.");
    setIsLoading(true);
    const response = await shortenUrl({
      domain: shortenDomain,
      url: shortenUrlValue,
    });
    handleApiResponse(response);
  };

  const handleCheckerSubmit = async () => {
    if (!checkerUrl) return setApiStatus("Please enter the URL to check.");
    setIsLoading(true);
    const response = await checkRedirect({ checkUrl: checkerUrl });
    handleApiResponse(response, "https://findredirect.com/");
  };

  const clearInputs = () => {
    setRedirectFrom("");
    setRedirectTo("");
    setShortenDomain("system");
    setShortenUrlValue("");
    setCheckerUrl("");
  };
  return (
    <Box w="100%" maxW="6xl" mx="auto" mb={14}>
      <Heading
        as="h1"
        fontSize={{ base: "2rem", md: "3rem", lg: "3rem" }}
        fontWeight="600"
        color="white"
        lineHeight={{ base: "3rem", md: "3rem", lg: "3rem" }}
        letterSpacing={"-1.8px"}
        textAlign={"center"}
        mb={{ base: "2rem", md: "3rem", lg: "3rem" }}
      >
        Fast, Secure, Effortless Link Management
      </Heading>
      <Tabs.Root
        defaultValue="tab1"
        variant="enclosed"
        value={value}
        onValueChange={(e) => {
          setValue(e.value);
          setApiStatus("");
          clearInputs();
        }}
        textAlign={"center"}
      >
        <Tabs.List
          w={{ base: "full", md: "fit-content" }}
          fontSize={{ base: "md", md: "lg" }}
          gap={{ base: "5px", md: "10px" }}
          bg="#FFFFFF61"
          p={{ base: "3px", md: "5px" }}
          borderRadius="full"
          mb={1}
        >
          <CustomTabTrigger
            value="tab1"
            icon={FaExpandArrowsAlt}
            label="Redirect"
          />
          <CustomTabTrigger value="tab2" icon={FaLink} label="Shorten URL" />
          <CustomTabTrigger value="tab3" icon={IoIosSearch} label="Checker" />
        </Tabs.List>

        <Tabs.Content value="tab1">
          <TabContentWrapper
            title="Create redirects for free"
            description="No Credit Card Needed. Change destination at anytime."
          >
            <SimpleGrid
              columns={{ base: 1, md: 5 }}
              gap={3}
              w="100%"
              gridTemplateColumns={{ base: "1fr", md: "2fr 2fr 1fr" }}
            >
              <CustomInput
                label="Destination URL"
                placeholder="www.olddomain.com"
                value={redirectTo}
                onChange={(e) => setRedirectTo(e.target.value)}
              />
              <CustomInput
                label="Custom slug"
                placeholder="https://www.newdomain.com"
                value={redirectFrom}
                onChange={(e) => setRedirectFrom(e.target.value)}
              />
              <PrimaryActionButton
                label={isLoading ? "Processing..." : "Redirect for free"}
                onClick={handleRedirectSubmit}
                disabled={isLoading}
              />
            </SimpleGrid>
            {apiStatus && (
              <Text fontSize="sm" color={"#333"} textAlign={"left"}>
                {apiStatus}
              </Text>
            )}
          </TabContentWrapper>
        </Tabs.Content>

        <Tabs.Content value="tab2">
          <TabContentWrapper
            title="Shorten URLs for free"
            description="Paste your long URL into the box and click ‘Shorten URL’ to instantly create a shareable link."
          >
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
                <Select.Root
                  collection={frameworks}
                  multiple={false}
                  value={[shortenDomain]}
                  onValueChange={(details) => {
                    const next = Array.isArray(details.value)
                      ? details.value[0]
                      : details.value;

                    setShortenDomain(next as ShortenUrlParams["domain"]);
                  }}
                >
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

              <CustomInput
                label="Long URL"
                placeholder="https://www.yourlongurl.com"
                value={shortenUrlValue}
                onChange={(e) => setShortenUrlValue(e.target.value)}
              />
              <PrimaryActionButton
                label={isLoading ? "Processing..." : "Shorten URL"}
                onClick={handleShortenSubmit}
                disabled={isLoading}
              />
            </SimpleGrid>
            {apiStatus && (
              <Text fontSize="sm" color={"#333"} textAlign={"left"}>
                {apiStatus}
              </Text>
            )}
          </TabContentWrapper>
        </Tabs.Content>

        <Tabs.Content value="tab3">
          <TabContentWrapper
            title="Check Redirects for Free"
            description="Enter the URL and press ‘Check Redirect’ to verify the destination and status of the redirect."
          >
            <SimpleGrid
              columns={{ base: 1, md: 5 }}
              gap={3}
              w="100%"
              gridTemplateColumns={{ base: "1fr", md: "3fr  1fr" }}
            >
              <CustomInput
                label="URL"
                placeholder="https://redirhub.com"
                value={checkerUrl}
                onChange={(e) => setCheckerUrl(e.target.value)}
              />
              <PrimaryActionButton
                label={isLoading ? "Checking..." : "Check Redirect"}
                onClick={handleCheckerSubmit}
                disabled={isLoading}
              />
            </SimpleGrid>
            {apiStatus && (
              <Text fontSize="sm" color={"#333"} textAlign={"left"}>
                {apiStatus}
              </Text>
            )}
          </TabContentWrapper>
        </Tabs.Content>
      </Tabs.Root>
    </Box>
  );
}
