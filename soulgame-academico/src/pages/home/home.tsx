//Migrando a Home pra src
import { Link } from "react-router-dom";

const ETAPAS_ROADMAP = [
  "Pesquisa do desafio",
  "Planejamento da solução",
  "Desenvolvimento do projeto",
  "Testes e melhorias",
  "Apresentação final",
];
//Definindo a Home como componente funcional
export function Home() {
  return (
    <main aria-label="Página inicial do SoulGame" className="flex-1">
      {/* Hero */}
      <section aria-label="Apresentação principal" className="bg-gradient-to-b from-blue-700 to-blue-600 text-white px-4 py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold max-w-2xl mx-auto leading-tight">
          Transforme boas ações em conquistas.
        </h1>
        <p className="text-blue-100 max-w-xl mx-auto mt-4 text-lg">
          SoulGame gamifica doações, reciclagem e ações sociais — desafios,
