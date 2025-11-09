import AsyncStorage from "@react-native-async-storage/async-storage";

export interface produto {
  id: number;
  nome: string;
  quantidade: number;
  preco: number;
  receita: boolean;
  imagem?: string;
}

let produtos: produto[] = [
  {
  id: 0,
  nome: "produto",
  quantidade: 20,
  preco: 20,
  receita: true,
  imagem: "@/assets/images/remedio.png",}
];
let proximoId = 1;

// 🔹 Função auxiliar para carregar do AsyncStorage
export const carregarProdutos = async () => {
  try {
    const json = await AsyncStorage.getItem("produtos");
    if (json) {
      produtos = JSON.parse(json);
      // Ajusta o ID incremental
      const ids = produtos.map((p) => p.id);
      proximoId = ids.length > 0 ? Math.max(...ids) + 1 : 1;
    }
  } catch (e) {
    console.error("Erro ao carregar produtos:", e);
  }
  return produtos;
};

// 🔹 Função auxiliar para salvar no AsyncStorage
const salvarProdutos = async () => {
  try {
    await AsyncStorage.setItem("produtos", JSON.stringify(produtos));
  } catch (e) {
    console.error("Erro ao salvar produtos:", e);
  }
};

// ========== CRUD ==========

export const listarProdutos = async () => {
  if (produtos.length === 0) await carregarProdutos();
  return produtos;
};

export const buscarProduto = (id: number) => {
  return produtos.find((p) => p.id === id);
};

export const criarProduto = async (dados: produto) => {
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
  const index = produtos.findIndex((p) => p.id === id);

  if (index === -1) return null;

  produtos[index] = { ...produtos[index], ...dados };
  await salvarProdutos();

  return produtos[index];
};

export const deletarProduto = async (id: number) => {
  produtos = produtos.filter((p) => p.id !== id);
  await salvarProdutos();
  return true;
};
