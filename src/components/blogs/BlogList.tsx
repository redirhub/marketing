import { Box, Container, SimpleGrid, Spinner } from "@chakra-ui/react";
import { BlogCard } from "../home/BlogCard";
import PaginationControls from "../ui/PaginationControls";
import { BlogPost } from "@/app/api/blogs/route";
import { fetchBlogPosts } from "@/lib/services/blog";

const BlogList = async ({ currentPage }: { currentPage: number }) => {
  const posts: BlogPost[] = await fetchBlogPosts();

  // Logic to slice your posts array for pagination
  const postsPerPage = 6;
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const displayedPosts = posts.slice(startIndex, endIndex);

  const totalPages = Math.ceil(posts.length / postsPerPage) || 1;

  return (
    <>
      <Box w="100%" pt={{ base: 4, md: 8 }} pb={{ base: 4, md: 4 }} bg={"#fff"}>
        <Container maxW="7xl" mx="auto" px={{ base: 4, md: 0 }}>
          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 3 }}
            gap={{ base: 6, md: 6 }}
          >
            {displayedPosts?.map((post, index) => (
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
          />
        </Container>
      </Box>
    </>
  );
};

export default BlogList;
