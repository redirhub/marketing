"use client";

import { Box, SimpleGrid } from "@chakra-ui/react";
import { useState } from "react";
import { ApiResponse, createRedirect } from "@/app/api/redirhub";
import { parseApiErrorMessage, parseApiSuccessMessage } from "../sections/RedirectWidget.utils";
import {
  CustomInput,
  PrimaryActionButton,
  ApiStatusMessage,
} from "../sections/HeroFormComponents";

const FORM_GRID_PROPS = {
  columns: { base: 1, md: 5 } as const,
  gap: 4,
  w: "100%",
  gridTemplateColumns: { base: "1fr", md: "1.5fr 1.5fr 1fr" } as const,
  alignItems: "flex-start",
};

export default function RedirectWidget() {
  const [redirectFrom, setRedirectFrom] = useState("");
  const [redirectTo, setRedirectTo] = useState("");
  const [apiStatus, setApiStatus] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
    setApiStatus("");
    const response = await createRedirect({
      from: redirectFrom,
      to: redirectTo,
    });
    handleApiResponse(response);
  };

  return (
    <Box
      bg="whiteAlpha.84"
      backdropFilter="blur(12px)"
      borderRadius="24px"
      p={{ base: 6, md: 8 }}
      w="100%"
      maxW="1000px"
      mx="auto"
      mt={8}
      border="1px solid"
      borderColor="whiteAlpha.72"
      boxShadow="0 8px 32px rgba(0, 0, 0, 0.12)"
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
          label={isLoading ? "Processing..." : "Create Redirect - it's FREE"}
          subtext="No Credit Card Needed • Change anytime"
          onClick={handleRedirectSubmit}
          disabled={isLoading}
        />
      </SimpleGrid>
      <ApiStatusMessage message={apiStatus} />
    </Box>
  );
}
