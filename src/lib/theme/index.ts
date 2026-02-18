import { createSystem, defaultConfig, defineRecipe } from '@chakra-ui/react';
import colors from './colors';
import typography from './typography';

const buttonRecipe = defineRecipe({
  variants: {
    variant: {
      primary: {
        bg: 'brand.solid',
        color: 'white',
        borderRadius: '12px',
        fontWeight: '600',
        transition: 'all 0.2s',
        _hover: {
          bg: 'brand.hover',
        },
        _active: {
          bg: 'brand.active',
        },
      },
      secondary: {
        bg: 'white',
        color: 'primary.fg',
        border: '1px solid',
        borderColor: 'gray.100',
        borderRadius: '12px',
        transition: 'all 0.2s',
        _hover: {
          bg: 'gray.100',
        },
        _active: {
          transform: 'translateY(0)',
        },
      },
    },
  },
});

const customConfig = {
  theme: {
    recipes: {
      button: buttonRecipe,
    },
    tokens: {
      colors,
      fonts: typography.fonts,
      fontSizes: typography.fontSizes,
      fontWeights: typography.fontWeights,
      lineHeights: typography.lineHeights,
    },
    semanticTokens: {
      colors: {
        primary: {
          solid: { value: '{colors.primary.600}' },
          contrast: { value: 'white' },
          fg: { value: '{colors.primary.700}' },
          muted: { value: '{colors.primary.100}' },
        },
        brand: {
          solid: { value: '{colors.brand.500}' },
          contrast: { value: 'white' },
          hover: { value: '{colors.brand.600}' },
          active: { value: '{colors.brand.800}' },
          focus: { value: '{colors.brand.600}' },
        },
        header: {
          text: {
            light: { value: '#FFFFFF' },
            dark: { value: '#181D27' },
          },
          bg: {
            scrolled: { value: 'rgba(255, 255, 255, 0.1)' },
            hover: {
              light: { value: 'rgba(255, 255, 255, 0.16)' },
              dark: { value: '#D5D7DA' },
            },
            border: {
              light: { value: 'rgba(255, 255, 255, 0.3)' },
              dark: { value: 'transparent' },
            },
          },
        },
        interactive: {
            blue: { value: '#1D7BAD' },
            blueHover: { value: '#1b8dcbe3' },
        },
        gradients: {
            faqGlow: { value: 'linear-gradient(89.44deg, #20A795 14.11%, #1D81AB 65.7%, #1C6DB6 91.83%)' },
            mobileMenu: { value: 'linear-gradient(163deg, #1c6db6 0%, #20a795 86%)' },
            ctaBackground: { value: 'linear-gradient(90deg, #EEF6FF 0%, #F8FAFC 100%)' },
        },
        whiteAlpha: {
            24: { value: 'rgba(255, 255, 255, 0.24)' },
            40: { value: 'rgba(255, 255, 255, 0.4)' },
            70: { value: 'rgba(255, 255, 255, 0.7)' },
            72: { value: 'rgba(255, 255, 255, 0.72)' },
            84: { value: 'rgba(255, 255, 255, 0.84)' },
            88: { value: 'rgba(255, 255, 255, 0.88)' },
        }
      },
    },
  },
  globalCss: {
    body: {
      bg: 'gray.50',
      color: 'gray.900',
      fontSize: 'md',
      lineHeight: 'normal',
    },
  },
};

export const system = createSystem(defaultConfig, customConfig);
