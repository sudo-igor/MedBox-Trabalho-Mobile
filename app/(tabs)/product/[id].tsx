import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Text,
  Dimensions,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useCart } from '@/contexts/CartContext';

const { width } = Dimensions.get('window');

const productData = {
  id: '1',
  name: 'Remédio',
  price: 40.00,
  image: require('@/assets/images/remedio.png'),
  description: 'Descrição do produto aqui',
};

const pharmacyData = {
  name: 'Drogasil - Taguatinga Sul',
  distance: '0,5km',
  deliveryTime: '5 - 10 min',
  deliveryFee: 'Entrega grátis a partir de R$ 5',
  logo: require('@/assets/images/logo-drogasil.jpg'),
};

const recommendations = [
  { id: '2', name: 'Remédio', price: 40.00 },
  { id: '3', name: 'Remédio', price: 40.00 },
  { id: '4', name: 'Remédio', price: 40.00 },
  { id: '5', name: 'Remédio', price: 40.00 },
];

export default function ProductDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  // Verificar se o contexto está disponível
  let cart;
  try {
    cart = useCart();
  } catch (error) {
    console.error('CartContext não disponível:', error);
    // Fallback caso o contexto não esteja disponível
    cart = {
      addItem: (item: any) => {
        Alert.alert('Erro', 'Sistema de carrinho não disponível');
      },
      getItemQuantity: () => 0,
      updateQuantity: () => {},
    };
  }
  
  const { addItem, getItemQuantity, updateQuantity } = cart;
  
  const [isFavorite, setIsFavorite] = useState(false);
  const [isPharmacyFavorite, setIsPharmacyFavorite] = useState(false);
  const [sobreExpanded, setSobreExpanded] = useState(false);
  const [bulaExpanded, setBulaExpanded] = useState(false);

  const itemQuantity = getItemQuantity(productData.id);

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push('/(tabs)');
    }
  };

  const handleSearch = () => {
    console.log('Navegando para busca...');
    router.push('/(tabs)/search');
  };

  const handleRecommendationPress = (productId: string) => {
    router.push(`/(tabs)/product/${productId}` as any);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const togglePharmacyFavorite = () => {
    setIsPharmacyFavorite(!isPharmacyFavorite);
  };

  const handleAddToCart = () => {
    console.log('Adicionando ao carrinho:', productData);
    try {
      addItem({
        id: productData.id,
        name: productData.name,
        price: productData.price,
        image: productData.image,
      });
      console.log('Produto adicionado com sucesso!');
    } catch (error) {
      console.error('Erro ao adicionar ao carrinho:', error);
      Alert.alert('Erro', 'Não foi possível adicionar o produto ao carrinho');
    }
  };

  const handleIncrement = () => {
    console.log('Incrementando quantidade');
    updateQuantity(productData.id, itemQuantity + 1);
  };

  const handleDecrement = () => {
    console.log('Decrementando quantidade');
    if (itemQuantity > 1) {
      updateQuantity(productData.id, itemQuantity - 1);
    }
  };

  const handleGoToCart = () => {
    console.log('Indo para o carrinho');
    router.push('/(tabs)/cart');
  };

  console.log('Item quantity:', itemQuantity);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBack}
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.searchBar}
          onPress={handleSearch}
          activeOpacity={0.7}
        >
          <Ionicons name="search" size={20} color="#999" />
          <Text style={styles.searchPlaceholder}>Buscar</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Product Image */}
        <View style={styles.imageContainer}>
          <Image
            source={productData.image}
            style={styles.productImage}
            resizeMode="contain"
          />
        </View>

        {/* Product Info */}
        <View style={styles.productInfo}>
          <View style={styles.productHeader}>
            <View>
              <Text style={styles.productName}>{productData.name}</Text>
              <Text style={styles.productPrice}>
                R$ {productData.price.toFixed(2).replace('.', ',')}
              </Text>
            </View>
            <TouchableOpacity
              onPress={toggleFavorite}
              style={styles.favoriteButton}
              activeOpacity={0.7}
            >
              <Ionicons
                name={isFavorite ? 'heart' : 'heart-outline'}
                size={24}
                color={isFavorite ? '#FF0000' : '#999'}
              />
            </TouchableOpacity>
          </View>

          {/* Expandable Sections */}
          <View>
            <TouchableOpacity 
              style={styles.expandableSection}
              onPress={() => setSobreExpanded(!sobreExpanded)}
              activeOpacity={0.7}
            >
              <Text style={styles.sectionTitle}>Sobre</Text>
              <Ionicons 
                name={sobreExpanded ? "chevron-up" : "chevron-forward"} 
                size={20} 
                color="#999" 
              />
            </TouchableOpacity>
            {sobreExpanded && (
              <View style={styles.expandableContent}>
                <Text style={styles.expandableText}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </Text>
              </View>
            )}
          </View>

          <View>
            <TouchableOpacity 
              style={styles.expandableSection}
              onPress={() => setBulaExpanded(!bulaExpanded)}
              activeOpacity={0.7}
            >
              <Text style={styles.sectionTitle}>Bula</Text>
              <Ionicons 
                name={bulaExpanded ? "chevron-up" : "chevron-forward"} 
                size={20} 
                color="#999" 
              />
            </TouchableOpacity>
            {bulaExpanded && (
              <View style={styles.expandableContent}>
                <Text style={styles.expandableText}>
                  <Text style={styles.expandableTextBold}>Composição:{'\n'}</Text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.{'\n\n'}
                  <Text style={styles.expandableTextBold}>Indicações:{'\n'}</Text>
                  Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.{'\n\n'}
                  <Text style={styles.expandableTextBold}>Contraindicações:{'\n'}</Text>
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.{'\n\n'}
                  <Text style={styles.expandableTextBold}>Posologia:{'\n'}</Text>
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Pharmacy Info */}
        <View style={styles.pharmacyCard}>
          <View style={styles.pharmacyHeader}>
            <Image
              source={pharmacyData.logo}
              style={styles.pharmacyLogo}
              resizeMode="contain"
            />
            <TouchableOpacity
              style={styles.favoriteButton}
              onPress={togglePharmacyFavorite}
              activeOpacity={0.7}
            >
              <Ionicons 
                name={isPharmacyFavorite ? 'heart' : 'heart-outline'} 
                size={24} 
                color={isPharmacyFavorite ? '#FF0000' : '#999'} 
              />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.pharmacyName}>{pharmacyData.name}</Text>
          
          <View style={styles.pharmacyDetails}>
            <View style={styles.pharmacyDetailItem}>
              <Text style={styles.pharmacyDetailText}>{pharmacyData.distance}</Text>
            </View>
            <View style={styles.pharmacyDetailSeparator} />
            <View style={styles.pharmacyDetailItem}>
              <Text style={styles.pharmacyDetailText}>{pharmacyData.deliveryTime}</Text>
            </View>
          </View>
          
          <Text style={styles.deliveryFee}>{pharmacyData.deliveryFee}</Text>
        </View>

        {/* Recommendations */}
        <View style={styles.recommendationsSection}>
          <Text style={styles.recommendationsTitle}>Recomendações</Text>
          
          <View style={styles.recommendationsGrid}>
            {recommendations.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.recommendationCard}
                onPress={() => handleRecommendationPress(item.id)}
                activeOpacity={0.7}
              >
                <Image
                  source={productData.image}
                  style={styles.recommendationImage}
                  resizeMode="contain"
                />
                <Text style={styles.recommendationName}>{item.name}</Text>
                <Text style={styles.recommendationPrice}>
                  R$ {item.price.toFixed(2).replace('.', ',')}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Fixed Bottom Bar */}
      <View style={styles.bottomBar}>
        <View style={styles.priceContainer}>
          <Text style={styles.bottomPrice}>
            R$ {productData.price.toFixed(2).replace('.', ',')}
          </Text>
        </View>
        
        {itemQuantity === 0 ? (
          <TouchableOpacity 
            style={styles.buyButton} 
            onPress={handleAddToCart}
            activeOpacity={0.8}
          >
            <Ionicons name="cart" size={20} color="#FFF" />
            <Text style={styles.buyButtonText}>Comprar</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.cartActionsContainer}>
            <View style={styles.quantityControlsBottom}>
              <TouchableOpacity
                style={styles.quantityButtonBottom}
                onPress={handleDecrement}
                activeOpacity={0.7}
              >
                <Ionicons name="remove" size={20} color="#FFF" />
              </TouchableOpacity>

              <Text style={styles.quantityTextBottom}>{itemQuantity}</Text>

              <TouchableOpacity
                style={styles.quantityButtonBottom}
                onPress={handleIncrement}
                activeOpacity={0.7}
              >
                <Ionicons name="add" size={20} color="#FFF" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.goToCartButton}
              onPress={handleGoToCart}
              activeOpacity={0.8}
            >
              <Text style={styles.goToCartButtonText}>Ir para o carrinho</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
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
    paddingHorizontal: 16,
    paddingVertical: 12,
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
  searchPlaceholder: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#999',
  },
  content: {
    flex: 1,
  },
  imageContainer: {
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32,
  },
  productImage: {
    width: width * 0.6,
    height: 200,
  },
  productInfo: {
    padding: 16,
    borderBottomWidth: 8,
    borderBottomColor: '#F5F5F5',
  },
  productHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  productName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
  },
  favoriteButton: {
    padding: 4,
  },
  expandableSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  expandableContent: {
    paddingBottom: 16,
    paddingTop: 8,
  },
  expandableText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  expandableTextBold: {
    fontWeight: '600',
    color: '#333',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  pharmacyCard: {
    padding: 16,
    borderBottomWidth: 8,
    borderBottomColor: '#F5F5F5',
  },
  pharmacyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  pharmacyLogo: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  pharmacyName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  pharmacyDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  pharmacyDetailItem: {
    paddingHorizontal: 4,
  },
  pharmacyDetailText: {
    fontSize: 14,
    color: '#666',
  },
  pharmacyDetailSeparator: {
    width: 1,
    height: 12,
    backgroundColor: '#999',
    marginHorizontal: 8,
  },
  deliveryFee: {
    fontSize: 13,
    color: '#00A859',
    fontWeight: '500',
  },
  recommendationsSection: {
    padding: 16,
  },
  recommendationsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  recommendationsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  recommendationCard: {
    width: (width - 56) / 2,
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  recommendationImage: {
    width: '100%',
    height: 100,
    marginBottom: 8,
  },
  recommendationName: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  recommendationPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  bottomSpacing: {
    height: 80,
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    gap: 12,
  },
  priceContainer: {
    flex: 1,
  },
  bottomPrice: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
  },
  buyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF0000',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 8,
    gap: 8,
  },
  buyButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
  },
  cartActionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  quantityControlsBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF0000',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 8,
    gap: 12,
  },
  quantityButtonBottom: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityTextBottom: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
    minWidth: 24,
    textAlign: 'center',
  },
  goToCartButton: {
    flex: 1,
    backgroundColor: '#FF0000',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  goToCartButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFF',
  },
});