import { createSystem, defaultConfig } from '@chakra-ui/react';
import colors from './colors';
import typography from './typography';

const customConfig = {
  theme: {
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
