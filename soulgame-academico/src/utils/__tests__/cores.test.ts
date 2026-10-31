import { describe, expect, it } from "vitest";
import { corTextoSobre } from "../cores";

describe("corTextoSobre", () => {
  it("usa texto claro sobre fundo escuro", () => {
    expect(corTextoSobre("#1d4ed8")).toBe("#ffffff");
  });

  it("usa texto escuro sobre fundo claro", () => {
    expect(corTextoSobre("#fde047")).toBe("#0f172a");
  });

  it("usa texto escuro quando a cor é inválida", () => {
    expect(corTextoSobre("azul")).toBe("#0f172a");
  });
});