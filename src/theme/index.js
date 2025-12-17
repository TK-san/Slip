/**
 * Chakra UI v3 Theme Configuration
 * Mobile-first design with custom colors for Slip app
 */
import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';

// Custom configuration for Slip app
const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: {
          50: { value: '#e6f7ff' },
          100: { value: '#b3e0ff' },
          200: { value: '#80caff' },
          300: { value: '#4db3ff' },
          400: { value: '#1a9dff' },
          500: { value: '#0080e6' },
          600: { value: '#0066b3' },
          700: { value: '#004d80' },
          800: { value: '#00334d' },
          900: { value: '#001a1a' },
        },
      },
    },
  },
});

// Create the system with merged config
export const system = createSystem(defaultConfig, config);

export default system;
