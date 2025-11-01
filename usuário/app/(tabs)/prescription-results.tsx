import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useCart } from '@/contexts/CartContext';

type Medicine = {
  id: string;
  name: string;
  pharmacy: string;
  location: string;
  quantity: number;
};

const mockMedicines: Medicine[] = [
  {
    id: '1',
    name: 'Remédio',
    pharmacy: 'Drogasil - Tag Sul',
    location: 'R$40',
    quantity: 0,
  },
  {
    id: '2',
    name: 'Remédio',
    pharmacy: 'Drogasil - Asa Sul',
    location: 'R$60',
    quantity: 0,
  },
  {
    id: '3',
    name: 'Remédio',
    pharmacy: 'Drogasil - Guará',
    location: 'R$65',
    quantity: 0,
  },
];

export default function PrescriptionResultsScreen() {
  const router = useRouter();
  const { addItem } = useCart();
  const [medicines, setMedicines] = useState<Medicine[]>(mockMedicines);

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push('/(tabs)');
    }
  };

  const handleIncrement = (id: string) => {
    setMedicines(prev =>
      prev.map(med =>
        med.id === id ? { ...med, quantity: med.quantity + 1 } : med
      )
    );
  };

  const handleDecrement = (id: string) => {
    setMedicines(prev =>
      prev.map(med =>
        med.id === id && med.quantity > 0
          ? { ...med, quantity: med.quantity - 1 }
          : med
      )
    );
  };

  const handleContinue = () => {
    // Adiciona os medicamentos selecionados ao carrinho
    medicines.forEach(med => {
      if (med.quantity > 0) {
        for (let i = 0; i < med.quantity; i++) {
          addItem({
            id: med.id,
            name: med.name,
            price: 40.00, // Preço fixo por enquanto
            image: require('@/assets/images/remedio.png'),
          });
        }
      }
    });

    router.push('/(tabs)/cart');
  };

  const hasSelectedItems = medicines.some(med => med.quantity > 0);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBack}
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Medicamentos encontrados</Text>
        <View style={styles.backButton} />
      </View>

      <View style={styles.successBanner}>
        <Ionicons name="checkmark-circle" size={20} color="#00A859" />
        <Text style={styles.successText}>
          Foi identificado 1 medicamento:
        </Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Escolha:</Text>

        {medicines.map((medicine) => (
          <View key={medicine.id} style={styles.medicineCard}>
            <View style={styles.medicineHeader}>
              <Image
                source={require('@/assets/images/logo-drogasil.jpg')}
                style={styles.pharmacyLogo}
              />
              <View style={styles.medicineInfo}>
                <Text style={styles.medicineName}>{medicine.name}</Text>
                <Text style={styles.medicinePrice}>{medicine.location}</Text>
                <Text style={styles.pharmacyName}>{medicine.pharmacy}</Text>
              </View>
            </View>

            <View style={styles.quantityControls}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => handleDecrement(medicine.id)}
                activeOpacity={0.7}
              >
                <Ionicons name="remove" size={20} color="#333" />
              </TouchableOpacity>

              <Text style={styles.quantityText}>{medicine.quantity}</Text>

              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => handleIncrement(medicine.id)}
                activeOpacity={0.7}
              >
                <Ionicons name="add" size={20} color="#333" />
              </TouchableOpacity>
            </View>
          </View>
        ))}

        <View style={{ height: 100 }} />
      </ScrollView>

      {hasSelectedItems && (
        <View style={styles.bottomBar}>
          <TouchableOpacity
            style={styles.continueButton}
            onPress={handleContinue}
            activeOpacity={0.8}
          >
            <Text style={styles.continueButtonText}>Continuar para Carrinho</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  backButton: {
    padding: 4,
    width: 32,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  successBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    padding: 12,
    gap: 8,
  },
  successText: {
    fontSize: 14,
    color: '#00A859',
    fontWeight: '500',
  },
  content: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    padding: 16,
    backgroundColor: '#FFF',
  },
  medicineCard: {
    backgroundColor: '#FFF',
    padding: 16,
    marginBottom: 8,
  },
  medicineHeader: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  pharmacyLogo: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 12,
  },
  medicineInfo: {
    flex: 1,
  },
  medicineName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  medicinePrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  pharmacyName: {
    fontSize: 13,
    color: '#666',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 16,
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    minWidth: 24,
    textAlign: 'center',
  },
  bottomBar: {
    backgroundColor: '#FFF',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  continueButton: {
    backgroundColor: '#00A859',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
  },
});