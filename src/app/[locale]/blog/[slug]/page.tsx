import Header from "@/components/layout/Header";
import { Box, Heading, Center } from "@chakra-ui/react";

export default function ComingSoonPage() {
  return (
    <>
      <Header />
      <Center py={10} textAlign="center">
        <Box>
          <Heading
            as="h1"
            size="2xl"
            mb={4}
            color="gray.800"
            fontWeight="extrabold"
          >
            Coming Soon
          </Heading>
        </Box>
      </Center>
    </>
  );
}
