import React from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useOrders } from '@/contexts/OrdersContext';

type StatusType = 'preparing' | 'in_transit' | 'delivered' | 'cancelled';

const statusConfig: Record<StatusType, { label: string; color: string; icon: string }> = {
  preparing: { label: 'Preparando', color: '#FFA500', icon: 'time-outline' },
  in_transit: { label: 'Em trânsito', color: '#1E90FF', icon: 'bicycle-outline' },
  delivered: { label: 'Entregue', color: '#00A859', icon: 'checkmark-circle-outline' },
  cancelled: { label: 'Cancelado', color: '#FF0000', icon: 'close-circle-outline' },
};

export default function OrdersScreen() {
  const router = useRouter();
  const { orders } = useOrders();

  const handleOrderPress = (orderId: string) => {
    router.push(`/(tabs)/order-details/${orderId}` as any);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Meus Pedidos</Text>
      </View>

      <ScrollView style={styles.content}>
        {orders.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="receipt-outline" size={80} color="#CCC" />
            <Text style={styles.emptyText}>Você ainda não tem pedidos</Text>
            <Text style={styles.emptySubtext}>Seus pedidos aparecerão aqui</Text>
          </View>
        ) : (
          orders.map((order) => {
            const status = statusConfig[order.status];
            return (
              <TouchableOpacity
                key={order.id}
                style={styles.orderCard}
                onPress={() => handleOrderPress(order.id)}
                activeOpacity={0.7}
              >
                <View style={styles.orderHeader}>
                  <View>
                    <Text style={styles.orderNumber}>Pedido #{order.orderNumber}</Text>
                    <Text style={styles.orderDate}>{order.date}</Text>
                  </View>
                  <View style={[styles.statusBadge, { backgroundColor: `${status.color}20` }]}>
                    <Ionicons name={status.icon as any} size={16} color={status.color} />
                    <Text style={[styles.statusText, { color: status.color }]}>
                      {status.label}
                    </Text>
                  </View>
                </View>

                <View style={styles.orderItems}>
                  {order.items.map((item, index) => (
                    <View key={index} style={styles.orderItem}>
                      <Image source={item.image} style={styles.itemImage} />
                      <Text style={styles.itemText}>
                        {item.quantity}x {item.name}
                      </Text>
                    </View>
                  ))}
                </View>

                <View style={styles.orderFooter}>
                  <Text style={styles.orderTotal}>
                    Total: R$ {order.total.toFixed(2).replace('.', ',')}
                  </Text>
                  <Ionicons name="chevron-forward" size={20} color="#999" />
                </View>
              </TouchableOpacity>
            );
          })
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
    backgroundColor: '#FFF',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
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
  orderCard: {
    backgroundColor: '#FFF',
    marginBottom: 8,
    padding: 16,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  orderDate: {
    fontSize: 13,
    color: '#999',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  orderItems: {
    marginBottom: 12,
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  itemImage: {
    width: 40,
    height: 50,
    marginRight: 12,
  },
  itemText: {
    fontSize: 14,
    color: '#666',
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  orderTotal: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
});