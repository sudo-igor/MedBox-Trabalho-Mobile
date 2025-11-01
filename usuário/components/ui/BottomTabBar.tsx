import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type TabItem = {
  name: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
};

const tabs: TabItem[] = [
  { name: 'index', label: 'Início', icon: 'home-outline' },
  { name: 'search', label: 'Buscar', icon: 'search-outline' },
  { name: 'orders', label: 'Pedidos', icon: 'receipt-outline' },
  { name: 'profile', label: 'Perfil', icon: 'person-outline' },
];

type BottomTabBarProps = {
  activeTab: string;
  onTabPress: (tabName: string) => void;
};

export default function BottomTabBar({ activeTab, onTabPress }: BottomTabBarProps) {
  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.name;
        return (
          <TouchableOpacity
            key={tab.name}
            style={styles.tabItem}
            onPress={() => onTabPress(tab.name)}
            activeOpacity={0.7}
          >
            <Ionicons
              name={isActive ? tab.icon.replace('-outline', '') as any : tab.icon}
              size={24}
              color={isActive ? '#00A859' : '#666'}
            />
            <Text
              style={[
                styles.tabLabel,
                isActive && styles.tabLabelActive
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    paddingBottom: 8,
    paddingTop: 8,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },
  tabLabel: {
    fontSize: 12,
    marginTop: 4,
    color: '#666',
  },
  tabLabelActive: {
    color: '#00A859',
    fontWeight: '600',
  },
});