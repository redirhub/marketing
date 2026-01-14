"use client";

import { Box, Menu, Grid, Text, Icon, VStack, HStack } from "@chakra-ui/react";
import Link from "next/link";
import { FaChevronDown } from "react-icons/fa";
import { useState } from "react";
import Image from "next/image";

export interface FeaturesDropdownProps {
    label: string;
    items?: Array<{ href: string; label: string }>;
    megaMenu?: any;
    isScrolled: boolean;
}

export default function FeaturesDropdown({
    label,
    items,
    megaMenu,
    isScrolled,
}: FeaturesDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const activeStyles = {
        backgroundColor: isScrolled ? "#D5D7DA" : "rgba(255, 255, 255, 0.16)",
        borderColor: isScrolled ? "transparent" : "rgba(255, 255, 255, 0.3)",
    };

    return (
        <Menu.Root
            open={isOpen}
            onOpenChange={(e) => setIsOpen(e.open)}
            positioning={{ placement: "bottom-start", offset: { mainAxis: 8, crossAxis: 0 } }}
        >
            <Menu.Trigger asChild>
                <Box
                    as="button"
                    fontSize="18px"
                    fontWeight="medium"
                    lineHeight="24px"
                    letterSpacing="0.2px"
                    fontFamily="Inter"
                    color={isScrolled ? "#181D27" : "#FFFFFF"}
                    display="flex"
                    alignItems="center"
                    cursor="pointer"
                    gap={2.5}
                    _focus={{ outline: 'none' }}
                    padding={'10px 14px 10px 14px'}
                    borderRadius={'12px'}
                    border="1px solid transparent"
                    _hover={activeStyles}
                    _active={activeStyles}
                    {...(isOpen && activeStyles)}
                >
                    {label}
                    <Box
                        as="span"
                        display="inline-flex"
                        transform={isOpen ? "rotate(180deg)" : "rotate(0deg)"}
                        transition="transform 0.2s ease-in-out"
                    >
                        <FaChevronDown size={14} />
                    </Box>
                </Box>
            </Menu.Trigger>
            <Menu.Positioner>
                <Menu.Content
                    maxW={'632px'}
                    bg="white"
                    boxShadow="xl"
                    borderRadius="24px"
                    border="1px solid"
                    borderColor="gray.100"
                >
                    {megaMenu ? (
                        <Box>
                            <Grid templateColumns="repeat(2, 1fr)" gap={8} p={megaMenu ? 6 : 1}>
                                {megaMenu.columns.map((col: any, idx: number) => (
                                    <Box key={idx}>
                                        {col.header && (
                                            <Text
                                                fontSize="xs"
                                                fontWeight="bold"
                                                color="#717680"
                                                mb={5}
                                                letterSpacing="wider"
                                                textTransform="uppercase"
                                            >
                                                {col.header}
                                            </Text>
                                        )}
                                        <VStack align="stretch" gap={4}>
                                            {col.items.map((item: any, i: number) => (
                                                <Link key={i} href={item.href} onClick={() => setIsOpen(false)} style={{ textDecoration: 'none', outline: 'none' }}>
                                                    <HStack align="start" gap={3} data-group _hover={{ cursor: "pointer" }} _focus={{ outline: "none" }}>
                                                        <Box
                                                            p={2}
                                                            minWidth={'40px'}
                                                            minHeight={'40px'}
                                                            display="flex"
                                                            alignItems="center"
                                                            justifyContent="center"
                                                            borderRadius="md"
                                                            bg="#F5F5F5"
                                                            color="#414651"
                                                            _groupHover={{ bg: "#F5F5F5", color: "black" }}
                                                            transition="all 0.2s"
                                                            _focus={{ outline: "none" }}
                                                        >
                                                            {typeof item.icon === 'string' ? (
                                                                <Image src={item.icon} alt={item.label} width={24} height={24} />
                                                            ) : (
                                                                <Icon as={item.icon} boxSize={5} />
                                                            )}
                                                        </Box>
                                                        <Box>
                                                            <Text
                                                                fontSize="md"
                                                                fontWeight="semibold"
                                                                color="gray.900"
                                                                _groupHover={{ color: "black" }}
                                                            >
                                                                {item.label}
                                                            </Text>
                                                            <Text fontSize="sm" color="gray.500" lineHeight="short" mt={0.5}>
                                                                {item.description}
                                                            </Text>
                                                        </Box>
                                                    </HStack>
                                                </Link>
                                            ))}
                                        </VStack>
                                    </Box>
                                ))}
                            </Grid>

                            {megaMenu.footer && (
                                <Box px={6} py={4} borderTop="1px solid" borderColor="#E9EAEB" bg={'#FAFAFA'}>
                                    <HStack gap={8}>
                                        {megaMenu.footer.map((item: any, idx: number) => (
                                            <Link key={idx} href={item.href} onClick={() => setIsOpen(false)}>
                                                <HStack
                                                    gap={2}
                                                    color="gray.600"
                                                    _hover={{ color: "black" }}
                                                    transition="color 0.2s"
                                                >
                                                    {typeof item.icon === 'string' ? (
                                                        <Image src={item.icon} alt={item.label} width={20} height={20} />
                                                    ) : (
                                                        <Icon as={item.icon} boxSize={5} color="gray.400" />
                                                    )}
                                                    <Text fontSize="md" fontWeight="semibold">
                                                        {item.label}
                                                    </Text>
                                                </HStack>
                                            </Link>
                                        ))}
                                    </HStack>
                                </Box>
                            )}

                        </Box>
                    ) : (
                        items?.map((subItem) => (
                            <Menu.Item key={subItem.href} value={subItem.href} asChild>
                                <Link href={subItem.href} onClick={() => setIsOpen(false)}>
                                    <Box
                                        fontSize="sm"
                                        color="#000"
                                        _hover={{ color: "primary.700", bg: "gray.50" }}
                                        py={2}
                                        px={3}
                                        borderRadius="sm"
                                        cursor={"pointer"}
                                    >
                                        {subItem.label}
                                    </Box>
                                </Link>
                            </Menu.Item>
                        ))
                    )}
                </Menu.Content>
            </Menu.Positioner>
        </Menu.Root>
    );
}
