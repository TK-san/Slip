/**
 * SwipeableReceiptCard Component
 * Receipt card with swipe-to-delete functionality for mobile
 * Uses touch events for smooth gesture handling
 */
import { useState, useRef } from 'react';
import { Box, Flex, Text, HStack, Badge } from '@chakra-ui/react';
import {
  FiShoppingBag,
  FiTruck,
  FiShoppingCart,
  FiZap,
  FiFilm,
  FiMoreHorizontal,
  FiTrash2,
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

// Swipe threshold in pixels
const SWIPE_THRESHOLD = 80;
const DELETE_THRESHOLD = 150;

export default function SwipeableReceiptCard({ receipt, onClick, onDelete }) {
  const config = categoryConfig[receipt.category] || categoryConfig.other;
  const CategoryIcon = categoryIcons[receipt.category] || FiMoreHorizontal;

  // Swipe state
  const [translateX, setTranslateX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const startX = useRef(0);
  const currentX = useRef(0);

  // Touch handlers
  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
    currentX.current = e.touches[0].clientX;
    setIsDragging(true);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    currentX.current = e.touches[0].clientX;
    const diff = currentX.current - startX.current;

    // Only allow swiping left (negative values)
    if (diff < 0) {
      setTranslateX(Math.max(diff, -DELETE_THRESHOLD));
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);

    if (translateX < -DELETE_THRESHOLD * 0.8) {
      // Delete action triggered
      setIsDeleting(true);
      setTranslateX(-window.innerWidth);
      setTimeout(() => {
        onDelete?.(receipt.id);
      }, 200);
    } else if (translateX < -SWIPE_THRESHOLD) {
      // Snap to show delete button
      setTranslateX(-SWIPE_THRESHOLD);
    } else {
      // Snap back
      setTranslateX(0);
    }
  };

  // Handle click only if not swiped
  const handleClick = () => {
    if (Math.abs(translateX) < 10) {
      onClick?.();
    } else {
      // Reset position on tap when swiped
      setTranslateX(0);
    }
  };

  return (
    <Box
      position="relative"
      overflow="hidden"
      borderRadius="xl"
      opacity={isDeleting ? 0 : 1}
      transform={isDeleting ? 'scale(0.8)' : 'scale(1)'}
      transition={isDragging ? 'none' : 'all 0.2s ease-out'}
    >
      {/* Delete background */}
      <Box
        position="absolute"
        top={0}
        right={0}
        bottom={0}
        width="150px"
        bg="red.500"
        display="flex"
        alignItems="center"
        justifyContent="flex-end"
        pr={6}
        borderRadius="xl"
      >
        <Box color="white" textAlign="center">
          <FiTrash2 size={24} />
          <Text fontSize="xs" mt={1}>Delete</Text>
        </Box>
      </Box>

      {/* Card content */}
      <Box
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={handleClick}
        cursor="pointer"
        bg="white"
        borderRadius="xl"
        boxShadow="sm"
        py={3}
        px={4}
        transform={`translateX(${translateX}px)`}
        transition={isDragging ? 'none' : 'transform 0.2s ease-out'}
        _hover={!isDragging ? { transform: `translateX(${translateX}px) translateY(-2px)`, shadow: 'md' } : {}}
        _active={!isDragging ? { transform: `translateX(${translateX}px) scale(0.98)` } : {}}
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
    </Box>
  );
}
