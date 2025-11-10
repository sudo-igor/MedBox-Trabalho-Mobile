import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type OrderItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: any;
};

export type Order = {
  id: string;
  orderNumber: string;
  date: string;
  status: 'preparing' | 'in_transit' | 'delivered' | 'cancelled';
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  deliveryAddress?: string;
  paymentMethod?: string;
};

type OrdersContextType = {
  orders: Order[];
  addOrder: (order: Omit<Order, 'id' | 'orderNumber' | 'date' | 'status'>) => Promise<Order>;
  getOrderById: (id: string) => Order | undefined;
  updateOrderStatus: (id: string, status: Order['status']) => Promise<void>;
  isLoading: boolean;
};

const OrdersContext = createContext<OrdersContextType | undefined>(undefined);

const STORAGE_KEY = '@medbox:orders';

export function OrdersProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Carregar pedidos ao iniciar
  useEffect(() => {
    loadOrders();
  }, []);

  // Salvar pedidos sempre que houver mudanças
  useEffect(() => {
    if (!isLoading) {
      saveOrders();
    }
  }, [orders]);

  const loadOrders = async () => {
    try {
      const ordersData = await AsyncStorage.getItem(STORAGE_KEY);
      if (ordersData) {
        setOrders(JSON.parse(ordersData));
      }
    } catch (error) {
      console.error('Erro ao carregar pedidos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveOrders = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
    } catch (error) {
      console.error('Erro ao salvar pedidos:', error);
    }
  };

  const addOrder = async (orderData: Omit<Order, 'id' | 'orderNumber' | 'date' | 'status'>): Promise<Order> => {
    const newOrder: Order = {
      ...orderData,
      id: Date.now().toString(),
      orderNumber: Math.floor(100000 + Math.random() * 900000).toString(),
      date: new Date().toLocaleDateString('pt-BR'),
      status: 'preparing',
    };
    
    setOrders((prevOrders) => [newOrder, ...prevOrders]);
    return newOrder;
  };

  const updateOrderStatus = async (id: string, status: Order['status']) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id ? { ...order, status } : order
      )
    );
  };

  const getOrderById = (id: string) => {
    return orders.find((order) => order.id === id);
  };

  return (
    <OrdersContext.Provider 
      value={{ 
        orders, 
        addOrder, 
        getOrderById, 
        updateOrderStatus,
        isLoading 
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrdersContext);
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrdersProvider');
  }
  return context;
}