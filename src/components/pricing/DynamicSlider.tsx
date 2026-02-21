import { Box, Flex, Text, HStack, useToken } from '@chakra-ui/react';
import RcSlider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useTranslation } from 'react-i18next';

interface HostnameSliderProps {
    value: number;
    onChange: (value: number) => void;
    sliderConfig: {
        min: number;
        max: number;
        ticks: { value: number; label: string }[];
    };
}

export default function DynamicSlider({ value, onChange, sliderConfig }: HostnameSliderProps) {
    const { t } = useTranslation();
    const sliderTicks = sliderConfig?.ticks || [];
    const currentTick = sliderTicks.find(tick => tick.value === value) || sliderTicks[0] || { label: String(value) };
    const hostnameLabel = currentTick.label;
    const [interactiveBlue, grayTrack, primary600, grayTickLabel] = useToken('colors', [
        '#1D7BAD',
        '#E9EAEB',
        '#1C6DB6',
        '#717680'
    ]);

    const marks = sliderTicks.reduce((acc, tick, index) => {
        acc[index] = tick.label;
        return acc;
    }, {} as Record<number, string>);

    const currentIndex = sliderTicks.findIndex(t => t.value === value);
    const handleBeforeChange = () => {
        document.body.style.userSelect = 'none';
        document.body.style.webkitUserSelect = 'none';
    };
    const handleAfterChange = () => {
        document.body.style.userSelect = '';
        document.body.style.webkitUserSelect = '';
    };
    const handleChange = (newValue: number | number[]) => {
        const index = Array.isArray(newValue) ? newValue[0] : newValue;
        onChange(sliderTicks[index].value);
    };

    return (
        <Box w="full" py={{ base: 4, md: 8 }}>
            <Flex
                direction={{ base: 'column', md: 'row' }}
                justify={{ base: 'flex-start', md: 'space-between' }}
                align={{ base: 'flex-start', md: 'center' }}
                mb={{ base: 6, md: 4 }}
                gap={{ base: 3, md: 0 }}
            >
                <Text
                    fontSize={{ base: '14px', md: '16px' }}
                    lineHeight={{ base: '20px', md: '24px' }}
                    fontWeight="500"
                    color="gray.textMedium"
                >
                    {t('subscription.slider-question', 'How many {{n}} do you need?', { n: t('subscription.hostnames-label', 'hostnames') })}
                </Text>
                <HStack gap={{ base: 1.5, md: 2 }} align="center">
                    <Text
                        fontSize={{ base: '24px', md: '30px' }}
                        lineHeight={{ base: '32px', md: '38px' }}
                        fontWeight="600"
                        color="gray.darkGray"
                    >
                        {hostnameLabel}
                    </Text>
                    <Text
                        fontSize={{ base: '14px', md: '16px' }}
                        lineHeight={{ base: '20px', md: '24px' }}
                        fontWeight="500"
                        color="gray.textMedium"
                    >
                        {t('subscription.hostnames-label', 'hostnames')}
                    </Text>
                </HStack>
            </Flex>

            <Box position="relative" px={{ base: 0.5, md: 1 }} pb={{ base: 8, md: 6 }}>
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
                    white-space: nowrap;
                }

                @media (max-width: 768px) {
                    .rc-slider-mark-text {
                        font-size: 11px;
                        padding-top: 12px;
                    }
                }

                @media (max-width: 480px) {
                    .rc-slider-mark-text {
                        font-size: 9px;
                        padding-top: 10px;
                    }
                }

                .rc-slider-mark-text:hover {
                    color: ${interactiveBlue} !important;
                }
                .rc-slider-handle-click-focused:focus {
                    border-color: ${primary600};
                }

                @media (max-width: 768px) {
                    .rc-slider-track {
                        height: 6px !important;
                    }
                    .rc-slider-rail {
                        height: 6px !important;
                    }
                    .rc-slider-handle {
                        width: 20px !important;
                        height: 20px !important;
                        margin-top: -7px !important;
                    }
                }

                @media (max-width: 480px) {
                    .rc-slider-track {
                        height: 5px !important;
                    }
                    .rc-slider-rail {
                        height: 5px !important;
                    }
                    .rc-slider-handle {
                        width: 18px !important;
                        height: 18px !important;
                        margin-top: -6.5px !important;
                    }
                }
            `}</style>
        </Box>
    );
}
