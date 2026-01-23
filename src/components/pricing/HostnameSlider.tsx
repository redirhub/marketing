"use client";

import { Box, Flex, Text, Slider, HStack } from "@chakra-ui/react";
import { getRedirectSliderConfig } from "./redirectPlanData";

interface HostnameSliderProps {
    value: number;
    onChange: (value: number) => void;
}

export default function HostnameSlider({ value, onChange }: HostnameSliderProps) {
    const sliderConfig = getRedirectSliderConfig();
    const sliderTicks = sliderConfig.ticks;
    const currentTick = sliderTicks.find(tick => tick.value === value) || sliderTicks[0];
    const hostnameLabel = currentTick.label;

    return (
        <Box w="full" py={8}>
            <Flex justify="space-between" align="center" mb={4}>
                <Text fontSize="16px" lineHeight="24px" fontWeight="500" color="gray.textMedium">
                    How many hostnames do you need?
                </Text>
                <HStack gap={2} align="center">
                    <Text fontSize="30px" lineHeight="38px" fontWeight="600" color="gray.darkGray">
                        {hostnameLabel}
                    </Text>
                    <Text fontSize="16px" lineHeight="24px" fontWeight="500" color="gray.textMedium">
                        hostnames
                    </Text>
                </HStack>
            </Flex>

            <Box px={2} position="relative">
                <Slider.Root
                    value={[sliderTicks.findIndex(t => t.value === value)]}
                    onValueChange={(e) => {
                        const tickIndex = Math.round(e.value[0]);
                        onChange(sliderTicks[tickIndex].value);
                    }}
                    min={0}
                    max={sliderTicks.length - 1}
                    step={1}
                >
                    <Slider.Control>
                        <Slider.Track bg="gray.track" border={'none'} height="8px" cursor={'pointer'} borderRadius="full">
                            <Slider.Range bg="interactive.blue" />
                        </Slider.Track>
                        <Slider.Thumb
                            index={0}
                            boxSize="22px"
                            bg="white"
                            border="1.5px solid"
                            borderColor="primary.600"
                            borderRadius="12px"
                            boxShadow="0px 4px 10px rgba(0, 0, 0, 0.1)"
                            _focus={{ outline: "none" }}
                            cursor={'pointer'}
                        />
                    </Slider.Control>
                </Slider.Root>

                <HStack justify="space-between" mt={4} px={0}>
                    {sliderTicks.map((tick) => (
                        <Text
                            key={tick.value}
                            fontSize="14px"
                            lineHeight="20px"
                            fontWeight="400"
                            color="gray.tickLabel"
                            cursor="pointer"
                            onClick={() => onChange(tick.value)}
                        >
                            {tick.label}
                        </Text>
                    ))}
                </HStack>
            </Box>
        </Box>
    );
}
