"use client";

import Link from "next/link";
import { VStack, Box, Text, Icon } from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import { useLocalePath } from "@/lib/hooks/useLocalePath";

export default function Sidebar() {
  const pathname = usePathname();
  const { t } = useTranslation();
  const localePath = useLocalePath();

  const categories = [
    { name: t("support.cat-all", "All"), path: localePath("/support"), tag: null },
    { name: t("support.cat-faq", "FAQ"), path: localePath("/support/category/faq"), tag: "FAQ" },
    { name: t("support.cat-feature", "Feature"), path: localePath("/support/category/feature"), tag: "Feature" },
    { name: t("support.cat-guide", "Guide"), path: localePath("/support/category/guide"), tag: "Guide" },
    { name: t("support.cat-walkthroughs", "Walkthroughs"), path: localePath("/support/category/walkthroughs"), tag: "Walkthroughs" },
  ];

  return (
    <VStack align="stretch" gap={3}>
      {categories.map((cat) => {
        const isActive = pathname === cat.path;

        return (
          <Link
            key={cat.name}
            href={cat.path}
            passHref
            style={{ textDecoration: "none" }}
          >
            <Box
              px={"24px"}
              py={"9px"}
              border="1px solid"
              cursor="pointer"
              borderColor={isActive ? "#f8eadb" : "#E9E9E9"}
              bg={isActive ? "#fcefe2" : "transparent"}
              color={isActive ? "#d65334" : "#565d6c"}
              transition="all 0.2s"
              borderRadius={"8px"}
              _hover={{
                bg: "#faf3eb",
                borderColor: "#E9E9E9",
              }}
              textAlign={{ base: "center", md: "left" }}
            >
              <Text fontWeight={"normal"} fontSize={"14px"}>
                {cat.name}
              </Text>
            </Box>
          </Link>
        );
      })}
    </VStack>
  );
}
