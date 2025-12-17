/**
 * CameraTab - Capture/Upload Receipt Photos
 * Main entry point for adding new receipts
 * MVP: File upload + mock analysis (real OCR can be added later)
 */
import { useState, useRef } from 'react';
import {
  VStack,
  Box,
  Text,
  Button,
  Image,
  Input,
  HStack,
  Heading,
  Spinner,
} from '@chakra-ui/react';
import { toast } from 'sonner';
import { FiCamera, FiUpload, FiCheck, FiX } from 'react-icons/fi';
import PageContainer from '../components/common/PageContainer';
import CategoryPills from '../components/common/CategoryPills';
import { useReceipts } from '../context/ReceiptContext';

export default function CameraTab() {
  const fileInputRef = useRef(null);
  const { addReceipt } = useReceipts();

  // State for captured image and form
  const [capturedImage, setCapturedImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // Form state for manual entry / editing analyzed results
  const [formData, setFormData] = useState({
    storeName: '',
    total: '',
    category: 'other',
    date: new Date().toISOString().split('T')[0],
    notes: '',
  });

  // Handle file selection (camera or gallery)
  const handleFileSelect = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCapturedImage(reader.result);
        toast.success('Image captured', {
          description: 'Tap Analyze to extract receipt data',
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Simulate receipt analysis (MVP placeholder for real OCR)
  const analyzeReceipt = async () => {
    setIsAnalyzing(true);

    // Simulate API delay with progress feedback
    toast.loading('Analyzing receipt...', { id: 'analyze' });
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Mock analyzed data - in real app, this would come from OCR API
    setFormData({
      storeName: 'Analyzed Store',
      total: (Math.random() * 100 + 10).toFixed(2),
      category: 'shopping',
      date: new Date().toISOString().split('T')[0],
      notes: 'Auto-analyzed receipt',
    });

    setIsAnalyzing(false);
    setShowForm(true);

    toast.success('Receipt analyzed!', {
      id: 'analyze',
      description: 'Please verify the extracted information.',
    });
  };

  // Save the receipt
  const handleSave = async () => {
    if (!formData.storeName || !formData.total) {
      toast.warning('Missing information', {
        description: 'Please fill in store name and total.',
      });
      return;
    }

    setIsSaving(true);

    // Small delay for UX feedback
    await new Promise((resolve) => setTimeout(resolve, 300));

    addReceipt({
      storeName: formData.storeName,
      total: parseFloat(formData.total),
      category: formData.category,
      date: formData.date,
      notes: formData.notes,
      items: [],
      imageUrl: capturedImage,
    });

    setIsSaving(false);

    toast.success('Resit disimpan!', {
      description: `${formData.storeName} - RM ${formData.total}`,
    });

    // Reset state
    setCapturedImage(null);
    setShowForm(false);
    setFormData({
      storeName: '',
      total: '',
      category: 'other',
      date: new Date().toISOString().split('T')[0],
      notes: '',
    });
  };

  // Reset/cancel
  const handleCancel = () => {
    setCapturedImage(null);
    setShowForm(false);
  };

  return (
    <PageContainer>
      <VStack gap={6} py={4}>
        <Heading size="md" alignSelf="start">
          Add Receipt
        </Heading>

        {/* Camera/Upload Area */}
        {!capturedImage ? (
          <Box w="100%" bg="white" p={4} borderRadius="xl" boxShadow="sm">
            <VStack
              gap={4}
              py={10}
              borderWidth={2}
              borderStyle="dashed"
              borderColor="gray.200"
              borderRadius="xl"
            >
              <Box color="gray.400">
                <FiCamera size={48} />
              </Box>
              <Text color="gray.500" textAlign="center">
                Take a photo or upload a receipt
              </Text>
              <HStack gap={3}>
                {/* Hidden file input */}
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  style={{ display: 'none' }}
                />
                <Button
                  colorPalette="blue"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <FiCamera style={{ marginRight: 8 }} />
                  Camera
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    if (fileInputRef.current) {
                      fileInputRef.current.removeAttribute('capture');
                      fileInputRef.current.click();
                      fileInputRef.current.setAttribute('capture', 'environment');
                    }
                  }}
                >
                  <FiUpload style={{ marginRight: 8 }} />
                  Upload
                </Button>
              </HStack>
            </VStack>
          </Box>
        ) : (
          /* Image Preview */
          <Box w="100%" bg="white" p={4} borderRadius="xl" boxShadow="sm">
            <VStack gap={4}>
              <Box
                w="100%"
                maxH="300px"
                overflow="hidden"
                borderRadius="lg"
                bg="gray.100"
              >
                <Image
                  src={capturedImage}
                  alt="Captured receipt"
                  w="100%"
                  objectFit="contain"
                />
              </Box>

              {!showForm && (
                <HStack gap={3} w="100%">
                  <Button
                    flex={1}
                    variant="outline"
                    onClick={handleCancel}
                    disabled={isAnalyzing}
                  >
                    <FiX style={{ marginRight: 8 }} />
                    Cancel
                  </Button>
                  <Button
                    flex={1}
                    colorPalette="blue"
                    disabled={isAnalyzing}
                    onClick={analyzeReceipt}
                  >
                    {isAnalyzing ? (
                      <>
                        <Spinner size="sm" mr={2} />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <FiCheck style={{ marginRight: 8 }} />
                        Analyze
                      </>
                    )}
                  </Button>
                </HStack>
              )}
            </VStack>
          </Box>
        )}

        {/* Manual Entry / Edit Form */}
        {showForm && (
          <Box w="100%" bg="white" p={4} borderRadius="xl" boxShadow="sm">
            <VStack gap={4}>
              <Text fontWeight="semibold" alignSelf="start">
                Butiran Resit
              </Text>

              <Box w="100%">
                <Text fontSize="sm" mb={1} fontWeight="medium">Nama Kedai</Text>
                <Input
                  value={formData.storeName}
                  onChange={(e) =>
                    setFormData({ ...formData, storeName: e.target.value })
                  }
                  placeholder="Masukkan nama kedai"
                />
              </Box>

              <Box w="100%">
                <Text fontSize="sm" mb={1} fontWeight="medium">Jumlah (RM)</Text>
                <Input
                  type="number"
                  step="0.01"
                  value={formData.total}
                  onChange={(e) =>
                    setFormData({ ...formData, total: e.target.value })
                  }
                  placeholder="0.00"
                />
              </Box>

              <Box w="100%">
                <Text fontSize="sm" mb={2} fontWeight="medium">Kategori</Text>
                <CategoryPills
                  selected={formData.category}
                  onChange={(category) =>
                    setFormData({ ...formData, category })
                  }
                />
              </Box>

              <Box w="100%">
                <Text fontSize="sm" mb={1} fontWeight="medium">Tarikh</Text>
                <Input
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                />
              </Box>

              <Box w="100%">
                <Text fontSize="sm" mb={1} fontWeight="medium">Nota (pilihan)</Text>
                <Input
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  placeholder="Tambah nota..."
                />
              </Box>

              <HStack gap={3} w="100%" pt={2}>
                <Button
                  flex={1}
                  variant="outline"
                  onClick={handleCancel}
                  disabled={isSaving}
                >
                  Batal
                </Button>
                <Button
                  flex={1}
                  colorPalette="blue"
                  onClick={handleSave}
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <>
                      <Spinner size="sm" mr={2} />
                      Menyimpan...
                    </>
                  ) : (
                    'Simpan Resit'
                  )}
                </Button>
              </HStack>
            </VStack>
          </Box>
        )}

        {/* Quick Manual Entry Button */}
        {!capturedImage && !showForm && (
          <Button
            w="100%"
            variant="ghost"
            onClick={() => setShowForm(true)}
          >
            Atau masukkan secara manual
          </Button>
        )}
      </VStack>
    </PageContainer>
  );
}
