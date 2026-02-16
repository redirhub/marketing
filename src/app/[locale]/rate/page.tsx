'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { Box, VStack, HStack, Text, Button, Heading } from '@chakra-ui/react';
import { FaStar, FaExternalLinkAlt } from 'react-icons/fa';
import { APP_NAME } from '@/lib/utils/constants';

const SENJA_URL = 'https://senja.io/p/redirhub/r/aCUxmb';
const G2_URL = 'https://www.g2.com/products/redirhub/reviews#reviews';
const TRUSTPILOT_URL = 'https://www.trustpilot.com/evaluate/redirhub.com';

export default function RatePage() {
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);

  useEffect(() => {
    const ratingParam = searchParams.get('rating');
    if (ratingParam) {
      const rating = parseInt(ratingParam, 10);
      if (rating >= 1 && rating <= 5) {
        setSelectedRating(rating);
      }
    }
  }, [searchParams]);

  const handleStarClick = (rating: number) => {
    setSelectedRating(rating);
  };

  const renderStars = () => {
    return (
      <HStack gap={2}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Box
            key={star}
            as="button"
            onClick={() => handleStarClick(star)}
            onMouseEnter={() => setHoveredRating(star)}
            onMouseLeave={() => setHoveredRating(null)}
            cursor="pointer"
            transition="all 0.2s"
            _hover={{ transform: 'scale(1.1)' }}
            fontSize={{ base: '3xl', md: '4xl' }}
            color={
              star <= (hoveredRating || selectedRating || 0)
                ? 'orange.400'
                : 'gray.300'
            }
          >
            <FaStar />
          </Box>
        ))}
      </HStack>
    );
  };

  const renderContent = () => {
    if (selectedRating === null) {
      return (
        <VStack gap={6} textAlign="center">
          <Heading size="2xl" fontWeight="bold" color="gray.800">
            {t('rate.title', 'How do you rate our product?')}
          </Heading>
          <Text fontSize="lg" color="gray.600">
            {t('rate.subtitle', `Your feedback helps us improve {{n}}`, { n: APP_NAME })}
          </Text>
          {renderStars()}
        </VStack>
      );
    }

    if (selectedRating >= 1 && selectedRating <= 4) {
      return (
        <VStack gap={6} textAlign="center">
          <Box fontSize="5xl">{t('rate.lowRating.emoji', '😔')}</Box>
          <Heading size="xl" fontWeight="bold" color="gray.800">
            {t('rate.lowRating.title', "We're sorry to hear that")}
          </Heading>
          <Text fontSize="lg" color="gray.600" maxW="lg">
            {t('rate.lowRating.message', "We'd love to hear your feedback so we can improve. Please share your thoughts with us.")}
          </Text>
          <Button
            size="lg"
            w="full"
            bg="purple.600"
            color="white"
            mt={4}
            onClick={() => window.open(SENJA_URL, '_blank', 'noopener,noreferrer')}
            _hover={{ bg: 'purple.700' }}
          >
            {t('rate.lowRating.cta', 'Share Your Feedback')}
          </Button>
        </VStack>
      );
    }

    // selectedRating === 5
    return (
      <VStack gap={6} textAlign="center">
        <Box fontSize="5xl">{t('rate.highRating.emoji', '🎉')}</Box>
        <Heading size="xl" fontWeight="bold" color="gray.800">
          {t('rate.highRating.title', `Thank you! We're thrilled you love {{n}}`, { n: APP_NAME })}
        </Heading>
        <Text fontSize="lg" color="gray.600" maxW="lg">
          {t('rate.highRating.message', 'Would you mind sharing your experience with others? Your review helps us grow!')}
        </Text>
        <VStack gap={3} w="full" maxW="md" mt={4}>
          <Button
            size="lg"
            w="full"
            bg="orange.500"
            color="white"
            onClick={() => window.open(G2_URL, '_blank', 'noopener,noreferrer')}
            _hover={{ bg: 'orange.600' }}
          >
            {t('rate.highRating.ctaG2', 'Review on G2')}
          </Button>
          <Button
            size="lg"
            bg="teal.500"
            color="white"
            w="full"
            onClick={() => window.open(TRUSTPILOT_URL, '_blank', 'noopener,noreferrer')}
            _hover={{ bg: 'teal.600' }}
          >
            {t('rate.highRating.ctaTrustpilot', 'Review on Trustpilot')}
          </Button>
        </VStack>
        <Text
          as="button"
          color="gray.600"
          onClick={() => setSelectedRating(null)}
          mt={2}
          cursor="pointer"
          _hover={{ textDecoration: 'underline', color: 'gray.800' }}
        >
          {t('rate.changeRating', 'Change Rating')}
        </Text>
      </VStack>
    );
  };

  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="gray.700"
      px={{ base: 4, md: 8 }}
      py={{ base: 8, md: 12 }}
    >
      <Box
        bg="white"
        borderRadius="2xl"
        boxShadow="xl"
        p={{ base: 8, md: 12 }}
        maxW="2xl"
        w="full"
      >
        {renderContent()}
      </Box>
    </Box>
  );
}
