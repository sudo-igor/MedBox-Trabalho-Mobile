import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  Image,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useCart } from '@/contexts/CartContext';
import { useOrders } from '@/contexts/OrdersContext';

type PaymentMethod = 'credit_card' | 'pix' | 'cash';

export default function PaymentScreen() {
  const router = useRouter();
  const { items, getTotalPrice } = useCart();
  const { addOrder } = useOrders();
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>('credit_card');
  const [showPixModal, setShowPixModal] = useState(false);

  const subtotal = getTotalPrice();
  const deliveryFee = 6.00;
  const total = subtotal + deliveryFee;

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push('/(tabs)/cart');
    }
  };

  const handlePayment = () => {
    const paymentMethodLabels = {
      credit_card: 'Cartão de Crédito',
      pix: 'Pix',
      cash: 'Dinheiro',
    };

    // Se for PIX, mostra o modal com QR Code
    if (selectedPayment === 'pix') {
      setShowPixModal(true);
      
      // Após 4 segundos, cria o pedido e redireciona
      setTimeout(() => {
        setShowPixModal(false);
        
        addOrder({
          items: items.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.image,
          })),
          subtotal,
          deliveryFee,
          total,
          deliveryAddress: 'QS 07, Lote 01, Taguatinga Sul',
          paymentMethod: paymentMethodLabels[selectedPayment],
        });

        router.push('/(tabs)/order-confirmation');
      }, 4000);
    } else {
      // Para outras formas de pagamento, cria o pedido direto
      addOrder({
        items: items.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        })),
        subtotal,
        deliveryFee,
        total,
        deliveryAddress: 'QS 07, Lote 01, Taguatinga Sul',
        paymentMethod: paymentMethodLabels[selectedPayment],
      });

      router.push('/(tabs)/order-confirmation');
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
        <Text style={styles.headerTitle}>Pagamento</Text>
        <View style={styles.backButton} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Seus Dados */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Seus Dados</Text>
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Ana Maria Santos</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoText}>CPF</Text>
              <Text style={styles.infoValue}>045.025.200-90</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoText}>Telefone</Text>
              <Text style={styles.infoValue}>(61) 99999-9999</Text>
            </View>
          </View>
        </View>

        {/* Endereço */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Endereço</Text>
          <View style={styles.infoCard}>
            <Text style={styles.addressText}>QS 07, Lote 01,</Text>
            <Text style={styles.addressText}>Taguatinga Sul - Taguatinga,</Text>
            <Text style={styles.addressText}>Brasília - DF, 71966-700</Text>
          </View>
        </View>

        {/* Produto */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Produto</Text>
          {items.map((item) => (
            <View key={item.id} style={styles.productCard}>
              <Image source={item.image} style={styles.productImage} />
              <View style={styles.productInfo}>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productPrice}>
                  R$ {item.price.toFixed(2).replace('.', ',')}
                </Text>
              </View>
              <View style={styles.quantityBadge}>
                <Text style={styles.quantityText}>{item.quantity}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Forma de pagamento */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Forma de pagamento</Text>
          
          <TouchableOpacity
            style={[
              styles.paymentOption,
              selectedPayment === 'credit_card' && styles.paymentOptionSelected,
            ]}
            onPress={() => setSelectedPayment('credit_card')}
            activeOpacity={0.7}
          >
            <View style={styles.radioButton}>
              {selectedPayment === 'credit_card' && (
                <View style={styles.radioButtonInner} />
              )}
            </View>
            <View style={styles.paymentIcon}>
              <Ionicons name="card" size={20} color="#1E90FF" />
            </View>
            <Text style={styles.paymentText}>Cartão de Crédito</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.paymentOption,
              selectedPayment === 'pix' && styles.paymentOptionSelected,
            ]}
            onPress={() => setSelectedPayment('pix')}
            activeOpacity={0.7}
          >
            <View style={styles.radioButton}>
              {selectedPayment === 'pix' && (
                <View style={styles.radioButtonInner} />
              )}
            </View>
            <View style={styles.paymentIcon}>
              <Ionicons name="qr-code" size={20} color="#00C2A3" />
            </View>
            <Text style={styles.paymentText}>Pix</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.paymentOption,
              selectedPayment === 'cash' && styles.paymentOptionSelected,
            ]}
            onPress={() => setSelectedPayment('cash')}
            activeOpacity={0.7}
          >
            <View style={styles.radioButton}>
              {selectedPayment === 'cash' && (
                <View style={styles.radioButtonInner} />
              )}
            </View>
            <View style={styles.paymentIcon}>
              <Ionicons name="cash" size={20} color="#00A859" />
            </View>
            <Text style={styles.paymentText}>Dinheiro</Text>
          </TouchableOpacity>
        </View>

        {/* Detalhes do Pagamento */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Detalhes do Pagamento</Text>
          <View style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Total dos produtos</Text>
              <Text style={styles.summaryValue}>
                R${subtotal.toFixed(2).replace('.', ',')}
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Frete</Text>
              <Text style={styles.summaryValue}>
                R${deliveryFee.toFixed(2).replace('.', ',')}
              </Text>
            </View>
            <View style={[styles.summaryRow, styles.summaryTotal]}>
              <Text style={styles.summaryTotalLabel}>Valor Total</Text>
              <Text style={styles.summaryTotalValue}>
                R${total.toFixed(2).replace('.', ',')}
              </Text>
            </View>
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Fixed Bottom Bar */}
      <View style={styles.bottomBar}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalPrice}>
            R$ {total.toFixed(2).replace('.', ',')}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.buyButton}
          onPress={handlePayment}
          activeOpacity={0.8}
        >
          <Text style={styles.buyButtonText}>Comprar</Text>
        </TouchableOpacity>
      </View>

      {/* Modal PIX */}
      <Modal
        visible={showPixModal}
        transparent
        animationType="fade"
        onRequestClose={() => {}}
      >
        <View style={styles.pixModalOverlay}>
          <View style={styles.pixModalContent}>
            <View style={styles.pixHeader}>
              <Ionicons name="qr-code" size={32} color="#00C2A3" />
              <Text style={styles.pixTitle}>Pagamento via Pix</Text>
            </View>

            <Text style={styles.pixSubtitle}>
              Escaneie o QR Code para pagar
            </Text>

            {/* QR Code placeholder */}
            <View style={styles.qrCodeContainer}>
              <View style={styles.qrCodePlaceholder}>
                <Ionicons name="qr-code-outline" size={180} color="#333" />
              </View>
            </View>

            <View style={styles.pixAmountContainer}>
              <Text style={styles.pixAmountLabel}>Valor a pagar</Text>
              <Text style={styles.pixAmountValue}>
                R$ {total.toFixed(2).replace('.', ',')}
              </Text>
            </View>

            <View style={styles.pixLoading}>
              <View style={styles.loadingDots}>
                <View style={[styles.dot, styles.dot1]} />
                <View style={[styles.dot, styles.dot2]} />
                <View style={[styles.dot, styles.dot3]} />
              </View>
              <Text style={styles.pixLoadingText}>Aguardando pagamento...</Text>
            </View>
          </View>
        </View>
      </Modal>
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
  content: {
    flex: 1,
  },
  section: {
    backgroundColor: '#FFF',
    marginBottom: 8,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  infoCard: {
    backgroundColor: '#F9F9F9',
    padding: 12,
    borderRadius: 8,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  infoText: {
    fontSize: 14,
    color: '#666',
  },
  infoValue: {
    fontSize: 14,
    color: '#333',
  },
  addressText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  productCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    padding: 12,
    borderRadius: 8,
  },
  productImage: {
    width: 50,
    height: 60,
    marginRight: 12,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  quantityBadge: {
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  quantityText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  paymentOptionSelected: {
    backgroundColor: '#F9F9F9',
    marginHorizontal: -16,
    paddingHorizontal: 16,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#DDD',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#00A859',
  },
  paymentIcon: {
    marginRight: 12,
  },
  paymentText: {
    fontSize: 15,
    color: '#333',
  },
  summaryCard: {
    backgroundColor: '#F9F9F9',
    padding: 12,
    borderRadius: 8,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
  },
  summaryValue: {
    fontSize: 14,
    color: '#333',
  },
  summaryTotal: {
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    marginBottom: 0,
  },
  summaryTotalLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  summaryTotalValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
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
  totalContainer: {
    flex: 1,
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
  },
  buyButton: {
    backgroundColor: '#FF0000',
    paddingHorizontal: 48,
    paddingVertical: 14,
    borderRadius: 8,
  },
  buyButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
  },
  pixModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pixModalContent: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 32,
    width: '85%',
    maxWidth: 400,
    alignItems: 'center',
  },
  pixHeader: {
    alignItems: 'center',
    marginBottom: 16,
  },
  pixTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
    marginTop: 12,
  },
  pixSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 24,
    textAlign: 'center',
  },
  qrCodeContainer: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  qrCodePlaceholder: {
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
  },
  pixAmountContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  pixAmountLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  pixAmountValue: {
    fontSize: 28,
    fontWeight: '700',
    color: '#00C2A3',
  },
  pixLoading: {
    alignItems: 'center',
  },
  loadingDots: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00C2A3',
  },
  dot1: {
    opacity: 0.3,
  },
  dot2: {
    opacity: 0.6,
  },
  dot3: {
    opacity: 1,
  },
  pixLoadingText: {
    fontSize: 14,
    color: '#666',
  },
});