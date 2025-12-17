/**
 * ReceiptDetail Component
 * Full receipt details shown in a modal/drawer
 * Uses Chakra UI v3 Dialog component
 */
import { useState } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  Badge,
} from '@chakra-ui/react';
import { FiTrash2, FiEdit2, FiX } from 'react-icons/fi';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { categoryConfig } from '../../data/mockReceipts';

export default function ReceiptDetail({ receipt, isOpen, onClose, onDelete }) {
  if (!receipt || !isOpen) return null;

  const config = categoryConfig[receipt.category] || categoryConfig.other;

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      bottom={0}
      bg="white"
      zIndex={200}
      overflowY="auto"
    >
      {/* Header */}
      <Box
        borderBottom="1px solid"
        borderColor="gray.100"
        px={4}
        py={4}
        position="sticky"
        top={0}
        bg="white"
        zIndex={1}
      >
        <HStack justify="space-between" align="start">
          <VStack align="start" gap={1}>
            <Text fontSize="lg" fontWeight="semibold">{receipt.storeName}</Text>
            <HStack>
              <Text fontSize="sm" color="gray.500">
                {formatDate(receipt.date)}
              </Text>
              <Badge colorPalette={config.color.split('.')[0]}>
                {config.label}
              </Badge>
            </HStack>
          </VStack>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            p={2}
          >
            <FiX size={20} />
          </Button>
        </HStack>
      </Box>

      {/* Body */}
      <Box px={4} py={4}>
        <VStack gap={4} align="stretch">
          {/* Items List */}
          <Box>
            <Text fontWeight="semibold" mb={2} color="gray.600" fontSize="sm">
              ITEMS
            </Text>
            <VStack gap={2} align="stretch">
              {receipt.items && receipt.items.length > 0 ? (
                receipt.items.map((item, index) => (
                  <HStack key={index} justify="space-between">
                    <Text fontSize="sm">{item.name}</Text>
                    <Text fontSize="sm" color="gray.600">
                      {formatCurrency(item.price)}
                    </Text>
                  </HStack>
                ))
              ) : (
                <Text fontSize="sm" color="gray.400">No items recorded</Text>
              )}
            </VStack>
          </Box>

          {/* Divider */}
          <Box h="1px" bg="gray.200" />

          {/* Total */}
          <HStack justify="space-between">
            <Text fontWeight="bold">Total</Text>
            <Text fontWeight="bold" fontSize="xl" color="blue.500">
              {formatCurrency(receipt.total)}
            </Text>
          </HStack>

          {/* Notes */}
          {receipt.notes && (
            <>
              <Box h="1px" bg="gray.200" />
              <Box>
                <Text fontWeight="semibold" mb={1} color="gray.600" fontSize="sm">
                  NOTES
                </Text>
                <Text fontSize="sm" color="gray.700">
                  {receipt.notes}
                </Text>
              </Box>
            </>
          )}
        </VStack>
      </Box>

      {/* Footer */}
      <Box
        position="fixed"
        bottom={0}
        left={0}
        right={0}
        borderTop="1px solid"
        borderColor="gray.100"
        px={4}
        py={4}
        bg="white"
      >
        <HStack gap={2} justify="flex-end">
          <Button
            variant="ghost"
            colorPalette="red"
            onClick={() => {
              onDelete(receipt.id);
              onClose();
            }}
          >
            <FiTrash2 style={{ marginRight: 8 }} />
            Delete
          </Button>
          <Button
            variant="outline"
            onClick={onClose}
          >
            <FiEdit2 style={{ marginRight: 8 }} />
            Close
          </Button>
        </HStack>
      </Box>
    </Box>
  );
}
