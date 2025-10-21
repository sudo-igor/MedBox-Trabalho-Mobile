import React from "react";
import { View, Text, ScrollView,StyleSheet } from "react-native";

export default function PedidosScreen() {
    return(
        <View style={styles.container}>
        <ScrollView>
            
        <Text>Tela Pedido</Text>
        </ScrollView>
        </View>
    );
}const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingHorizontal: 12, paddingTop: 40 }
});