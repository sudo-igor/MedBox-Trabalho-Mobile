import React from "react";
import { View, Text, ScrollView,StyleSheet } from "react-native";

export default function MoreScreen() {
    return(
        <View style={styles.container}>
        <ScrollView>
            
        <Text>Tela Mais</Text>
        </ScrollView>
        </View>
    );
}const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingHorizontal: 12, paddingTop: 40 }
});