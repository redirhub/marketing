"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Box, Container, Flex, Heading, Text, Spinner } from "@chakra-ui/react";
import NextLink from "next/link";
import { formatDate } from "@/lib/services/changelog";
import type { ChangelogEntry } from "@/types/sanity";

interface InfiniteScrollChangelogProps {
  initialEntries: ChangelogEntry[];
  initialCursor: string | null;
  locale: string;
}

export default function InfiniteScrollChangelog({
  initialEntries,
  initialCursor,
  locale,
}: InfiniteScrollChangelogProps) {
  const [entries, setEntries] = useState<ChangelogEntry[]>(initialEntries);
  const [cursor, setCursor] = useState<string | null>(initialCursor);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(!!initialCursor);
  const observerTarget = useRef<HTMLDivElement>(null);

  const loadMore = useCallback(async () => {
    if (loading || !hasMore || !cursor) return;

    setLoading(true);
    try {
      const response = await fetch(
        `/api/changelog?locale=${locale}&cursor=${encodeURIComponent(cursor)}`
      );
      const data = await response.json();

      setEntries((prev) => [...prev, ...data.entries]);
      setCursor(data.nextCursor);
      setHasMore(!!data.nextCursor);
    } catch (error) {
      console.error("Failed to load more changelog entries:", error);
    } finally {
      setLoading(false);
    }
  }, [cursor, loading, hasMore, locale]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    const target = observerTarget.current;
    if (target) {
      observer.observe(target);
    }

    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  }, [loadMore, hasMore, loading]);

  return (
    <Box py={16} bg="gray.50" minH="100vh">
      <Container maxW="4xl" mx="auto" px={{ base: 4, md: 6 }}>
        {entries.map((entry, index) => {
          const href =
            locale === "en"
              ? `/changelog/${entry.slug.current}`
              : `/${locale}/changelog/${entry.slug.current}`;
          const isLast = index === entries.length - 1;

          return (
            <Flex
              key={entry._id}
              gap={6}
              position="relative"
              pb={isLast ? 0 : 16}
            >
              {/* Date column */}
              <Box w="120px" flexShrink={0} textAlign="right" pt={1}>
                <Text fontSize="sm" color="gray.500">
                  {formatDate(entry.publishedAt)}
                </Text>
              </Box>

              {/* Timeline dot and line */}
              <Box position="relative" w="20px" flexShrink={0}>
                <Box
                  w="8px"
                  h="8px"
                  borderRadius="full"
                  bg="primary.600"
                  position="absolute"
                  left="6px"
                  top="8px"
                />
                {!isLast && (
                  <Box
                    position="absolute"
                    left="9px"
                    top="16px"
                    bottom="-64px"
                    w="1px"
                    bg="gray.300"
                  />
                )}
              </Box>

              {/* Content column */}
              <Box flex={1} pb={4}>
                <NextLink href={href} style={{ textDecoration: "none" }}>
                  <Heading
                    as="h2"
                    fontSize={{ base: "xl", md: "2xl" }}
                    fontWeight="600"
                    color="gray.900"
                    mb={3}
                    _hover={{ color: "primary.600" }}
                    transition="color 0.2s"
                    cursor="pointer"
                  >
                    {entry.title}
                  </Heading>
                </NextLink>
                <Text fontSize="md" color="gray.600" lineHeight="1.7">
                  {entry.description}
                </Text>
              </Box>
            </Flex>
          );
        })}

        {/* Loading indicator and observer target */}
        <Box ref={observerTarget} py={8} textAlign="center">
          {loading && <Spinner size="lg" color="primary.600" />}
          {!hasMore && entries.length > 0 && (
            <Text color="gray.500" fontSize="sm">
              No more updates
            </Text>
          )}
        </Box>
      </Container>
    </Box>
  );
}
