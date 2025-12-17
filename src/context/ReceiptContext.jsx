/**
 * Receipt Context
 * Global state management for receipts using React Context
 * This can be easily swapped to use Supabase or other storage later
 */
import { createContext, useContext, useState, useEffect } from 'react';
import { mockReceipts } from '../data/mockReceipts';

// Create the context
const ReceiptContext = createContext(null);

// Storage key for localStorage
const STORAGE_KEY = 'slip_receipts';

/**
 * ReceiptProvider - Wraps the app and provides receipt state
 */
export function ReceiptProvider({ children }) {
  const [receipts, setReceipts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load receipts from localStorage on mount
  useEffect(() => {
    const loadReceipts = () => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          setReceipts(JSON.parse(stored));
        } else {
          // First time: load mock data
          setReceipts(mockReceipts);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(mockReceipts));
        }
      } catch (error) {
        console.error('Error loading receipts:', error);
        setReceipts(mockReceipts);
      } finally {
        setIsLoading(false);
      }
    };

    loadReceipts();
  }, []);

  // Save to localStorage whenever receipts change
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(receipts));
    }
  }, [receipts, isLoading]);

  /**
   * Add a new receipt
   */
  const addReceipt = (receipt) => {
    const newReceipt = {
      ...receipt,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setReceipts((prev) => [newReceipt, ...prev]);
    return newReceipt;
  };

  /**
   * Update an existing receipt
   */
  const updateReceipt = (id, updates) => {
    setReceipts((prev) =>
      prev.map((r) => (r.id === id ? { ...r, ...updates } : r))
    );
  };

  /**
   * Delete a receipt
   */
  const deleteReceipt = (id) => {
    setReceipts((prev) => prev.filter((r) => r.id !== id));
  };

  /**
   * Get receipt by ID
   */
  const getReceiptById = (id) => {
    return receipts.find((r) => r.id === id);
  };

  /**
   * Calculate total spending
   */
  const getTotalSpending = () => {
    return receipts.reduce((sum, r) => sum + r.total, 0);
  };

  /**
   * Get spending by category
   */
  const getSpendingByCategory = () => {
    return receipts.reduce((acc, r) => {
      acc[r.category] = (acc[r.category] || 0) + r.total;
      return acc;
    }, {});
  };

  /**
   * Get recent receipts (last N)
   */
  const getRecentReceipts = (count = 5) => {
    return [...receipts]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, count);
  };

  /**
   * Reset to mock data (for development)
   */
  const resetToMockData = () => {
    setReceipts(mockReceipts);
  };

  const value = {
    receipts,
    isLoading,
    addReceipt,
    updateReceipt,
    deleteReceipt,
    getReceiptById,
    getTotalSpending,
    getSpendingByCategory,
    getRecentReceipts,
    resetToMockData,
  };

  return (
    <ReceiptContext.Provider value={value}>
      {children}
    </ReceiptContext.Provider>
  );
}

/**
 * Custom hook to use the receipt context
 */
export function useReceipts() {
  const context = useContext(ReceiptContext);
  if (!context) {
    throw new Error('useReceipts must be used within a ReceiptProvider');
  }
  return context;
}
