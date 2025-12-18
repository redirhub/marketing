import { Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

export interface FooterLinkItem {
  label: string;
  href: string;
}

export interface FooterLinks {
  legal: FooterLinkItem[];
}

interface FooterBottomBarProps {
  footerLinks: FooterLinks;
}

export const FooterBottomBar: React.FC<FooterBottomBarProps> = ({
  footerLinks,
}) => {
  const currentYear = new Date().getFullYear();

  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      justify={{ base: "center", md: "space-between" }}
      align="center"
      pt={8}
      borderTopWidth="0"
      gap={4}
    >
      <Flex
        gap={4}
        flexWrap="wrap"
        justify={{ base: "center", md: "flex-start" }}
      >
        {footerLinks.legal?.map((link, index) => (
          <React.Fragment key={link.href}>
            <Link href={link.href} passHref>
              <Text
                fontSize="sm"
                color="gray.600"
                _hover={{ color: "blue.600" }}
              >
                {link.label}
              </Text>
            </Link>

            {index < footerLinks.legal.length - 1 && (
              <Text fontSize="sm" color="gray.400">
                -
              </Text>
            )}
          </React.Fragment>
        ))}
      </Flex>

      {/* Copyright Text */}
      <Text fontSize="sm" color="gray.600">
        © Copyright - RedirHub
      </Text>
    </Flex>
  );
};
