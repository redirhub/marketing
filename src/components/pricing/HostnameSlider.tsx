"use client";

import { Box, Flex, Text, HStack, useToken } from "@chakra-ui/react";
import RcSlider from "rc-slider";
import "rc-slider/assets/index.css";
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
    const [interactiveBlue, grayTrack, primary600, grayTickLabel] = useToken('colors', [
        'interactive.blue',
        'gray.track',
        'primary.600',
        'gray.tickLabel'
    ]);

    const marks = sliderTicks.reduce((acc, tick, index) => {
        acc[index] = tick.label;
        return acc;
    }, {} as Record<number, string>);

    const currentIndex = sliderTicks.findIndex(t => t.value === value);
    const handleBeforeChange = () => {
        document.body.style.userSelect = "none";
        document.body.style.webkitUserSelect = "none";
    };
    const handleAfterChange = () => {
        document.body.style.userSelect = "";
        document.body.style.webkitUserSelect = "";
    };
    const handleChange = (newValue: number | number[]) => {
        const index = Array.isArray(newValue) ? newValue[0] : newValue;
        onChange(sliderTicks[index].value);
    };

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

            <Box position="relative" px={1} pb={6}>
                <RcSlider
                    min={0}
                    max={sliderTicks.length - 1}
                    step={1}
                    value={currentIndex}
                    marks={marks}
                    dots={false}
                    onBeforeChange={handleBeforeChange}
                    onAfterChange={handleAfterChange}
                    onChange={handleChange}
                    styles={{
                        track: {
                            backgroundColor: interactiveBlue,
                            height: 8,
                        },
                        rail: {
                            backgroundColor: grayTrack,
                            height: 8,
                            borderRadius: '999px',
                        },
                        handle: {
                            width: 22,
                            height: 22,
                            backgroundColor: 'white',
                            border: `1.5px solid ${primary600}`,
                            borderRadius: '12px',
                            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                            opacity: 1,
                            marginTop: -7,
                            transition: 'transform 0.15s ease',
                            cursor: 'pointer',
                        },
                    }}
                />
            </Box>

            <style jsx global>{`
                .rc-slider {
                    position: relative;
                    height: 8px;
                    padding: 5px 0;
                    width: 100%;
                    border-radius: 6px;
                    cursor: pointer;
                    touch-action: none;
                    box-sizing: border-box;
                    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
                    user-select: none;
                    -webkit-user-select: none;
                    -moz-user-select: none;
                    -ms-user-select: none;
                }            
                .rc-slider * {
                    box-sizing: border-box;
                    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
                }               
                .rc-slider-rail {
                    border-radius: 999px;
                }
                
                .rc-slider-track {
                    border-radius: 999px;
                }                
                .rc-slider-dot {
                    display: none !important;
                }                
                .rc-slider-handle {
                    cursor: pointer !important;
                    touch-action: pan-x;
                    user-select: none;
                    -webkit-user-select: none;
                     will-change: transform;
                    transform: translateZ(0);
                    transition: transform 0.15s ease; 
                }                
                .rc-slider-handle:active {
                    cursor: pointer !important;
                    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.2) !important;
                }               
                .rc-slider-handle:hover {
                    box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.15) !important;
                }                
                .rc-slider-handle:focus {
                    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.2) !important;
                    outline: none;
                }               
                .rc-slider-handle:focus-visible {
                    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.2) !important;
                    outline: none;
                }
                
                .rc-slider-handle-dragging.rc-slider-handle-dragging.rc-slider-handle-dragging {
                    border-color: ${primary600};
                    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.2) !important;
                    cursor: pointer !important;
                }
                
                .rc-slider-mark-text {
                    color: ${grayTickLabel};
                    font-size: 14px;
                    font-weight: 400;
                    cursor: pointer;
                    transition: color 0.2s ease, font-weight 0.2s ease;
                    user-select: none;
                    padding-top: 14px;
                    -webkit-user-select: none;
                }
                
                .rc-slider-mark-text:hover {
                    color: ${interactiveBlue} !important;
                }               
                .rc-slider-handle-click-focused:focus {
                    border-color: ${primary600};
                }
            `}</style>
        </Box>
    );
}