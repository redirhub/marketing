"use client";

import { useState } from "react";
import { Box, SimpleGrid } from "@chakra-ui/react";
import { createRedirect, ApiResponse } from "@/app/api/redirhub";
import { Text } from "@chakra-ui/react";
import {
  parseApiErrorMessage,
  parseApiSuccessMessage,
} from "@/components/home/HeroTabs.utils";
import { TabContentWrapper } from "@/components/home/TabContentWrapper";
import { CustomInput, PrimaryActionButton } from "@/components/home/HeroTabPanel";

const FORM_GRID_PROPS = {
  columns: { base: 1, md: 5 } as const,
  gap: 3,
  w: "100%",
  gridTemplateColumns: { base: "1fr", md: "2fr 2fr 1fr" } as const,
};

export default function RedirectForm() {
  // 1. STATE MANAGEMENT
  const [redirectFrom, setRedirectFrom] = useState("");
  const [redirectTo, setRedirectTo] = useState("");
  const [apiStatus, setApiStatus] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // 2. API FLOW LOGIC
  const handleRedirectSubmit = async () => {
    // Validation
    if (!redirectFrom || !redirectTo) {
      return setApiStatus("Please fill both Redirect URL fields.");
    }

    setIsLoading(true);
    setApiStatus(""); // Clear status before starting

    try {
      const response: ApiResponse = await createRedirect({
        from: redirectFrom,
        to: redirectTo,
      });

      setIsLoading(false);

      if (response.success) {
        // Check if API returned a direct redirect URL (navigation)
        const navUrl = response.data?.data?.data?.redirect_url;
        if (navUrl) {
          window.location.href = navUrl;
          return;
        }
        // Otherwise show success message
        setApiStatus(parseApiSuccessMessage(response));
      } else {
        // Handle API errors (400, 500, etc)
        setApiStatus(parseApiErrorMessage(response));
      }
    } catch (error) {
      setIsLoading(false);
      setApiStatus("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <Box pb={26} w="100%">
      <TabContentWrapper
        title="Create redirects for free"
        description="No Credit Card Needed. Change destination at anytime."
        maxW="5xl"
      >
        <SimpleGrid {...FORM_GRID_PROPS}>
          <CustomInput
            label="Redirect from"
            placeholder="www.olddomain.com"
            value={redirectFrom}
            onChange={(e) => setRedirectFrom(e.target.value)}
          />
          <CustomInput
            label="Redirect To"
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

        {/* Status Message Display */}
        {apiStatus && (
          <Text fontSize="sm" color="#333" textAlign="left" mt={2}>
            {apiStatus}
          </Text>
        )}
      </TabContentWrapper>
    </Box>
  );
}
