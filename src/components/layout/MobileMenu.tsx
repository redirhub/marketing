"use client";

import {
    Drawer,
    Accordion,
    Box,
    Flex,
    Text,
    VStack,
    HStack,
    Icon,
    Button
} from "@chakra-ui/react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { FaBars, FaTimes, FaChevronDown } from "react-icons/fa";
import { getAppName, getDashboardBase } from "@/lib/utils/constants";
import { useState } from "react";
import Image from "next/image";

interface MobileMenuProps {
    navItems: any[];
}

export default function MobileMenu({ navItems }: MobileMenuProps) {
    const { t } = useTranslation("common");
    const [open, setOpen] = useState(false);

    return (
        <Drawer.Root open={open} onOpenChange={(e) => setOpen(e.open)} placement="end">
            <Drawer.Trigger asChild>
                <Box
                    as="button"
                    display={{ base: "flex", xl: "none" }}
                    p={2}
                    color="#FFFFFF"
                    cursor='pointer'
                    backgroundColor="#1D7BAD"
                    borderRadius={'md'}
                >
                    <FaBars size={24} />
                </Box>
            </Drawer.Trigger>
            <Drawer.Backdrop />
            <Drawer.Positioner>
                <Drawer.Content bgImage="linear-gradient(163deg, #1c6db6 0%, #20a795 86%)" maxW="320px" h="100vh">
                    <Drawer.Header p={4} borderBottom="1px solid" borderColor="whiteAlpha.200">
                        <Flex justify="space-between" align="center">
                            <Box>
                                <Image
                                    src="/assets/images/Logo.png"
                                    alt={getAppName()}
                                    width={100}
                                    height={32}
                                    style={{ height: "auto" }}
                                />
                            </Box>
                            <Drawer.CloseTrigger asChild>
                                <Box as="button" p={1.5} color="white" cursor={'pointer'} borderRadius={'md'} _hover={{ backgroundColor: "#1b8dcbe3" }}>
                                    <FaTimes size={20} />
                                </Box>
                            </Drawer.CloseTrigger>
                        </Flex>
                    </Drawer.Header>

                    <Drawer.Body
                        p={0}
                        overflowY="auto"
                        css={{
                            "&::-webkit-scrollbar": { display: "none" },
                            "scrollbarWidth": "none",
                            "-ms-overflow-style": "none",
                        }}
                    >
                        <Accordion.Root multiple defaultValue={[]}>
                            {navItems.map((item, index) => {
                                const hasSubItems = item.items || item.megaMenu;

                                if (hasSubItems) {
                                    return (
                                        <Accordion.Item key={index} value={item.label} borderBottom="1px solid" borderColor="whiteAlpha.200">
                                            <Accordion.ItemTrigger py={4} px={5} _hover={{ bg: "whiteAlpha.100" }} width="100%">
                                                <Flex justify="space-between" align="center" width="100%" cursor={'pointer'}>
                                                    <Text fontWeight="medium" fontSize="16px" color="white">
                                                        {item.label}
                                                    </Text>
                                                    <Accordion.ItemIndicator>
                                                        <FaChevronDown size={8} color="white" />
                                                    </Accordion.ItemIndicator>
                                                </Flex>
                                            </Accordion.ItemTrigger>
                                            <Accordion.ItemContent bg="transparent">
                                                <VStack align="stretch" gap={0}>
                                                    {item.megaMenu ? (
                                                        <>
                                                            {item.megaMenu.columns.map((col: any, colIdx: number) => (
                                                                <Box key={colIdx}>
                                                                    {col.header && (
                                                                        <Text
                                                                            px={5}
                                                                            pt={4}
                                                                            pb={2}
                                                                            fontSize="xs"
                                                                            fontWeight="bold"
                                                                            color="whiteAlpha.700"
                                                                            textTransform="uppercase"
                                                                        >
                                                                            {col.header}
                                                                        </Text>
                                                                    )}
                                                                    {col.items.map((subItem: any, subIdx: number) => (
                                                                        <Link key={subIdx} href={subItem.href || "#"} onClick={() => setOpen(false)}>
                                                                            <HStack py={3} px={5} gap={3} _hover={{ bg: "whiteAlpha.100" }}>
                                                                                {subItem.icon && (
                                                                                    typeof subItem.icon === 'string' ? (
                                                                                        <Image src={subItem.icon} alt={subItem.label} width={20} height={20} style={{ filter: "brightness(0) invert(1)" }} />
                                                                                    ) : (
                                                                                        <Icon as={subItem.icon} boxSize={5} color="white" />
                                                                                    )
                                                                                )}
                                                                                <Text fontSize="15px" color="white" fontWeight="medium">
                                                                                    {subItem.label}
                                                                                </Text>
                                                                            </HStack>
                                                                        </Link>
                                                                    ))}
                                                                </Box>
                                                            ))}
                                                            {item.megaMenu.footer && (
                                                                <Box borderTop="1px solid" borderColor="whiteAlpha.200" mt={2}>
                                                                    {item.megaMenu.footer.map((footerItem: any, fIdx: number) => (
                                                                        <Link key={fIdx} href={footerItem.href || "#"} onClick={() => setOpen(false)}>
                                                                            <HStack py={3} px={5} gap={3} _hover={{ bg: "whiteAlpha.100" }}>
                                                                                {footerItem.icon && (
                                                                                    typeof footerItem.icon === 'string' ? (
                                                                                        <Image src={footerItem.icon} alt={footerItem.label} width={16} height={16} style={{ filter: "brightness(0) invert(1)" }} />
                                                                                    ) : (
                                                                                        <Icon as={footerItem.icon} boxSize={4} color="white" />
                                                                                    )
                                                                                )}
                                                                                <Text fontSize="14px" color="white" fontWeight="medium">
                                                                                    {footerItem.label}
                                                                                </Text>
                                                                            </HStack>
                                                                        </Link>
                                                                    ))}
                                                                </Box>
                                                            )}

                                                        </>
                                                    ) : (
                                                        item.items.map((subItem: any, subIdx: number) => (
                                                            <Link key={subIdx} href={subItem.href || "#"} onClick={() => setOpen(false)}>
                                                                <Box py={3} px={5} _hover={{ bg: "whiteAlpha.100" }}>
                                                                    <Text fontSize="15px" color="white" fontWeight="medium">
                                                                        {subItem.label}
                                                                    </Text>
                                                                </Box>
                                                            </Link>
                                                        ))
                                                    )}
                                                </VStack>
                                            </Accordion.ItemContent>
                                        </Accordion.Item>
                                    );
                                }

                                return (
                                    <Link key={index} href={item.href || "#"} onClick={() => setOpen(false)}>
                                        <Box py={4} px={5} borderBottom="1px solid" borderColor="whiteAlpha.200" _hover={{ bg: "whiteAlpha.100" }}>
                                            <Text fontWeight="medium" fontSize="16px" color="white">
                                                {item.label}
                                            </Text>
                                        </Box>
                                    </Link>
                                );
                            })}
                        </Accordion.Root>
                    </Drawer.Body>

                    <Drawer.Footer p={4} borderTop="1px solid" borderColor="whiteAlpha.200">
                        <VStack width="100%" gap={3}>
                            <Link href={`${getDashboardBase()}/login`} style={{ width: '100%' }}>
                                <Button variant="outline" width="100%" size="lg" borderRadius="xl" color="white" borderColor="white" _hover={{ bg: "whiteAlpha.200" }} onClick={() => setOpen(false)}>
                                    {t(`nav.login`, "Login")}
                                </Button>
                            </Link>
                            <Link href={`${getDashboardBase()}/register`} style={{ width: '100%' }}>
                                <Button bg="brand.solid" color="white" width="100%" size="lg" borderRadius="xl" _hover={{ bg: "brand.hover" }} onClick={() => setOpen(false)}>
                                    {t(`nav.getStarted`, "Sign Up")}
                                </Button>
                            </Link>
                        </VStack>
                    </Drawer.Footer>

                </Drawer.Content>
            </Drawer.Positioner>
        </Drawer.Root>
    );
}
