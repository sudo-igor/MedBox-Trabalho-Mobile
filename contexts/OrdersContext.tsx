import React, { createContext, useContext, useState, ReactNode } from 'react';

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
  addOrder: (order: Omit<Order, 'id' | 'orderNumber' | 'date' | 'status'>) => void;
  getOrderById: (id: string) => Order | undefined;
};

const OrdersContext = createContext<OrdersContextType | undefined>(undefined);

export function OrdersProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);

  const addOrder = (orderData: Omit<Order, 'id' | 'orderNumber' | 'date' | 'status'>) => {
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

  const getOrderById = (id: string) => {
    return orders.find((order) => order.id === id);
  };

  return (
    <OrdersContext.Provider value={{ orders, addOrder, getOrderById }}>
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