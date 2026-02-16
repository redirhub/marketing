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
  isDark: boolean;
}

export default function MenuDropdown({
  label,
  items,
  megaMenu,
  isDark,
}: FeaturesDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const activeStyles = {
    backgroundColor: !isDark
      ? "header.bg.hover.dark"
      : "header.bg.hover.light",
    borderColor: !isDark
      ? "header.bg.border.dark"
      : "header.bg.border.light",
  };

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  return (
    <Box onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <Menu.Root
        open={isOpen}
        onOpenChange={(e) => setIsOpen(e.open)}
        positioning={{
          placement: "bottom-start",
          offset: { mainAxis: 8, crossAxis: 0 },
        }}
      >
        <Menu.Trigger asChild>
          <Box 
            py={"10px"}
            display="inline-block"
            >
            <Box
              as="button"
              fontSize="18px"
              fontWeight="medium"
              lineHeight="24px"
              letterSpacing="0.2px"
              fontFamily="Inter"
              color={!isDark ? "header.text.dark" : "header.text.light"}
              display="flex"
              alignItems="center"
              cursor="pointer"
              gap={2.5}
              _focus={{ outline: "none" }}
              padding={"10px 14px 10px 14px"}
              borderRadius={"12px"}
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
          </Box>
        </Menu.Trigger>
        <Menu.Positioner marginTop={`-8px`}>
          <Menu.Content
            maxW={"632px"}
            bg="white"
            boxShadow="xl"
            borderRadius="3xl"
            border="1px solid"
            borderColor="gray.200"
          >
            {megaMenu ? (
              <Box>
                <Grid
                  templateColumns="repeat(2, 1fr)"
                  gap={8}
                  p={megaMenu ? 6 : 1}
                >
                  {megaMenu.columns.map((col: any, idx: number) => (
                    <Box key={idx}>
                      {col.header && (
                        <Text
                          fontSize="xs"
                          fontWeight="bold"
                          color="gray.500"
                          mb={5}
                          letterSpacing="wider"
                          textTransform="uppercase"
                        >
                          {col.header}
                        </Text>
                      )}
                      <VStack align="stretch" gap={4}>
                        {col.items.map((item: any, i: number) => (
                          <Link
                            key={i}
                            href={item.href}
                            target={item.target === "blank" ? "_blank" : undefined}
                            onClick={() => setIsOpen(false)}
                            style={{ textDecoration: "none", outline: "none" }}
                          >
                            <HStack
                              align="start"
                              gap={3}
                              data-group
                              p={3}
                              borderRadius="lg"
                              transition="all 0.2s"
                              _hover={{
                                cursor: "pointer",
                                bg: "gray.50",
                              }}
                              _focus={{ outline: "none" }}
                            >
                              <Box
                                p={2}
                                minWidth={"40px"}
                                minHeight={"40px"}
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                borderRadius="md"
                                bg="gray.100"
                                color="gray.700"
                                _groupHover={{
                                  bg: "gray.200",
                                  color: "gray.900",
                                }}
                                transition="all 0.2s"
                                _focus={{ outline: "none" }}
                              >
                                {typeof item.icon === "string" ? (
                                  <Image
                                    src={item.icon}
                                    alt={item.label}
                                    width={24}
                                    height={24}
                                    preload
                                  />
                                ) : (
                                  <Icon as={item.icon} boxSize={5} />
                                )}
                              </Box>
                              <Box>
                                <Text
                                  fontSize="md"
                                  fontWeight="semibold"
                                  color="gray.900"
                                  _groupHover={{ color: "gray.900" }}
                                >
                                  {item.label}
                                </Text>
                                <Text
                                  fontSize="sm"
                                  color="gray.600"
                                  lineHeight="short"
                                  mt={0.5}
                                >
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
                  <Box
                    px={6}
                    py={4}
                    borderTop="1px solid"
                    borderColor="gray.200"
                    bg="gray.50"
                  >
                    <HStack gap={4}>
                      {megaMenu.footer.map((item: any, idx: number) => (
                        <Link
                          key={idx}
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                        >
                          <HStack
                            gap={2}
                            px={3}
                            py={2}
                            borderRadius="md"
                            color="gray.700"
                            _hover={{
                              color: "gray.900",
                              bg: "gray.100",
                            }}
                            transition="all 0.2s"
                          >
                            {typeof item.icon === "string" ? (
                              <Image
                                src={item.icon}
                                alt={item.label}
                                width={20}
                                height={20}
                              />
                            ) : (
                              <Icon
                                as={item.icon}
                                boxSize={5}
                                color="gray.500"
                              />
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
                      fontWeight="medium"
                      color="gray.900"
                      _hover={{ color: "gray.900", bg: "gray.50" }}
                      py={2}
                      px={3}
                      borderRadius="md"
                      cursor="pointer"
                      transition="all 0.2s"
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
    </Box>
  );
}
