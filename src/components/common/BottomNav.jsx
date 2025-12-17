/**
 * BottomNav Component
 * Mobile-first bottom navigation bar with 3 tabs
 * Fixed at bottom of screen for easy thumb access
 */
import { Box, Flex, Text, VStack } from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiCamera, FiHome, FiArchive } from 'react-icons/fi';

// Navigation items configuration
const navItems = [
  { path: '/dashboard', icon: FiHome, label: 'Dashboard' },
  { path: '/camera', icon: FiCamera, label: 'Capture' },
  { path: '/storage', icon: FiArchive, label: 'Storage' },
];

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Box
      position="fixed"
      bottom={0}
      left={0}
      right={0}
      bg="white"
      borderTop="1px solid"
      borderColor="gray.200"
      px={4}
      py={2}
      pb="env(safe-area-inset-bottom)"
      zIndex={100}
    >
      <Flex justify="space-around" align="center" maxW="500px" mx="auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <VStack
              key={item.path}
              gap={0.5}
              cursor="pointer"
              onClick={() => navigate(item.path)}
              opacity={isActive ? 1 : 0.6}
              transition="all 0.2s"
              _hover={{ opacity: 1 }}
              py={1}
              px={3}
            >
              <Box
                p={2}
                borderRadius="full"
                color={isActive ? 'blue.500' : 'gray.600'}
              >
                <Icon size={22} />
              </Box>
              <Text
                fontSize="xs"
                fontWeight={isActive ? 'semibold' : 'normal'}
                color={isActive ? 'blue.500' : 'gray.600'}
              >
                {item.label}
              </Text>
            </VStack>
          );
        })}
      </Flex>
    </Box>
  );
}
