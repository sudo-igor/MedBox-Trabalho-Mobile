import React from "react";
import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function filiais() {
  const router = useRouter();
  const filiais = [
    {
      nomeFarmacia: "Drogaria - Loja Taguatinga",
      lojaAberta: "true",
    },
    {
      nomeFarmacia: "Drogaria - Loja Asa Sul",
      lojaAberta: "false",
    },
    {
      nomeFarmacia: "Drogaria - Loja Guara",
      lojaAberta: "true",
    },
  ];
  return (
    <View style={styles.container}>
      <View style={styles.menuCard}>
        {filiais.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.menuItem,
              index !== filiais.length - 1 && styles.menuItemBorder,
            ]}
            onPress={() =>
              router.push({
                pathname: "/",
                params: {
                  farmaciaId: index,
                  nomeFarmacia: item.nomeFarmacia,
                  lojaAberta: item.lojaAberta,
                },
              })
            }
            activeOpacity={0.7}
          >
            <View style={styles.menuItemLeft}>
              <Text style={styles.menuItemText}>{item.nomeFarmacia}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 16,
  },
  menuCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 18,
    paddingHorizontal: 16,
  },
  menuItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  menuIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  menuItemText: {
    fontSize: 16,
    color: "#1F2937",
    fontWeight: "500",
  },
});
