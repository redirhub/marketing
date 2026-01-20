"use client";

import React from "react";
import { Button, HStack, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { useSearchParams } from "next/navigation";

const StyledLink = Button as React.FC<any>;
interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  buttonProps?: React.ComponentProps<typeof Button>;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  buttonProps,
}) => {
  const searchParams = useSearchParams();
  if (totalPages <= 1) {
    return null;
  }

  const renderPageButton = (page: number) => {
    const isCurrent = page === currentPage;

    const activeStyle = {
      bg: "#d2e1f0",
      color: "#1d6db6",
      fontWeight: "600",
      boxShadow: "0 2px 8px rgba(210, 225, 240, 0.3)",
      _hover: { bg: "blue.200" },
    };

    const inactiveStyle = {
      bg: "white",
      color: "blue.600",
      _hover: { bg: "gray.50" },
    };

    return (
      <StyledLink
        key={page}
        as={NextLink}
        href={getPageUrl(page)}
        fontSize={"14px"}
        borderRadius="8px"
        variant="ghost"
        p={"8px"}
        minWidth="32px"
        h="32px"
        {...(isCurrent ? activeStyle : inactiveStyle)}
        {...buttonProps}
      >
        {page}
      </StyledLink>
    );
  };

  const pageNumbersToShow: number[] = [];

  if (totalPages >= 1) pageNumbersToShow.push(1);

  // Add pages around the current page
  for (
    let i = Math.max(2, currentPage - 1);
    i <= Math.min(totalPages - 1, currentPage + 1);
    i++
  ) {
    pageNumbersToShow.push(i);
  }

  if (totalPages > 1 && !pageNumbersToShow.includes(totalPages)) {
    pageNumbersToShow.push(totalPages);
  }

  const uniquePageNumbers = Array.from(new Set(pageNumbersToShow)).sort(
    (a, b) => a - b
  );

  const finalPages: (number | "ellipsis")[] = [];
  let lastPage = 0;
  uniquePageNumbers.forEach((page) => {
    if (page - lastPage > 1) {
      finalPages.push("ellipsis");
    }
    finalPages.push(page);
    lastPage = page;
  });
  const getPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    return `?${params.toString()}`;
  };

  return (
    <HStack gap={2} justify="center" align="center" py={8}>
      <StyledLink
        px={3}
        as={NextLink}
        href={getPageUrl(currentPage - 1)}
        py={1}
        borderRadius={"8px"}
        fontSize={"14px"}
        bg="gray.100"
        color="gray.500"
        border="1px solid #d2e1f0"
        h="32px"
        pointerEvents={currentPage === 1 ? "none" : "auto"}
        disabled={currentPage === 1}
        _hover={{
          border: "1px solid #1C6DB6",
          color: "#1C6DB6",
        }}
        {...buttonProps}
      >
        Previous
      </StyledLink>

      {finalPages.map((page, index) => (
        <React.Fragment key={index}>
          {page === "ellipsis" ? (
            <Text px={2} color="gray.500">
              ...
            </Text>
          ) : (
            renderPageButton(page as number)
          )}
        </React.Fragment>
      ))}

      <StyledLink
        px={3}
        py={1}
        as={NextLink}
        href={getPageUrl(currentPage + 1)}
        borderRadius={"8px"}
        fontSize={"14px"}
        fontWeight={600}
        bg="gray.100"
        h="32px"
        color="#798294"
        disabled={currentPage === totalPages}
        _hover={{
          border: "1px solid #1C6DB6",
          color: "#1C6DB6",
        }}
        {...buttonProps}
      >
        Next
      </StyledLink>
    </HStack>
  );
};

export default PaginationControls;
