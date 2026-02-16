"use client";

import {
    Button,
    Text,
    Box,
    Image,
    List,
    IconButton,
    Icon,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { CloseIcon } from "@chakra-ui/icons";
import { FiArrowRight } from "react-icons/fi";
import { URL_DASHBOARD_REGISTER } from "@/lib/utils/constants";


export default function InactivityPopup() {
    const [isOpen, setIsOpen] = useState(false);
    const [hasOpened, setHasOpened] = useState(false);

    useEffect(() => {
        if (hasOpened) return;

        let inactivityTimer: ReturnType<typeof setTimeout>;

        const startTimer = () => {
            clearTimeout(inactivityTimer);
            inactivityTimer = setTimeout(() => {
                if (!hasOpened) {
                    setIsOpen(true);
                    setHasOpened(true);
                }
            }, 10000); // 10s inactivity
        };

        const resetTimer = () => {
            startTimer();
        };

        startTimer();

        window.addEventListener("mousemove", resetTimer);
        window.addEventListener("scroll", resetTimer);
        window.addEventListener("keydown", resetTimer);
        window.addEventListener("touchstart", resetTimer);

        return () => {
            clearTimeout(inactivityTimer);
            window.removeEventListener("mousemove", resetTimer);
            window.removeEventListener("scroll", resetTimer);
            window.removeEventListener("keydown", resetTimer);
            window.removeEventListener("touchstart", resetTimer);
        };
    }, [hasOpened]);

    const handleClose = () => setIsOpen(false);

    if (!isOpen) return null;

    return (
        <Box
            position="fixed"
            top="0"
            left="0"
            right="0"
            bottom="0"
            bg="rgba(10, 13, 18, 0.24)"
            backdropFilter="blur(8px)"
            zIndex="9999"
            display="flex"
            alignItems="center"
            justifyContent="center"
            p={4}
            onClick={handleClose}
        >
            <Box
                bg="white"
                borderRadius="32px"
                overflow="hidden"
                maxW="800px"
                w="full"
                maxH={'480px'}
                overflowY={'auto'}
                onClick={(e) => e.stopPropagation()}
                position="relative"
                boxShadow="2xl"
                display={{ base: "block", md: "flex" }}
            >
                <IconButton
                    aria-label="Close"
                    position="absolute"
                    top={5}
                    right={5}
                    size="sm"
                    variant="ghost"
                    onClick={handleClose}
                    zIndex={10}
                >
                    <CloseIcon color="gray.500" />
                </IconButton>

                <Box
                    flex="1"
                    p={{ base: 4, md: 6 }}
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                >
                    <Text
                        color="error.800"
                        fontSize="sm"
                        fontWeight="400"
                        letterSpacing="wide"
                        mb={2}
                        textTransform="uppercase"
                    >
                        Wait a second...
                    </Text>
                    <Text
                        fontSize={{ base: "18px", md: "24px" }}
                        fontWeight="bold"
                        color="gray.700"
                        mb={3}
                        lineHeight="shorter"
                    >
                        Want to try RedirHub for free?
                    </Text>
                    <Text color="gray.blueGray" fontSize="16px" mb={5}>
                        Take RedirHub for a spin. It's 100% free - no commitment, no risk
                        and no pressure.
                    </Text>

                    <List.Root gap={3} mb={6} variant="plain">
                        {[
                            "Use the free plan as long as you need",
                            "No credit card needed",
                            "Multiple upgrade options when you're ready",
                        ].map((item, index) => (
                            <List.Item key={index} display="flex" alignItems="center">
                                <List.Indicator
                                    as={CheckCircleIcon}
                                    borderRadius="full"
                                    bg="success.100"
                                    minW="20px"
                                    minH="20px"
                                    color="green.500"
                                    mr={3}
                                />
                                <Text fontSize="sm" fontWeight="500" color="gray.darkGray">
                                    {item}
                                </Text>
                            </List.Item>
                        ))}
                    </List.Root>
                    <Text fontSize="md" color="gray.blueGray" mb={4}>
                        See why thousands of people trust RedirHub with their
                        redirects, links management and analytics.
                    </Text>
                    <Link href={URL_DASHBOARD_REGISTER} target="_blank">
                        <Button
                            bg="brand.500"
                            color="white"
                            size="xl"
                            p={'16px 18px'}
                            fontSize="md"
                            borderRadius={'12px'}
                            _hover={{ bg: "brand.700" }}
                        >
                            Try RedirHub For Free <Icon as={FiArrowRight} />
                        </Button>
                    </Link>
                </Box>

                <Box
                    flex="1"
                    bg="success.300"
                    display={{ base: "none", md: "flex" }}
                    alignItems="center"
                    justifyContent="center"
                    p={0}
                    position="relative"
                >
                    <Image
                        src="/assets/images/redirect-flow.png"
                        alt="Redirect Flow"
                        objectFit="contain"
                        maxH="100%"
                    />
                </Box>
            </Box>
        </Box>
    );
}

const CheckCircleIcon = (props: any) => (
    <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        {...props}
    >
        <Image
            src="/assets/images/dropdown-icons/check-icon.png"
            alt="Check"
            w="10px"
            h="auto"
            objectFit="contain"
        />
    </Box>
);
