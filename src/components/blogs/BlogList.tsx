import { Box, Container, SimpleGrid } from "@chakra-ui/react";
import { BlogCard } from "../home/BlogCard";
import PaginationControls from "../ui/PaginationControls";
import { fetchPaginatedPosts } from "@/lib/services/blog";
import { urlFor } from "@/sanity/lib/image";
import type { PostPreview } from "@/types/sanity";

interface BlogListProps {
  currentPage: number;
  locale?: string;
}

const BlogList = async ({ currentPage, locale = 'en' }: BlogListProps) => {
  const { posts, totalPages } = await fetchPaginatedPosts(locale, currentPage, 6);

  return (
    <>
      <Box w="100%" pt={{ base: 4, md: 8 }} pb={{ base: 4, md: 4 }} px={4} bg={"#fff"}>
        <Container maxW="7xl" mx="auto" px={{ base: 4, md: 0 }}>
          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 3 }}
            gap={{ base: 6, md: 6 }}
          >
            {posts?.map((post: PostPreview) => (
              <BlogCard
                key={post._id}
                imageSrc={post.image ? urlFor(post.image).width(800).height(450).url() : '/images/blog-placeholder.jpg'}
                imageAlt={post.title}
                category={post.tags?.[0]}
                date={new Date(post.publishedAt).toLocaleDateString(locale, {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
                title={post.title}
                excerpt={post.excerpt}
                link={`/${locale}/blog/${post.slug.current}`}
                isBlogPage={true}
              />
            ))}
          </SimpleGrid>

          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </Container>
      </Box>
    </>
  );
};

export default BlogList;
