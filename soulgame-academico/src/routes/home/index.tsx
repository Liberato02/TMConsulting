import { Link } from "react-router-dom";

const ETAPAS_ROADMAP = [
  "Pesquisa do desafio",
  "Planejamento da solução",
  "Desenvolvimento do projeto",
  "Testes e melhorias",
  "Apresentação final",
];

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
          pontos e níveis para engajar sua comunidade.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            to="/cadastro"
            className="bg-white text-blue-700 font-semibold px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors"
          >
            Começar agora
          </Link>
          <Link
            to="/sobre"
            className="border border-white/60 font-semibold px-6 py-3 rounded-lg hover:bg-white/10 transition-colors"
          >
            Saiba mais
          </Link>
        </div>
      </section>

      {/* Vídeo explicativo */}
      <section aria-label="Vídeo explicativo" className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-blue-800 mb-2">
          Entenda a solução em 2 minutos
        </h2>
        <p className="text-slate-500 mb-6">
          Assista à apresentação em vídeo do projeto SoulGame.
        </p>
        <div className="aspect-video rounded-2xl overflow-hidden shadow-lg">
          {/* Substituir o VIDEO_ID pelo vídeo real de apresentação no YouTube */}
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/VIDEO_ID"
            title="Apresentação SoulGame"
            allowFullScreen
          />
        </div>
      </section>

      {/* Roadmap */}
      <section aria-label="Roadmap do projeto" className="bg-slate-50 px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-blue-800 mb-8 text-center">
            Roadmap do projeto
          </h2>
          <ol className="space-y-4">
            {ETAPAS_ROADMAP.map((etapa, indice) => (
              <li key={etapa} className="flex items-center gap-4 bg-white rounded-xl shadow-sm p-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-sm shrink-0">
                  {indice + 1}
                </span>
                <span className="text-slate-700 font-medium">{etapa}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </main>
  );
} 