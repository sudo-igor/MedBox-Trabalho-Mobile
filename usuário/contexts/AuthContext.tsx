import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Tipos
interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  cpf?: string;
  birthDate?: string;
}

interface AuthContextData {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (userData: Omit<User, 'id'> & { password: string }) => Promise<void>;
  signOut: () => Promise<void>;
  updateUser: (userData: Partial<User>) => Promise<void>;
}

// Criação do Context
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

// Chave para o AsyncStorage
const AUTH_STORAGE_KEY = '@MedboxApp:user';

// Provider
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Carregar usuário do AsyncStorage ao iniciar
  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const userData = await AsyncStorage.getItem(AUTH_STORAGE_KEY);
      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error('Erro ao carregar usuário:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveUser = async (userData: User) => {
    try {
      await AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userData));
    } catch (error) {
      console.error('Erro ao salvar usuário:', error);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      // Aqui você faria a chamada para sua API
      // Por enquanto, vamos simular com dados do AsyncStorage
      
      // Simulação de login
      const userData = await AsyncStorage.getItem(AUTH_STORAGE_KEY);
      
      if (userData) {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      } else {
        throw new Error('Usuário não encontrado');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      throw error;
    }
  };

  const signUp = async (userData: Omit<User, 'id'> & { password: string }) => {
    try {
      // Aqui você faria a chamada para sua API
      // Por enquanto, vamos criar um ID único e salvar localmente
      
      const newUser: User = {
        id: Date.now().toString(), // ID temporário (em produção viria do backend)
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        avatar: userData.avatar,
        cpf: userData.cpf,
        birthDate: userData.birthDate,
      };

      await saveUser(newUser);
      setUser(newUser);
    } catch (error) {
      console.error('Erro ao criar conta:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      // Não remove o usuário do storage, apenas desloga
      setUser(null);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      throw error;
    }
  };

  const updateUser = async (userData: Partial<User>) => {
    try {
      if (!user) return;

      const updatedUser = { ...user, ...userData };
      await saveUser(updatedUser);
      setUser(updatedUser);
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      throw error;
    }
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        signIn,
        signUp,
        signOut,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook para usar o contexto
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}