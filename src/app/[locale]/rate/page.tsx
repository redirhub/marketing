'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { Box, VStack, HStack, Text, Button, Heading } from '@chakra-ui/react';
import { FaStar, FaExternalLinkAlt } from 'react-icons/fa';

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
            {t('rate.subtitle', 'Your feedback helps us improve RedirHub')}
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
            as="a"
            href={SENJA_URL}
            target="_blank"
            rel="noopener noreferrer"
            size="lg"
            w="full"
            colorScheme="blue"
            color="white"
            rightIcon={<FaExternalLinkAlt />}
            mt={4}
          >
            {t('rate.lowRating.cta', 'Share Your Feedback')}
          </Button>
          <Button
            variant="ghost"
            onClick={() => setSelectedRating(null)}
            mt={2}
          >
            {t('rate.changeRating', 'Change Rating')}
          </Button>
        </VStack>
      );
    }

    // selectedRating === 5
    return (
      <VStack gap={6} textAlign="center">
        <Box fontSize="5xl">{t('rate.highRating.emoji', '🎉')}</Box>
        <Heading size="xl" fontWeight="bold" color="gray.800">
          {t('rate.highRating.title', "Thank you! We're thrilled you love RedirHub!")}
        </Heading>
        <Text fontSize="lg" color="gray.600" maxW="lg">
          {t('rate.highRating.message', 'Would you mind sharing your experience with others? Your review helps us grow!')}
        </Text>
        <VStack gap={3} w="full" maxW="md" mt={4}>
          <Button
            as="a"
            href={G2_URL}
            target="_blank"
            rel="noopener noreferrer"
            size="lg"
            w="full"
            colorScheme="blue"
            color="white"
            rightIcon={<FaExternalLinkAlt />}
          >
            {t('rate.highRating.ctaG2', 'Review on G2')}
          </Button>
          <Button
            as="a"
            href={TRUSTPILOT_URL}
            target="_blank"
            rel="noopener noreferrer"
            size="lg"
            colorScheme="green"
            color="white"
            w="full"
            rightIcon={<FaExternalLinkAlt />}
          >
            {t('rate.highRating.ctaTrustpilot', 'Review on Trustpilot')}
          </Button>
        </VStack>
        <Button
          variant="ghost"
          onClick={() => setSelectedRating(null)}
          mt={2}
        >
          {t('rate.changeRating', 'Change Rating')}
        </Button>
      </VStack>
    );
  };

  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="gray.50"
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
