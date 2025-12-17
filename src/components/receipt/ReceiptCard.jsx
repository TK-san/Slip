/**
 * ReceiptCard Component
 * Displays a single receipt summary in a card format
 * Used in Dashboard and Storage tabs
 */
import { Box, Flex, Text, HStack, Badge } from '@chakra-ui/react';
import {
  FiShoppingBag,
  FiTruck,
  FiShoppingCart,
  FiZap,
  FiFilm,
  FiMoreHorizontal,
} from 'react-icons/fi';
import { formatCurrency, formatRelativeDate } from '../../utils/formatters';
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

export default function ReceiptCard({ receipt, onClick }) {
  const config = categoryConfig[receipt.category] || categoryConfig.other;
  const CategoryIcon = categoryIcons[receipt.category] || FiMoreHorizontal;

  return (
    <Box
      onClick={onClick}
      cursor="pointer"
      transition="all 0.2s"
      _hover={{ transform: 'translateY(-2px)', shadow: 'md' }}
      _active={{ transform: 'scale(0.98)' }}
      bg="white"
      borderRadius="xl"
      boxShadow="sm"
      py={3}
      px={4}
    >
      <Flex align="center" gap={3}>
        {/* Category Icon */}
        <Box
          p={2.5}
          borderRadius="lg"
          bg={config.bgColor}
        >
          <Box as={CategoryIcon} boxSize={5} color={config.color} />
        </Box>

        {/* Receipt Info */}
        <Box flex={1} minW={0}>
          <Text fontWeight="semibold" fontSize="sm" lineClamp={1}>
            {receipt.storeName}
          </Text>
          <HStack gap={2} mt={0.5}>
            <Text fontSize="xs" color="gray.500">
              {formatRelativeDate(receipt.date)}
            </Text>
            <Badge
              size="sm"
              colorPalette={config.color.split('.')[0]}
              fontSize="2xs"
              textTransform="capitalize"
            >
              {receipt.category}
            </Badge>
          </HStack>
        </Box>

        {/* Total */}
        <Text fontWeight="bold" fontSize="md" color="gray.800">
          {formatCurrency(receipt.total)}
        </Text>
      </Flex>
    </Box>
  );
}
