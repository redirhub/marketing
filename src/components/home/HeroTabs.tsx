"use client";

import {
  Tabs,
  Box,
  Text,
  HStack,
  Icon,
  SimpleGrid,
  Input,
  Button,
  InputProps,
  Stack,
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
  createRedirect,
  shortenUrl,
  ShortenUrlParams,
} from "@/app/api/redirhub";
import { parseApiErrorMessage, parseApiSuccessMessage } from "./HeroTabs.utils";
import { TabContentWrapper } from "./TabContentWrapper";
import { DomainSelector } from "./DomainSelector";

// SUB-COMPONENTS ===========================================================

interface CustomTabTriggerProps {
  value: string;
  icon: IconType;
  label: string;
}

interface CustomInputProps extends InputProps {
  label: string;
  placeholder?: string;
}

interface PrimaryActionButtonProps extends React.ComponentProps<typeof Button> {
  label: string;
}

export const CustomTabTrigger: React.FC<CustomTabTriggerProps> = ({
  value,
  icon,
  label,
}) => {
  const isShortenUrl = label === "Shorten URL";
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
      <HStack gap={{ base: 1, md: 2 }} justify="center">
        <Icon
          as={icon}
          boxSize={{ base: 3, md: 4 }}
          color="currentColor"
          transform={isShortenUrl ? "rotate(134deg)" : undefined}
        />
        <Text fontSize={{ base: "12px", md: "14px" }} fontWeight="400">
          {label}
        </Text>
      </HStack>
    </Tabs.Trigger>
  );
};

export const CustomInput: React.FC<CustomInputProps> = ({
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

export const PrimaryActionButton: React.FC<PrimaryActionButtonProps> = ({
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

const ApiStatusMessage: React.FC<{ message: string }> = ({ message }) => {
  if (!message) return null;
  return (
    <Text fontSize="sm" color="#333" textAlign="left">
      {message}
    </Text>
  );
};

// CONSTANTS ================================================================

const TAB_IDS = {
  REDIRECT: "tab1",
  SHORTEN: "tab2",
  CHECKER: "tab3",
} as const;

const DOMAIN_OPTIONS = {
  SYSTEM: "system",
  CUSTOM: "Custom",
} as const;

const DOMAIN_COLLECTION_ITEMS = [
  { label: "6x.work", value: DOMAIN_OPTIONS.SYSTEM },
  { label: "Connect your domain", value: DOMAIN_OPTIONS.CUSTOM },
];

const FORM_GRID_PROPS = {
  columns: { base: 1, md: 5 } as const,
  gap: 3,
  w: "100%",
  gridTemplateColumns: { base: "1fr", md: "2fr 2fr 1fr" } as const,
};

const SHORTEN_GRID_PROPS = {
  columns: { base: 1, md: 5 } as const,
  gap: 3,
  w: "100%",
  gridTemplateColumns: { base: "1fr", md: "4fr 6fr 2fr" } as const, // 30% domain, 70% url, button
};

const CHECKER_GRID_PROPS = {
  columns: { base: 1, md: 5 } as const,
  gap: 3,
  w: "100%",
  gridTemplateColumns: { base: "1fr", md: "3fr 1fr" } as const,
};

export default function HeroTabs() {
  // STATE: Form inputs
  const [redirectFrom, setRedirectFrom] = useState("");
  const [redirectTo, setRedirectTo] = useState("");
  const [shortenDomain, setShortenDomain] = useState<
    ShortenUrlParams["domain"]
  >(DOMAIN_OPTIONS.SYSTEM);
  const [shortenUrlValue, setShortenUrlValue] = useState("");
  const [checkerUrl, setCheckerUrl] = useState("");

  // STATE: UI state
  const [apiStatus, setApiStatus] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [value, setValue] = useState<string | null>(TAB_IDS.REDIRECT);

  // EVENT HANDLERS
  const handleApiResponse = (response: ApiResponse) => {
    setIsLoading(false);

    if (response.success) {
      const redirectUrl = response.data?.data?.data?.redirect_url;
      if (redirectUrl) {
        window.location.href = redirectUrl;
        return;
      }
      setApiStatus(parseApiSuccessMessage(response));
    } else {
      setApiStatus(parseApiErrorMessage(response));
    }
  };
  const handleRedirectSubmit = async () => {
    if (!redirectFrom || !redirectTo) {
      return setApiStatus("Please fill both Redirect URL fields.");
    }
    setIsLoading(true);
    const response = await createRedirect({
      from: redirectFrom,
      to: redirectTo,
    });
    handleApiResponse(response);
  };

  const handleShortenSubmit = async () => {
    if (!shortenUrlValue) {
      return setApiStatus("Please enter the Long URL.");
    }
    setIsLoading(true);
    const response = await shortenUrl({
      domain: shortenDomain,
      url: shortenUrlValue,
    });
    handleApiResponse(response);
  };

  const handleCheckerSubmit = () => {
    if (!checkerUrl) {
      return setApiStatus("Please enter the URL to check.");
    }
    const formattedUrl = checkerUrl.startsWith("http")
      ? checkerUrl
      : `https://${checkerUrl}`;

    window.location.href = `https://findredirect.com/?url=${encodeURIComponent(formattedUrl)}`;
  };

  return (
    <Box w="100%" maxW="6xl" mx="auto">
      <Tabs.Root
        defaultValue={TAB_IDS.REDIRECT}
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
            value={TAB_IDS.REDIRECT}
            icon={FaExpandArrowsAlt}
            label="Redirect"
          />
          <CustomTabTrigger
            value={TAB_IDS.SHORTEN}
            icon={FaLink}
            label="Shorten URL"
          />
          <CustomTabTrigger
            value={TAB_IDS.CHECKER}
            icon={IoIosSearch}
            label="Checker"
          />
        </Tabs.List>

        <Tabs.Content value={TAB_IDS.REDIRECT}>
          <TabContentWrapper
            title="Create redirects for free"
            description="No Credit Card Needed. Change destination at anytime."
          >
            <SimpleGrid {...FORM_GRID_PROPS}>
              <CustomInput
                label="Redirect from"
                placeholder="www.olddomain.com"
                value={redirectFrom}
                onChange={(e) => setRedirectFrom(e.target.value)}
              />
              <CustomInput
                label="Redirect to"
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
            <ApiStatusMessage message={apiStatus} />
          </TabContentWrapper>
        </Tabs.Content>

        <Tabs.Content value={TAB_IDS.SHORTEN}>
          <TabContentWrapper
            title="Shorten URLs for free"
            description="Paste your long URL into the box and click 'Shorten URL' to instantly create a shareable link."
          >
            <SimpleGrid {...SHORTEN_GRID_PROPS}>
              <DomainSelector
                value={shortenDomain}
                options={DOMAIN_COLLECTION_ITEMS}
                onChange={(value) =>
                  setShortenDomain(value as ShortenUrlParams["domain"])
                }
              />
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
            <ApiStatusMessage message={apiStatus} />
          </TabContentWrapper>
        </Tabs.Content>

        <Tabs.Content value={TAB_IDS.CHECKER}>
          <TabContentWrapper
            title="Check Redirects for Free"
            description="Enter the URL and press 'Check Redirect' to verify the destination and status of the redirect."
          >
            <SimpleGrid {...CHECKER_GRID_PROPS}>
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
            <ApiStatusMessage message={apiStatus} />
          </TabContentWrapper>
        </Tabs.Content>
      </Tabs.Root>
    </Box>
  );
}
