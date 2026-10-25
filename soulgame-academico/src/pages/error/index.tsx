import { Link } from "react-router-dom";

// Rota "coringa" (path="*") — captura qualquer URL que não bate com
// nenhuma rota declarada, seguindo a prática ensinada em aula: nunca
// deixar o usuário numa tela em branco por digitar um endereço errado.
export function NaoEncontrada() {
  return (
    <main
      aria-label="Página não encontrada"
      className="flex-1 flex flex-col items-center justify-center px-4 py-20 text-center"
    >
      <p className="text-6xl font-extrabold text-blue-200">404</p>
      <h1 className="text-2xl font-bold text-blue-800 mt-2">Página não encontrada</h1>
      <p className="text-slate-500 mt-2 max-w-sm">
        O endereço que você tentou acessar não existe ou foi movido.
      </p>
      <Link
        to="/"
        className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold
                   rounded-lg px-5 py-2 text-sm transition-colors"
      >
        Voltar para a Home
      </Link>
    </main>
  );
}