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
  InputProps,
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

interface CustomTabTriggerProps {
  value: string;
  icon: IconType;
  label: string;
}
interface TabContentWrapperProps {
  title: string;
  description: string;
  children: React.ReactNode;
}
interface CustomInputProps extends InputProps {
  label: string;
  placeholder?: string;
}
interface PrimaryActionButtonProps extends React.ComponentProps<typeof Button> {
  label: string;
}

const CustomTabTrigger: React.FC<CustomTabTriggerProps> = ({
  value,
  icon,
  label,
}) => {
  return (
    <Tabs.Trigger
      value={value}
      flex={{ base: 1, md: "inherit" }}
      px={{ base: 1, md: 4 }}
      py={3}
      borderRadius="full"
      color="#344054"
      transition="all 0.3s ease"
      _hover={{
        bg: "rgba(255, 255, 255, 0.5)",
      }}
      _selected={{
        bg: "white",
        color: "#344054",
        fontWeight: "semibold",
        "& svg": { color: "#E49426" },
      }}
    >
      <HStack gap={{ base: 1, md: 3 }} justify="center">
        <Icon as={icon} boxSize={{ base: 3, md: 4 }} color="currentColor" />
        <Text fontSize={{ base: "12px", md: "14px" }} fontWeight="400">
          {label}
        </Text>
      </HStack>
    </Tabs.Trigger>
  );
};

const TabContentWrapper: React.FC<TabContentWrapperProps> = ({
  title,
  description,
  children,
}) => {
  return (
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
            fontWeight="600"
            letterSpacing="0.4px"
            color="#333"
          >
            {title}
          </Heading>
          <Text color="#667085" fontSize="1rem" mt={1}>
            {description}
          </Text>
        </Box>
        {children}
      </Stack>
    </Box>
  );
};

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  placeholder,
  ...rest
}) => {
  const inputStyles = {
    bg: "#ffffff",
    border: "1px solid",
    borderColor: "#D0D5DD",
    borderRadius: "12px",
    h: "47px",
    px: 3,
    fontSize: "sm",
    _placeholder: {
      color: "gray.400",
      opacity: 1,
    },
    _focus: {
      borderColor: "blue.500",
      boxShadow: "0 0 0 1px #3182ce",
    },
  };
  const labelStyles = {
    fontSize: "1rem",
    fontWeight: "500",
    pb: "5px",
    letterSpacing: "0.2px",
    color: "#333",
  };
  return (
    <FormControl>
      <FormLabel {...labelStyles}>{label}</FormLabel>
      <Input placeholder={placeholder} {...inputStyles} {...rest} />
    </FormControl>
  );
};

const PrimaryActionButton: React.FC<PrimaryActionButtonProps> = ({
  label,
  ...rest
}) => {
  const buttonStyles = {
    colorScheme: "blue",
    px: 2,
    py: 2,
    w: { base: "full", md: "full" },
    bg: "#E49426",
    color: "white",
    borderRadius: "12px",
    h: "47px",
    fontWeight: "700",
    fontSize: "1rem",
    _hover: {
      bg: "#C78121",
    },
  };
  return (
    <HStack justify={{ base: "flex-start", md: "flex-end" }} align="flex-end">
      <Button {...buttonStyles} {...rest}>
        {label}
      </Button>
    </HStack>
  );
};
export default function HeroTabs() {
  //  STATE FOR FORM INPUTS & API FEEDBACK
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
        window.location.href = redirectUrl;
        return;
      }

      setApiStatus(msg || "Success!");
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
    const formattedUrl = checkerUrl.startsWith("http://") || checkerUrl.startsWith("https://")
      ? checkerUrl
      : `https://${checkerUrl}`;
    
    window.location.href = `https://findredirect.com/?url=${encodeURIComponent(
      formattedUrl
    )}`;
  };

  const clearInputs = () => {
    setRedirectFrom("");
    setRedirectTo("");
    setShortenDomain("system");
    setShortenUrlValue("");
    setCheckerUrl("");
  };
  return (
    <Box w="100%" maxW="6xl" mx="auto">
      <Tabs.Root
        defaultValue="tab1"
        variant="enclosed"
        value={value}
        onValueChange={(e) => {
          setValue(e.value);
          setApiStatus("");
        }}
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
              gridTemplateColumns={{ base: "1fr", md: "2fr 2fr 1fr" }} // 40% 40% 20%
            >
              <CustomInput
                label="Redirect from"
                placeholder="www.olddomain.com"
                value={redirectFrom}
                onChange={(e) => setRedirectFrom(e.target.value)}
              />
              <CustomInput
                label="To"
                placeholder="https://www.newdomain.com"
                value={redirectTo}
                onChange={(e) => setRedirectTo(e.target.value)}
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
                  Domain
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
