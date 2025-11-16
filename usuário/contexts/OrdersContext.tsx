import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Tipos
interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: any;
}

interface Order {
  id: string;
  date: string;
  status: 'preparando' | 'em_transito' | 'entregue' | 'cancelado';
  items: OrderItem[];
  pharmacyName: string;
  pharmacyLogo: any;
  deliveryAddress: string; // Mudado de 'address' para 'deliveryAddress'
  subtotal: number;
  deliveryFee: number;
  total: number;
  paymentMethod?: string;
}

// Tipo para criar um novo pedido (sem id e date que são gerados automaticamente)
type CreateOrderData = Omit<Order, 'id' | 'date'>;

interface OrdersContextData {
  orders: Order[];
  addOrder: (order: CreateOrderData) => Promise<void>;
  updateOrderStatus: (orderId: string, status: Order['status']) => Promise<void>;
  getOrderById: (orderId: string) => Order | undefined;
  isLoading: boolean;
}

// Criação do Context
const OrdersContext = createContext<OrdersContextData>({} as OrdersContextData);

// Chave para o AsyncStorage
const ORDERS_STORAGE_KEY = '@MedboxApp:orders';

// Provider
export const OrdersProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Carregar pedidos do AsyncStorage ao iniciar
  useEffect(() => {
    loadOrders();
  }, []);

  // Salvar no AsyncStorage sempre que orders mudar
  useEffect(() => {
    if (!isLoading) {
      saveOrders(orders);
    }
  }, [orders, isLoading]);

  const loadOrders = async () => {
    try {
      const ordersData = await AsyncStorage.getItem(ORDERS_STORAGE_KEY);
      if (ordersData) {
        setOrders(JSON.parse(ordersData));
      }
    } catch (error) {
      console.error('Erro ao carregar pedidos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveOrders = async (ordersToSave: Order[]) => {
    try {
      await AsyncStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(ordersToSave));
    } catch (error) {
      console.error('Erro ao salvar pedidos:', error);
    }
  };

  const addOrder = async (orderData: CreateOrderData) => {
    try {
      const newOrder: Order = {
        id: Date.now().toString(),
        date: new Date().toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
        status: orderData.status,
        items: orderData.items,
        pharmacyName: orderData.pharmacyName,
        pharmacyLogo: orderData.pharmacyLogo,
        deliveryAddress: orderData.deliveryAddress, // ← CORRETO
        subtotal: orderData.subtotal,
        deliveryFee: orderData.deliveryFee,
        total: orderData.total,
        paymentMethod: orderData.paymentMethod,
      };

      setOrders(currentOrders => [newOrder, ...currentOrders]);
    } catch (error) {
      console.error('Erro ao adicionar pedido:', error);
      throw error;
    }
  };

  const updateOrderStatus = async (orderId: string, status: Order['status']) => {
    try {
      setOrders(currentOrders =>
        currentOrders.map(order =>
          order.id === orderId ? { ...order, status } : order
        )
      );
    } catch (error) {
      console.error('Erro ao atualizar status do pedido:', error);
      throw error;
    }
  };

  const getOrderById = (orderId: string) => {
    return orders.find(order => order.id === orderId);
  };

  return (
    <OrdersContext.Provider
      value={{
        orders,
        addOrder,
        updateOrderStatus,
        getOrderById,
        isLoading,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};

// Hook para usar o contexto
export function useOrders() {
  const context = useContext(OrdersContext);
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrdersProvider');
  }
  return context;
}