import React from 'react';
import { TouchableOpacity, Image, Text, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useFavorites } from '@/contexts/FavoritesContext';

type PharmacyCardProps = {
  id: string;
  name: string;
  logo: any;
  distance: string;
  deliveryTime: string;
  deliveryFee?: number;
  minOrder?: number;
  address: string;
  rating?: number;
  style?: any;
};

export default function PharmacyCard({
  id,
  name,
  logo,
  distance,
  deliveryTime,
  deliveryFee = 0,
  minOrder = 0,
  address,
  rating = 4.5,
  style,
}: PharmacyCardProps) {
  const router = useRouter();
  const { isPharmacyFavorite, togglePharmacyFavorite } = useFavorites();

  const isFavorite = isPharmacyFavorite(id);

  const handlePress = () => {
    router.push(`/(tabs)/pharmacy/${id}` as any);
  };

  const handleFavoritePress = (e: any) => {
    e.stopPropagation();
    togglePharmacyFavorite({
      id,
      name,
      address,
      distance,
      logo,
    });
  };

  return (
    <TouchableOpacity
      style={[styles.card, style]}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      {/* Favorite Button */}
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

      <View style={styles.content}>
        <Image source={logo} style={styles.logo} />
        
        <View style={styles.info}>
          <Text style={styles.name} numberOfLines={1}>
            {name}
          </Text>
          
          <View style={styles.ratingRow}>
            <Ionicons name="star" size={14} color="#F59E0B" />
            <Text style={styles.rating}>{rating}</Text>
          </View>

          <Text style={styles.address} numberOfLines={1}>
            {address}
          </Text>

          <View style={styles.deliveryInfo}>
            <View style={styles.infoItem}>
              <Ionicons name="location-outline" size={12} color="#666" />
              <Text style={styles.infoText}>{distance}</Text>
            </View>
            <View style={styles.infoDivider} />
            <View style={styles.infoItem}>
              <Ionicons name="time-outline" size={12} color="#666" />
              <Text style={styles.infoText}>{deliveryTime}</Text>
            </View>
          </View>

          {deliveryFee === 0 && minOrder > 0 && (
            <View style={styles.deliveryBadge}>
              <Text style={styles.deliveryBadgeText}>
                Entrega grátis a partir de R$ {minOrder.toFixed(2)}
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    position: 'relative',
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
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
  content: {
    flexDirection: 'row',
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
  },
  info: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  rating: {
    fontSize: 13,
    color: '#666',
    marginLeft: 4,
    fontWeight: '500',
  },
  address: {
    fontSize: 13,
    color: '#999',
    marginBottom: 8,
  },
  deliveryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoDivider: {
    width: 1,
    height: 12,
    backgroundColor: '#E5E5E5',
    marginHorizontal: 8,
  },
  infoText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  deliveryBadge: {
    backgroundColor: '#F0FDF4',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  deliveryBadgeText: {
    fontSize: 11,
    color: '#00A859',
    fontWeight: '600',
  },
});