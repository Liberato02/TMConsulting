import { INTEGRANTES } from "../../data/integrantes";

function calcularPosicao(indice: number, total: number) {
  const anguloGraus = -90 + (360 / total) * indice;
  const anguloRad = (anguloGraus * Math.PI) / 180;
  const raio = 38;
  return {
    x: 50 + raio * Math.cos(anguloRad),
    y: 50 + raio * Math.sin(anguloRad),
  };
}

export function Integrantes() {
  const total = INTEGRANTES.length;
  const posicoes = INTEGRANTES.map((_, i) => calcularPosicao(i, total));

  return (
    <main aria-label="Nossa equipe" className="flex-1 px-4 py-16 bg-slate-950">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-1 text-center">
          Ecossistema SoulGame
        </h1>
        <p className="text-slate-400 text-sm text-center mb-10">
          Nossa equipe, conectada como uma rede de dados.
        </p>

        <div className="relative w-full aspect-square max-w-xl mx-auto">
          <svg
            viewBox="0 0 100 100"
            className="absolute inset-0 w-full h-full"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="gradienteFibra" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#2dd4bf" />
              </linearGradient>
              <filter id="brilhoFibra" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="0.6" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Anel externo: conecta cada integrante ao próximo, formando
                o "círculo de fibra óptica" ligando todo mundo entre si */}
            {posicoes.map((pos, indice) => {
              const proximo = posicoes[(indice + 1) % posicoes.length];
              const idAnel = `anel-fibra-${indice}`;
              return (
                <g key={idAnel}>
                  <path
                    id={idAnel}
                    d={`M ${pos.x} ${pos.y} L ${proximo.x} ${proximo.y}`}
                    stroke="url(#gradienteFibra)"
                    strokeWidth="0.35"
                    strokeLinecap="round"
                    opacity="0.35"
                    filter="url(#brilhoFibra)"
                  />
                  <circle r="0.7" fill="#5eead4" filter="url(#brilhoFibra)">
                    <animateMotion
                      dur={`${3 + indice * 0.4}s`}
                      repeatCount="indefinite"
                      keyPoints="0;1"
                      keyTimes="0;1"
                    >
                      <mpath href={`#${idAnel}`} />
                    </animateMotion>
                  </circle>
                </g>
              );
            })}

            {/* Raios: hub central até cada integrante */}
            {posicoes.map((pos, indice) => {
              const idCaminho = `caminho-fibra-${indice}`;
              return (
                <g key={idCaminho}>
                  <path
                    id={idCaminho}
                    d={`M 50 50 L ${pos.x} ${pos.y}`}
                    stroke="url(#gradienteFibra)"
                    strokeWidth="0.5"
                    strokeLinecap="round"
                    opacity="0.6"
                    filter="url(#brilhoFibra)"
                  />
                  <circle r="1" fill="#7dd3fc" filter="url(#brilhoFibra)">
                    <animateMotion
                      dur={`${2 + indice * 0.3}s`}
                      repeatCount="indefinite"
                      keyPoints="0;1"
                      keyTimes="0;1"
                    >
                      <mpath href={`#${idCaminho}`} />
                    </animateMotion>
                  </circle>
                </g>
              );
            })}
          </svg>

          <div
            className="absolute w-16 h-16 -translate-x-1/2 -translate-y-1/2 rounded-full
                       bg-gradient-to-br from-blue-500 to-teal-400 flex items-center justify-center
                       shadow-[0_0_25px_rgba(56,189,248,0.6)] z-10"
            style={{ left: "50%", top: "50%" }}
          >
            <span className="text-white font-extrabold text-xs text-center leading-tight">
              Soul
              <br />
              Game
            </span>
          </div>

          {INTEGRANTES.map((integrante, indice) => {
            const pos = posicoes[indice];
            return (
              <div
                key={integrante.rm}
                className="absolute flex flex-col items-center -translate-x-1/2 -translate-y-1/2 z-10"
                style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
              >
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-sky-400 blur-md opacity-40" />
                  <img
                    src={integrante.foto}
                    alt={`Foto de ${integrante.nome}`}
                    className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover
                               border-2 border-sky-300 shadow-lg"
                  />
                </div>
                <p className="mt-2 text-[10px] sm:text-xs font-semibold text-white text-center max-w-[90px] leading-tight">
                  {integrante.nome.split(" ")[0]}
                </p>
                {/* Links direto no gráfico — não precisa rolar a página pra achar */}
                <div className="flex gap-2 mt-0.5">
                  <a
                    href={integrante.github}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`GitHub de ${integrante.nome}`}
                    className="text-[9px] sm:text-[10px] font-semibold text-sky-400 hover:text-sky-300 hover:underline"
                  >
                    GitHub
                  </a>
                  <span className="text-slate-600 text-[9px]">·</span>
                  <a
                    href={integrante.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`LinkedIn de ${integrante.nome}`}
                    className="text-[9px] sm:text-[10px] font-semibold text-sky-400 hover:text-sky-300 hover:underline"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-16">
          {INTEGRANTES.map((integrante) => (
            <div
              key={integrante.rm}
              className="bg-slate-900 border border-slate-800 rounded-2xl shadow-sm p-4 flex items-center gap-3"
            >
              <img
                src={integrante.foto}
                alt={`Foto de ${integrante.nome}`}
                className="w-12 h-12 rounded-full object-cover border-2 border-sky-400 shrink-0"
              />
              <div className="min-w-0">
                <p className="font-bold text-white text-sm truncate">{integrante.nome}</p>
                <p className="text-xs text-slate-400">
                  RM: {integrante.rm} · Turma: {integrante.turma}
                </p>
                <div className="flex gap-3 mt-1 text-xs">
                  <a
                    href={integrante.github}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sky-400 font-semibold hover:underline"
                  >
                    GitHub
                  </a>
                  <a
                    href={integrante.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sky-400 font-semibold hover:underline"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
