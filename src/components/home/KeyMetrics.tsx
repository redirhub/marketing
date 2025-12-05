'use client';

import { Box, Container, SimpleGrid, Text, VStack } from '@chakra-ui/react';

const metrics = [
  { value: '90ms', label: 'Rapid redirect' },
  { value: '100M+', label: 'Rapid requests' },
  { value: '500K+', label: 'Hostnames' },
  { value: '900K+', label: 'SSL certificates issued' },
  { value: '10+', label: 'Global locations' },
  { value: '99.99%', label: 'Uptime' },
];

export default function KeyMetrics() {
  return (
    <Box py={16} bg="white">
      <Container maxW="7xl" mx="auto">
        <SimpleGrid columns={{ base: 2, md: 3, lg: 6 }} gap={8}>
          {metrics.map((metric, index) => (
            <VStack key={index} align="center">
              <Text
                fontSize={{ base: '3xl', md: '4xl' }}
                fontWeight="bold"
                color="primary.600"
              >
                {metric.value}
              </Text>
              <Text
                fontSize="sm"
                color="gray.600"
                textAlign="center"
              >
                {metric.label}
              </Text>
            </VStack>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
