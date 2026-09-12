import { useState, type FormEvent } from "react";

export function Contato() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [status, setStatus] = useState<"idle" | "enviando" | "enviado" | "erro">("idle");

  // Usa Fetch API nativa (exigência do projeto). Aponta para um endpoint
  // mock (httpbin) só para demonstrar o ciclo de requisição real;
  // trocar pela URL da API do time quando disponível.
  async function handleSubmit(evento: FormEvent) {
    evento.preventDefault();
    setStatus("enviando");

    try {
      const resposta = await fetch("https://httpbin.org/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, mensagem }),
      });

      if (!resposta.ok) throw new Error("Falha no envio");

      setStatus("enviado");
      setNome("");
      setEmail("");
      setMensagem("");
    } catch {
      setStatus("erro");
    }
  }

  return (
    <main aria-label="Formulário de contato" className="flex-1 px-4 py-16 bg-blue-50">
      <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-blue-800 mb-1">Fale conosco</h1>
        <p className="text-sm text-slate-500 mb-6">
          Dúvidas, sugestões ou parcerias — envie sua mensagem.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="nome" className="block text-sm font-medium text-slate-700 mb-1">
              Nome
            </label>
            <input
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="mensagem" className="block text-sm font-medium text-slate-700 mb-1">
              Mensagem
            </label>
            <textarea
              id="mensagem"
              value={mensagem}
              onChange={(e) => setMensagem(e.target.value)}
              required
              rows={4}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={status === "enviando"}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white
                       font-semibold rounded-lg px-4 py-2 text-sm transition-colors"
          >
            {status === "enviando" ? "Enviando..." : "Enviar mensagem"}
          </button>

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
      </div>
    </main>
  );
}
