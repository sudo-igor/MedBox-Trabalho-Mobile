import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  StatusBar,
  Switch,
  Image,
  Alert
} from "react-native";
import { Upload } from "lucide-react-native";

import {
  produto as Produto,
  buscarProduto, atualizarProduto,
} from "@/scripts/produtosService";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaView } from "react-native-safe-area-context";



export default function EditarProduto() {
  const {id} = useLocalSearchParams();
  const [produto, setProduto] = useState<Produto>({
    nome: "",
    quantidade: "",
    preco: "",
    receita: false,

  });
  const [imagemUri, setImagemUri] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (
    key: keyof Produto,
    value: string | number | boolean
  ) => {
    setProduto((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

   const selecionarESalvarImagem = async () => {
    try {
      // 1. Pede permissão
      const permissao = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (permissao.status !== 'granted') {
        Alert.alert(
          'Permissão necessária',
          'Precisamos acessar suas fotos para adicionar imagem ao produto'
        );
        return null;
      }

      // 2. Abre a galeria
      const resultado = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
      });

      // 3. Se cancelou, retorna
      if (resultado.canceled) {
        return null;
      }

      // 4. Pega a imagem selecionada e usa diretamente
      const imagemSelecionada = resultado.assets[0].uri;

      // 5. Atualiza o estado com a URI da imagem
      setImagemUri(imagemSelecionada);

      // 6. Retorna a URI
      return imagemSelecionada;

    } catch (erro) {
      Alert.alert('Erro', 'Não foi possível selecionar a imagem');
      return null;
    }
  };

  const handleSalvar = async () => {
    try {
      const produtoCriado = await atualizarProduto(+id,{
        ...produto,
        imagem: imagemUri || "", // opcional: salva URI junto
      });

      if (produtoCriado) {
        alert("Produto salvo com sucesso!");
        router.push("/produtos");
      }
    } catch (error) {
      alert("Erro ao salvar o produto!");
    }
  };
  useEffect(() => {
    const carregar = async () => {
      const carregarProduto = await buscarProduto(+id);
      if (carregarProduto) {
        setProduto(carregarProduto);
        setImagemUri(carregarProduto.imagem ?? null)
      }
    };
    carregar();
  }, [id]);

  return (
    <SafeAreaView  style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Upload de imagem */}
        <View style={styles.section}>
          <Text style={styles.label}>Imagem do produto</Text>
          <TouchableOpacity
            style={styles.uploadBox}
            activeOpacity={0.7}
            onPress={selecionarESalvarImagem}
          >
            {/* Lógica Condicional: Se imagemProdutoUri EXISTE, mostra a imagem */}
            {imagemUri ? (
              <Image
                source={{ uri: imagemUri }}
                style={styles.previewImage} // Estilo para garantir que cubra a área
              />
            ) : (
              // Se imagemProdutoUri NÃO EXISTE, mostra o ícone e o texto de upload
              <>
                <Upload size={32} color="#9CA3AF" strokeWidth={2} />
                <Text style={styles.uploadText}>
                  Clique para adicionar uma imagem
                </Text>
                <Text style={styles.uploadSubtext}>
                  PNG, JPG ou JPEG (máx. 5MB)
                </Text>
              </>
            )}
          </TouchableOpacity>
        </View>

        {/* Nome do produto */}
        <View style={styles.section}>
          <Text style={styles.label}>Nome do produto *</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Dipirona 500mg"
            placeholderTextColor="#9CA3AF"
            value={produto.nome}
            onChangeText={(text) => handleChange("nome", text)}
          />
        </View>

        {/* Quantidade */}
        <View style={styles.section}>
          <Text style={styles.label}>Quantidade em estoque *</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: 100"
            placeholderTextColor="#9CA3AF"
            keyboardType="numeric"
            value={String(produto.quantidade)}
            onChangeText={(text) => handleChange("quantidade", text)}
          />
        </View>

        {/* Preço */}
        <View style={styles.section}>
          <Text style={styles.label}>Preço (R$) *</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: 15,90"
            placeholderTextColor="#9CA3AF"
            keyboardType="decimal-pad"
            value={String(produto.preco)}
            onChangeText={(text) => handleChange("preco", text)}
          />
        </View>

        {/* Receita obrigatória */}
        <View style={styles.section}>
          <View style={styles.switchContainer}>
            <View style={styles.switchLabel}>
              <Text style={styles.label}>Requer receita médica</Text>
              <Text style={styles.switchDescription}>
                Ative se o produto precisa de receita
              </Text>
            </View>
            <Switch
              value={produto.receita}
              onValueChange={(value) => handleChange("receita", value)}
              trackColor={{ false: "#E5E7EB", true: "#86EFAC" }}
              thumbColor={produto.receita ? "#059669" : "#f4f3f4"}
            />
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Botões fixos */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.cancelButton} activeOpacity={0.7}>
          <Text style={styles.cancelButtonText}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.saveButton}
          activeOpacity={0.8}
          onPress={handleSalvar}
        >
          <Text style={styles.saveButtonText}>Salvar produto</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView >
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
    paddingHorizontal: 20,
  },
  section: {
    marginTop: 24,
  },
  label: {
    fontSize: 15,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
  },
  uploadBox: {
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#E5E7EB",
    borderStyle: "dashed",
    borderRadius: 16,
    padding: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  uploadText: {
    fontSize: 15,
    color: "#6B7280",
    fontWeight: "500",
    marginTop: 12,
  },
  uploadSubtext: {
    fontSize: 13,
    color: "#9CA3AF",
    marginTop: 4,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1.5,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: "#1F2937",
  },
  switchContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1.5,
    borderColor: "#E5E7EB",
  },
  switchLabel: {
    flex: 1,
    marginRight: 16,
  },
  switchDescription: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 4,
  },
  currentImageBox: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#E5E7EB",
  },
  productIconLarge: {
    width: 120,
    height: 120,
    backgroundColor: "#FEE2E2",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    position: "relative",
  },
  productBoxLarge: {
    width: 60,
    height: 68,
    backgroundColor: "#DC2626",
    borderRadius: 6,
  },
  productBoxSmallLarge: {
    position: "absolute",
    width: 42,
    height: 48,
    backgroundColor: "#EF4444",
    top: 12,
    left: 39,
  },
  changeImageButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#EEF2FF",
    borderRadius: 10,
  },
  changeImageText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#4F46E5",
  },
  footer: {
    backgroundColor: "#fff",
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: 32,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#fff",
    borderWidth: 1.5,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#6B7280",
  },
  saveButton: {
    flex: 1,
    backgroundColor: "#60BEC8",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    shadowColor: "#60BEC8",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  previewImage: {
    width: 250,
    height: 250,
    borderRadius: 8, // Se o seu uploadBox tiver borda
    resizeMode: "cover", // Para cobrir a área sem distorcer muito
  },
})

