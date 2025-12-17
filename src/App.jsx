/**
 * App.jsx - Main Application Component
 * Sets up routing, theme, and global providers
 */
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { ReceiptProvider } from './context/ReceiptContext';
import BottomNav from './components/common/BottomNav';

// Page imports
import DashboardTab from './pages/DashboardTab';
import CameraTab from './pages/CameraTab';
import StorageTab from './pages/StorageTab';

function App() {
  return (
    <ChakraProvider value={defaultSystem}>
      <ReceiptProvider>
        <BrowserRouter>
          {/* Toast notifications */}
          <Toaster
            position="top-center"
            richColors
            toastOptions={{
              style: {
                marginTop: '16px',
              },
            }}
          />

          {/* Main Routes */}
          <Routes>
            {/* Default redirect to dashboard */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<DashboardTab />} />
            <Route path="/camera" element={<CameraTab />} />
            <Route path="/storage" element={<StorageTab />} />
          </Routes>

          {/* Bottom Navigation - always visible */}
          <BottomNav />
        </BrowserRouter>
      </ReceiptProvider>
    </ChakraProvider>
  );
}

export default App;
