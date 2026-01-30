import { Tabs, Box, HStack, Icon, type BoxProps } from "@chakra-ui/react";
import React from "react";
import { IconType } from "react-icons";

interface TabsLayoutProps {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  tabHeader: React.ReactNode;
  tabBody: React.ReactNode;
  headerRight?: React.ReactNode;
  maxW?: string | object;
  bg?: string;
  border?: string;
  boxShadow?: string;
  p?: BoxProps["p"];
}

interface TabTriggerButtonProps {
  value: string;
  label: string;
  icon?: IconType;
}

export const TabTriggerButton: React.FC<TabTriggerButtonProps> = ({
  value,
  label,
  icon,
}) => {
  return (
    <Tabs.Trigger
      value={value}
      display="flex"
      flexDirection="row"
      justifyContent="center"
      alignItems="center"
      px={{ base: "6px", md: "12px" }}
      py="8px"
      gap={{ base: "6px", md: "8px" }}
      minW={{ base: "auto", md: "127px" }}
      minH={{ base: "auto", md: "44px" }}
      flex={{ base: 1, md: "initial" }}
      borderRadius="12px"
      color="gray.500"
      fontWeight="600"
      fontSize={{ base: "14px", md: "16px" }}
      lineHeight="24px"
      whiteSpace="nowrap"
      fontFamily="'Inter', sans-serif"
      transition="all 0.2s"
      border="1px solid transparent"
      _hover={{
        color: "gray.700",
      }}
      _selected={{
        bg: "white",
        color: "gray.700",
        fontWeight: "600",
        borderColor: "gray.300",
        boxShadow: "0px 1px 2px rgba(10, 13, 18, 0.05)",
        "& svg": { color: "brand.focus" },
      }}
    >
      <HStack gap={{ base: 1, md: 2 }} justify="center">
        {icon && (
          <Icon
            as={icon}
            boxSize={{ base: 3, md: 4 }}
            color="currentColor"
            _selected={{ color: "brand.focus" }}
          />
        )}
        {label}
      </HStack>
    </Tabs.Trigger>
  );
};

export const TabsLayout: React.FC<TabsLayoutProps> = ({
  defaultValue,
  value,
  onValueChange,
  tabHeader,
  tabBody,
  headerRight,
  maxW = "1016px",
  bg = "#FFFFFF",
  border = "1px solid #E4E7EC",
  boxShadow = "0px 20px 24px -4px rgba(16, 24, 40, 0.08)",
  p = { base: 3, md: 6 },
}) => {
  return (
    <Box
      w="100%"
      maxW={maxW}
      mx="auto"
      bg={bg}
      borderRadius={{ base: '18px', md: "32px" }}
      border={border}
      boxShadow={boxShadow}
      p={p}
    >
      <Tabs.Root
        defaultValue={defaultValue}
        value={value}
        onValueChange={(e) => onValueChange?.(e.value)}
        variant="enclosed"
      >
        <HStack
          w="full"
          justify={headerRight ? "space-between" : "center"}
          align="center"
          mb={2}
          gap={4}
          flexWrap="wrap"
        >
          {!!tabHeader && (
            <Tabs.List
              w={{ base: "full", md: "fit-content" }}
              minH={{ base: "auto", md: "44px" }}
              mx={headerRight ? "0" : "auto"}
              bg="gray.50"
              borderRadius="12px"
              border="1px solid"
              borderColor="gray.200"
              gap="2px"
              display="flex"
              alignItems="center"
              justifyContent={{ base: "flex-start", md: "center" }}
              overflowX={{ base: "auto", md: "visible" }}
              css={{
                "&::-webkit-scrollbar": {
                  display: "none",
                },
                msOverflowStyle: "none",
                scrollbarWidth: "none",
              }}
            >
              {tabHeader}
            </Tabs.List>
          )}
          {headerRight && <Box>{headerRight}</Box>}
        </HStack>

        <Box w="100%">{tabBody}</Box>
      </Tabs.Root>
    </Box>
  );
};
