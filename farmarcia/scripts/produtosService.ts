import AsyncStorage from "@react-native-async-storage/async-storage";
const STORAGE_KEY = "@farmacia_produtos";

export interface produto {
  id: number;
  nome: string;
  quantidade: number;
  preco: number;
  receita: boolean;
  imagem?: string;
}

let produtosInicial: produto[] = [
  {
    id: 0,
    nome: "produto",
    quantidade: 20,
    preco: 20,
    receita: true,
    imagem: "null",
  },
];
let proximoId = 1;

// 🔹 Função auxiliar para carregar do AsyncStorage
export const carregarProdutos = async (): Promise<produto[]> => {
  try {
    const dados = await AsyncStorage.getItem(STORAGE_KEY);
    if (!dados) {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(produtosInicial));
      console.log("✅ Pedidos inicializados");
    }
    const lista = JSON.parse(dados);
    return Array.isArray(lista) ? lista : [];
  } catch (error) {
    console.error("❌ Erro ao inicializar pedidos:", error);
    return [];
  }
};

// 🔹 Função auxiliar para salvar no AsyncStorage
const salvarProdutos = async (produtos: produto) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(produtos));
  } catch (e) {
    console.error("Erro ao salvar produtos:", e);
  }
};

// ========== CRUD ==========
export const buscarProduto = (id: number) => {
  const produtos = carregarProdutos();
  return produtos.find((p) => p.id === id);
};

export const criarProduto = async (dados: produto) => {
  const produtos = carregarProdutos();
  const novoProduto: produto = {
    id: proximoId++,
    nome: dados.nome,
    quantidade: dados.quantidade,
    preco: dados.preco,
    receita: dados.receita,
    imagem: dados.imagem ?? "",
  };
  produtos.push(novoProduto);
  await salvarProdutos();
  return novoProduto;
};

export const atualizarProduto = async (id: number, dados: produto) => {
  const produtos = carregarProdutos();
  const index = produtos.findIndex((p) => p.id === id);

  if (index === -1) return null;

  produtos[index] = { ...produtos[index], ...dados };
  await salvarProdutos(produtos);

  return produtos[index];
};

export const deletarProduto = async (id: number) => {
  const produtos = carregarProdutos();
  const newList = produtos.filter((p) => p.id !== id);
  await salvarProdutos(newList);
  return true;
};
