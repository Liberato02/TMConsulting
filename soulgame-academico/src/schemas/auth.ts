import { z } from "zod";

export const schemaLogin = z.object({
    email: z.string().email("Digite um e-mail válido."),
    senha: z.string().min(6, "A senha precisa ter no mínimo 6 caracteres."),
});

export type FormLogin = z.infer<typeof schemaLogin>;

const IDADE_MINIMA = 16;

// Calcula a idade completa (em anos) a partir da data de nascimento,
// considerando corretamente se o aniversário deste ano já passou.
function calcularIdade(dataNascimentoISO: string): number {
    const hoje = new Date();
    const nascimento = new Date(dataNascimentoISO);
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const aindaNaoFezAniversarioEsseAno =
        hoje.getMonth() < nascimento.getMonth() ||
        (hoje.getMonth() === nascimento.getMonth() && hoje.getDate() < nascimento.getDate());
    if (aindaNaoFezAniversarioEsseAno) idade -= 1;
    return idade;
}

export const schemaCadastro = z
    .object({
        nome: z.string().min(3, "Digite seu nome completo."),
        email: z.string().email("Digite um e-mail válido."),
        senha: z.string().min(6, "A senha precisa ter no mínimo 6 caracteres."),
        confirmarSenha: z.string(),
        telefone: z
            .string()
            .min(10, "Digite um telefone válido com DDD.")
            .regex(/^[\d\s()-]+$/, "Use apenas números, espaços, parênteses e hífen."),
        dataNascimento: z.string().min(1, "Informe sua data de nascimento."),
        cidade: z.string().min(2, "Informe sua cidade."),
        estado: z.string().length(2, "Use a sigla do estado (ex: SP)."),
        tipo: z.enum(["usuario", "admin"]),
    })
    .refine((dados) => dados.senha === dados.confirmarSenha, {
        message: "As senhas não coincidem.",
        path: ["confirmarSenha"],
    })
    .refine((dados) => calcularIdade(dados.dataNascimento) >= IDADE_MINIMA, {
        message: `A SoulGame é destinada a pessoas a partir de ${IDADE_MINIMA} anos.`,
        path: ["dataNascimento"],
    });

export type FormCadastro = z.infer<typeof schemaCadastro>;



