/**
 * PageContainer Component
 * Wrapper for all page content with consistent padding and scroll behavior
 * Accounts for bottom navigation height
 */
import { Box } from '@chakra-ui/react';

export default function PageContainer({ children, noPadding = false }) {
  return (
    <Box
      minH="100vh"
      pb="80px"
      pt={noPadding ? 0 : 4}
      px={noPadding ? 0 : 4}
      bg="gray.50"
      overflowY="auto"
    >
      <Box maxW="500px" mx="auto">
        {children}
      </Box>
    </Box>
  );
}
