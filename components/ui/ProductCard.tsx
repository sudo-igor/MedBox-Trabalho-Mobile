import React from 'react';
import { TouchableOpacity, Image, Text, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';

type ProductCardProps = {
  id: string;
  name: string;
  price: number;
  image: any;
  style?: any;
};

export default function ProductCard({ id, name, price, image, style }: ProductCardProps) {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/(tabs)/product/${id}` as any);
  };

  return (
    <TouchableOpacity
      style={[styles.card, style]}
      onPress={handlePress}
      activeOpacity={0.7}
    >
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