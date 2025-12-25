import { Box, Image, Text, Flex, Button, Heading } from "@chakra-ui/react";
import { FaArrowRightLong } from "react-icons/fa6";
import NextLink from "next/link";

interface BlogCardProps {
  imageSrc: string;
  imageAlt?: string;
  category: string;
  date: string;
  title: string;
  link?: string;
  isBlogPage?: boolean;
}

export const BlogCard = ({
  imageSrc,
  imageAlt = "Blog post image",
  category,
  date,
  title,
  link = "#",
  isBlogPage = false,
}: BlogCardProps) => {
  return (
    <Box
      p={4}
      bg="white"
      borderRadius={isBlogPage ? "12px" : "24px"}
      overflow="hidden"
      boxShadow={isBlogPage ? "none" : "md"}
      transition="all 0.3s"
      border={isBlogPage ? "1px solid" : "4px solid"}
      borderColor={isBlogPage ? "#222B271A" : "#EAECF0"}
      h="100%"
      display="flex"
      flexDirection="column"
    >
      <Box
        position="relative"
        overflow="hidden"
        h="240px"
        mb={2}
        borderRadius={"12px"}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          w="100%"
          h="100%"
          objectFit="cover"
          transition="transform 0.3s"
          _hover={{ transform: "scale(1.05)" }}
        />
      </Box>

      <Box flex={1} display="flex" flexDirection="column">
        <Flex gap={2} mb={3} align="center" justifyContent={"space-between"}>
          <Box
            bg="#FFF6ED"
            borderRadius="16px"
            p={"4px 7px 4px 7px"}
            fontSize={"12px"}
            color="#c36"
          >
            Blog
          </Box>
          <Text fontSize="sm" color="gray.500">
            {date}
          </Text>
        </Flex>

        <NextLink href={link} passHref>
          <Heading
            as="h3"
            fontSize={{ base: "1rem", md: "1.2rem", lg: "1.2rem" }}
            fontWeight="600"
            color="gray.800"
            mb={0}
            lineHeight={{ base: "1.5rem", md: "1.8rem" }}
            flex={1}
            textAlign={"left"}
          >
            {title}
          </Heading>
        </NextLink>

        {!isBlogPage && (
          <Box textAlign={"left"}>
            <NextLink href={link} passHref>
              <Button
                as="button"
                variant="ghost"
                colorScheme="teal"
                justifyContent="flex-start"
                px={0}
                gap={1}
                fontWeight="semibold"
                color="#1C6DB6"
                _hover={{
                  textDecoration: "none",
                  color: "#667085",
                  bg: "transparent",
                }}
                textAlign={"left"}
                fontSize={{ base: "12px", md: "1rem" }}
              >
                Read More
                <FaArrowRightLong />
              </Button>
            </NextLink>
          </Box>
        )}
      </Box>
    </Box>
  );
};
