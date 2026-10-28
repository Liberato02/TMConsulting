// Cliente HTTP pro back-end Java (com.sun.net.httpserver).
// A URL vem da variável de ambiente VITE_API_URL (definida na Vercel em
// produção, ou em um arquivo .env local). Sem ela, usa o back-end local.
// Obs.: variáveis do Vite são lidas no BUILD — mudou na Vercel, refaça o deploy.
const URL_BASE: string = (
  import.meta.env.VITE_API_URL ?? "http://localhost:8080/api"
).replace(/\/+$/, "");

export class ErroApi extends Error {
  constructor(mensagem: string) {
    super(mensagem);
    this.name = "ErroApi";
  }
}

async function requisicao<T>(caminho: string, opcoes?: RequestInit): Promise<T> {
  let resposta: Response;

  try {
    resposta = await fetch(`${URL_BASE}${caminho}`, {
      headers: { "Content-Type": "application/json" },
      ...opcoes,
    });
  } catch {
    throw new ErroApi(
      "Não foi possível conectar ao servidor. Confira se o back-end Java está rodando (ServidorApi.java)."
    );
  }

  // Respostas 204 (No Content, ex: OPTIONS) não têm corpo JSON pra ler.
  if (resposta.status === 204) {
    return {} as T;
  }

  const corpo = await resposta.json().catch(() => ({}));

  if (!resposta.ok) {
    throw new ErroApi(corpo.erro ?? `Erro ${resposta.status} na API.`);
  }

  return corpo as T;
}

