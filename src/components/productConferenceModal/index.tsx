import { useState } from 'react';
import { Modal, TouchableOpacity, StyleSheet, View, Text as RNText } from 'react-native';
import {
  Box, VStack, HStack, Text, Input, InputField, Icon, Button,
} from '@gluestack-ui/themed';
import { Camera, QrCode } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import { CameraView, useCameraPermissions } from 'expo-camera';

export type Product = {
  code: string;
  spec?: string;
  description?: string;
};

type ProductConferenceData = {
  quantity: string;
  code: string;
  photoUri?: string;
};

type ProductConferenceModalProps = {
  visible: boolean;
  product?: Product | null;
  onCancel: () => void;
  onSubmit: (data: ProductConferenceData) => void;
};

export default function ProductConferenceModal({
  visible,
  product,
  onCancel,
  onSubmit,
}: ProductConferenceModalProps) {
  const [quantity, setQuantity] = useState<string>('');
  const [code, setCode] = useState<string>(product?.code ?? '');
  const [photoUri, setPhotoUri] = useState<string | undefined>(undefined);
  const [showScanner, setShowScanner] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();

  const handlePickPhoto = async () => {
    // Solicitar permissão da câmera
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== 'granted') {
      alert('Desculpe, precisamos de permissão para acessar a câmera!');
      return;
    }

    // Abrir a câmera
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setPhotoUri(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    onSubmit({ quantity, code, photoUri });
  };

  const handleScanQr = async () => {
    if (!permission) {
      return;
    }

    if (!permission.granted) {
      const { granted } = await requestPermission();

      if (!granted) {
        alert('Desculpe, precisamos de permissão para acessar a câmera!');
        return;
      }
    }

    setShowScanner(true);
  };  const handleBarCodeScanned = ({ type, data }: { type: string; data: string }) => {
    setShowScanner(false);
    setCode(data);
  };

  return (
    <>
      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={onCancel}
      >
      <Box
        flex={1}
        bgColor="rgba(0,0,0,0.5)"
        justifyContent="center"
        alignItems="center"
      >
        <Box width={340} maxWidth="90%">
          <VStack space="xs">
            <ModalHeader productCode={product?.code} />

            <Box
              bg="$white"
              px="$4"
              py="$4"
              borderBottomLeftRadius={12}
              borderBottomRightRadius={12}
              shadowColor="$black"
              shadowOffset={{ width: 0, height: 4 }}
              shadowOpacity={0.3}
              shadowRadius={8}
              elevation={5}
            >
              <VStack space="md">
                <ProductInfo label="Especificação do item:" value={product?.spec} />
                <ProductInfo label="Descrição:" value={product?.description} />

                <QuantityInput
                  value={quantity}
                  onChange={setQuantity}
                />

                <CodeInput
                  value={code}
                  onChange={setCode}
                  onScanQr={handleScanQr}
                />

                <PhotoPicker
                  photoUri={photoUri}
                  onPickPhoto={handlePickPhoto}
                />

                <ActionButtons
                  onConfirm={handleSubmit}
                  onCancel={onCancel}
                />
              </VStack>
            </Box>
          </VStack>
        </Box>
      </Box>
      </Modal>

      <Modal
        visible={showScanner}
        animationType="slide"
        onRequestClose={() => setShowScanner(false)}
      >
        <View style={{ flex: 1, backgroundColor: 'black' }}>
          <CameraView
            style={StyleSheet.absoluteFillObject}
            barcodeScannerSettings={{
              barcodeTypes: ['qr', 'ean13', 'ean8', 'code128', 'code39'],
            }}
            onBarcodeScanned={handleBarCodeScanned}
          />
          <View
            style={{
              position: 'absolute',
              bottom: 40,
              left: 0,
              right: 0,
              alignItems: 'center',
            }}
          >
            <TouchableOpacity
              onPress={() => setShowScanner(false)}
              style={{
                backgroundColor: 'white',
                paddingHorizontal: 24,
                paddingVertical: 12,
                borderRadius: 8,
              }}
            >
              <RNText style={{ color: 'black', fontWeight: 'bold' }}>
                Cancelar
              </RNText>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}

function ModalHeader({ productCode }: { productCode?: string }) {
  return (
    <Box
      bg="#0F0F1A"
      px="$4"
      py="$3"
      borderTopLeftRadius={12}
      borderTopRightRadius={12}
    >
      <HStack alignItems="center" justifyContent="space-between">
        <Text color="$white" fontWeight="$semibold" fontSize={14}>
          Código do produto:
        </Text>
        <Text color="$white" fontWeight="$bold" fontSize={16}>
          {productCode}
        </Text>
      </HStack>
    </Box>
  );
}

function ProductInfo({ label, value }: { label: string; value?: string }) {
  return (
    <Box>
      <Text fontWeight="$bold" fontSize={14} mb="$1">
        {label}
      </Text>
      <Text fontSize={14} color={value ? "$black" : "$coolGray400"}>
        {value || 'N/A'}
      </Text>
    </Box>
  );
}

function QuantityInput({
  value,
  onChange
}: {
  value: string;
  onChange: (text: string) => void;
}) {
  return (
    <Box>
      <Text fontWeight="$bold" fontSize={14} mb="$2">
        Quantidade de itens:
      </Text>
      <Input
        w="$full"
        variant="outline"
        borderRadius={8}
        borderColor="$coolGray300"
      >
        <InputField
          placeholder="insira a quantidade de itens..."
          keyboardType="numeric"
          value={value}
          onChangeText={onChange}
          fontSize={13}
        />
      </Input>
    </Box>
  );
}

function CodeInput({
  value,
  onChange,
  onScanQr
}: {
  value: string;
  onChange: (text: string) => void;
  onScanQr: () => void;
}) {
  return (
    <Box>
      <Text fontWeight="$bold" fontSize={14} mb="$2">
        Faça leitura do endereço, ou insira o código:
      </Text>
      <HStack alignItems="center" space="sm">
        <Input
          flex={1}
          variant="outline"
          borderRadius={8}
          borderColor="$coolGray300"
        >
          <InputField
            placeholder="insira o código..."
            value={value}
            onChangeText={onChange}
            returnKeyType="done"
            fontSize={13}
          />
        </Input>

        <Button
          onPress={onScanQr}
          p="$2.5"
          borderRadius={8}
          bgColor="$white"
          borderWidth={1}
          borderColor="$coolGray300"
        >
          <Icon as={QrCode} size="xl" color="#0F0F1A" />
        </Button>
      </HStack>
    </Box>
  );
}

function PhotoPicker({
  photoUri,
  onPickPhoto
}: {
  photoUri?: string;
  onPickPhoto: () => void;
}) {
  return (
    <Box>
      <Text fontWeight="$bold" fontSize={14} mb="$2">
        Registre uma foto dos itens:
      </Text>

      <TouchableOpacity
        onPress={onPickPhoto}
        accessibilityLabel="Tirar foto"
        activeOpacity={0.7}
      >
        <Box
          borderRadius={8}
          borderWidth={1}
          borderColor="$coolGray300"
          height={80}
          alignItems="center"
          justifyContent="center"
          bgColor="$coolGray50"
        >
          {photoUri ? (
            <Text fontSize={13} color="$coolGray600">
              Foto adicionada
            </Text>
          ) : (
            <Icon as={Camera} size="xl" color="$coolGray400" />
          )}
        </Box>
      </TouchableOpacity>
    </Box>
  );
}

function ActionButtons({
  onConfirm,
  onCancel
}: {
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <HStack justifyContent="space-between" mt="$3" space="sm">
      <Button
        flex={1}
        bgColor="#22C55E"
        borderRadius={8}
        py="$3"
        onPress={onConfirm}
      >
        <Text color="$white" fontWeight="$bold" fontSize={13}>
          Registrar Conferência
        </Text>
      </Button>

      <Button
        flex={1}
        bgColor="#C62828"
        borderRadius={8}
        py="$3"
        onPress={onCancel}
      >
        <Text color="$white" fontWeight="$bold" fontSize={13}>
          Cancelar
        </Text>
      </Button>
    </HStack>
  );
}
