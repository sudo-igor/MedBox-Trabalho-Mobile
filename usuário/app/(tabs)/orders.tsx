import React from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useOrders } from '@/contexts/OrdersContext';

export default function OrdersScreen() {
  const router = useRouter();
  const { orders } = useOrders();

  const getStatusConfig = (status: string | undefined) => {
    // Se status não existir, retorna um padrão
    if (!status) {
      return { label: 'Aguardando', color: '#999', icon: 'time-outline' };
    }
    
    const statusLower = status.toLowerCase();
    
    // Preparando / Preparing
    if (statusLower === 'preparando' || statusLower === 'preparing') {
      return { label: 'Preparando', color: '#FFA500', icon: 'time-outline' };
    }
    
    // Em trânsito
    if (statusLower === 'em_transito' || statusLower === 'em transito' || statusLower === 'in_transit') {
      return { label: 'Em trânsito', color: '#1E90FF', icon: 'bicycle-outline' };
    }
    
    // Entregue
    if (statusLower === 'entregue' || statusLower === 'delivered') {
      return { label: 'Entregue', color: '#00A859', icon: 'checkmark-circle-outline' };
    }
    
    // Cancelado
    if (statusLower === 'cancelado' || statusLower === 'cancelled') {
      return { label: 'Cancelado', color: '#FF0000', icon: 'close-circle-outline' };
    }
    
    // Fallback para status desconhecido
    return { label: status, color: '#999', icon: 'help-outline' };
  };

  const handleOrderPress = (orderId: string) => {
    router.push(`/(tabs)/order-detail/${orderId}` as any);
  };

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push('/(tabs)');
    }
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
        <Text style={styles.headerTitle}>Meus Pedidos</Text>
        <View style={styles.backButton} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {orders.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="receipt-outline" size={80} color="#CCC" />
            <Text style={styles.emptyText}>Você ainda não tem pedidos</Text>
            <Text style={styles.emptySubtext}>Seus pedidos aparecerão aqui</Text>
            <TouchableOpacity
              style={styles.shopButton}
              onPress={() => router.push('/(tabs)')}
              activeOpacity={0.7}
            >
              <Text style={styles.shopButtonText}>Começar a Comprar</Text>
            </TouchableOpacity>
          </View>
        ) : (
          orders.map((order) => {
            const statusConfig = getStatusConfig(order.status);
            
            return (
              <TouchableOpacity
                key={order.id}
                style={styles.orderCard}
                onPress={() => handleOrderPress(order.id)}
                activeOpacity={0.7}
              >
                <View style={styles.orderHeader}>
                  <View>
                    <Text style={styles.orderNumber}>Pedido #{order.id}</Text>
                    <Text style={styles.orderDate}>{order.date}</Text>
                  </View>
                  <View style={[styles.statusBadge, { backgroundColor: `${statusConfig.color}20` }]}>
                    <Ionicons name={statusConfig.icon as any} size={16} color={statusConfig.color} />
                    <Text style={[styles.statusText, { color: statusConfig.color }]}>
                      {statusConfig.label}
                    </Text>
                  </View>
                </View>

                <View style={styles.orderItems}>
                  {order.items.slice(0, 3).map((item, index) => (
                    <View key={index} style={styles.orderItem}>
                      <Image source={item.image} style={styles.itemImage} />
                      <Text style={styles.itemText} numberOfLines={1}>
                        {item.quantity}x {item.name}
                      </Text>
                    </View>
                  ))}
                  {order.items.length > 3 && (
                    <Text style={styles.moreItems}>
                      +{order.items.length - 3} {order.items.length - 3 === 1 ? 'item' : 'itens'}
                    </Text>
                  )}
                </View>

                <View style={styles.orderFooter}>
                  <View>
                    <Text style={styles.orderPharmacy}>{order.pharmacyName}</Text>
                    <Text style={styles.orderTotal}>
                      R$ {order.total.toFixed(2).replace('.', ',')}
                    </Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color="#999" />
                </View>
              </TouchableOpacity>
            );
          })
        )}
        
        <View style={{ height: 20 }} />
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
    backgroundColor: '#FFF',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  backButton: {
    padding: 4,
    width: 32,
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
    marginBottom: 24,
  },
  shopButton: {
    backgroundColor: '#00A859',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 8,
  },
  shopButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
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
    borderRadius: 4,
  },
  itemText: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  moreItems: {
    fontSize: 13,
    color: '#999',
    fontStyle: 'italic',
    marginLeft: 52,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  orderPharmacy: {
    fontSize: 13,
    color: '#666',
    marginBottom: 4,
  },
  orderTotal: {
    fontSize: 16,
    fontWeight: '700',
    color: '#00A859',
  },
});