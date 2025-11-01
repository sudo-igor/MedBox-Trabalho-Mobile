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
import { useRouter } from "expo-router";
import { useCart } from "@/contexts/CartContext";

// Imagens do projeto
const banner1 = require("../../assets/images/banner1.jpg");
const banner2 = require("../../assets/images/banner2.jpg");
const banner3 = require("../../assets/images/banner3.jpg");
const farmaciaLogo = require("../../assets/images/logo.png");
const remedioImg = require("../../assets/images/remedio.png");

const belezaImg = require("../../assets/images/beleza.jpg");
const cosmeticosImg = require("../../assets/images/cosmeticos.jpg");
const medicamentosImg = require("../../assets/images/medicamentos.jpg");
const saudeImg = require("../../assets/images/saude.png");

// Logos das farmácias
const logoDrogasil = require("../../assets/images/logo-drogasil.jpg");
const logoRosario = require("../../assets/images/logo-rosario.jpg");

export default function HomeScreen() {
  const router = useRouter();
  const { getTotalItems } = useCart();
  const cartItemsCount = getTotalItems();

  const categorias = [
    { id: "1", nome: "Medicamentos", imagem: medicamentosImg },
    { id: "2", nome: "Saúde", imagem: saudeImg },
    { id: "3", nome: "Beleza", imagem: belezaImg },
    { id: "4", nome: "Cosméticos", imagem: cosmeticosImg },
  ];

  const produtos = [
    { id: "1", nome: "Remédio", preco: 40.00, imagem: remedioImg },
    { id: "2", nome: "Remédio", preco: 40.00, imagem: remedioImg },
    { id: "3", nome: "Remédio", preco: 40.00, imagem: remedioImg },
    { id: "4", nome: "Remédio", preco: 40.00, imagem: remedioImg },
  ];

  const farmacias = [
    { 
      id: "1", 
      nome: "Drogasil - Taguatinga Sul", 
      distancia: "0.6 km", 
      tempo: "15 - 30 min", 
      entrega: "Entrega grátis a partir de R$ 29", 
      logo: logoDrogasil 
    },
    { 
      id: "2", 
      nome: "Drogasil - Águas Claras", 
      distancia: "3.7 km", 
      tempo: "35 - 50 min", 
      entrega: "Entrega grátis a partir de R$ 29", 
      logo: logoDrogasil 
    },
    { 
      id: "3", 
      nome: "Drogaria Rosário - Guará 1", 
      distancia: "8 km", 
      tempo: "25 - 40 min", 
      entrega: "Entrega grátis a partir de R$ 35", 
      logo: logoRosario 
    },
  ];

  const handleProductPress = (productId: string) => {
    router.push(`/(tabs)/product/${productId}` as any);
  };

  const handleSearchPress = () => {
    router.push('/(tabs)/search');
  };

  const handleCartPress = () => {
    router.push('/(tabs)/cart');
  };

  const handleQuickPrescription = () => {
    console.log('Clicou em compra rápida');
    router.push('/(tabs)/quick-prescription');
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* Barra superior: logo + busca + carrinho */}
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.logoContainer}>
            <Image source={farmaciaLogo} style={styles.logo} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.searchContainer}
            onPress={handleSearchPress}
            activeOpacity={0.7}
          >
            <Ionicons name="search" size={20} color="gray" style={{ marginRight: 8 }} />
            <Text style={styles.searchPlaceholder}>Buscar</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.cartButton}
            onPress={handleCartPress}
          >
            <Ionicons name="cart-outline" size={24} color="black" />
            {cartItemsCount > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{cartItemsCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Endereço */}
        <View style={styles.addressContainer}>
          <Ionicons name="location-outline" size={18} color="black" />
          <Text style={styles.addressText}>Quadra QNL 03, Taguatinga - 72203-390</Text>
        </View>

        {/* Compra rápida */}
        <TouchableOpacity 
          style={styles.quickBuyCard}
          onPress={handleQuickPrescription}
          activeOpacity={0.7}
        >
          <MaterialIcons name="description" size={22} color="#0a84ff" />
          <View style={{ marginLeft: 8, flex: 1 }}>
            <Text style={{ fontWeight: "bold" }}>Compra rápida com receita</Text>
            <Text style={{ fontSize: 12, color: "gray" }}>
              Envie sua receita e cuidaremos da busca
            </Text>
          </View>
        </TouchableOpacity>

        {/* Promoções */}
        <Text style={styles.sectionTitle}>Promoções</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={{ marginBottom: 16 }}
        >
          <Image source={banner1} style={styles.promoImage} />
          <Image source={banner2} style={styles.promoImage} />
          <Image source={banner3} style={styles.promoImage} />
        </ScrollView>

        {/* Categorias */}
        <Text style={styles.sectionTitle}>Categorias</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={{ marginBottom: 16 }}
        >
          {categorias.map((cat) => (
            <TouchableOpacity 
              key={cat.id} 
              style={styles.categoryContainer}
              activeOpacity={0.7}
            >
              <Image source={cat.imagem} style={styles.categoryImage} />
              <Text style={styles.categoryLabel}>{cat.nome}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Compre novamente */}
        <Text style={styles.sectionTitle}>Compre Novamente</Text>
        <View style={styles.productsGrid}>
          {produtos.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={styles.productCard}
              onPress={() => handleProductPress(item.id)}
              activeOpacity={0.7}
            >
              <Image source={item.imagem} style={styles.productImage} />
              <Text style={styles.productName}>{item.nome}</Text>
              <Text style={styles.productPrice}>
                R$ {item.preco.toFixed(2).replace('.', ',')}
              </Text>
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
          <TouchableOpacity 
            key={farmacia.id} 
            style={styles.farmaciaCard}
            activeOpacity={0.7}
          >
            <Image source={farmacia.logo} style={styles.farmaciaLogo} />
            <View style={{ flex: 1 }}>
              <Text style={styles.farmaciaNome}>{farmacia.nome}</Text>
              <Text style={styles.farmaciaInfo}>
                {farmacia.distancia} • {farmacia.tempo}
              </Text>
              <Text style={styles.farmaciaEntrega}>{farmacia.entrega}</Text>
            </View>
            <Ionicons name="heart-outline" size={22} color="black" />
          </TouchableOpacity>
        ))}

        {/* Espaço extra no final para não ficar coberto pela barra de navegação */}
        <View style={{ height: 20 }} />

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#fff", 
    paddingHorizontal: 12, 
    paddingTop: 40 
  },
  topBar: { 
    flexDirection: "row", 
    alignItems: "center", 
    marginBottom: 12 
  },
  logoContainer: { 
    marginRight: 10 
  },
  logo: { 
    width: 40, 
    height: 40, 
    borderRadius: 8 
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchInput: { 
    flex: 1 
  },
  searchPlaceholder: {
    flex: 1,
    color: "#999",
    fontSize: 16,
  },
  cartButton: { 
    marginLeft: 12, 
    padding: 8, 
    backgroundColor: "#f2f2f2", 
    borderRadius: 8,
    position: 'relative',
  },
  cartBadge: {
    position: 'absolute',
    top: 2,
    right: 2,
    backgroundColor: '#FF0000',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  cartBadgeText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: '700',
  },
  addressContainer: { 
    flexDirection: "row", 
    alignItems: "center", 
    marginBottom: 12 
  },
  addressText: { 
    marginLeft: 6, 
    fontSize: 14, 
    flex: 1 
  },
  quickBuyCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eaf4ff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  sectionTitle: { 
    fontSize: 16, 
    fontWeight: "bold", 
    marginBottom: 8 
  },
  promoImage: {
    width: 220,
    height: 140,
    borderRadius: 10,
    marginRight: 12,
    resizeMode: "cover",
  },
  categoryContainer: { 
    alignItems: "center", 
    marginRight: 16 
  },
  categoryImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#eee",
    marginBottom: 6,
  },
  categoryLabel: { 
    fontSize: 12, 
    color: "#333", 
    textAlign: "center" 
  },
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
  productImage: { 
    width: 80, 
    height: 100, 
    marginBottom: 8 
  },
  productName: { 
    fontSize: 14, 
    marginBottom: 4 
  },
  productPrice: { 
    fontWeight: "bold" 
  },
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
  farmaciaLogo: { 
    width: 50, 
    height: 50, 
    marginRight: 12, 
    borderRadius: 8 
  },
  farmaciaNome: { 
    fontWeight: "bold", 
    fontSize: 15 
  },
  farmaciaInfo: { 
    fontSize: 13, 
    color: "gray" 
  },
  farmaciaEntrega: { 
    fontSize: 12, 
    color: "green" 
  },
});