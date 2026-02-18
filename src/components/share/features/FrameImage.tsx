import { Box, Image as ChakraImage } from "@chakra-ui/react";

interface FrameImageProps {
  src: string;
  alt: string;
  objectPosition?: string;
}

export default function FrameImage({
  src,
  alt,
  objectPosition = "top left",
}: FrameImageProps) {
  return (
    <Box
      borderRadius="12px"
      overflow="hidden"
      boxShadow="0 20px 60px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.08)"
      border="1px solid"
      borderColor="gray.200"
      bg="white"
    >
      {/* Browser chrome bar */}
      <Box
        h="36px"
        bg="gray.50"
        borderBottom="1px solid"
        borderColor="gray.200"
        display="flex"
        alignItems="center"
        px={3}
        gap={1.5}
        flexShrink={0}
      >
        <Box w="10px" h="10px" borderRadius="full" bg="#FF5F57" flexShrink={0} />
        <Box w="10px" h="10px" borderRadius="full" bg="#FFBD2E" flexShrink={0} />
        <Box w="10px" h="10px" borderRadius="full" bg="#28C840" flexShrink={0} />
      </Box>

      {/* Screenshot */}
      <ChakraImage
        src={src}
        alt={alt}
        w="100%"
        h="auto"
        display="block"
        objectFit="cover"
        objectPosition={objectPosition}
        loading="lazy"
      />
    </Box>
  );
}
