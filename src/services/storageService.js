/**
 * Storage Service
 * Abstraction layer for data persistence
 * Currently uses localStorage, can be swapped for Supabase
 *
 * RECOMMENDATION: For MVP, localStorage is fine.
 * For production with multiple devices, use Supabase because:
 * - Cloud sync across devices
 * - User authentication
 * - Image storage (for receipt photos)
 * - Real-time updates
 */

const STORAGE_KEYS = {
  RECEIPTS: 'slip_receipts',
  SETTINGS: 'slip_settings',
};

/**
 * Local Storage implementation
 */
export const localStorageService = {
  // Get all receipts
  getReceipts: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.RECEIPTS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error reading receipts:', error);
      return [];
    }
  },

  // Save all receipts
  saveReceipts: (receipts) => {
    try {
      localStorage.setItem(STORAGE_KEYS.RECEIPTS, JSON.stringify(receipts));
      return true;
    } catch (error) {
      console.error('Error saving receipts:', error);
      return false;
    }
  },

  // Get settings
  getSettings: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      return data ? JSON.parse(data) : {};
    } catch (error) {
      console.error('Error reading settings:', error);
      return {};
    }
  },

  // Save settings
  saveSettings: (settings) => {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
      return true;
    } catch (error) {
      console.error('Error saving settings:', error);
      return false;
    }
  },

  // Clear all data
  clearAll: () => {
    Object.values(STORAGE_KEYS).forEach((key) => {
      localStorage.removeItem(key);
    });
  },
};

/**
 * Export receipts to JSON file
 */
export const exportReceiptsToJSON = (receipts) => {
  const dataStr = JSON.stringify(receipts, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = `slip_receipts_${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Export receipts to CSV file
 */
export const exportReceiptsToCSV = (receipts) => {
  const headers = ['Store', 'Date', 'Total', 'Category', 'Notes'];
  const rows = receipts.map((r) => [
    r.storeName,
    r.date,
    r.total.toFixed(2),
    r.category,
    r.notes || '',
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map((row) => row.map((cell) => `"${cell}"`).join(',')),
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = `slip_receipts_${new Date().toISOString().split('T')[0]}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// Default export is localStorage for MVP
export default localStorageService;
