"use client";

import {
  Tabs,
  SimpleGrid,
} from "@chakra-ui/react";
import { useState } from "react";
import {
  ApiResponse,
  createRedirect,
  shortenUrl,
  ShortenUrlParams,
} from "@/app/api/redirhub";
import { parseApiErrorMessage, parseApiSuccessMessage } from "./RedirectWidget.utils";
import { TabContentWrapper } from "../home/TabContentWrapper";
import { DomainSelector } from "../home/DomainSelector";
import { TabsLayout, TabTriggerButton } from "../ui/TabsLayout";
import {
  CustomInput,
  PrimaryActionButton,
  ApiStatusMessage,
} from "./HeroFormComponents";


const TAB_IDS = {
  REDIRECT: "redirect",
  SHORTEN: "shorten",
  CHECKER: "check",
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

export default function RedirectWidget({ fixed }: { fixed?: string }) {
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
  const [value, setValue] = useState<string>(fixed ?? TAB_IDS.REDIRECT);

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
              label={isLoading ? "Processing..." : "Shorten URL - it's FREE"}
              subtext="No Credit Card Needed • Change anytime"
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
              label={isLoading ? "Checking..." : "Check Redirect - it's FREE"}
              subtext="No Credit Card Needed • Change anytime"
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
      defaultValue={fixed ?? TAB_IDS.REDIRECT}
      value={value}
      onValueChange={(v) => {
        setValue(v);
        setApiStatus("");
      }}
      tabHeader={fixed ? null : tabHeader}
      tabBody={tabBody}
    />
  );
}
