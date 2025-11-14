import { Stack } from 'expo-router';

export default function TabsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="search" />
      <Stack.Screen name="orders" />
      <Stack.Screen name="profile" />
      <Stack.Screen name="favorites" />
      <Stack.Screen name="manage-profile" />
      <Stack.Screen name="address-selection" />
      <Stack.Screen name="product" />
      <Stack.Screen name="cart" />
      <Stack.Screen name="delivery" />
      <Stack.Screen name="payment" />
      <Stack.Screen name="order-confirmation" />
      <Stack.Screen name="explore" />
      <Stack.Screen name="pharmacy-list" />
      <Stack.Screen name="prescription-results" />
      <Stack.Screen name="prescription-tips" />
      <Stack.Screen name="quick-prescription" />
      <Stack.Screen name="analyzing-prescription" />
    </Stack>
  );
}