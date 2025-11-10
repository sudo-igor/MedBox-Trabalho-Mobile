import { Stack } from 'expo-router';

export default function TabsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="search" />
      <Stack.Screen name="orders" />
      <Stack.Screen name="product" />
      <Stack.Screen name="cart" />
    </Stack>
  );
}