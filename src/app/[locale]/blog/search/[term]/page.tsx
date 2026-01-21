import { Box, Container, SimpleGrid, Heading, Text, Flex } from "@chakra-ui/react";
import BlogBanner from "@/components/share/banners/blog/BlogBanner";
import { BlogCard } from "@/components/home/BlogCard";
import { fetchPaginatedPosts } from "@/lib/services/blog";
import { urlFor } from "@/sanity/lib/image";
import type { PostPreview } from "@/types/sanity";
import PaginationControls from "@/components/ui/PaginationControls";

export default async function SearchResultsPage({
    params,
    searchParams,
}: {
    params: Promise<{ locale: string; term: string }>;
    searchParams: Promise<{ page?: string }>;
}) {
    const { locale, term } = await params;
    const { page } = await searchParams;
    const decodedTerm = decodeURIComponent(term);
    const currentPage = Number(page) || 1;
    const pageSize = 6;

    const { posts, totalPages, total } = await fetchPaginatedPosts(locale, currentPage, pageSize, decodedTerm);

    return (
        <>
            <BlogBanner />
            <Box w="100%" pt={{ base: 10, md: 14 }} pb={20} bg={"#fff"}>
                <Container maxW="7xl" mx="auto" px={{ base: 4, md: 0 }}>
                    {posts.length > 0 ? (
                        <Flex direction="column" align="center" textAlign="center" mb={12}>
                            <Heading
                                as="h2"
                                fontSize={{ base: "1.5rem", md: "2.25rem" }}
                                fontWeight="600"
                                maxW={'900px'}
                                mb={2}
                            >
                                Search results for &quot;{decodedTerm}&quot;
                            </Heading>
                            <Text fontSize="lg" color="gray.600" fontWeight="500">
                                {total} {total === 1 ? 'Result' : 'Results'}
                            </Text>
                        </Flex>
                    ) : (
                        <Flex direction="column" align="center" textAlign="center" py={12} gap={2}>
                            <Heading
                                as="h2"
                                fontSize={{ base: "1.5rem", md: "2.5rem" }}
                                fontWeight="700"
                                color="gray.900"
                            >
                                No results!
                            </Heading>
                            <Text fontSize="1.1rem" color="gray.600">
                                Sorry we couldn&apos;t find anything.
                            </Text>
                            <Text fontSize="1.1rem" color="gray.600">
                                Try another search!
                            </Text>
                        </Flex>
                    )}

                    {posts.length > 0 && (
                        <Box px={6}>
                            <SimpleGrid
                                columns={{ base: 1, md: 2, lg: 3 }}
                                gap={{ base: 6, md: 6 }}
                            >
                                {posts.map((post: PostPreview) => (
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
                        </Box>
                    )}
                </Container>
            </Box>
        </>
    );
}
