/**
 * Mock Receipt Data for MVP
 * Localized for Malaysia with Malaysian stores and Ringgit prices
 */

export const mockReceipts = [
  {
    id: '1',
    storeName: 'Jaya Grocer',
    date: '2024-12-15',
    total: 87.40,
    category: 'food',
    items: [
      { name: 'Pisang Berangan 1kg', price: 6.90 },
      { name: 'Susu Dutch Lady 1L', price: 7.50 },
      { name: 'Ayam Whole (1.2kg)', price: 15.80 },
      { name: 'Sayur Campur', price: 4.50 },
      { name: 'Roti Gardenia', price: 3.70 },
      { name: 'Telur Gred A (10 biji)', price: 8.90 },
      { name: 'Beras Jasmine 5kg', price: 28.90 },
      { name: 'Milo 1kg', price: 11.20 },
    ],
    imageUrl: null,
    createdAt: '2024-12-15T10:30:00Z',
    notes: 'Belanja mingguan',
  },
  {
    id: '2',
    storeName: 'Petronas',
    date: '2024-12-14',
    total: 120.00,
    category: 'transport',
    items: [
      { name: 'RON95 (45 liter)', price: 103.05 },
      { name: 'Air Mineral 1.5L', price: 2.50 },
      { name: 'Cuci Kereta', price: 14.45 },
    ],
    imageUrl: null,
    createdAt: '2024-12-14T16:45:00Z',
    notes: 'Isi minyak penuh',
  },
  {
    id: '3',
    storeName: 'MR DIY',
    date: '2024-12-12',
    total: 68.70,
    category: 'shopping',
    items: [
      { name: 'Lampu LED', price: 15.90 },
      { name: 'Penyangkut Baju (10 pcs)', price: 8.90 },
      { name: 'Kabel USB-C', price: 12.90 },
      { name: 'Bekas Plastik Set', price: 19.90 },
      { name: 'Pita Pelekat', price: 5.90 },
      { name: 'Bateri AA (4 pcs)', price: 5.20 },
    ],
    imageUrl: null,
    createdAt: '2024-12-12T14:20:00Z',
    notes: 'Barang rumah',
  },
  {
    id: '4',
    storeName: 'Netflix Malaysia',
    date: '2024-12-01',
    total: 54.90,
    category: 'entertainment',
    items: [
      { name: 'Langganan Bulanan (Standard)', price: 54.90 },
    ],
    imageUrl: null,
    createdAt: '2024-12-01T00:00:00Z',
    notes: 'Pelan Standard',
  },
  {
    id: '5',
    storeName: 'TNB',
    date: '2024-12-05',
    total: 156.80,
    category: 'utilities',
    items: [
      { name: 'Bil Elektrik - Disember', price: 156.80 },
    ],
    imageUrl: null,
    createdAt: '2024-12-05T09:00:00Z',
    notes: 'Bil bulanan',
  },
];

// Category configuration with colors and icons
// Labels in Malay for Malaysian users
export const categoryConfig = {
  food: {
    label: 'Makanan & Barangan',
    color: 'red.400',
    bgColor: 'red.50',
  },
  transport: {
    label: 'Pengangkutan',
    color: 'teal.400',
    bgColor: 'teal.50',
  },
  shopping: {
    label: 'Beli-belah',
    color: 'blue.400',
    bgColor: 'blue.50',
  },
  utilities: {
    label: 'Utiliti',
    color: 'green.400',
    bgColor: 'green.50',
  },
  entertainment: {
    label: 'Hiburan',
    color: 'yellow.500',
    bgColor: 'yellow.50',
  },
  other: {
    label: 'Lain-lain',
    color: 'gray.400',
    bgColor: 'gray.50',
  },
};
