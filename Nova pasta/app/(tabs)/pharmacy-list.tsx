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

const pharmacies = [
  {
    id: '1',
    name: 'Drogaria',
    status: 'Aberta',
    time: '6th às 22h',
    address: 'Taguatinga sul',
    fullAddress: 'SL 8 SuL Q CS CSG 5 loja 06',
    distance: '220 m',
  },
  {
    id: '2',
    name: 'Drogaria',
    status: 'Aberta',
    time: '6th às 22h',
    address: 'Taguatinga sul',
    fullAddress: 'SL 8 SuL Q CS CSG 5 loja 06',
    distance: '220 m',
  },
  {
    id: '3',
    name: 'Drogaria',
    status: 'Aberta',
    time: '6th às 22h',
    address: 'Taguatinga sul',
    fullAddress: 'SL 8 SuL Q CS CSG 5 loja 06',
    distance: '220 m',
  },
  {
    id: '4',
    name: 'Drogaria',
    status: 'Aberta',
    time: '6th às 22h',
    address: 'Taguatinga sul',
    fullAddress: 'SL 8 SuL Q CS CSG 5 loja 06',
    distance: '220 m',
  },
];

export default function PharmacyListScreen() {
  const router = useRouter();

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push('/(tabs)/delivery');
    }
  };

  const handleSelectPharmacy = (pharmacyId: string) => {
    // Aqui você pode salvar a farmácia selecionada e continuar o fluxo
    console.log('Farmácia selecionada:', pharmacyId);
    router.back();
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
        
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#999" />
        </View>
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.title}>Farmácias Próximas</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {pharmacies.map((pharmacy) => (
          <TouchableOpacity
            key={pharmacy.id}
            style={styles.pharmacyCard}
            onPress={() => handleSelectPharmacy(pharmacy.id)}
            activeOpacity={0.7}
          >
            <View style={styles.pharmacyInfo}>
              <View style={styles.pharmacyHeader}>
                <Text style={styles.pharmacyName}>{pharmacy.name}</Text>
                <View style={styles.statusBadge}>
                  <View style={styles.statusDot} />
                  <Text style={styles.statusText}>{pharmacy.status}</Text>
                </View>
              </View>

              <Text style={styles.pharmacyTime}>{pharmacy.time}</Text>
              <Text style={styles.pharmacyAddress}>{pharmacy.address}</Text>
              <Text style={styles.pharmacyFullAddress}>
                {pharmacy.fullAddress}
              </Text>

              <View style={styles.distanceContainer}>
                <Ionicons name="location" size={16} color="#333" />
                <Text style={styles.distanceText}>{pharmacy.distance}</Text>
              </View>
            </View>

            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
        ))}
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    gap: 12,
  },
  backButton: {
    padding: 4,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  titleContainer: {
    backgroundColor: '#FFF',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
  },
  content: {
    flex: 1,
  },
  pharmacyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 16,
    marginBottom: 1,
  },
  pharmacyInfo: {
    flex: 1,
  },
  pharmacyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  pharmacyName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#00A859',
  },
  statusText: {
    fontSize: 12,
    color: '#00A859',
    fontWeight: '500',
  },
  pharmacyTime: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  pharmacyAddress: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  pharmacyFullAddress: {
    fontSize: 13,
    color: '#999',
    marginBottom: 8,
  },
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  distanceText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
});