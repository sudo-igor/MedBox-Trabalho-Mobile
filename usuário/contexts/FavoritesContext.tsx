import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type FavoriteProduct = {
  id: string;
  name: string;
  price: number;
  image: any;
};

type FavoritePharmacy = {
  id: string;
  name: string;
  address: string;
  distance: string;
  logo: any;
};

type FavoritesContextType = {
  favoriteProducts: FavoriteProduct[];
  favoritePharmacies: FavoritePharmacy[];
  isProductFavorite: (id: string) => boolean;
  isPharmacyFavorite: (id: string) => boolean;
  toggleProductFavorite: (product: FavoriteProduct) => Promise<void>;
  togglePharmacyFavorite: (pharmacy: FavoritePharmacy) => Promise<void>;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PRODUCTS: '@medbox:favorite_products',
  PHARMACIES: '@medbox:favorite_pharmacies',
};

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favoriteProducts, setFavoriteProducts] = useState<FavoriteProduct[]>([]);
  const [favoritePharmacies, setFavoritePharmacies] = useState<FavoritePharmacy[]>([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const [products, pharmacies] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEYS.PRODUCTS),
        AsyncStorage.getItem(STORAGE_KEYS.PHARMACIES),
      ]);

      if (products) setFavoriteProducts(JSON.parse(products));
      if (pharmacies) setFavoritePharmacies(JSON.parse(pharmacies));
    } catch (error) {
      console.error('Erro ao carregar favoritos:', error);
    }
  };

  const isProductFavorite = (id: string) => {
    return favoriteProducts.some(p => p.id === id);
  };

  const isPharmacyFavorite = (id: string) => {
    return favoritePharmacies.some(p => p.id === id);
  };

  const toggleProductFavorite = async (product: FavoriteProduct) => {
    try {
      const isFavorite = isProductFavorite(product.id);
      let newFavorites: FavoriteProduct[];

      if (isFavorite) {
        newFavorites = favoriteProducts.filter(p => p.id !== product.id);
      } else {
        newFavorites = [...favoriteProducts, product];
      }

      setFavoriteProducts(newFavorites);
      await AsyncStorage.setItem(
        STORAGE_KEYS.PRODUCTS,
        JSON.stringify(newFavorites)
      );
    } catch (error) {
      console.error('Erro ao atualizar favorito:', error);
    }
  };

  const togglePharmacyFavorite = async (pharmacy: FavoritePharmacy) => {
    try {
      const isFavorite = isPharmacyFavorite(pharmacy.id);
      let newFavorites: FavoritePharmacy[];

      if (isFavorite) {
        newFavorites = favoritePharmacies.filter(p => p.id !== pharmacy.id);
      } else {
        newFavorites = [...favoritePharmacies, pharmacy];
      }

      setFavoritePharmacies(newFavorites);
      await AsyncStorage.setItem(
        STORAGE_KEYS.PHARMACIES,
        JSON.stringify(newFavorites)
      );
    } catch (error) {
      console.error('Erro ao atualizar favorito:', error);
    }
  };

  return (
    <FavoritesContext.Provider
      value={{
        favoriteProducts,
        favoritePharmacies,
        isProductFavorite,
        isPharmacyFavorite,
        toggleProductFavorite,
        togglePharmacyFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}