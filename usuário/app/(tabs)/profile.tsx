import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const router = useRouter();

  const menuItems = [
    {
      id: 'user',
      icon: 'person-circle',
      title: 'Ana Maria Santos',
      subtitle: 'ana.santos@email.com',
      route: '/profile/manage-profile',
      color: '#10B981',
    },
  ];

  const accountItems = [
    {
      id: 'orders',
      icon: 'receipt',
      title: 'Meus Pedidos',
      route: '/(tabs)/orders',
      color: '#3B82F6',
    },
    {
      id: 'favorites',
      icon: 'heart',
      title: 'Favoritos',
      route: '/(tabs)/favorites',
      color: '#EF4444',
    },
    {
      id: 'coupons',
      icon: 'pricetag',
      title: 'Cupons',
      route: '/(tabs)/coupons',
      color: '#F59E0B',
    },
    {
      id: 'offers',
      icon: 'gift',
      title: 'Ofertas Personalizadas',
      route: '/(tabs)/offers',
      color: '#A855F7',
    },
  ];

  const accountSettings = [
    {
      id: 'addresses',
      icon: 'location',
      title: 'Endereços',
      route: '/profile/addresses',
    },
    {
      id: 'payment',
      icon: 'card',
      title: 'Formas de Pagamento',
      route: '/profile/payment',
    },
  ];

  const supportItems = [
    {
      id: 'help',
      icon: 'help-circle',
      title: 'Ajuda',
      route: '/profile/help',
    },
    {
      id: 'settings',
      icon: 'settings',
      title: 'Configurações',
      route: '/profile/settings',
    },
  ];

  const renderMenuItem = (item: any, showSubtitle = false) => (
    <TouchableOpacity
      key={item.id}
      style={styles.menuItem}
      onPress={() => router.push(item.route)}
    >
      <View style={styles.menuItemLeft}>
        <View
          style={[
            styles.iconContainer,
            item.color ? { backgroundColor: item.color } : styles.defaultIconBg,
          ]}
        >
          <Ionicons
            name={item.icon as any}
            size={24}
            color={item.color ? '#FFF' : '#6B7280'}
          />
        </View>
        <View style={styles.menuItemText}>
          <Text style={styles.menuItemTitle}>{item.title}</Text>
          {showSubtitle && item.subtitle && (
            <Text style={styles.menuItemSubtitle}>{item.subtitle}</Text>
          )}
        </View>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Perfil</Text>

      {/* User Info */}
      <View style={styles.section}>
        {menuItems.map(item => renderMenuItem(item, true))}
      </View>

      {/* Account Items */}
      <View style={styles.section}>
        {accountItems.map(item => renderMenuItem(item))}
      </View>

      {/* Account Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>CONTA</Text>
        {accountSettings.map(item => renderMenuItem(item))}
      </View>

      {/* Support */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>SUPORTE</Text>
        {supportItems.map(item => renderMenuItem(item))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#111827',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  section: {
    backgroundColor: '#FFF',
    marginBottom: 12,
    paddingVertical: 8,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#9CA3AF',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
    letterSpacing: 0.5,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: '#FFF',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  defaultIconBg: {
    backgroundColor: '#F3F4F6',
  },
  menuItemText: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
  menuItemSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
});