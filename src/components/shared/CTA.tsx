'use client';

import { Box, Container, Flex, Heading, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { getDashboardBase } from '@/lib/utils/constants';

export default function CTA() {
  return (
    <Box bg="primary.600" py={20}>
      <Container maxW="7xl" mx="auto">
        <Flex
          direction="column"
          align="center"
          textAlign="center"
          gap={6}
        >
          <Heading
            as="h2"
            fontSize={{ base: '3xl', md: '4xl' }}
            color="white"
          >
            Redirect 5x Faster with Built-in Security
          </Heading>
          <Text fontSize="xl" color="whiteAlpha.900" maxW="2xl">
            Get started for free. No credit card required.
          </Text>
          <Link href={`${getDashboardBase()}/register`}>
            <Box
              as="button"
              px={8}
              py={4}
              borderRadius="lg"
              bg="white"
              color="primary.600"
              fontSize="lg"
              fontWeight="semibold"
              _hover={{ bg: 'gray.100' }}
              transition="all 0.2s"
            >
              Get Started For Free
            </Box>
          </Link>
        </Flex>
      </Container>
    </Box>
  );
}
