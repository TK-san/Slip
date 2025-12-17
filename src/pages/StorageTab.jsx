/**
 * StorageTab - Receipt Archive & Export
 * Search, filter, and download receipts
 */
import { useState, useMemo } from 'react';
import {
  VStack,
  HStack,
  Box,
  Text,
  Heading,
  Input,
  Button,
  Badge,
  Spinner,
} from '@chakra-ui/react';
import { toast } from 'sonner';
import {
  FiSearch,
  FiDownload,
  FiTrash2,
} from 'react-icons/fi';
import PageContainer from '../components/common/PageContainer';
import SwipeableReceiptCard from '../components/receipt/SwipeableReceiptCard';
import ReceiptDetail from '../components/receipt/ReceiptDetail';
import { useReceipts } from '../context/ReceiptContext';
import { categoryConfig } from '../data/mockReceipts';
import {
  exportReceiptsToJSON,
  exportReceiptsToCSV,
} from '../services/storageService';

export default function StorageTab() {
  const { receipts, deleteReceipt, resetToMockData } = useReceipts();

  // State
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  // Filter receipts based on search and category
  const filteredReceipts = useMemo(() => {
    return receipts.filter((receipt) => {
      const matchesSearch = receipt.storeName
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        categoryFilter === 'all' || receipt.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [receipts, searchQuery, categoryFilter]);

  // Handle receipt click
  const handleReceiptClick = (receipt) => {
    setSelectedReceipt(receipt);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setSelectedReceipt(null);
  };

  // Handle delete with toast
  const handleDelete = (id) => {
    const receipt = receipts.find((r) => r.id === id);
    deleteReceipt(id);
    toast.success('Receipt deleted', {
      description: receipt ? `${receipt.storeName} removed` : 'Receipt removed',
    });
  };

  // Export handlers with loading state
  const handleExportJSON = async () => {
    setIsExporting(true);
    setShowExportMenu(false);

    // Small delay for UX feedback
    await new Promise((resolve) => setTimeout(resolve, 300));

    exportReceiptsToJSON(filteredReceipts);
    setIsExporting(false);

    toast.success('Exported as JSON', {
      description: `${filteredReceipts.length} receipts exported`,
    });
  };

  const handleExportCSV = async () => {
    setIsExporting(true);
    setShowExportMenu(false);

    // Small delay for UX feedback
    await new Promise((resolve) => setTimeout(resolve, 300));

    exportReceiptsToCSV(filteredReceipts);
    setIsExporting(false);

    toast.success('Exported as CSV', {
      description: `${filteredReceipts.length} receipts exported`,
    });
  };

  // Reset data (dev helper)
  const handleReset = () => {
    resetToMockData();
    toast.info('Data reset', {
      description: 'Restored mock receipt data',
    });
  };

  return (
    <PageContainer>
      <VStack gap={4} py={4}>
        {/* Header */}
        <HStack w="100%" justify="space-between" align="center">
          <Heading size="md">Storage</Heading>
          <Badge colorPalette="blue" fontSize="sm">
            {filteredReceipts.length} receipts
          </Badge>
        </HStack>

        {/* Search Bar */}
        <Box position="relative" w="100%">
          <Box
            position="absolute"
            left={3}
            top="50%"
            transform="translateY(-50%)"
            color="gray.400"
            zIndex={1}
          >
            <FiSearch />
          </Box>
          <Input
            pl={10}
            placeholder="Search receipts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            bg="white"
          />
        </Box>

        {/* Filters & Export Row */}
        <HStack w="100%" gap={2}>
          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            style={{
              flex: 1,
              padding: '8px 12px',
              borderRadius: '8px',
              border: '1px solid #E2E8F0',
              backgroundColor: 'white',
              fontSize: '14px',
            }}
          >
            <option value="all">All Categories</option>
            {Object.entries(categoryConfig).map(([key, config]) => (
              <option key={key} value={key}>
                {config.label}
              </option>
            ))}
          </select>

          {/* Export Menu */}
          <Box position="relative">
            <Button
              variant="outline"
              bg="white"
              onClick={() => setShowExportMenu(!showExportMenu)}
              disabled={isExporting || filteredReceipts.length === 0}
            >
              {isExporting ? (
                <Spinner size="sm" mr={2} />
              ) : (
                <FiDownload style={{ marginRight: 8 }} />
              )}
              Export
            </Button>
            {showExportMenu && (
              <Box
                position="absolute"
                top="100%"
                right={0}
                mt={1}
                bg="white"
                borderRadius="lg"
                boxShadow="lg"
                border="1px solid"
                borderColor="gray.200"
                zIndex={10}
                minW="150px"
                overflow="hidden"
              >
                <Box
                  px={4}
                  py={3}
                  cursor="pointer"
                  _hover={{ bg: 'gray.50' }}
                  onClick={handleExportJSON}
                  transition="background 0.15s"
                >
                  Export as JSON
                </Box>
                <Box
                  px={4}
                  py={3}
                  cursor="pointer"
                  _hover={{ bg: 'gray.50' }}
                  onClick={handleExportCSV}
                  borderTop="1px solid"
                  borderColor="gray.100"
                  transition="background 0.15s"
                >
                  Export as CSV
                </Box>
              </Box>
            )}
          </Box>
        </HStack>

        {/* Hint for swipe */}
        {filteredReceipts.length > 0 && (
          <Text fontSize="xs" color="gray.400" alignSelf="end">
            Swipe left to delete
          </Text>
        )}

        {/* Receipts List */}
        <VStack gap={2} w="100%" align="stretch">
          {filteredReceipts.length > 0 ? (
            filteredReceipts.map((receipt) => (
              <SwipeableReceiptCard
                key={receipt.id}
                receipt={receipt}
                onClick={() => handleReceiptClick(receipt)}
                onDelete={handleDelete}
              />
            ))
          ) : (
            <Box bg="white" p={8} borderRadius="xl" textAlign="center">
              <Text color="gray.500">No receipts found</Text>
              <Text fontSize="sm" color="gray.400">
                {searchQuery || categoryFilter !== 'all'
                  ? 'Try adjusting your filters'
                  : 'Start by capturing a receipt'}
              </Text>
            </Box>
          )}
        </VStack>

        {/* Dev Helper: Reset Data */}
        <Button
          variant="ghost"
          size="sm"
          color="gray.400"
          onClick={handleReset}
        >
          <FiTrash2 style={{ marginRight: 8 }} />
          Reset to mock data
        </Button>
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
