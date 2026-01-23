"use client";

import Link from "next/link";
import { VStack, Box, Text, Icon } from "@chakra-ui/react";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();
  const categories = [
    { name: "All", path: "/support", tag: null },
    { name: "FAQ", path: "/support/category/faq", tag: "FAQ" },
    { name: "Feature", path: "/support/category/feature", tag: "Feature" },
    { name: "Guide", path: "/support/category/guide", tag: "Guide" },
    { name: "Walkthroughs", path: "/support/category/walkthroughs", tag: "Walkthroughs" },
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
              borderColor={"#E9E9E9"}
              bg={"transparent"}
              color={"#667085"}
              transition="all 0.2s"
              borderRadius={"8px"}
              _hover={{
                bg: "#797A7C30",
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
