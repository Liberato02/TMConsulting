import { describe, it, expect } from "vitest";
import { ATIVIDADES } from "../atividades";

const CATEGORIAS_VALIDAS = ["saude", "meio-ambiente", "social"];

describe("ATIVIDADES — integridade dos dados oficiais", () => {
  it("cadastra as 6 atividades oficiais das diretrizes do projeto", () => {
    expect(ATIVIDADES).toHaveLength(6);
  });

  it("todo id é único (evita duas atividades colidindo na mesma chave)", () => {
    const ids = ATIVIDADES.map((a) => a.id);
    const idsUnicos = new Set(ids);
    expect(idsUnicos.size).toBe(ids.length);
  });

  it("toda atividade tem pontuação positiva", () => {
    for (const atividade of ATIVIDADES) {
      expect(atividade.pontos).toBeGreaterThan(0);
    }
  });

  it("toda atividade tem categoria válida", () => {
    for (const atividade of ATIVIDADES) {
      expect(CATEGORIAS_VALIDAS).toContain(atividade.categoria);
    }
  });

  it("toda atividade tem nome e descrição preenchidos", () => {
    for (const atividade of ATIVIDADES) {
      expect(atividade.nome.length).toBeGreaterThan(0);
      expect(atividade.descricao.length).toBeGreaterThan(0);
    }
  });

  it("inclui a Doação de Sangue com 500 pontos (regra de negócio conhecida)", () => {
    const doacao = ATIVIDADES.find((a) => a.id === "doacao-sangue");
    expect(doacao?.pontos).toBe(500);
  });
});
