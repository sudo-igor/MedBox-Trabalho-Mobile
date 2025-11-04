import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
  Image,
} from "react-native";
import { Plus, Edit2, Trash2 } from "lucide-react";

export default function ProdutosScreen() {
  const [produtos, setProdutos] = useState([
    {
      id: 1,
      nome: "Remedio",
      quantidade: 5,
      preco: 40.0,
      receita: true,
      image: require("@/assets/images/remedio.png"),
    },
    {
      id: 2,
      nome: "Remedio",
      quantidade: 5,
      preco: 40.0,
      receita: false,
      image: require("@/assets/images/remedio.png"),
    },
    {
      id: 3,
      nome: "Remedio",
      quantidade: 5,
      preco: 40.0,
      receita: false,
      image: require("@/assets/images/remedio.png"),
    },
    {
      id: 4,
      nome: "Remedio",
      quantidade: 5,
      preco: 40.0,
      receita: true,
      image: require("@/assets/images/remedio.png"),
    },
    {
      id: 5,
      nome: "Remedio",
      quantidade: 5,
      preco: 40.0,
      receita: true,
      image: require("@/assets/images/remedio.png"),
    },
    {
      id: 6,
      nome: "Remedio",
      quantidade: 5,
      preco: 40.0,
      receita: true,
      image: require("@/assets/images/remedio.png"),
    },
  ]);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Título e botão adicionar */}
        <View style={styles.topSection}>
          <Text style={styles.pageTitle}>Gerenciar produtos da loja</Text>
          <TouchableOpacity style={styles.addButton} activeOpacity={0.8}>
            <Plus size={20} color="#fff" strokeWidth={2.5} />
            <Text style={styles.addButtonText}>Adicionar produto</Text>
          </TouchableOpacity>
        </View>

        {/* Lista de produtos */}
        <View style={styles.productsList}>
          {produtos.map((produto, index) => (
            <View key={produto.id} style={styles.productCard}>
              {/* Imagem do produto */}
              <View style={styles.productImageContainer}>
                <Image
                  source={produto.image}
                  style={styles.productImage}
                  resizeMode="contain"
                />
              </View>

              {/* Info do produto */}
              <View style={styles.productInfo}>
                <Text style={styles.productName}>{produto.nome}</Text>
                <Text style={styles.productDetail}>
                  Quantidade: {produto.quantidade}
                </Text>
                <Text style={styles.productPrice}>
                  R$ {produto.preco.toFixed(2)}
                </Text>
                <View style={styles.receitaBadge}>
                  <View
                    style={[
                      styles.receitaDot,
                      produto.receita ? styles.receitaSim : styles.receitaNao,
                    ]}
                  />
                  <Text style={styles.receitaText}>
                    Receita: {produto.receita ? "Sim" : "Não"}
                  </Text>
                </View>
              </View>

              {/* Botões de ação */}
              <View style={styles.productActions}>
                <TouchableOpacity
                  style={styles.actionButton}
                  activeOpacity={0.7}
                >
                  <Edit2 size={18} color="#4F46E5" strokeWidth={2} />
                  <Text style={styles.actionButtonText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.actionButton, styles.deleteButton]}
                  activeOpacity={0.7}
                >
                  <Trash2 size={18} color="#DC2626" strokeWidth={2} />
                  <Text
                    style={[styles.actionButtonText, styles.deleteButtonText]}
                  >
                    Excluir
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  header: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  topSection: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 20,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 16,
  },
  addButton: {
    backgroundColor: "#EF4444",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    gap: 8,
    shadowColor: "#EF4444",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  productsList: {
    paddingHorizontal: 20,
    gap: 16,
  },
  productCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  productImageContainer: {
    marginBottom: 16,
  },
  productImage: {
    width: 80,
    height: 80,
    backgroundColor: "#FEE2E2",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  productInfo: {
    marginBottom: 16,
  },
  productName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 8,
  },
  productDetail: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 20,
    fontWeight: "700",
    color: "#059669",
    marginBottom: 8,
  },
  receitaBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  receitaDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  receitaSim: {
    backgroundColor: "#059669",
  },
  receitaNao: {
    backgroundColor: "#DC2626",
  },
  receitaText: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "500",
  },
  productActions: {
    flexDirection: "row",
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: "#EEF2FF",
    gap: 6,
  },
  actionButtonText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#4F46E5",
  },
  deleteButton: {
    backgroundColor: "#FEF2F2",
  },
  deleteButtonText: {
    color: "#DC2626",
  },
});
