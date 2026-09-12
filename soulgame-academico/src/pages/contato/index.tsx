import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schemaContato, type FormContato } from "../../schemas/contato";
import { useTituloDocumento } from "../../hooks/useTituloDocumento";
import { Card } from "../../components/Card";
import { Botao } from "../../components/Botao";

export function Contato() {
  useTituloDocumento("Contato | SoulGame");
  const [status, setStatus] = useState<"idle" | "enviado" | "erro">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormContato>({
    resolver: zodResolver(schemaContato),
  });

  // Usa Fetch API nativa (exigência do projeto). Aponta para um endpoint
  // mock (httpbin) só para demonstrar o ciclo de requisição real;
  // trocar pela URL da API do time quando disponível.
  async function onSubmit(dados: FormContato) {
    setStatus("idle");
    try {
      const resposta = await fetch("https://httpbin.org/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados),
      });

      if (!resposta.ok) throw new Error("Falha no envio");

      setStatus("enviado");
      reset();
    } catch {
      setStatus("erro");
    }
  }

  return (
    <main aria-label="Formulário de contato" className="flex-1 px-4 py-16 bg-blue-50">
      <Card className="max-w-lg mx-auto shadow-lg">
        <h1 className="text-2xl font-bold text-blue-800 mb-1">Fale conosco</h1>
        <p className="text-sm text-slate-500 mb-6">
          Dúvidas, sugestões ou parcerias — envie sua mensagem.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
          <div>
            <label htmlFor="nome" className="block text-sm font-medium text-slate-700 mb-1">
              Nome
            </label>
            <input
              id="nome"
              {...register("nome")}
              aria-invalid={!!errors.nome}
              aria-describedby={errors.nome ? "nome-erro" : undefined}
              className="w-full rounded-lg border border-slate-300 aria-invalid:border-red-400 px-3 py-2 text-sm
                         focus:outline-none focus:ring-2 focus:ring-blue-500 aria-invalid:focus:ring-red-400"
            />
            {errors.nome && (
              <p id="nome-erro" role="alert" className="text-xs text-red-600 mt-1">
                {errors.nome.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              {...register("email")}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-erro" : undefined}
              className="w-full rounded-lg border border-slate-300 aria-invalid:border-red-400 px-3 py-2 text-sm
                         focus:outline-none focus:ring-2 focus:ring-blue-500 aria-invalid:focus:ring-red-400"
            />
            {errors.email && (
              <p id="email-erro" role="alert" className="text-xs text-red-600 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="mensagem" className="block text-sm font-medium text-slate-700 mb-1">
              Mensagem
            </label>
            <textarea
              id="mensagem"
              {...register("mensagem")}
              aria-invalid={!!errors.mensagem}
              aria-describedby={errors.mensagem ? "mensagem-erro" : undefined}
              rows={4}
              className="w-full rounded-lg border border-slate-300 aria-invalid:border-red-400 px-3 py-2 text-sm
                         focus:outline-none focus:ring-2 focus:ring-blue-500 aria-invalid:focus:ring-red-400"
            />
            {errors.mensagem && (
              <p id="mensagem-erro" role="alert" className="text-xs text-red-600 mt-1">
                {errors.mensagem.message}
              </p>
            )}
          </div>

          <Botao type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Enviando..." : "Enviar mensagem"}
          </Botao>

          {status === "enviado" && (
            <p role="status" className="text-sm text-blue-700 bg-blue-50 rounded-lg px-3 py-2">
              Mensagem enviada com sucesso!
            </p>
          )}
          {status === "erro" && (
            <p role="alert" className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">
              Não foi possível enviar. Tente novamente.
            </p>
          )}
        </form>

        <p className="text-xs text-slate-400 mt-4">
          tmconsulting.challenge@gmail.com
        </p>
      </Card>
    </main>
  );
}