import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useFavorites } from '@/contexts/FavoritesContext';

// Dados mockados - em produção viriam de uma API
const PHARMACY_DATA: Record<string, any> = {
  '1': {
    id: '1',
    name: 'Drogasil - Taguatinga Sul',
    logo: require('@/assets/images/logo-drogasil.jpg'),
    distance: '0.6 km',
    deliveryTime: '15 - 30 min',
    address: 'QSA 01, Lote 01, Taguatinga Sul',
    phone: '(61) 3562-1234',
    rating: 4.8,
    reviews: 324,
    deliveryFee: 0,
    minOrder: 29,
    isOpen: true,
    openingHours: 'Seg - Sex: 8h - 22h\nSáb - Dom: 9h - 20h',
    paymentMethods: ['Dinheiro', 'Crédito', 'Débito', 'Pix'],
    categories: ['Medicamentos', 'Beleza', 'Higiene', 'Infantil'],
  },
  '2': {
    id: '2',
    name: 'Drogasil - Águas Claras',
    logo: require('@/assets/images/logo-drogasil.jpg'),
    distance: '3.7 km',
    deliveryTime: '35 - 50 min',
    address: 'Rua 7, Lote 300, Águas Claras',
    phone: '(61) 3562-5678',
    rating: 4.7,
    reviews: 198,
    deliveryFee: 0,
    minOrder: 29,
    isOpen: true,
    openingHours: 'Seg - Sex: 8h - 22h\nSáb - Dom: 9h - 20h',
    paymentMethods: ['Dinheiro', 'Crédito', 'Débito', 'Pix'],
    categories: ['Medicamentos', 'Beleza', 'Higiene', 'Infantil'],
  },
  '3': {
    id: '3',
    name: 'Drogaria Rosário - Guará 1',
    logo: require('@/assets/images/logo-rosario.jpg'),
    distance: '8 km',
    deliveryTime: '25 - 40 min',
    address: 'QE 11, Área Especial A, Guará 1',
    phone: '(61) 3387-9012',
    rating: 4.6,
    reviews: 156,
    deliveryFee: 0,
    minOrder: 35,
    isOpen: true,
    openingHours: 'Seg - Dom: 7h - 23h',
    paymentMethods: ['Dinheiro', 'Crédito', 'Débito', 'Pix'],
    categories: ['Medicamentos', 'Dermocosméticos', 'Vitaminas'],
  },
};

export default function PharmacyDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const pharmacyId = params.id as string;
  const { isPharmacyFavorite, togglePharmacyFavorite } = useFavorites();

  const pharmacy = PHARMACY_DATA[pharmacyId];

  if (!pharmacy) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle-outline" size={64} color="#999" />
          <Text style={styles.errorText}>Farmácia não encontrada</Text>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => router.back()}
          >
            <Text style={styles.primaryButtonText}>Voltar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const isFavorite = isPharmacyFavorite(pharmacy.id);

  const handleFavorite = () => {
    togglePharmacyFavorite({
      id: pharmacy.id,
      name: pharmacy.name,
      address: pharmacy.address,
      distance: pharmacy.distance,
      logo: pharmacy.logo,
    });
  };

  const handleCall = () => {
    Linking.openURL(`tel:${pharmacy.phone}`);
  };

  const handleDirections = () => {
    Linking.openURL(
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        pharmacy.address
      )}`
    );
  };

  const handleShopNow = () => {
    router.push(`/(tabs)/pharmacy-list?id=${pharmacy.id}` as any);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.headerButton}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detalhes</Text>
        <TouchableOpacity onPress={handleFavorite} style={styles.headerButton}>
          <Ionicons
            name={isFavorite ? 'heart' : 'heart-outline'}
            size={24}
            color={isFavorite ? '#EF4444' : '#333'}
          />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Pharmacy Header Card */}
        <View style={styles.pharmacyHeader}>
          <Image source={pharmacy.logo} style={styles.pharmacyLogo} />
          
          <View style={styles.pharmacyMainInfo}>
            <Text style={styles.pharmacyName}>{pharmacy.name}</Text>
            
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={16} color="#F59E0B" />
              <Text style={styles.ratingText}>
                {pharmacy.rating} • {pharmacy.reviews} avaliações
              </Text>
            </View>

            <View style={styles.statusBadge}>
              <View style={[styles.statusDot, { backgroundColor: pharmacy.isOpen ? '#00A859' : '#EF4444' }]} />
              <Text style={styles.statusText}>
                {pharmacy.isOpen ? 'Aberto agora' : 'Fechado'}
              </Text>
            </View>
          </View>
        </View>

        {/* Quick Info Cards */}
        <View style={styles.quickInfoContainer}>
          <View style={styles.quickInfoCard}>
            <Ionicons name="location" size={20} color="#00A859" />
            <Text style={styles.quickInfoText}>{pharmacy.distance}</Text>
          </View>
          <View style={styles.quickInfoCard}>
            <Ionicons name="time" size={20} color="#00A859" />
            <Text style={styles.quickInfoText}>{pharmacy.deliveryTime}</Text>
          </View>
          {pharmacy.deliveryFee === 0 && (
            <View style={[styles.quickInfoCard, styles.freeDeliveryCard]}>
              <Ionicons name="bicycle" size={20} color="#FFF" />
              <Text style={styles.freeDeliveryText}>Grátis</Text>
            </View>
          )}
        </View>

        {/* Delivery Info Banner */}
        {pharmacy.deliveryFee === 0 && pharmacy.minOrder > 0 && (
          <View style={styles.deliveryBanner}>
            <Ionicons name="gift-outline" size={24} color="#00A859" />
            <View style={styles.deliveryBannerText}>
              <Text style={styles.deliveryBannerTitle}>Entrega Grátis</Text>
              <Text style={styles.deliveryBannerSubtitle}>
                Em pedidos acima de R$ {pharmacy.minOrder.toFixed(2).replace('.', ',')}
              </Text>
            </View>
          </View>
        )}

        {/* Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categorias</Text>
          <View style={styles.categoriesContainer}>
            {pharmacy.categories.map((category: string) => (
              <View key={category} style={styles.categoryChip}>
                <Text style={styles.categoryChipText}>{category}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Contact Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informações de Contato</Text>
          
          {/* Address */}
          <View style={styles.infoCard}>
            <View style={styles.infoCardHeader}>
              <Ionicons name="location" size={20} color="#666" />
              <Text style={styles.infoCardTitle}>Endereço</Text>
            </View>
            <Text style={styles.infoCardText}>{pharmacy.address}</Text>
            <TouchableOpacity style={styles.linkButton} onPress={handleDirections}>
              <Ionicons name="navigate" size={16} color="#00A859" />
              <Text style={styles.linkButtonText}>Ver no mapa</Text>
            </TouchableOpacity>
          </View>

          {/* Phone */}
          <View style={styles.infoCard}>
            <View style={styles.infoCardHeader}>
              <Ionicons name="call" size={20} color="#666" />
              <Text style={styles.infoCardTitle}>Telefone</Text>
            </View>
            <Text style={styles.infoCardText}>{pharmacy.phone}</Text>
            <TouchableOpacity style={styles.linkButton} onPress={handleCall}>
              <Ionicons name="call-outline" size={16} color="#00A859" />
              <Text style={styles.linkButtonText}>Ligar agora</Text>
            </TouchableOpacity>
          </View>

          {/* Hours */}
          <View style={styles.infoCard}>
            <View style={styles.infoCardHeader}>
              <Ionicons name="time" size={20} color="#666" />
              <Text style={styles.infoCardTitle}>Horário de Funcionamento</Text>
            </View>
            <Text style={styles.infoCardText}>{pharmacy.openingHours}</Text>
          </View>
        </View>

        {/* Payment Methods */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Formas de Pagamento</Text>
          <View style={styles.paymentContainer}>
            {pharmacy.paymentMethods.map((method: string) => (
              <View key={method} style={styles.paymentChip}>
                <Ionicons name="checkmark-circle" size={16} color="#00A859" />
                <Text style={styles.paymentChipText}>{method}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Fixed Bottom Button */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.shopButton}
          onPress={handleShopNow}
          activeOpacity={0.8}
        >
          <Text style={styles.shopButtonText}>Ver Produtos</Text>
          <Ionicons name="arrow-forward" size={20} color="#FFF" />
        </TouchableOpacity>
      </View>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  headerButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  content: {
    flex: 1,
  },
  pharmacyHeader: {
    backgroundColor: '#FFF',
    padding: 20,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  pharmacyLogo: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
  },
  pharmacyMainInfo: {
    flex: 1,
    marginLeft: 16,
  },
  pharmacyName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 6,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  statusText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#00A859',
  },
  quickInfoContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 12,
    gap: 8,
  },
  quickInfoCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 6,
  },
  quickInfoText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
  },
  freeDeliveryCard: {
    backgroundColor: '#00A859',
  },
  freeDeliveryText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFF',
  },
  deliveryBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#BBF7D0',
  },
  deliveryBannerText: {
    flex: 1,
    marginLeft: 12,
  },
  deliveryBannerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#00A859',
    marginBottom: 2,
  },
  deliveryBannerSubtitle: {
    fontSize: 13,
    color: '#059669',
  },
  section: {
    backgroundColor: '#FFF',
    padding: 20,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 16,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryChip: {
    backgroundColor: '#F0FDF4',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#BBF7D0',
  },
  categoryChipText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#00A859',
  },
  infoCard: {
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  infoCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoCardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginLeft: 8,
  },
  infoCardText: {
    fontSize: 15,
    color: '#333',
    lineHeight: 22,
    marginBottom: 8,
  },
  linkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 4,
  },
  linkButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#00A859',
    marginLeft: 6,
  },
  paymentContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  paymentChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    gap: 6,
  },
  paymentChipText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFF',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  shopButton: {
    flexDirection: 'row',
    backgroundColor: '#00A859',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#00A859',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  shopButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFF',
    marginRight: 8,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  errorText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginTop: 16,
    marginBottom: 24,
  },
  primaryButton: {
    backgroundColor: '#00A859',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 12,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
  },
});