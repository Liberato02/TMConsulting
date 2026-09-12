import { describe, it, expect } from "vitest";
import { converterPontosParaReais, formatarReais, COEFICIENTE_REAIS_POR_PONTO } from "../conversao";

describe("converterPontosParaReais", () => {
  it("converte pontos em reais usando o coeficiente oficial (0,009)", () => {
    expect(converterPontosParaReais(500)).toBeCloseTo(4.5);
    expect(converterPontosParaReais(100)).toBeCloseTo(0.9);
  });

  it("zero pontos resulta em zero reais", () => {
    expect(converterPontosParaReais(0)).toBe(0);
  });

  it("o coeficiente usado é exatamente 0.009 (regra oficial do projeto)", () => {
    expect(COEFICIENTE_REAIS_POR_PONTO).toBe(0.009);
  });
});

describe("formatarReais", () => {
  it("formata um valor no padrão de moeda brasileiro", () => {
    const resultado = formatarReais(4.5);
    // toLocaleString usa espaço não-quebrável (U+00A0) entre "R$" e o valor
    expect(resultado).toContain("R$");
    expect(resultado).toContain("4,50");
  });

  it("formata zero corretamente", () => {
    expect(formatarReais(0)).toContain("0,00");
  });
});