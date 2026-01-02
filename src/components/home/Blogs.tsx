import { Box, Heading, SimpleGrid } from "@chakra-ui/react";
import { BlogCard } from "./BlogCard";
import { fetchBlogPosts } from "@/lib/services/blog";
import { urlFor } from "@/sanity/lib/image";
import type { PostPreview } from "@/types/sanity";

export default async function Blogs() {
  const posts = await fetchBlogPosts('en', 3);

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
          {posts.map((post: PostPreview) => (
            <BlogCard
              key={post._id}
              imageSrc={post.image ? urlFor(post.image).width(600).height(400).url() : '/images/blog-placeholder.jpg'}
              imageAlt={post.title}
              category={post.tags?.[0] || 'Blog'}
              date={new Date(post.publishedAt).toLocaleDateString('en', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
              title={post.title}
              link={`/blog/${post.slug.current}`}
            />
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
}
