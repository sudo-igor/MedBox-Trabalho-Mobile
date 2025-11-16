import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useCart } from '@/contexts/CartContext';
import { useOrders } from '@/contexts/OrdersContext';

const paymentMethodLabels: Record<string, string> = {
  credit: 'Cartão de Crédito',
  debit: 'Cartão de Débito',
  pix: 'Pix',
  money: 'Dinheiro',
};

export default function PaymentScreen() {
  const router = useRouter();
  const { items, getTotalPrice, clearCart } = useCart();
  const { addOrder } = useOrders();
  const [selectedPayment, setSelectedPayment] = useState<string>('credit');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPixModal, setShowPixModal] = useState(false);

  const subtotal = getTotalPrice();
  const deliveryFee = 0; // Entrega grátis
  const total = subtotal + deliveryFee;

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push('/(tabs)/cart');
    }
  };

  const handlePayment = async () => {
    if (!selectedPayment) {
      Alert.alert('Atenção', 'Selecione uma forma de pagamento');
      return;
    }

    // Se for Pix, mostra o QR Code primeiro
    if (selectedPayment === 'pix') {
      setShowPixModal(true);
      
      // Fecha o modal após 4 segundos e processa o pagamento
      setTimeout(() => {
        setShowPixModal(false);
        processPayment();
      }, 4000);
      return;
    }

    // Para outras formas de pagamento, processa direto
    processPayment();
  };

  const processPayment = async () => {
    setIsProcessing(true);

    try {
      // Simula processamento do pagamento
      setTimeout(async () => {
        // Cria o pedido
        await addOrder({
          status: 'preparando',
          items: items.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.image,
          })),
          pharmacyName: 'Drogasil - Taguatinga Sul',
          pharmacyLogo: require('@/assets/images/logo-drogasil.jpg'),
          deliveryAddress: 'QS 07, Lote 01, Taguatinga Sul',
          subtotal: subtotal,
          deliveryFee: deliveryFee,
          total: total,
          paymentMethod: paymentMethodLabels[selectedPayment],
        });

        // Limpa o carrinho
        await clearCart();

        // Navega para tela de confirmação
        router.push('/(tabs)/order-confirmation');
      }, 2000);
    } catch (error) {
      setIsProcessing(false);
      Alert.alert('Erro', 'Não foi possível processar o pagamento. Tente novamente.');
    }
  };

  const paymentMethods = [
    { id: 'credit', icon: 'card', label: 'Cartão de Crédito' },
    { id: 'debit', icon: 'card-outline', label: 'Cartão de Débito' },
    { id: 'pix', icon: 'qr-code', label: 'Pix' },
    { id: 'money', icon: 'cash', label: 'Dinheiro' },
  ];

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
        <Text style={styles.sectionTitle}>Escolha a forma de pagamento</Text>

        {paymentMethods.map((method) => (
          <TouchableOpacity
            key={method.id}
            style={[
              styles.paymentCard,
              selectedPayment === method.id && styles.paymentCardActive,
            ]}
            onPress={() => setSelectedPayment(method.id)}
            activeOpacity={0.7}
          >
            <View style={styles.paymentCardLeft}>
              <View
                style={[
                  styles.iconContainer,
                  selectedPayment === method.id && styles.iconContainerActive,
                ]}
              >
                <Ionicons
                  name={method.icon as any}
                  size={24}
                  color={selectedPayment === method.id ? '#00A859' : '#666'}
                />
              </View>
              <Text
                style={[
                  styles.paymentLabel,
                  selectedPayment === method.id && styles.paymentLabelActive,
                ]}
              >
                {method.label}
              </Text>
            </View>
            <View
              style={[
                styles.radio,
                selectedPayment === method.id && styles.radioActive,
              ]}
            >
              {selectedPayment === method.id && (
                <View style={styles.radioDot} />
              )}
            </View>
          </TouchableOpacity>
        ))}

        {/* Resumo do Pedido */}
        <View style={styles.summarySection}>
          <Text style={styles.sectionTitle}>Resumo do Pedido</Text>
          
          <View style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal ({items.length} {items.length === 1 ? 'item' : 'itens'})</Text>
              <Text style={styles.summaryValue}>
                R$ {subtotal.toFixed(2).replace('.', ',')}
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Taxa de Entrega</Text>
              <Text style={[styles.summaryValue, styles.freeText]}>Grátis</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.summaryRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>
                R$ {total.toFixed(2).replace('.', ',')}
              </Text>
            </View>
          </View>
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Bottom Button */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={[styles.confirmButton, isProcessing && styles.confirmButtonDisabled]}
          onPress={handlePayment}
          disabled={isProcessing}
          activeOpacity={0.8}
        >
          {isProcessing ? (
            <>
              <Ionicons name="time" size={20} color="#FFF" />
              <Text style={styles.confirmButtonText}>Processando...</Text>
            </>
          ) : (
            <>
              <Text style={styles.confirmButtonText}>
                Confirmar Pagamento • R$ {total.toFixed(2).replace('.', ',')}
              </Text>
            </>
          )}
        </TouchableOpacity>
      </View>

      {/* Modal Pix QR Code */}
      <Modal
        visible={showPixModal}
        transparent
        animationType="fade"
        onRequestClose={() => {}}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.pixHeader}>
              <Ionicons name="qr-code" size={32} color="#00A859" />
              <Text style={styles.pixTitle}>Pagamento via Pix</Text>
            </View>

            {/* QR Code Placeholder */}
            <View style={styles.qrCodeContainer}>
              <View style={styles.qrCode}>
                <Ionicons name="qr-code" size={200} color="#000" />
              </View>
            </View>

            <Text style={styles.pixInstructions}>
              Escaneie o QR Code com o app do seu banco
            </Text>

            <View style={styles.pixValueContainer}>
              <Text style={styles.pixValueLabel}>Valor a pagar</Text>
              <Text style={styles.pixValue}>
                R$ {total.toFixed(2).replace('.', ',')}
              </Text>
            </View>

            {/* Loading indicator */}
            <View style={styles.loadingContainer}>
              <View style={styles.loadingDots}>
                <View style={[styles.loadingDot, styles.loadingDot]} />
                <View style={[styles.loadingDot, styles.loadingDot]} />
                <View style={[styles.loadingDot, styles.loadingDot]} />
              </View>
              <Text style={styles.loadingText}>Aguardando pagamento...</Text>
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
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 16,
    marginTop: 20,
    paddingHorizontal: 16,
  },
  paymentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E5E5E5',
  },
  paymentCardActive: {
    borderColor: '#00A859',
    backgroundColor: '#F0FDF4',
  },
  paymentCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  iconContainerActive: {
    backgroundColor: '#E6F7EF',
  },
  paymentLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
  },
  paymentLabelActive: {
    fontWeight: '600',
    color: '#00A859',
  },
  radio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E5E5E5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioActive: {
    borderColor: '#00A859',
  },
  radioDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#00A859',
  },
  summarySection: {
    marginTop: 24,
  },
  summaryCard: {
    backgroundColor: '#FFF',
    padding: 20,
    marginHorizontal: 16,
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
    marginVertical: 12,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
  },
  totalValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#00A859',
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
  confirmButton: {
    flexDirection: 'row',
    backgroundColor: '#00A859',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  confirmButtonDisabled: {
    opacity: 0.7,
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFF',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 32,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
  pixHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  pixTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginTop: 12,
  },
  qrCodeContainer: {
    marginBottom: 24,
  },
  qrCode: {
    width: 240,
    height: 240,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  pixInstructions: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  pixValueContainer: {
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    marginBottom: 24,
    width: '100%',
  },
  pixValueLabel: {
    fontSize: 13,
    color: '#666',
    marginBottom: 4,
  },
  pixValue: {
    fontSize: 28,
    fontWeight: '700',
    color: '#00A859',
  },
  loadingContainer: {
    alignItems: 'center',
  },
  loadingDots: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  loadingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00A859',
    opacity: 0.5,
  },
  loadingText: {
    fontSize: 13,
    color: '#666',
    fontWeight: '500',
  },
});