import type { FormContato } from "../schemas/contato";

// Endpoint de demonstração (httpbin ecoa o que recebe). O back-end Java
// ainda não tem rota de contato; quando tiver, troca só esta constante.
const URL_CONTATO = "https://httpbin.org/post";

export async function enviarContatoApi(dados: FormContato): Promise<void> {
  const resposta = await fetch(URL_CONTATO, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });

  if (!resposta.ok) {
    throw new Error("Falha no envio da mensagem de contato.");
  }
}
