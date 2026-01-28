"use client";

import { Box, Heading, Text, SimpleGrid, Flex, Stack } from "@chakra-ui/react";
import Image from "next/image";
import { addOnsData } from "./pricingData";

interface AddOnsProps {
    isAnnually: boolean;
}


export default function AddOns({ isAnnually }: AddOnsProps) {
    return (
        <Box w="full" mt={12} border={'1px solid'} borderColor={'gray.borderLight'} borderRadius="24px" p={6}>
            <Stack gap={1} mb={6}>
                <Heading as="h3" fontSize="xl" fontWeight="600" color="gray.darkGray">
                    Pro Add-Ons
                </Heading>
                <Text fontSize="16px" fontWeight="400" color="gray.blueGray">
                    Enhance your Pro plan with powerful features
                </Text>
            </Stack>

            <SimpleGrid columns={{ base: 1, md: 3 }} gap={6}>
                {addOnsData.map((addon, index) => (
                    <Box
                        key={index}
                        background={'linear-gradient(180deg, #FFFFFF 0%, #F5F5F5 100%)'}
                        borderRadius="16px"
                        p={4}
                        border="1px solid"
                        borderColor="#D5D7DA"
                        transition="all 0.3s"
                        _hover={{ borderColor: "gray.200", transform: "translateY(-2px)" }}
                    >

                        <Flex justify="space-between" align="start" mb={4}>
                            <Box
                                bg="primary.lightBlue"
                                borderRadius="12px"
                                p={3}
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                            >
                                <Image
                                    src={index === 0 ? "/assets/images/log-in.png" : index === 1 ? "/assets/images/server.png" : "/assets/images/cluster.png"}
                                    alt={addon.title}
                                    width={24}
                                    height={24}
                                />
                            </Box>
                            <Flex align="baseline" gap={1}>
                                <Text fontSize="24px" fontWeight="600" color="gray.textMedium">
                                    $
                                    <Text as="span" color="gray.900" ml={1}>
                                        {isAnnually ? addon.priceAnnually : addon.priceMonthly}
                                    </Text>
                                </Text>
                                <Text fontSize="14px" fontWeight="500" color="gray.500">
                                    /mo
                                </Text>
                            </Flex>
                        </Flex>

                        <Heading as="h4" fontSize="16px" fontWeight="600" color="gray.darkGray" mb={2}>
                            {addon.title}
                        </Heading>
                        <Text fontSize="14px" fontWeight="400" color="gray.blueGray" lineHeight="1.5">
                            {addon.description}
                        </Text>
                    </Box>
                ))}
            </SimpleGrid>
        </Box>
    );
}
