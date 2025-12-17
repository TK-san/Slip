/**
 * CategoryPills Component
 * Horizontal scrollable category selector with pill/chip design
 * Mobile-friendly touch targets
 */
import { Box, HStack, Text } from '@chakra-ui/react';
import {
  FiShoppingBag,
  FiTruck,
  FiShoppingCart,
  FiZap,
  FiFilm,
  FiMoreHorizontal,
} from 'react-icons/fi';
import { categoryConfig } from '../../data/mockReceipts';

// Category icon mapping
const categoryIcons = {
  food: FiShoppingBag,
  transport: FiTruck,
  shopping: FiShoppingCart,
  utilities: FiZap,
  entertainment: FiFilm,
  other: FiMoreHorizontal,
};

export default function CategoryPills({ selected, onChange }) {
  return (
    <Box
      w="100%"
      overflowX="auto"
      mx={-4}
      px={4}
      css={{
        '&::-webkit-scrollbar': { display: 'none' },
        scrollbarWidth: 'none',
      }}
    >
      <HStack gap={2} pb={2} w="max-content">
        {Object.entries(categoryConfig).map(([key, config]) => {
          const Icon = categoryIcons[key] || FiMoreHorizontal;
          const isSelected = selected === key;

          return (
            <Box
              key={key}
              onClick={() => onChange(key)}
              cursor="pointer"
              px={3}
              py={2}
              borderRadius="full"
              bg={isSelected ? config.color : 'gray.100'}
              color={isSelected ? 'white' : 'gray.600'}
              transition="all 0.2s"
              _hover={{
                bg: isSelected ? config.color : 'gray.200',
              }}
              _active={{
                transform: 'scale(0.95)',
              }}
              display="flex"
              alignItems="center"
              gap={2}
              whiteSpace="nowrap"
              minH="40px"
            >
              <Icon size={16} />
              <Text fontSize="sm" fontWeight={isSelected ? 'semibold' : 'medium'}>
                {config.label}
              </Text>
            </Box>
          );
        })}
      </HStack>
    </Box>
  );
}
