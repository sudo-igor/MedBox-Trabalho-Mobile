import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useOrders } from '@/contexts/OrdersContext';

export default function OrderDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const orderId = params.id as string;
  const { orders } = useOrders();

  const order = orders.find(o => o.id === orderId);

  if (!order) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle-outline" size={64} color="#999" />
          <Text style={styles.errorText}>Pedido não encontrado</Text>
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

  const getStatusColor = (status: string) => {
    const statusLower = status.toLowerCase();
    if (statusLower === 'entregue' || statusLower === 'delivered') return '#00A859';
    if (statusLower === 'em_transito' || statusLower === 'em transito') return '#F59E0B';
    if (statusLower === 'preparando' || statusLower === 'preparing') return '#3B82F6';
    if (statusLower === 'cancelado' || statusLower === 'cancelled') return '#EF4444';
    return '#999';
  };

  const getStatusText = (status: string) => {
    const statusLower = status.toLowerCase();
    if (statusLower === 'entregue' || statusLower === 'delivered') return 'Entregue';
    if (statusLower === 'em_transito' || statusLower === 'em transito') return 'Em Trânsito';
    if (statusLower === 'preparando' || statusLower === 'preparing') return 'Preparando';
    if (statusLower === 'cancelado' || statusLower === 'cancelled') return 'Cancelado';
    return status;
  };

  const getStatusIcon = (status: string) => {
    const statusLower = status.toLowerCase();
    if (statusLower === 'entregue' || statusLower === 'delivered') return 'checkmark-circle';
    if (statusLower === 'em_transito' || statusLower === 'em transito') return 'bicycle';
    if (statusLower === 'preparando' || statusLower === 'preparing') return 'time';
    if (statusLower === 'cancelado' || statusLower === 'cancelled') return 'close-circle';
    return 'time';
  };

  const isStatusActive = (currentStatus: string, checkStatus: string) => {
    const statusLower = currentStatus.toLowerCase();
    const checkLower = checkStatus.toLowerCase();
    
    const statusOrder = ['preparando', 'em_transito', 'entregue'];
    const currentIndex = statusOrder.findIndex(s => 
      statusLower === s || statusLower === s.replace('_', ' ')
    );
    const checkIndex = statusOrder.findIndex(s => 
      checkLower === s || checkLower === s.replace('_', ' ')
    );
    
    return currentIndex >= checkIndex;
  };

  const handleReorder = () => {
    // Adicionar itens ao carrinho novamente
    router.push('/(tabs)/cart' as any);
  };

  const handleHelp = () => {
    // Abrir ajuda/suporte
    console.log('Ajuda');
  };

  const handleTrackOrder = () => {
    // Rastrear pedido
    console.log('Rastrear pedido');
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
        <Text style={styles.headerTitle}>Pedido #{order.id}</Text>
        <TouchableOpacity onPress={handleHelp} style={styles.headerButton}>
          <Ionicons name="help-circle-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Status Card */}
        <View style={styles.statusCard}>
          <View style={[styles.statusIconContainer, { backgroundColor: getStatusColor(order.status) + '20' }]}>
            <Ionicons 
              name={getStatusIcon(order.status) as any}
              size={32} 
              color={getStatusColor(order.status)} 
            />
          </View>
          <Text style={[styles.statusText, { color: getStatusColor(order.status) }]}>
            {getStatusText(order.status)}
          </Text>
          <Text style={styles.statusDate}>{order.date}</Text>
          
          {order.status === 'em_transito' && (
            <TouchableOpacity style={styles.trackButton} onPress={handleTrackOrder}>
              <Ionicons name="location" size={16} color="#00A859" />
              <Text style={styles.trackButtonText}>Rastrear Pedido</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Timeline */}
        {order.status !== 'cancelado' && (
          <View style={styles.timelineCard}>
            <Text style={styles.sectionTitle}>Acompanhe seu pedido</Text>
            
            <View style={styles.timeline}>
              {/* Pedido Confirmado */}
              <View style={styles.timelineItem}>
                <View style={[styles.timelineDot, styles.timelineDotActive]} />
                <View style={[styles.timelineLine, order.status !== 'preparando' && styles.timelineLineActive]} />
                <View style={styles.timelineContent}>
                  <Text style={styles.timelineTitle}>Pedido Confirmado</Text>
                  <Text style={styles.timelineTime}>{order.date}</Text>
                </View>
              </View>

              {/* Preparando */}
              <View style={styles.timelineItem}>
                <View style={[
                  styles.timelineDot,
                  order.status !== 'preparando' && styles.timelineDotActive
                ]} />
                <View style={[
                  styles.timelineLine,
                  order.status === 'em_transito' || order.status === 'entregue' 
                    ? styles.timelineLineActive 
                    : null
                ]} />
                <View style={styles.timelineContent}>
                  <Text style={styles.timelineTitle}>Em Preparação</Text>
                  <Text style={styles.timelineTime}>
                    {order.status !== 'preparando' ? 'Concluído' : 'Em andamento'}
                  </Text>
                </View>
              </View>

              {/* Em Trânsito */}
              <View style={styles.timelineItem}>
                <View style={[
                  styles.timelineDot,
                  (order.status === 'em_transito' || order.status === 'entregue') && styles.timelineDotActive
                ]} />
                <View style={[
                  styles.timelineLine,
                  order.status === 'entregue' && styles.timelineLineActive
                ]} />
                <View style={styles.timelineContent}>
                  <Text style={styles.timelineTitle}>Saiu para Entrega</Text>
                  <Text style={styles.timelineTime}>
                    {order.status === 'entregue' ? 'Concluído' : 
                     order.status === 'em_transito' ? 'Em andamento' : 'Aguardando'}
                  </Text>
                </View>
              </View>

              {/* Entregue */}
              <View style={styles.timelineItem}>
                <View style={[
                  styles.timelineDot,
                  order.status === 'entregue' && styles.timelineDotActive
                ]} />
                <View style={styles.timelineContent}>
                  <Text style={styles.timelineTitle}>Pedido Entregue</Text>
                  <Text style={styles.timelineTime}>
                    {order.status === 'entregue' ? order.date : 'Aguardando'}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}

        {/* Pharmacy Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Farmácia</Text>
          <View style={styles.pharmacyCard}>
            <Image source={order.pharmacyLogo} style={styles.pharmacyLogo} />
            <View style={styles.pharmacyInfo}>
              <Text style={styles.pharmacyName}>{order.pharmacyName}</Text>
              <Text style={styles.pharmacyAddress}>{order.deliveryAddress}</Text>
            </View>
          </View>
        </View>

        {/* Items */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Itens do Pedido</Text>
          {order.items.map((item, index) => (
            <View key={index} style={styles.itemCard}>
              <Image source={item.image} style={styles.itemImage} />
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemQuantity}>Quantidade: {item.quantity}</Text>
              </View>
              <Text style={styles.itemPrice}>
                R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
              </Text>
            </View>
          ))}
        </View>

        {/* Payment Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Resumo do Pagamento</Text>
          <View style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>
                R$ {order.subtotal.toFixed(2).replace('.', ',')}
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Taxa de Entrega</Text>
              <Text style={[styles.summaryValue, order.deliveryFee === 0 && styles.freeText]}>
                {order.deliveryFee === 0 ? 'Grátis' : `R$ ${order.deliveryFee.toFixed(2).replace('.', ',')}`}
              </Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.summaryRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>
                R$ {order.total.toFixed(2).replace('.', ',')}
              </Text>
            </View>
          </View>
        </View>

        {/* Payment Method */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Forma de Pagamento</Text>
          <View style={styles.paymentCard}>
            <Ionicons name="card" size={20} color="#666" />
            <Text style={styles.paymentText}>{order.paymentMethod || 'Cartão de Crédito'}</Text>
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Buttons */}
      {order.status === 'entregue' && (
        <View style={styles.bottomBar}>
          <TouchableOpacity
            style={styles.reorderButton}
            onPress={handleReorder}
            activeOpacity={0.8}
          >
            <Ionicons name="refresh" size={20} color="#00A859" />
            <Text style={styles.reorderButtonText}>Pedir Novamente</Text>
          </TouchableOpacity>
        </View>
      )}
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
  statusCard: {
    backgroundColor: '#FFF',
    padding: 24,
    alignItems: 'center',
    marginBottom: 12,
  },
  statusIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  statusText: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  statusDate: {
    fontSize: 14,
    color: '#666',
  },
  trackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#F0FDF4',
    borderRadius: 20,
    gap: 6,
  },
  trackButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#00A859',
  },
  timelineCard: {
    backgroundColor: '#FFF',
    padding: 20,
    marginBottom: 12,
  },
  timeline: {
    marginTop: 16,
  },
  timelineItem: {
    flexDirection: 'row',
    paddingBottom: 24,
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#E5E7EB',
    marginTop: 4,
    marginRight: 16,
  },
  timelineDotActive: {
    backgroundColor: '#00A859',
  },
  timelineLine: {
    position: 'absolute',
    left: 5.5,
    top: 16,
    width: 1,
    height: '100%',
    backgroundColor: '#E5E7EB',
  },
  timelineLineActive: {
    backgroundColor: '#00A859',
  },
  timelineContent: {
    flex: 1,
  },
  timelineTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  timelineTime: {
    fontSize: 13,
    color: '#666',
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
  pharmacyCard: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pharmacyLogo: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    marginRight: 12,
  },
  pharmacyInfo: {
    flex: 1,
  },
  pharmacyName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  pharmacyAddress: {
    fontSize: 13,
    color: '#666',
  },
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    marginRight: 12,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  itemQuantity: {
    fontSize: 13,
    color: '#666',
  },
  itemPrice: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  summaryCard: {
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  freeText: {
    color: '#00A859',
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 8,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#00A859',
  },
  paymentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  paymentText: {
    fontSize: 15,
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
  reorderButton: {
    flexDirection: 'row',
    backgroundColor: '#F0FDF4',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#00A859',
    gap: 8,
  },
  reorderButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#00A859',
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