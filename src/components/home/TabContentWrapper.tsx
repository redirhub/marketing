import { Box, Heading, Text, Stack } from "@chakra-ui/react";

interface TabContentWrapperProps {
  title?: string;
  description?: string;
  maxW?: string;
  children: React.ReactNode;
}

/**
 * Wrapper component for tab content panels in the hero section.
 * Provides consistent styling and layout for all tab content.
 */
export const TabContentWrapper: React.FC<TabContentWrapperProps> = ({
  title,
  description,
  children,
}) => {
  return (
    <Box w="100%" display="flex" flexDirection="column" alignItems={{ base: "flex-start", md: "center" }}>
      <Stack gap={4} w="full">
        <Box textAlign="left">
          {title && (
            <Heading
              fontSize="1.5rem"
              textAlign="left"
              fontWeight="600"
              letterSpacing="0.4px"
              color="#333"
            >
              {title}
            </Heading>
          )}
          {description && (
            <Text color="#667085" fontSize="1rem" mt={1}>
              {description}
            </Text>
          )}
        </Box>
        {children}
      </Stack>
    </Box>
  );
};
