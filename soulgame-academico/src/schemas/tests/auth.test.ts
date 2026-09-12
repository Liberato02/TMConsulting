import { describe, it, expect } from "vitest";
import { schemaCadastro, schemaLogin } from "../auth";

const DADOS_VALIDOS_BASE = {
  nome: "Ana Soulgamer",
  email: "ana@teste.com",
  senha: "senha123",
  confirmarSenha: "senha123",
  telefone: "(11) 90000-0000",
  cidade: "São Paulo",
  estado: "SP",
  tipo: "usuario" as const,
};

function dataNascimentoComIdade(idade: number): string {
  const hoje = new Date();
  const nascimento = new Date(hoje.getFullYear() - idade, hoje.getMonth(), hoje.getDate());
  return nascimento.toISOString().slice(0, 10);
}

describe("schemaCadastro — validação de idade mínima", () => {
  it("aceita cadastro de quem já fez 16 anos", () => {
    const resultado = schemaCadastro.safeParse({
      ...DADOS_VALIDOS_BASE,
      dataNascimento: dataNascimentoComIdade(16),
    });
    expect(resultado.success).toBe(true);
  });

  it("rejeita cadastro de quem tem 15 anos", () => {
    const resultado = schemaCadastro.safeParse({
      ...DADOS_VALIDOS_BASE,
      dataNascimento: dataNascimentoComIdade(15),
    });
    expect(resultado.success).toBe(false);
  });

  it("rejeita quem faz 16 anos só amanhã (idade calculada corretamente, não só por ano)", () => {
    const hoje = new Date();
    const amanha = new Date(hoje);
    amanha.setDate(hoje.getDate() + 1);
    // nasceu exatamente 16 anos atrás, mas 1 dia no futuro em relação a hoje
    const nascimento = new Date(hoje.getFullYear() - 16, amanha.getMonth(), amanha.getDate());
    const resultado = schemaCadastro.safeParse({
      ...DADOS_VALIDOS_BASE,
      dataNascimento: nascimento.toISOString().slice(0, 10),
    });
    expect(resultado.success).toBe(false);
  });
});

describe("schemaCadastro — outras validações", () => {
  it("rejeita quando senha e confirmação não coincidem", () => {
    const resultado = schemaCadastro.safeParse({
      ...DADOS_VALIDOS_BASE,
      dataNascimento: dataNascimentoComIdade(20),
      confirmarSenha: "outrasenha",
    });
    expect(resultado.success).toBe(false);
  });

  it("rejeita e-mail inválido", () => {
    const resultado = schemaCadastro.safeParse({
      ...DADOS_VALIDOS_BASE,
      dataNascimento: dataNascimentoComIdade(20),
      email: "nao-e-um-email",
    });
    expect(resultado.success).toBe(false);
  });

  it("rejeita senha com menos de 6 caracteres", () => {
    const resultado = schemaCadastro.safeParse({
      ...DADOS_VALIDOS_BASE,
      dataNascimento: dataNascimentoComIdade(20),
      senha: "123",
      confirmarSenha: "123",
    });
    expect(resultado.success).toBe(false);
  });
});

describe("schemaLogin", () => {
  it("aceita e-mail e senha válidos", () => {
    const resultado = schemaLogin.safeParse({ email: "teste@teste.com", senha: "123456" });
    expect(resultado.success).toBe(true);
  });

  it("rejeita e-mail mal formatado", () => {
    const resultado = schemaLogin.safeParse({ email: "invalido", senha: "123456" });
    expect(resultado.success).toBe(false);
  });
});
