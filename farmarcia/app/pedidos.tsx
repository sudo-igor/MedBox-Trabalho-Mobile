import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
} from "react-native";
import { ChevronRight, TrendingUp, Package, Clock } from "lucide-react-native";
import {
  calcularEstatisticas,
  filtrarPedidos,
  pedidos,
  estatisticas,
  Status,
} from "@/scripts/PedidosService";
import { formatDate } from "@/scripts/data";

export default function DesempenhoPedidos() {
  const [filtroAtivo, setFiltroAtivo] = useState("hoje");
  const [Pedidos, setPedidos] = useState<pedidos[]>([]);
  const [estatisticas, setEstatisticas] = useState<estatisticas>({
    totalVendas: 0,
    totalPedidos: 0,
    ticketMedio: 0,
    clientesNovos: 0,
  });

  const filtros = [
    { id: "hoje", label: "Hoje" },
    { id: "ontem", label: "Ontem" },
    { id: "7dias", label: "Últimos 7 dias" },
    { id: "30dias", label: "Últimos 30 dias" },
  ];

  // Mapeamento de cores por status
  const statusColors: { [key in Status]: string } = {
    [Status.Entrega]: "#FCD34D",
    [Status.Entregue]: "#34D399",
    [Status.Cancelado]: "#EF4444",
    [Status.Confirmado]: "#10B981",
  };

  const carregar = async () => {
    const dadosPedidos = await filtrarPedidos(filtroAtivo);
    const dadosEstatisticas = await calcularEstatisticas(filtroAtivo);
    setPedidos(dadosPedidos);
    setEstatisticas(dadosEstatisticas);
  };

  useEffect(() => {
    carregar();
  }, [filtroAtivo]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.headerTitle}>Desempenho de pedidos</Text>
          <TouchableOpacity style={styles.headerButton}>
            <ChevronRight size={24} color="#1F2937" strokeWidth={2} />
          </TouchableOpacity>
        </View>

        {/* Filtros */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filtrosContainer}
          contentContainerStyle={styles.filtrosContent}
        >
          {filtros.map((filtro) => (
            <TouchableOpacity
              key={filtro.id}
              style={[
                styles.filtroChip,
                filtroAtivo === filtro.id && styles.filtroChipAtivo,
              ]}
              onPress={() => setFiltroAtivo(filtro.id)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.filtroTexto,
                  filtroAtivo === filtro.id && styles.filtroTextoAtivo,
                ]}
              >
                {filtro.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Card de Resumo Aprimorado */}
        <View style={styles.resumoCard}>
          <View style={styles.resumoHeader}>
            <View style={styles.resumoIconBox}>
              <TrendingUp size={24} color="#4F46E5" strokeWidth={2.5} />
            </View>
            <Text style={styles.resumoLabel}>Total de vendas</Text>
          </View>
          <Text style={styles.resumoValor}>
            R$ {estatisticas.totalVendas.toFixed(2)}
          </Text>
          <View style={styles.resumoInfo}>
            <View style={styles.resumoItem}>
              <View style={styles.resumoItemIcon}>
                <Package size={16} color="#6B7280" strokeWidth={2} />
              </View>
              <Text style={styles.resumoItemLabel}>Pedidos</Text>
              <Text style={styles.resumoItemValor}>
                {estatisticas.totalPedidos}
              </Text>
            </View>
            <View style={styles.divisor} />
            <View style={styles.resumoItem}>
              <View style={styles.resumoItemIcon}>
                <Text style={styles.resumoItemEmoji}>💰</Text>
              </View>
              <Text style={styles.resumoItemLabel}>Ticket médio</Text>
              <Text style={styles.resumoItemValor}>
                R$ {estatisticas.ticketMedio.toFixed(2)}
              </Text>
            </View>
            <View style={styles.divisor} />
            <View style={styles.resumoItem}>
              <View style={styles.resumoItemIcon}>
                <Text style={styles.resumoItemEmoji}>👥</Text>
              </View>
              <Text style={styles.resumoItemLabel}>Clientes</Text>
              <Text style={styles.resumoItemValor}>
                {estatisticas.clientesNovos}
              </Text>
            </View>
          </View>
        </View>

        {/* Seção de Histórico */}
        <View style={styles.secaoHistorico}>
          <Text style={styles.secaoTitulo}>Histórico</Text>
          <Text style={styles.secaoSubtitulo}>
            {Pedidos.length} {Pedidos.length === 1 ? "pedido" : "pedidos"}
          </Text>
        </View>

        {/* Lista de Pedidos Aprimorada */}
        <View style={styles.pedidosLista}>
          {Pedidos.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateEmoji}>📦</Text>
              <Text style={styles.emptyStateTitle}>
                Nenhum pedido encontrado
              </Text>
              <Text style={styles.emptyStateText}>
                Não há pedidos para o período selecionado
              </Text>
            </View>
          ) : (
            Pedidos.map((pedido) => {
              const corStatus = statusColors[pedido.status] || "#6B7280";

              return (
                <View key={pedido.id} style={styles.pedidoCard}>
                  {/* Header do Card */}
                  <View style={styles.pedidoHeader}>
                    <View style={styles.pedidoHeaderLeft}>
                      <View>
                        <Text style={styles.pedidoCliente}>
                          {pedido.cliente}
                        </Text>
                        <View style={styles.pedidoTimeContainer}>
                          <Clock size={12} color="#9CA3AF" strokeWidth={2} />
                          <Text style={styles.pedidoTime}>
                            {formatDate(pedido.createdAt)}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <Text style={styles.pedidoId}>#{pedido.id}</Text>
                  </View>

                  {/* Footer do Card */}
                  <View style={styles.pedidoFooter}>
                    <View
                      style={[
                        styles.statusBadge,
                        {
                          backgroundColor: corStatus + "20",
                          borderLeftWidth: 3,
                          borderLeftColor: corStatus,
                        },
                      ]}
                    >
                      <View
                        style={[
                          styles.statusDot,
                          { backgroundColor: corStatus },
                        ]}
                      />
                      <Text style={[styles.statusTexto, { color: corStatus }]}>
                        {pedido.status}
                      </Text>
                    </View>

                    <TouchableOpacity style={styles.botaoDetalhes}>
                      <Text style={styles.botaoDetalhesTexto}>Ver mais</Text>
                      <ChevronRight size={16} color="#fff" strokeWidth={2.5} />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })
          )}
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
    paddingTop: 50,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
    letterSpacing: -0.5,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
  },
  filtrosContainer: {
    paddingLeft: 20,
  },
  filtrosContent: {
    paddingRight: 20,
    gap: 8,
  },
  filtroChip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "#F3F4F6",
    marginRight: 8,
  },
  filtroChipAtivo: {
    backgroundColor: "#4F46E5",
  },
  filtroTexto: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6B7280",
  },
  filtroTextoAtivo: {
    color: "#fff",
  },
  content: {
    flex: 1,
  },
  resumoCard: {
    backgroundColor: "#fff",
    margin: 20,
    marginBottom: 16,
    padding: 24,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  resumoHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  resumoIconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#EEF2FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  resumoLabel: {
    fontSize: 16,
    color: "#6B7280",
    fontWeight: "500",
  },
  resumoValor: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 20,
    letterSpacing: -1,
  },
  resumoInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  resumoItem: {
    flex: 1,
    alignItems: "center",
  },
  resumoItemIcon: {
    marginBottom: 4,
  },
  resumoItemEmoji: {
    fontSize: 16,
  },
  resumoItemLabel: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 6,
  },
  resumoItemValor: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },
  divisor: {
    width: 1,
    height: 50,
    backgroundColor: "#E5E7EB",
  },
  secaoHistorico: {
    paddingHorizontal: 20,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  secaoTitulo: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827",
  },
  secaoSubtitulo: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "500",
  },
  pedidosLista: {
    paddingHorizontal: 20,
    gap: 12,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  emptyStateEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 20,
  },
  pedidoCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  pedidoHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  pedidoHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  pedidoAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#4F46E5",
    justifyContent: "center",
    alignItems: "center",
  },
  pedidoAvatarText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  pedidoCliente: {
    fontSize: 16,
    color: "#111827",
    fontWeight: "600",
    marginBottom: 4,
  },
  pedidoTimeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  pedidoTime: {
    fontSize: 12,
    color: "#9CA3AF",
    fontWeight: "500",
  },
  pedidoId: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "600",
  },
  pedidoFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  statusBadge: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusTexto: {
    fontSize: 13,
    fontWeight: "600",
  },
  botaoDetalhes: {
    backgroundColor: "#3B82F6",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  botaoDetalhesTexto: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
});
