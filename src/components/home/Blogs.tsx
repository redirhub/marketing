import { Box, Heading, SimpleGrid } from "@chakra-ui/react";
import { BlogCard } from "./BlogCard";
import { BlogPost } from "@/app/api/blogs/route";
import { fetchBlogPosts } from "@/lib/services/blog";

export default async function Blogs() {
  const posts: BlogPost[] = await fetchBlogPosts();

  const postsToShow = posts.slice(0, 3);

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
          {postsToShow.slice(0, 3).map((post, index) => (
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
      </Box>
    </Box>
  );
}
