"use client";

import {
  Tabs,
  Text,
  HStack,
  Icon,
  SimpleGrid,
  Input,
  Button,
  InputProps,
  Stack,
} from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { FiArrowRight } from "react-icons/fi";
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
import { TabsLayout, TabTriggerButton } from "../ui/TabsLayout";

interface CustomInputProps extends InputProps {
  label: string;
  placeholder?: string;
}

interface PrimaryActionButtonProps extends React.ComponentProps<typeof Button> {
  label: string;
  subtext?: string;
}


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
    h: "56px",
    px: 4,
    fontSize: "md",
    color: "#101828",
    _placeholder: {
      color: "#667085",
    },
    _focus: {
      borderColor: "#FF4F17",
      outline: "none",
      boxShadow: "0 0 0 1px #FF4F17",
    },
  };
  const labelStyles = {
    fontFamily: "'Inter', sans-serif",
    fontStyle: "normal",
    fontSize: "14px",
    fontWeight: "500",
    color: "#344054",
    mb: 2,
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
  subtext,
  ...rest
}) => {
  const buttonStyles = {
    bg: "rgba(255, 68, 5, 1)",
    borderRadius: "12px",
    h: "56px",
    px: { base: 4, md: 8 },
    fontSize: "16px",
    fontWeight: "600",
    fontFamily: "'Inter', sans-serif",
    fontStyle: "normal",
    color: "#FFFFFF",
    w: "full",
    _hover: {
      bg: "#E03E0D",
    },
    _active: {
      bg: "#C0350B",
    },
  };
  return (
    <FormControl>
      <FormLabel opacity={0} mb={2} pointerEvents="none" display={{ base: "none", md: "block" }}>Spacer</FormLabel>
      <Stack gap={2} w="full" align={{ base: "center", md: "center" }}>
        <Button {...buttonStyles} {...rest}>
          <HStack gap={2}>
            <Text>{label}</Text>
            <Icon as={FiArrowRight} />
          </HStack>
        </Button>
        {subtext && (
          <Text fontSize="12px" color="#667085" textAlign={{ base: "center", md: "center" }} whiteSpace="nowrap">
            {subtext}
          </Text>
        )}
      </Stack>
    </FormControl>
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
  gap: 4,
  w: "100%",
  gridTemplateColumns: { base: "1fr", md: "1.5fr 1.5fr 1fr" } as const,
  alignItems: "flex-start",
};

const SHORTEN_GRID_PROPS = {
  columns: { base: 1, md: 5 } as const,
  gap: 4,
  w: "100%",
  gridTemplateColumns: { base: "1fr", md: "1.2fr 2fr 1fr" } as const,
  alignItems: "flex-start",
};

const CHECKER_GRID_PROPS = {
  columns: { base: 1, md: 5 } as const,
  gap: 4,
  w: "100%",
  gridTemplateColumns: { base: "1fr", md: "3fr 1fr" } as const,
  alignItems: "flex-start",
};

export default function HeroTabPanel() {
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
  const [value, setValue] = useState<string>(TAB_IDS.REDIRECT);

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

  const tabHeader = (
    <>
      <TabTriggerButton
        value={TAB_IDS.REDIRECT}
        label="Free Redirect"
      />
      <TabTriggerButton
        value={TAB_IDS.SHORTEN}
        label="Shorten URL"
      />
      <TabTriggerButton
        value={TAB_IDS.CHECKER}
        label="Check Redirect"
      />
    </>
  );

  const tabBody = (
    <>
      <Tabs.Content value={TAB_IDS.REDIRECT}>
        <TabContentWrapper>
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
              label={isLoading ? "Processing..." : "Create Redirect - it's FREE"}
              subtext="No Credit Card Needed • Change anytime"
              onClick={handleRedirectSubmit}
              disabled={isLoading}
            />
          </SimpleGrid>
          <ApiStatusMessage message={apiStatus} />
        </TabContentWrapper>
      </Tabs.Content>

      <Tabs.Content value={TAB_IDS.SHORTEN}>
        <TabContentWrapper>
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
        <TabContentWrapper>
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
    </>
  );

  return (
    <TabsLayout
      defaultValue={TAB_IDS.REDIRECT}
      value={value}
      onValueChange={(v) => {
        setValue(v);
        setApiStatus("");
      }}
      tabHeader={tabHeader}
      tabBody={tabBody}
    />
  );
}
