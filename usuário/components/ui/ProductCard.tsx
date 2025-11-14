import React from 'react';
import { TouchableOpacity, Image, Text, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useFavorites } from '@/contexts/FavoritesContext';

type ProductCardProps = {
  id: string;
  name: string;
  price: number;
  image: any;
  style?: any;
};

export default function ProductCard({ id, name, price, image, style }: ProductCardProps) {
  const router = useRouter();
  const { isProductFavorite, toggleProductFavorite } = useFavorites();
  
  const isFavorite = isProductFavorite(id);

  const handlePress = () => {
    router.push(`/(tabs)/product/${id}` as any);
  };

  const handleFavoritePress = (e: any) => {
    // Previne que o clique no coração abra o produto
    e.stopPropagation();
    
    toggleProductFavorite({
      id,
      name,
      price,
      image,
    });
  };

  return (
    <TouchableOpacity
      style={[styles.card, style]}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      {/* Botão de Favoritar */}
      <TouchableOpacity
        style={styles.favoriteButton}
        onPress={handleFavoritePress}
        activeOpacity={0.7}
      >
        <Ionicons
          name={isFavorite ? 'heart' : 'heart-outline'}
          size={20}
          color={isFavorite ? '#EF4444' : '#999'}
        />
      </TouchableOpacity>

      <Image source={image} style={styles.image} resizeMode="contain" />
      <Text style={styles.name} numberOfLines={2}>
        {name}
      </Text>
      <Text style={styles.price}>
        R$ {price.toFixed(2).replace('.', ',')}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    width: 160,
    position: 'relative',
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 10,
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 120,
    marginBottom: 8,
  },
  name: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
    minHeight: 36,
  },
  price: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
});