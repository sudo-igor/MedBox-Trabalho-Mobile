import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
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
import { useAuth } from "@/contexts/AuthContext";
import { useFavorites } from "@/contexts/FavoritesContext";

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
  const { isPharmacyFavorite, togglePharmacyFavorite } = useFavorites();
  
  const [selectedFilter, setSelectedFilter] = useState<'none' | 'free' | 'distance'>('none');
  const [sortOrder, setSortOrder] = useState<'rating' | 'distance' | 'time'>('rating');
  const [showSortMenu, setShowSortMenu] = useState(false);
  
  let isLoading = false;
  let isAuthenticated = false;
  
  try {
    const auth = useAuth();
    isLoading = auth.isLoading;
    isAuthenticated = auth.isAuthenticated;
  } catch (error) {
    console.log('AuthContext não disponível');
    isLoading = false;
    isAuthenticated = false;
  }
  
  const cartItemsCount = getTotalItems();

  // Redireciona para login se não estiver autenticado
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace('/login');
    }
  }, [isLoading, isAuthenticated]);

  const categorias = [
    { id: "1", nome: "Medicamentos", imagem: medicamentosImg },
    { id: "2", nome: "Saúde", imagem: saudeImg },
    { id: "3", nome: "Beleza", imagem: belezaImg },
    { id: "4", nome: "Cosméticos", imagem: cosmeticosImg },
    { id: "5", nome: "Higiene", imagem: medicamentosImg },
    { id: "6", nome: "Bebê", imagem: saudeImg },
    { id: "7", nome: "Fitness", imagem: belezaImg },
    { id: "8", nome: "Dermocosméticos", imagem: cosmeticosImg },
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
      distanciaNum: 0.6,
      tempo: "15 - 30 min",
      tempoNum: 15,
      entrega: "Entrega grátis a partir de R$ 29",
      entregaGratis: true,
      minOrder: 29,
      address: "QSA 01, Lote 01, Taguatinga Sul",
      rating: 4.8,
      logo: logoDrogasil 
    },
    { 
      id: "2", 
      nome: "Drogasil - Águas Claras", 
      distancia: "3.7 km",
      distanciaNum: 3.7,
      tempo: "35 - 50 min",
      tempoNum: 35,
      entrega: "Entrega grátis a partir de R$ 29",
      entregaGratis: true,
      minOrder: 29,
      address: "Rua 7, Lote 300, Águas Claras",
      rating: 4.7,
      logo: logoDrogasil 
    },
    { 
      id: "3", 
      nome: "Drogaria Rosário - Guará 1", 
      distancia: "8 km",
      distanciaNum: 8,
      tempo: "25 - 40 min",
      tempoNum: 25,
      entrega: "Entrega grátis a partir de R$ 35",
      entregaGratis: true,
      minOrder: 35,
      address: "QE 11, Área Especial A, Guará 1",
      rating: 4.6,
      logo: logoRosario 
    },
    { 
      id: "4", 
      nome: "Drogasil - Ceilândia Norte", 
      distancia: "5.2 km",
      distanciaNum: 5.2,
      tempo: "30 - 45 min",
      tempoNum: 30,
      entrega: "Entrega R$ 5,90",
      entregaGratis: false,
      minOrder: 0,
      address: "QNN 14, Área Especial, Ceilândia Norte",
      rating: 4.5,
      logo: logoDrogasil 
    },
    { 
      id: "5", 
      nome: "Drogaria Rosário - Samambaia", 
      distancia: "12 km",
      distanciaNum: 12,
      tempo: "40 - 55 min",
      tempoNum: 40,
      entrega: "Entrega grátis a partir de R$ 40",
      entregaGratis: true,
      minOrder: 40,
      address: "QS 303, Conjunto 01, Samambaia Sul",
      rating: 4.3,
      logo: logoRosario 
    },
    { 
      id: "6", 
      nome: "Drogasil - Vicente Pires", 
      distancia: "6.8 km",
      distanciaNum: 6.8,
      tempo: "35 - 50 min",
      tempoNum: 35,
      entrega: "Entrega grátis a partir de R$ 29",
      entregaGratis: true,
      minOrder: 29,
      address: "Rua 8, Lote 25, Vicente Pires",
      rating: 4.9,
      logo: logoDrogasil 
    },
    { 
      id: "7", 
      nome: "Drogaria Rosário - Taguatinga Centro", 
      distancia: "2.1 km",
      distanciaNum: 2.1,
      tempo: "20 - 35 min",
      tempoNum: 20,
      entrega: "Entrega grátis a partir de R$ 35",
      entregaGratis: true,
      minOrder: 35,
      address: "Pistão Sul, Lote 05, Taguatinga Centro",
      rating: 4.4,
      logo: logoRosario 
    },
    { 
      id: "8", 
      nome: "Drogasil - Águas Claras Shopping", 
      distancia: "4.5 km",
      distanciaNum: 4.5,
      tempo: "25 - 40 min",
      tempoNum: 25,
      entrega: "Entrega grátis a partir de R$ 29",
      entregaGratis: true,
      minOrder: 29,
      address: "Av. das Araucárias, Shopping Águas Claras",
      rating: 4.8,
      logo: logoDrogasil 
    },
    { 
      id: "9", 
      nome: "Drogaria Rosário - Sol Nascente", 
      distancia: "9.3 km",
      distanciaNum: 9.3,
      tempo: "35 - 50 min",
      tempoNum: 35,
      entrega: "Entrega R$ 7,90",
      entregaGratis: false,
      minOrder: 0,
      address: "Trecho 02, Conjunto 12, Sol Nascente",
      rating: 4.1,
      logo: logoRosario 
    },
    { 
      id: "10", 
      nome: "Drogasil - Arniqueiras", 
      distancia: "7.4 km",
      distanciaNum: 7.4,
      tempo: "30 - 45 min",
      tempoNum: 30,
      entrega: "Entrega grátis a partir de R$ 35",
      entregaGratis: true,
      minOrder: 35,
      address: "Setor Habitacional Arniqueira, Quadra 04",
      rating: 4.6,
      logo: logoDrogasil 
    },
    { 
      id: "11", 
      nome: "Drogaria Rosário - Recanto das Emas", 
      distancia: "15 km",
      distanciaNum: 15,
      tempo: "45 - 60 min",
      tempoNum: 45,
      entrega: "Entrega grátis a partir de R$ 40",
      entregaGratis: true,
      minOrder: 40,
      address: "Quadra 102, Área Especial, Recanto das Emas",
      rating: 4.2,
      logo: logoRosario 
    },
    { 
      id: "12", 
      nome: "Drogasil - Park Shopping", 
      distancia: "10.5 km",
      distanciaNum: 10.5,
      tempo: "40 - 55 min",
      tempoNum: 40,
      entrega: "Entrega grátis a partir de R$ 29",
      entregaGratis: true,
      minOrder: 29,
      address: "SAI/SO, Área 6580, Park Shopping",
      rating: 4.7,
      logo: logoDrogasil 
    },
  ];

  // Função para ordenar e filtrar farmácias
  const getFilteredAndSortedPharmacies = () => {
    let filtered = [...farmacias];

    // Aplicar filtro de entrega grátis
    if (selectedFilter === 'free') {
      filtered = filtered.filter(f => f.entregaGratis);
    }

    // Aplicar ordenação
    filtered.sort((a, b) => {
      if (sortOrder === 'distance') {
        return a.distanciaNum - b.distanciaNum;
      } else if (sortOrder === 'time') {
        return a.tempoNum - b.tempoNum;
      } else {
        // rating (padrão)
        return b.rating - a.rating;
      }
    });

    return filtered;
  };

  const farmaciasFiltered = getFilteredAndSortedPharmacies();

  const handleProductPress = (productId: string) => {
    router.push(`/(tabs)/product/${productId}` as any);
  };

  const handlePharmacyPress = (pharmacyId: string) => {
    router.push(`/(tabs)/pharmacy/${pharmacyId}` as any);
  };

  const handleFavoritePress = (e: any, farmacia: any) => {
    e.stopPropagation();
    togglePharmacyFavorite({
      id: farmacia.id,
      name: farmacia.nome,
      address: farmacia.address,
      distance: farmacia.distancia,
      logo: farmacia.logo,
    });
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
          <TouchableOpacity 
            style={[styles.filterButton, showSortMenu && styles.filterButtonActive]}
            onPress={() => setShowSortMenu(!showSortMenu)}
            activeOpacity={0.7}
          >
            <Ionicons name="swap-vertical" size={16} color={showSortMenu ? "#00A859" : "#666"} />
            <Text style={[styles.filterButtonText, showSortMenu && styles.filterButtonTextActive]}>
              Ordenar
            </Text>
            <Ionicons name="chevron-down" size={16} color={showSortMenu ? "#00A859" : "#666"} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.filterButton, selectedFilter === 'free' && styles.filterButtonActive]}
            onPress={() => setSelectedFilter(selectedFilter === 'free' ? 'none' : 'free')}
            activeOpacity={0.7}
          >
            <Ionicons 
              name="gift" 
              size={16} 
              color={selectedFilter === 'free' ? "#00A859" : "#666"} 
            />
            <Text style={[styles.filterButtonText, selectedFilter === 'free' && styles.filterButtonTextActive]}>
              Entrega grátis
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.filterButton, selectedFilter === 'distance' && styles.filterButtonActive]}
            onPress={() => {
              if (selectedFilter === 'distance') {
                setSelectedFilter('none');
              } else {
                setSelectedFilter('distance');
                setSortOrder('distance');
              }
            }}
            activeOpacity={0.7}
          >
            <Ionicons 
              name="location" 
              size={16} 
              color={selectedFilter === 'distance' ? "#00A859" : "#666"} 
            />
            <Text style={[styles.filterButtonText, selectedFilter === 'distance' && styles.filterButtonTextActive]}>
              Distância
            </Text>
          </TouchableOpacity>
        </View>

        {/* Sort Menu Dropdown */}
        {showSortMenu && (
          <View style={styles.sortMenu}>
            <TouchableOpacity 
              style={styles.sortMenuItem}
              onPress={() => {
                setSortOrder('rating');
                setShowSortMenu(false);
              }}
              activeOpacity={0.7}
            >
              <Ionicons name="star" size={18} color="#666" />
              <Text style={styles.sortMenuText}>Melhor avaliação</Text>
              {sortOrder === 'rating' && (
                <Ionicons name="checkmark" size={20} color="#00A859" style={{ marginLeft: 'auto' }} />
              )}
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.sortMenuItem}
              onPress={() => {
                setSortOrder('distance');
                setShowSortMenu(false);
              }}
              activeOpacity={0.7}
            >
              <Ionicons name="location" size={18} color="#666" />
              <Text style={styles.sortMenuText}>Menor distância</Text>
              {sortOrder === 'distance' && (
                <Ionicons name="checkmark" size={20} color="#00A859" style={{ marginLeft: 'auto' }} />
              )}
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.sortMenuItem}
              onPress={() => {
                setSortOrder('time');
                setShowSortMenu(false);
              }}
              activeOpacity={0.7}
            >
              <Ionicons name="time" size={18} color="#666" />
              <Text style={styles.sortMenuText}>Entrega mais rápida</Text>
              {sortOrder === 'time' && (
                <Ionicons name="checkmark" size={20} color="#00A859" style={{ marginLeft: 'auto' }} />
              )}
            </TouchableOpacity>
          </View>
        )}

        {/* Lista de farmácias */}
        <Text style={styles.sectionTitle}>Farmácias</Text>
        {farmaciasFiltered.map((farmacia) => {
          const isFavorite = isPharmacyFavorite(farmacia.id);
          
          return (
            <TouchableOpacity 
              key={farmacia.id} 
              style={styles.farmaciaCard}
              onPress={() => handlePharmacyPress(farmacia.id)}
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
              <TouchableOpacity
                onPress={(e) => handleFavoritePress(e, farmacia)}
                style={styles.favoriteButton}
              >
                <Ionicons 
                  name={isFavorite ? "heart" : "heart-outline"} 
                  size={22} 
                  color={isFavorite ? "#EF4444" : "black"} 
                />
              </TouchableOpacity>
            </TouchableOpacity>
          );
        })}

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
    gap: 8,
    paddingHorizontal: 12,
    marginBottom: 20,
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    backgroundColor: "#FFF",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  filterButtonActive: {
    backgroundColor: "#F0FDF4",
    borderColor: "#00A859",
  },
  filterButtonText: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  filterButtonTextActive: {
    color: "#00A859",
    fontWeight: "600",
  },
  sortMenu: {
    backgroundColor: "#FFF",
    marginHorizontal: 12,
    marginBottom: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sortMenuItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5F5",
  },
  sortMenuText: {
    fontSize: 15,
    color: "#333",
    flex: 1,
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
  favoriteButton: {
    padding: 8,
  },
});