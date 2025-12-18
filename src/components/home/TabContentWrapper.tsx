import { Box, Heading, Text, Stack } from "@chakra-ui/react";

interface TabContentWrapperProps {
  title: string;
  description: string;
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
