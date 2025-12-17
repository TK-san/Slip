/**
 * Utility functions for formatting data throughout the app
 * Localized for Malaysia (MYR / Ringgit Malaysia)
 */

/**
 * Format a number as Malaysian Ringgit (RM)
 * @param {number} amount - The amount to format
 * @returns {string} Formatted currency string (e.g., "RM 87.43")
 */
export const formatCurrency = (amount) => {
  return `RM ${amount.toFixed(2)}`;
};

/**
 * Format a date string to Malaysian format
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date (e.g., "15 Dis 2024")
 */
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('ms-MY', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date);
};

/**
 * Format a date to relative time (e.g., "2 hari lepas")
 * @param {string} dateString - ISO date string
 * @returns {string} Relative time string in Malay
 */
export const formatRelativeDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) return 'Hari ini';
  if (diffInDays === 1) return 'Semalam';
  if (diffInDays < 7) return `${diffInDays} hari lepas`;
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} minggu lepas`;
  return formatDate(dateString);
};

/**
 * Truncate text with ellipsis
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
export const truncateText = (text, maxLength = 20) => {
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};
