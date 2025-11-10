import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useRouter, usePathname } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from 'react-native';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/use-color-scheme';
import BottomTabBar from '@/components/ui/BottomTabBar';
import { CartProvider } from '@/contexts/CartContext';
import { OrdersProvider } from '@/contexts/OrdersContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { FavoritesProvider } from '@/contexts/FavoritesContext';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const pathname = usePathname();

  const handleTabPress = (tabName: string) => {
    // Mapeia os nomes das tabs para as rotas corretas
    const routes: Record<string, string> = {
      index: '/(tabs)',
      search: '/(tabs)/search',
      orders: '/(tabs)/orders',
      profile: '/(tabs)/profile',
    };
    
    if (routes[tabName]) {
      router.push(routes[tabName] as any);
    }
  };

  // Determina qual tab está ativa baseado no pathname
  const getActiveTab = () => {
    if (pathname === '/(tabs)' || pathname === '/') return 'index';
    if (pathname.includes('/search')) return 'search';
    if (pathname.includes('/orders')) return 'orders';
    if (pathname.includes('/profile')) return 'profile';
    return 'index';
  };

  // Verifica se deve mostrar a barra de navegação
  const shouldShowTabBar = !pathname.includes('/modal') && 
                          !pathname.includes('/product') && 
                          !pathname.includes('/cart') &&
                          !pathname.includes('/delivery') &&
                          !pathname.includes('/payment') &&
                          !pathname.includes('/pharmacy') &&
                          !pathname.includes('/address') &&
                          !pathname.includes('/order-confirmation');

  return (
    <AuthProvider>
      <FavoritesProvider>
        <OrdersProvider>
          <CartProvider>
            <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
              <View style={styles.container}>
                <Stack>
                  <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                  <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
                </Stack>
                {shouldShowTabBar && (
                  <BottomTabBar 
                    activeTab={getActiveTab()} 
                    onTabPress={handleTabPress} 
                  />
                )}
                <StatusBar style="auto" />
              </View>
            </ThemeProvider>
          </CartProvider>
        </OrdersProvider>
      </FavoritesProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});