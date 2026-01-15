import { Tabs, Box, HStack, Icon } from "@chakra-ui/react";
import React from "react";
import { IconType } from "react-icons";

interface TabsLayoutProps {
    defaultValue?: string;
    value?: string;
    onValueChange?: (value: string) => void;
    tabHeader: React.ReactNode;
    tabBody: React.ReactNode;
    maxW?: string | object;
    bg?: string;
    border?: string;
    boxShadow?: string;
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
            color="#717680"
            fontWeight="600"
            fontSize={{ base: "14px", md: "16px" }}
            lineHeight="24px"
            whiteSpace="nowrap"
            fontFamily="'Inter', sans-serif"
            transition="all 0.2s"
            border="1px solid transparent"
            _hover={{
                color: "#414651",
            }}
            _selected={{
                bg: "#FFFFFF",
                color: "#414651",
                fontWeight: "600",
                borderColor: "#D5D7DA",
                boxShadow: "0px 1px 2px rgba(10, 13, 18, 0.05)",
                "& svg": { color: "#FF4F17" },
            }}
        >
            <HStack gap={{ base: 1, md: 2 }} justify="center">
                {icon && (
                    <Icon
                        as={icon}
                        boxSize={{ base: 3, md: 4 }}
                        color="currentColor"
                        _selected={{ color: "#FF4F17" }}
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
    maxW = "1016px",
    bg = "#FFFFFF",
    border = "1px solid #E4E7EC",
    boxShadow = "0px 20px 24px -4px rgba(16, 24, 40, 0.08)",
}) => {
    return (
        <Box
            w="100%"
            maxW={maxW}
            minH="214px"
            mx="auto"
            bg={bg}
            borderRadius="32px"
            border={border}
            boxShadow={boxShadow}
            p={{ base: 3, md: 6 }}
        >
            <Tabs.Root
                defaultValue={defaultValue}
                value={value}
                onValueChange={(e) => onValueChange?.(e.value)}
                variant="enclosed"
            >
                <Tabs.List
                    w={{ base: "full", md: "fit-content" }}
                    minW={{ base: "auto", md: "396px" }}
                    minH={{ base: "auto", md: "44px" }}
                    mx="auto"
                    bg="#FAFAFA"
                    borderRadius="12px"
                    border="1px solid #E9EAEB"
                    gap="2px"
                    display="flex"
                    alignItems="center"
                    justifyContent={{ base: "flex-start", md: "center" }}
                    overflowX={{ base: "auto", md: "visible" }}
                    css={{
                        "&::-webkit-scrollbar": {
                            display: "none",
                        },
                        "msOverflowStyle": "none",
                        "scrollbarWidth": "none",
                    }}
                    mb={7}
                >
                    {tabHeader}
                </Tabs.List>

                <Box w="100%">
                    {tabBody}
                </Box>
            </Tabs.Root>
        </Box>
    );
};
