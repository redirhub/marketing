"use client";

import { Box, Heading, SimpleGrid } from "@chakra-ui/react";
import { BlogCard } from "@/components/home/BlogCard";
import { urlFor } from "@/sanity/lib/image";
import type { PostPreview } from "@/types/sanity";
import { useTranslation } from "react-i18next";

interface BlogSectionProps {
  locale: string;
  posts: PostPreview[];
  backgroundColor?: string;
}

export default function BlogSection({
  locale,
  posts,
  backgroundColor = "#F2F4EF"
}: BlogSectionProps) {
  const { t } = useTranslation();

  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <Box
      w="100%"
      py={{ base: 10, md: 16 }}
      px={{ base: 4, md: 6 }}
      textAlign="center"
      bg={backgroundColor}
    >
      <Box w="100%" maxW="7xl" mx="auto" textAlign="center">
        <Heading
          as={"p"}
          fontSize={{ base: "1.5rem", md: "2rem", lg: "3rem" }}
          lineHeight={{ base: "2.5rem", md: "2.8rem" }}
          fontWeight={500}
          color="#344054"
          letterSpacing="0.4px"
          mb={{base: 10, md: 16}}
        >
          {t("home.blog-title", "Go Through Our Blogs Today")}
        </Heading>

        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3 }}
          gap={{ base: 6, md: 8 }}
        >
          {posts.map((post: PostPreview) => (
              <BlogCard
                key={post._id}
                imageSrc={post.image ? urlFor(post.image).width(600).height(400).url() : '/images/blog-placeholder.jpg'}
                imageAlt={post.title}
                category={post.tags?.[0]}
                date={new Date(post.publishedAt).toLocaleDateString(locale, {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
                title={post.title}
                link={`/${locale}/blog/${post.slug.current}`}
              />
            ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
}
