import { z } from "zod";

export const schemaLogin = z.object({
  email: z.string().email("Digite um e-mail válido."),
  senha: z.string().min(6, "A senha precisa ter no mínimo 6 caracteres."),
});

export type FormLogin = z.infer<typeof schemaLogin>;

const IDADE_MINIMA = 16;

function calcularIdade(dataNascimentoISO: string): number {
  const hoje = new Date();
  const [ano, mes, dia] = dataNascimentoISO.split("-").map(Number);
  const nascimento = new Date(ano, mes - 1, dia);
  let idade = hoje.getFullYear() - nascimento.getFullYear();

  const aindaNaoFezAniversarioEsseAno =
    hoje.getMonth() < nascimento.getMonth() ||
    (hoje.getMonth() === nascimento.getMonth() &&
      hoje.getDate() < nascimento.getDate());

  if (aindaNaoFezAniversarioEsseAno) idade -= 1;

  return idade;
}
const TIPOS_VALIDOS = [
  "soulgamer",
  "soulfluencer",
  "soulhealth",
  "soulsport",
  "soulbrain",
  "educasoul",
  "ecosoul",
  "admin",
] as const;