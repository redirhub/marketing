"use client";

import { Box, Heading, SimpleGrid } from "@chakra-ui/react";
import { BlogCard } from "./BlogCard";
import FAQSection from "./FAQSection";

export default function Blogs() {
  const blogPosts = [
    {
      imageSrc: "/assets/images/blog.jpeg",
      imageAlt: "Blog post 1",
      category: "Technology",
      date: "3 mins read",
      title: "How to Build Scalable Web Applications with Modern Tools",
      link: "/blog/scalable-web-apps",
    },
    {
      imageSrc: "/assets/images/blog.jpeg",
      imageAlt: "Blog post 2",
      category: "Design",
      date: "3 mins read",
      title: "10 UI/UX Design Principles Every Developer Should Know",
      link: "/blog/ui-ux-principles",
    },
    {
      imageSrc: "/assets/images/blog.jpeg",
      imageAlt: "Blog post 3",
      category: "Development",
      date: "3 mins read",
      title: "Getting Started with Next.js 14: A Complete Guide",
      link: "/blog/nextjs-guide",
    },
  ];

  return (
    <Box
      w="100%"
      py={{ base: 10, md: 16 }}
      px={{ base: 4, md: 6 }}
      textAlign="center"
      bg={"#F2F4EF"}
    >
      <Box w="100%" maxW="7xl" mx="auto" textAlign="center">
        <Heading
          fontSize={{ base: "2rem", md: "3rem" }}
          lineHeight={{ base: "2.5rem", md: "2.8rem" }}
          fontWeight={500}
          color="#344054"
          letterSpacing="0.4px"
          mb={16}
        >
          Go Through Our Blogs Today
        </Heading>

        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3 }}
          gap={{ base: 6, md: 8 }}
        >
          {blogPosts.map((post, index) => (
            <BlogCard
              key={index}
              imageSrc={post.imageSrc}
              imageAlt={post.imageAlt}
              category={post.category}
              date={post.date}
              title={post.title}
              link={post.link}
            />
          ))}
        </SimpleGrid>

        <Heading
          fontSize={{ base: "2rem", md: "3rem" }}
          fontWeight={500}
          color="#344054"
          letterSpacing="0.4px"
          mt={24}
          mb={16}
        >
          Frequently asked questions
        </Heading>

        <FAQSection />
      </Box>
    </Box>
  );
}
