export interface EstoqueTipoSanguineo {
  tipo: string;
  nivel: "critico" | "baixo" | "adequado";
  percentual: number;
}

export interface RespostaEstoqueSangue {
  atualizadoEm: string;
  hemocentro: string;
  estoque: EstoqueTipoSanguineo[];
}

// Consome a API de estoque de sangue via Fetch API nativa (sem Axios).
// Hoje aponta para um mock estático servido pelo próprio Vite
// (/public/mock-api/estoque-sangue.json), porque não existe uma API
// pública oficial de estoque de sangue no Brasil. Quando o backend
// Java do time tiver essa rota pronta, troca só a URL abaixo.
const URL_ESTOQUE_SANGUE = "/mock-api/estoque-sangue.json";

export async function buscarEstoqueSangue(): Promise<RespostaEstoqueSangue> {
  const resposta = await fetch(URL_ESTOQUE_SANGUE);
  if (!resposta.ok) {
    throw new Error("Não foi possível carregar o estoque de sangue.");
  }
  return resposta.json();
}
