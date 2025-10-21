import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// Imagens do projeto
import banner1 from "../../assets/images/banner1.jpg";
import banner2 from "../../assets/images/banner2.jpg";
import banner3 from "../../assets/images/banner3.jpg";
import farmaciaLogo from "../../assets/images/logo.png";
import remedioImg from "../../assets/images/remedio.png";

import belezaImg from "../../assets/images/beleza.jpg";
import cosmeticosImg from "../../assets/images/cosmeticos.jpg";
import medicamentosImg from "../../assets/images/medicamentos.jpg";
import saudeImg from "../../assets/images/saude.png";

// Logos das farmácias
import logoDrogasil from "../../assets/images/logo-drogasil.jpg";
import logoRosario from "../../assets/images/logo-rosario.jpg";

export default function HomeScreen() {
  const categorias = [
    { id: "1", nome: "Medicamentos", imagem: medicamentosImg },
    { id: "2", nome: "Saúde", imagem: saudeImg },
    { id: "3", nome: "Beleza", imagem: belezaImg },
    { id: "4", nome: "Cosméticos", imagem: cosmeticosImg },
  ];

  const produtos = [
    { id: "1", nome: "Remédio", preco: "R$ 40,00" },
    { id: "2", nome: "Remédio", preco: "R$ 40,00" },
    { id: "3", nome: "Remédio", preco: "R$ 40,00" },
    { id: "4", nome: "Remédio", preco: "R$ 40,00" },
  ];

  const farmacias = [
    { id: "1", nome: "Drogasil - Taguatinga Sul", distancia: "0.6 km", tempo: "15 - 30 min", entrega: "Entrega grátis a partir de R$ 29", logo: logoDrogasil },
    { id: "2", nome: "Drogasil - Águas Claras", distancia: "3.7 km", tempo: "35 - 50 min", entrega: "Entrega grátis a partir de R$ 29", logo: logoDrogasil },
    { id: "3", nome: "Drogaria Rosário - Guará 1", distancia: "8 km", tempo: "25 - 40 min", entrega: "Entrega grátis a partir de R$ 35", logo: logoRosario },
  ];

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* Barra superior: logo + busca + carrinho */}
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.logoContainer}>
            <Image source={farmaciaLogo} style={styles.logo} />
          </TouchableOpacity>

          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color="gray" style={{ marginRight: 8 }} />
            <TextInput placeholder="Buscar" style={styles.searchInput} />
          </View>

          <TouchableOpacity style={styles.cartButton}>
            <Ionicons name="cart-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>

        {/* Endereço */}
        <View style={styles.addressContainer}>
          <Ionicons name="location-outline" size={18} color="black" />
          <Text style={styles.addressText}>Quadra QNL 03, Taguatinga - 72203-390</Text>
        </View>

        {/* Compra rápida */}
        <View style={styles.quickBuyCard}>
          <MaterialIcons name="description" size={22} color="#0a84ff" />
          <View style={{ marginLeft: 8 }}>
            <Text style={{ fontWeight: "bold" }}>Compra rápida com receita</Text>
            <Text style={{ fontSize: 12, color: "gray" }}>
              Envie sua receita e cuidaremos da busca
            </Text>
          </View>
        </View>

        {/* Promoções */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 16 }}>
          <Image source={banner1} style={styles.promoImage} />
          <Image source={banner2} style={styles.promoImage} />
          <Image source={banner3} style={styles.promoImage} />
        </ScrollView>

        {/* Categorias */}
        <Text style={styles.sectionTitle}>Categorias</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 16 }}>
          {categorias.map((cat) => (
            <View key={cat.id} style={styles.categoryContainer}>
              <Image source={cat.imagem} style={styles.categoryImage} />
              <Text style={styles.categoryLabel}>{cat.nome}</Text>
            </View>
          ))}
        </ScrollView>

        {/* Compre novamente */}
        <Text style={styles.sectionTitle}>Compre Novamente</Text>
        <View style={styles.productsGrid}>
          {produtos.map((item) => (
            <TouchableOpacity key={item.id} style={styles.productCard}>
              <Image source={remedioImg} style={styles.productImage} />
              <Text style={styles.productName}>{item.nome}</Text>
              <Text style={styles.productPrice}>{item.preco}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Filtros */}
        <View style={styles.filtersContainer}>
          <TouchableOpacity style={styles.filterButton}>
            <Text>Ordenar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}>
            <Text>Entrega grátis</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}>
            <Text>Distância</Text>
          </TouchableOpacity>
        </View>

        {/* Lista de farmácias */}
        <Text style={styles.sectionTitle}>Farmácias</Text>
        {farmacias.map((farmacia) => (
          <View key={farmacia.id} style={styles.farmaciaCard}>
            <Image source={farmacia.logo} style={styles.farmaciaLogo} />
            <View style={{ flex: 1 }}>
              <Text style={styles.farmaciaNome}>{farmacia.nome}</Text>
              <Text style={styles.farmaciaInfo}>{farmacia.distancia} • {farmacia.tempo}</Text>
              <Text style={styles.farmaciaEntrega}>{farmacia.entrega}</Text>
            </View>
            <Ionicons name="heart-outline" size={22} color="black" />
          </View>
        ))}

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingHorizontal: 12, paddingTop: 40 },
  topBar: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  logoContainer: { marginRight: 10 },
  logo: { width: 40, height: 40, borderRadius: 8 },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchInput: { flex: 1 },
  cartButton: { marginLeft: 12, padding: 8, backgroundColor: "#f2f2f2", borderRadius: 8 },
  addressContainer: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  addressText: { marginLeft: 6, fontSize: 14, flex: 1 },
  quickBuyCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eaf4ff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  sectionTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 8 },
  promoImage: {
    width: 220,
    height: 140,
    borderRadius: 10,
    marginRight: 12,
    resizeMode: "cover",
  },
  categoryContainer: { alignItems: "center", marginRight: 16 },
  categoryImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#eee",
    marginBottom: 6,
  },
  categoryLabel: { fontSize: 12, color: "#333", textAlign: "center" },
  productsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  productCard: {
    width: "48%",
    backgroundColor: "#fafafa",
    borderRadius: 10,
    padding: 10,
    marginBottom: 16,
    alignItems: "center",
  },
  productImage: { width: 80, height: 100, marginBottom: 8 },
  productName: { fontSize: 14, marginBottom: 4 },
  productPrice: { fontWeight: "bold" },
  filtersContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  filterButton: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
  },
  farmaciaCard: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  farmaciaLogo: { width: 50, height: 50, marginRight: 12, borderRadius: 8 },
  farmaciaNome: { fontWeight: "bold", fontSize: 15 },
  farmaciaInfo: { fontSize: 13, color: "gray" },
  farmaciaEntrega: { fontSize: 12, color: "green" },
});
