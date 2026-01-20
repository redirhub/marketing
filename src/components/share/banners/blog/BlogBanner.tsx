"use client";

import { Box, Container, Flex, Heading, Input, Icon } from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import styles from "./BlogBanner.module.css";

const BlogBanner = () => {
  const params = useParams();
  const term = params?.term ? decodeURIComponent(params.term as string) : "";
  const [searchQuery, setSearchQuery] = useState(term);

  const router = useRouter();
  const locale = params?.locale || "en";

  useEffect(() => {
    setSearchQuery(term);
  }, [term]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/${locale}/blog/search/${encodeURIComponent(searchQuery)}/?post_type=post`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
      <Box pt={32} pb={20} className={styles.container}>
        <Container maxW="7xl" mx="auto" px={{ base: 2, md: 2, lg: 0 }}>
          <Flex direction="column" align="center" textAlign="center" gap={2}>
            <Box>
              <Heading
                as="p"
                fontSize={{
                  base: "1rem",
                  md: "1.5rem",
                }}
                fontWeight="600"
                lineHeight="tight"
                maxW="4xl"
                color="#fff"
              >
                Gain Industry Insights
              </Heading>
            </Box>
            <Heading
              as="h1"
              fontSize={{
                base: "2rem",
                md: "2.5rem",
                lg: "3.4rem",
              }}
              fontWeight="600"
              lineHeight="tight"
              maxW="4xl"
              color="#fff"
            >
              Read our blog today
            </Heading>
            <Box w="full" maxW="600px" mt={4} mx="auto">
              <Box position="relative" maxW="400px" mx="auto">
                <Icon
                  as={FiSearch}
                  position="absolute"
                  left={4}
                  top="50%"
                  transform="translateY(-50%)"
                  color="gray.500"
                  boxSize={5}
                  zIndex={1}
                  pointerEvents="none"
                />
                <Input
                  placeholder="Search"
                  bg="white"
                  borderRadius="12px"
                  border="none"
                  h="56px"
                  w="full"
                  pl={12}
                  fontSize="16px"
                  color="gray.900"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  _placeholder={{
                    color: "gray.400",
                  }}
                  _focus={{
                    outline: "2px solid",
                    outlineColor: "primary.600",
                    boxShadow: "none",
                  }}
                />
              </Box>
            </Box>
          </Flex>
        </Container>
      </Box>
    </>
  );
};

export default BlogBanner;
