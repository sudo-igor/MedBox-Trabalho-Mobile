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
import { useFavorites } from '@/contexts/FavoritesContext';

type Tab = 'products' | 'pharmacies';

export default function FavoritesScreen() {
  const router = useRouter();
  const { favoriteProducts, favoritePharmacies, toggleProductFavorite, togglePharmacyFavorite } = useFavorites();
  const [activeTab, setActiveTab] = useState<Tab>('products');

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push('/(tabs)/profile');
    }
  };

  const handleProductPress = (productId: string) => {
    router.push(`/(tabs)/product/${productId}` as any);
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
        <Text style={styles.headerTitle}>Favoritos</Text>
        <View style={styles.backButton} />
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'products' && styles.tabActive]}
          onPress={() => setActiveTab('products')}
          activeOpacity={0.7}
        >
          <Text style={[styles.tabText, activeTab === 'products' && styles.tabTextActive]}>
            Produtos ({favoriteProducts.length})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'pharmacies' && styles.tabActive]}
          onPress={() => setActiveTab('pharmacies')}
          activeOpacity={0.7}
        >
          <Text style={[styles.tabText, activeTab === 'pharmacies' && styles.tabTextActive]}>
            Farmácias ({favoritePharmacies.length})
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === 'products' ? (
          favoriteProducts.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="heart-outline" size={80} color="#CCC" />
              <Text style={styles.emptyText}>Nenhum produto favoritado</Text>
              <Text style={styles.emptySubtext}>
                Seus produtos favoritos aparecerão aqui
              </Text>
            </View>
          ) : (
            <View style={styles.grid}>
              {favoriteProducts.map((product) => (
                <View key={product.id} style={styles.productCard}>
                  <TouchableOpacity
                    style={styles.favoriteButton}
                    onPress={() => toggleProductFavorite(product)}
                    activeOpacity={0.7}
                  >
                    <Ionicons name="heart" size={20} color="#FF0000" />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => handleProductPress(product.id)}
                    activeOpacity={0.7}
                  >
                    <Image
                      source={product.image}
                      style={styles.productImage}
                      resizeMode="contain"
                    />
                    <Text style={styles.productName}>{product.name}</Text>
                    <Text style={styles.productPrice}>
                      R$ {product.price.toFixed(2).replace('.', ',')}
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )
        ) : (
          favoritePharmacies.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="business-outline" size={80} color="#CCC" />
              <Text style={styles.emptyText}>Nenhuma farmácia favoritada</Text>
              <Text style={styles.emptySubtext}>
                Suas farmácias favoritas aparecerão aqui
              </Text>
            </View>
          ) : (
            favoritePharmacies.map((pharmacy) => (
              <View key={pharmacy.id} style={styles.pharmacyCard}>
                <Image source={pharmacy.logo} style={styles.pharmacyLogo} />
                <View style={styles.pharmacyInfo}>
                  <Text style={styles.pharmacyName}>{pharmacy.name}</Text>
                  <Text style={styles.pharmacyAddress}>{pharmacy.address}</Text>
                  <Text style={styles.pharmacyDistance}>{pharmacy.distance}</Text>
                </View>
                <TouchableOpacity
                  style={styles.favoriteButton}
                  onPress={() => togglePharmacyFavorite(pharmacy)}
                  activeOpacity={0.7}
                >
                  <Ionicons name="heart" size={24} color="#FF0000" />
                </TouchableOpacity>
              </View>
            ))
          )
        )}
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
  tabs: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: '#00A859',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#999',
  },
  tabTextActive: {
    color: '#00A859',
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
    paddingHorizontal: 32,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 12,
    gap: 12,
  },
  productCard: {
    width: '48%',
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 12,
    position: 'relative',
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 1,
    padding: 4,
  },
  productImage: {
    width: '100%',
    height: 120,
    marginBottom: 8,
  },
  productName: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  pharmacyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 16,
    marginBottom: 1,
  },
  pharmacyLogo: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 12,
  },
  pharmacyInfo: {
    flex: 1,
  },
  pharmacyName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  pharmacyAddress: {
    fontSize: 13,
    color: '#666',
    marginBottom: 2,
  },
  pharmacyDistance: {
    fontSize: 13,
    color: '#00A859',
    fontWeight: '500',
  },
});