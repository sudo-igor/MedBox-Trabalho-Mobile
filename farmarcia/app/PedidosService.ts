// ==================== BACKEND DE PEDIDOS COM ASYNCSTORAGE ====================
// Arquivo: services/pedidosService.js

import AsyncStorage from "@react-native-async-storage/async-storage";
import { dataAleatoriaAte30Dias } from "./data";

const STORAGE_KEY = "@farmacia_pedidos";

export enum Status {
  Entrega = "Saiu para Entrega",
  Entregue = "Pedido entregue",
  Cancelado = "Pedido Cancelado",
  Confirmado = "Pedido Confirmado",
}

export interface pedidos {
  id: number;
  cliente: string;
  produtos: {
    id: number;
    quantidade: number;
  }[];
  total: number;
  status: Status;
  createdAt: string;
  updatedAt: string;
}
export interface estatisticas {
  totalVendas: number;
  totalPedidos: number;
  ticketMedio: number;
  clientesNovos: number;
}

// ========== DADOS INICIAIS ==========
const pedidosIniciais: pedidos[] = [
  {
    id: 1,
    cliente: "Ana Julia",
    produtos: [{ id: 0, quantidade: 2 }],
    total: 25.0,
    status: Status.Entrega,
    createdAt: dataAleatoriaAte30Dias(),
    updatedAt: dataAleatoriaAte30Dias(),
  },
  {
    id: 17,
    cliente: "João",
    produtos: [{ id: 1, quantidade: 1 }],
    total: 25.9,
    status: Status.Entregue,
    createdAt: dataAleatoriaAte30Dias(),
    updatedAt: dataAleatoriaAte30Dias(),
  },
  {
    id: 42,
    cliente: "Marcia",
    produtos: [{ id: 2, quantidade: 3 }],
    total: 26.7,
    status: Status.Cancelado,
    createdAt: dataAleatoriaAte30Dias(),
    updatedAt: dataAleatoriaAte30Dias(),
  },
  {
    id: 24,
    cliente: "Marcia",
    produtos: [{ id: 2, quantidade: 2 }],
    total: 30.0,
    status: Status.Confirmado,
    createdAt: dataAleatoriaAte30Dias(),
    updatedAt: dataAleatoriaAte30Dias(),
  },
];

// ========== LISTAR TODOS OS PEDIDOS ==========
export const listarPedidos = async () => {
  try {
    const dados = await AsyncStorage.getItem(STORAGE_KEY);
    if (!dados) {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(pedidosIniciais));
      console.log("✅ Pedidos inicializados");
    }
    const lista = JSON.parse(dados);
    return Array.isArray(lista) ? lista : [];
  } catch (error) {
    console.error("❌ Erro ao inicializar pedidos:", error);
    return [];
  }
};
// Filtrar pedidos
export const filtrarPedidos = async (filtro = "hoje") => {
  try {
    const pedidos = await listarPedidos();
    const agora = new Date();

    // Filtrar por período
    let pedidosFiltrados = pedidos;

    if (filtro === "hoje") {
      pedidosFiltrados = pedidos.filter((p) => {
        const data = new Date(p.createdAt);
        return data.toDateString() === agora.toDateString();
      });
    } else if (filtro === "ontem") {
      const ontem = new Date(agora);
      ontem.setDate(ontem.getDate() - 1);
      pedidosFiltrados = pedidos.filter((p) => {
        const data = new Date(p.createdAt);
        return data.toDateString() === ontem.toDateString();
      });
    } else if (filtro === "7dias") {
      const seteDiasAtras = new Date(agora);
      seteDiasAtras.setDate(seteDiasAtras.getDate() - 7);
      pedidosFiltrados = pedidos.filter((p) => {
        const data = new Date(p.createdAt);
        return data >= seteDiasAtras;
      });
    } else if (filtro === "30dias") {
      const trintaDiasAtras = new Date(agora);
      trintaDiasAtras.setDate(trintaDiasAtras.getDate() - 30);
      pedidosFiltrados = pedidos.filter((p) => {
        const data = new Date(p.createdAt);
        return data >= trintaDiasAtras;
      });
    }
    return pedidosFiltrados;
  } catch (error) {
    console.log("Erro ao filtrar:", error);
    return [];
  }
};

// ========== BUSCAR PEDIDO POR ID ==========
export const buscarPedido = async (id) => {
  try {
    const pedidos = await listarPedidos();
    return pedidos.find((p) => p.id === id) || null;
  } catch (error) {
    console.error("❌ Erro ao buscar pedido:", error);
    return null;
  }
};

// ========== CRIAR NOVO PEDIDO ==========
export const criarPedido = async (dados) => {
  try {
    const pedidos = await listarPedidos();

    const novoPedido = {
      id: Date.now(),
      cliente: dados.cliente,
      produtos: dados.produtos,
      total: dados.total,
      status: dados.status,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    pedidos.push(novoPedido);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(pedidos));

    console.log("✅ Pedido criado:", novoPedido.id);
    return novoPedido;
  } catch (error) {
    console.error("❌ Erro ao criar pedido:", error);
    return null;
  }
};

// ========== ATUALIZAR STATUS DO PEDIDO ==========
export const atualizarStatusPedido = async (id: number, novoStatus: Status) => {
  try {
    const pedidos = await listarPedidos();
    const index = pedidos.findIndex((p) => p.id === id);

    if (index === -1) {
      return null;
    }

    pedidos[index] = {
      ...pedidos[index],
      status: novoStatus,
      updatedAt: new Date().toISOString(),
    };

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(pedidos));

    console.log("✅ Status atualizado:", pedidos[index]);
    return pedidos[index];
  } catch (error) {
    console.error("❌ Erro ao atualizar status:", error);
    return null;
  }
};

// ========== DELETAR PEDIDO ==========
export const deletarPedido = async (id: number) => {
  try {
    const pedidos = await listarPedidos();
    const novosPedidos = pedidos.filter((p) => p.id !== id);

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(novosPedidos));

    console.log("✅ Pedido deletado:", id);
    return true;
  } catch (error) {
    console.error("❌ Erro ao deletar pedido:", error);
    return false;
  }
};

// ========== CALCULAR ESTATÍSTICAS ==========
export const calcularEstatisticas = async (filtro = "hoje") => {
  try {
    const pedidosFiltrados = await filtrarPedidos(filtro);
    let dados: estatisticas = {
      totalVendas: 0,
      totalPedidos: 0,
      ticketMedio: 0,
      clientesNovos: 0,
    };
    // Calcular totais
    dados.totalVendas = pedidosFiltrados
      .filter((p) => p.status !== Status.Cancelado)
      .reduce((acc, p) => acc + p.total, 0);

    dados.totalPedidos = pedidosFiltrados.length;

    dados.ticketMedio =
      dados.totalPedidos > 0 ? dados.totalVendas / dados.totalPedidos : 0;

    dados.clientesNovos = new Set(pedidosFiltrados.map((p) => p.cliente)).size;

    return dados;
  } catch (error) {
    console.error("❌ Erro ao calcular estatísticas:", error);
    return {
      totalVendas: 0,
      totalPedidos: 0,
      ticketMedio: 0,
      clientesNovos: 0,
    };
  }
};

// ========== LIMPAR TODOS OS PEDIDOS ==========
export const limparPedidos = async () => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
    console.log("✅ Pedidos limpos");
    return true;
  } catch (error) {
    console.error("❌ Erro ao limpar pedidos:", error);
    return false;
  }
};
