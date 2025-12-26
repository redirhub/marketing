import { Stack, Text, Link as ChakraLink } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

interface LinkItem {
  label: string;
  href: string;
}

interface FooterLinkColumnProps {
  title: string;
  links: LinkItem[];
}

export const FooterLinkColumn: React.FC<FooterLinkColumnProps> = ({
  title,
  links,
}) => {
  return (
    <Stack
      gap={3}
      alignItems={{ base: "center", md: "center", lg: "flex-start" }}
    >
      <Text
        fontSize="1.1rem"
        fontWeight={700}
        lineHeight="2rem"
        letterSpacing="0.4px"
        color="#667085"
        pb={2}
      >
        {title}
      </Text>

      {links.map((link) => {
        return (
          <Link
            key={link.href}
            href={link.href}
            target={(link as any).target === "blank" ? "_blank" : undefined}
            rel={
              (link as any).target === "blank"
                ? "noopener noreferrer"
                : undefined
            }
          >
            <Text
              fontSize="15px"
              fontWeight={400}
              letterSpacing="0.2px"
              color="#101828"
              _hover={{ color: "#1C6DB6" }}
              transition="color 0.2s ease"
            >
              {link.label}
            </Text>
          </Link>
        );
      })}
    </Stack>
  );
};
