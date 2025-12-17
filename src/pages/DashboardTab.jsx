/**
 * DashboardTab - Overview & Recent Receipts
 * Shows spending summary and recent activity
 */
import { useState } from 'react';
import {
  VStack,
  HStack,
  Box,
  Text,
  Heading,
  SimpleGrid,
  Skeleton,
} from '@chakra-ui/react';
import { toast } from 'sonner';
import { FiTrendingUp, FiFileText } from 'react-icons/fi';
import PageContainer from '../components/common/PageContainer';
import SwipeableReceiptCard from '../components/receipt/SwipeableReceiptCard';
import ReceiptDetail from '../components/receipt/ReceiptDetail';
import { useReceipts } from '../context/ReceiptContext';
import { formatCurrency } from '../utils/formatters';
import { categoryConfig } from '../data/mockReceipts';

export default function DashboardTab() {
  const {
    receipts,
    isLoading,
    getRecentReceipts,
    getTotalSpending,
    getSpendingByCategory,
    deleteReceipt,
  } = useReceipts();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState(null);

  const recentReceipts = getRecentReceipts(5);
  const totalSpending = getTotalSpending();
  const spendingByCategory = getSpendingByCategory();

  // Handle receipt card click
  const handleReceiptClick = (receipt) => {
    setSelectedReceipt(receipt);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setSelectedReceipt(null);
  };

  // Handle swipe delete with toast
  const handleDelete = (id) => {
    const receipt = receipts.find((r) => r.id === id);
    deleteReceipt(id);
    toast.success('Receipt deleted', {
      description: receipt ? `${receipt.storeName} removed` : 'Receipt removed',
    });
  };

  // Get top spending category
  const topCategory = Object.entries(spendingByCategory).sort(
    (a, b) => b[1] - a[1]
  )[0];

  if (isLoading) {
    return (
      <PageContainer>
        <VStack gap={4} py={4}>
          <Skeleton height="120px" w="100%" borderRadius="xl" />
          <Skeleton height="200px" w="100%" borderRadius="xl" />
        </VStack>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <VStack gap={6} py={4}>
        {/* Header */}
        <HStack w="100%" justify="space-between" align="center">
          <Heading size="md">Dashboard</Heading>
          <Text fontSize="sm" color="gray.500">
            {receipts.length} receipts
          </Text>
        </HStack>

        {/* Stats Cards */}
        <SimpleGrid columns={2} gap={3} w="100%">
          {/* Total Spending Card */}
          <Box bg="blue.500" color="white" p={4} borderRadius="xl">
            <Text fontSize="xs" opacity={0.9}>Total Spending</Text>
            <Text fontSize="xl" fontWeight="bold" mt={1}>
              {formatCurrency(totalSpending)}
            </Text>
            <HStack mt={2} fontSize="xs" opacity={0.8}>
              <FiFileText />
              <Text>{receipts.length} receipts</Text>
            </HStack>
          </Box>

          {/* Top Category Card */}
          <Box bg="white" p={4} borderRadius="xl" boxShadow="sm">
            <Text fontSize="xs" color="gray.500">Top Category</Text>
            <Text fontSize="xl" fontWeight="bold" color="gray.800" mt={1}>
              {topCategory
                ? formatCurrency(topCategory[1])
                : formatCurrency(0)}
            </Text>
            <HStack mt={2} fontSize="xs">
              <Box color="green.500"><FiTrendingUp /></Box>
              <Text color="gray.600">
                {topCategory
                  ? categoryConfig[topCategory[0]]?.label || 'Other'
                  : 'No data'}
              </Text>
            </HStack>
          </Box>
        </SimpleGrid>

        {/* Category Breakdown */}
        <Box w="100%" bg="white" p={4} borderRadius="xl" boxShadow="sm">
          <Text fontWeight="semibold" mb={3} fontSize="sm" color="gray.600">
            SPENDING BY CATEGORY
          </Text>
          <VStack gap={2} align="stretch">
            {Object.entries(spendingByCategory)
              .sort((a, b) => b[1] - a[1])
              .map(([category, amount]) => {
                const config = categoryConfig[category] || categoryConfig.other;
                const percentage = totalSpending
                  ? ((amount / totalSpending) * 100).toFixed(0)
                  : 0;

                return (
                  <HStack key={category} justify="space-between">
                    <HStack>
                      <Box
                        w={3}
                        h={3}
                        borderRadius="sm"
                        bg={config.color}
                      />
                      <Text fontSize="sm">{config.label}</Text>
                    </HStack>
                    <HStack gap={3}>
                      <Text fontSize="sm" color="gray.500">
                        {percentage}%
                      </Text>
                      <Text fontSize="sm" fontWeight="medium">
                        {formatCurrency(amount)}
                      </Text>
                    </HStack>
                  </HStack>
                );
              })}
          </VStack>
        </Box>

        {/* Recent Receipts */}
        <Box w="100%">
          <HStack justify="space-between" mb={3}>
            <Text fontWeight="semibold" fontSize="sm" color="gray.600">
              RECENT RECEIPTS
            </Text>
            <Text fontSize="xs" color="gray.400">
              Swipe left to delete
            </Text>
          </HStack>
          <VStack gap={2} align="stretch">
            {recentReceipts.length > 0 ? (
              recentReceipts.map((receipt) => (
                <SwipeableReceiptCard
                  key={receipt.id}
                  receipt={receipt}
                  onClick={() => handleReceiptClick(receipt)}
                  onDelete={handleDelete}
                />
              ))
            ) : (
              <Box bg="white" p={8} borderRadius="xl" textAlign="center">
                <Text color="gray.500">No receipts yet</Text>
                <Text fontSize="sm" color="gray.400">
                  Capture your first receipt!
                </Text>
              </Box>
            )}
          </VStack>
        </Box>
      </VStack>

      {/* Receipt Detail Modal */}
      <ReceiptDetail
        receipt={selectedReceipt}
        isOpen={isOpen}
        onClose={handleClose}
        onDelete={handleDelete}
      />
    </PageContainer>
  );
}
