import { z } from "zod";

export const schemaContato = z.object({
  nome: z.string().min(3, "Digite seu nome completo."),
  email: z.string().email("Digite um e-mail válido."),
  mensagem: z.string().min(10, "Escreva uma mensagem com pelo menos 10 caracteres."),
});

export type FormContato = z.infer<typeof schemaContato>;