import { describe, it, expect } from "vitest";
import { ehImagem } from "../imagem";

function arquivo(nome: string, tipo: string): File {
  return new File(["conteudo"], nome, { type: tipo });
}

describe("ehImagem — evidência só aceita fotos", () => {
  it("aceita JPG, PNG e WEBP", () => {
    expect(ehImagem(arquivo("a.jpg", "image/jpeg"))).toBe(true);
    expect(ehImagem(arquivo("a.png", "image/png"))).toBe(true);
    expect(ehImagem(arquivo("a.webp", "image/webp"))).toBe(true);
  });

  it("rejeita PDF (a IA de visão não lê PDF)", () => {
    expect(ehImagem(arquivo("a.pdf", "application/pdf"))).toBe(false);
  });

  it("rejeita SVG (pode carregar script) e arquivos sem tipo", () => {
    expect(ehImagem(arquivo("a.svg", "image/svg+xml"))).toBe(false);
    expect(ehImagem(arquivo("a", ""))).toBe(false);
  });
});
