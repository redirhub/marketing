"use client";

import { Box, Center, Container, SimpleGrid, Spinner } from "@chakra-ui/react";
import { BlogCard } from "../home/BlogCard";
import { useEffect, useState } from "react";
import PaginationControls from "../ui/PaginationControls";
import { BlogPost } from "@/app/api/blogs/route";

const BlogList = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBlogPosts() {
      try {
        const response = await fetch("/api/blogs");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: BlogPost[] = await response.json();
        setPosts(data);
      } catch (e) {
        console.error("Failed to fetch blog posts:", e);
        setError("Failed to load blog posts. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchBlogPosts();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    console.log(`Navigating to page ${page}`);
  };

  if (isLoading) {
    return (
      <Center py={20}>
        <Spinner size="xl" color="orange.500" />
      </Center>
    );
  }

  return (
    <>
      <Box w="100%" pt={{ base: 4, md: 8 }} pb={{ base: 4, md: 4 }} bg={"#fff"}>
        <Container maxW="7xl" mx="auto" px={{ base: 4, md: 0 }}>
          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 3 }}
            gap={{ base: 6, md: 6 }}
          >
            {posts?.map((post, index) => (
              <BlogCard
                key={index}
                imageSrc={post.imageSrc}
                imageAlt={post.imageAlt}
                category={post.category}
                date={post.date}
                title={post.title}
                link={post.link}
                isBlogPage={true}
              />
            ))}
          </SimpleGrid>

          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </Container>
      </Box>
    </>
  );
};

export default BlogList;
