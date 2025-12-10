// BlogCard.tsx
import { Box, Image, Text, Flex, Tag, Button, Heading } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";

interface BlogCardProps {
  imageSrc: string;
  imageAlt?: string;
  category: string;
  date: string;
  title: string;
  link?: string;
}

export const BlogCard = ({
  imageSrc,
  imageAlt = "Blog post image",
  category,
  date,
  title,
  link = "#",
}: BlogCardProps) => {
  return (
    <Box
      p={4}
      bg="white"
      borderRadius="24px"
      overflow="hidden"
      boxShadow="md"
      transition="all 0.3s"
      border="4px solid"
      borderColor="#EAECF0"
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

      {/* Content */}
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

        {/* Title */}
        <Heading
          as="h3"
          fontSize={{ base: "1.4rem", md: "1.4rem" }}
          fontWeight="700"
          color="gray.800"
          mb={0}
          lineHeight="2.3rem"
          flex={1}
          textAlign={"left"}
        >
          {title}
        </Heading>

        {/* Read More Button */}
        <Button
          as="a"
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
        >
          Read More <ArrowForwardIcon />
        </Button>
      </Box>
    </Box>
  );
};
