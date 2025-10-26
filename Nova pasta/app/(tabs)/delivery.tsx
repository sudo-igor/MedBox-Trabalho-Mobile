import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function DeliveryScreen() {
  const router = useRouter();
  const [showPharmacyModal, setShowPharmacyModal] = useState(false);

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push('/(tabs)/cart');
    }
  };

  const handlePickupAtPharmacy = () => {
    setShowPharmacyModal(true);
  };

  const handleDeliveryAtAddress = () => {
    router.push('/(tabs)/address-selection');
  };

  const handleSelectPharmacy = () => {
    // Navega primeiro
    router.push('/(tabs)/payment');
    // Fecha o modal depois
    setTimeout(() => {
      setShowPharmacyModal(false);
    }, 100);
  };

  const handleChooseOtherPharmacy = () => {
    setShowPharmacyModal(false);
    router.push('/(tabs)/pharmacy-list');
  };

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
        <Text style={styles.headerTitle}>Entrega</Text>
        <View style={styles.backButton} />
      </View>

      <View style={styles.content}>
        <Text style={styles.questionText}>Como deseja a entrega?</Text>

        <View style={styles.optionsContainer}>
          <TouchableOpacity
            style={styles.optionCard}
            onPress={handleDeliveryAtAddress}
            activeOpacity={0.7}
          >
            <Ionicons name="home-outline" size={32} color="#333" />
            <Text style={styles.optionTitle}>Receber</Text>
            <Text style={styles.optionSubtitle}>no endereço</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.optionCard}
            onPress={handlePickupAtPharmacy}
            activeOpacity={0.7}
          >
            <Ionicons name="business-outline" size={32} color="#333" />
            <Text style={styles.optionTitle}>Retirar</Text>
            <Text style={styles.optionSubtitle}>na farmácia</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Modal de seleção de farmácia */}
      <Modal
        visible={showPharmacyModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowPharmacyModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Deseja retirar nessa Farmácia?</Text>

            <View style={styles.pharmacyCard}>
              <Text style={styles.pharmacyName}>Drogaria</Text>
              <Text style={styles.pharmacyAddress}>Taguatinga sul</Text>
              <Text style={styles.pharmacyAddress}>
                SL 8 SuL Q CS CSG 5 loja 06
              </Text>
              <View style={styles.pharmacyInfo}>
                <Ionicons name="location" size={16} color="#333" />
                <Text style={styles.pharmacyDistance}>220 m</Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.confirmButton}
              onPress={handleSelectPharmacy}
              activeOpacity={0.8}
            >
              <Text style={styles.confirmButtonText}>Confirmar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.chooseOtherButton}
              onPress={handleChooseOtherPharmacy}
              activeOpacity={0.7}
            >
              <Text style={styles.chooseOtherButtonText}>Escolher outra</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
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
  content: {
    flex: 1,
    padding: 16,
  },
  questionText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 32,
    marginTop: 32,
  },
  optionsContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  optionCard: {
    flex: 1,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 150,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginTop: 12,
  },
  optionSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    paddingBottom: 40,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 24,
    textAlign: 'center',
  },
  pharmacyCard: {
    backgroundColor: '#F9F9F9',
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
  },
  pharmacyName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  pharmacyAddress: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  pharmacyInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 4,
  },
  pharmacyDistance: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  confirmButton: {
    backgroundColor: '#00A859',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
  },
  chooseOtherButton: {
    backgroundColor: 'transparent',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  chooseOtherButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
});