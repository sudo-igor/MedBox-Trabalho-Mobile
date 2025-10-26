import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const addresses = [
  {
    id: '1',
    label: 'Faculdade',
    address: 'QS 07, Lote 01',
    city: 'Taguatinga Sul - taguatinga',
    state: 'Brasília - DF',
    zipCode: '71966-700',
  },
  {
    id: '2',
    label: 'Faculdade',
    address: 'QS 07, Lote 01',
    city: 'Taguatinga Sul - taguatinga',
    state: 'Brasília - DF',
    zipCode: '71966-700',
  },
];

export default function AddressSelectionScreen() {
  const router = useRouter();

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push('/(tabs)/delivery');
    }
  };

  const handleEditAddress = (addressId: string) => {
    // Implementar edição de endereço
    console.log('Editar endereço:', addressId);
  };

  const handleDeleteAddress = (addressId: string) => {
    // Implementar exclusão de endereço
    console.log('Deletar endereço:', addressId);
  };

  const handleSelectAddress = (addressId: string) => {
    // Aqui você pode salvar o endereço selecionado e continuar o fluxo
    console.log('Endereço selecionado:', addressId);
    router.push('/(tabs)/payment');
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

      <View style={styles.titleContainer}>
        <Text style={styles.title}>Escolha local de entrega</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {addresses.map((address) => (
          <TouchableOpacity
            key={address.id}
            style={styles.addressCard}
            onPress={() => handleSelectAddress(address.id)}
            activeOpacity={0.7}
          >
            <View style={styles.addressContent}>
              <View style={styles.addressInfo}>
                <Text style={styles.addressLabel}>{address.label}</Text>
                <Text style={styles.addressText}>{address.address}</Text>
                <Text style={styles.addressText}>
                  {address.city}, {address.state}, {address.zipCode}
                </Text>
              </View>

              <View style={styles.addressActions}>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => handleEditAddress(address.id)}
                  activeOpacity={0.7}
                >
                  <Ionicons name="pencil" size={20} color="#333" />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => handleDeleteAddress(address.id)}
                  activeOpacity={0.7}
                >
                  <Ionicons name="trash-outline" size={20} color="#FF0000" />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          style={styles.addAddressButton}
          activeOpacity={0.7}
        >
          <Ionicons name="add-circle-outline" size={24} color="#00A859" />
          <Text style={styles.addAddressText}>Adicionar novo endereço</Text>
        </TouchableOpacity>
      </ScrollView>
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
  titleContainer: {
    backgroundColor: '#FFF',
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  content: {
    flex: 1,
  },
  addressCard: {
    backgroundColor: '#FFF',
    marginBottom: 8,
  },
  addressContent: {
    flexDirection: 'row',
    padding: 16,
  },
  addressInfo: {
    flex: 1,
  },
  addressLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  addressText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  addressActions: {
    flexDirection: 'column',
    gap: 12,
    marginLeft: 16,
  },
  actionButton: {
    padding: 4,
  },
  addAddressButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    padding: 16,
    gap: 8,
  },
  addAddressText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#00A859',
  },
});