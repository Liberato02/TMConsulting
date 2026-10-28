// Conversão de pontos em valor monetário — mesma regra usada na versão
// anterior (Sprint 2): R$ 0,009 por ponto acumulado.
// Centralizado aqui porque essa regra é reaproveitada tanto na versão
// acadêmica quanto na versão SoulUp/MVP (evita duplicar o número mágico
// em vários componentes).
export const COEFICIENTE_REAIS_POR_PONTO = 0.009;

export function converterPontosParaReais(pontos: number): number {
  return pontos * COEFICIENTE_REAIS_POR_PONTO;
}

export function formatarReais(valor: number): string {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
