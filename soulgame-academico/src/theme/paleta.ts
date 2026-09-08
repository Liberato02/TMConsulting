/**
 * Paleta oficial do SoulGame — baseada nas cores do projeto original
 * (ver css/dashboard.css do TMConsulting Sprint 2):
 *   --cor-azul-marca: #2563eb   (Tailwind: blue-600)
 *   --cor-azul-hover: #1d4ed8   (Tailwind: blue-700)
 *   --cor-verde-marca: #00bfa5  (Tailwind: teal-400/500) — usado só no wordmark "Game"
 *   --cor-verde-operacional: #00b894 (Tailwind: emerald-500) — usado para indicar
 *      "sustentável"/meio ambiente, não é a cor da marca em si.
 *
 * Não crie tons "soltos" (ex: bg-[#1a5c3a]) — sempre use as classes abaixo,
 * para manter consistência visual em toda a aplicação.
 */
export const PALETA = {
  marca: {
    principal: "blue-600",   // botões primários, links de destaque
    hover: "blue-700",
    escura: "blue-800",      // títulos
    forte: "blue-950",       // fundo do footer
    suave: "blue-50",        // fundos de seção clara
    acentoWordmark: "teal-300", // só o "Game" do logo (herança do #00bfa5 original)
  },
  texto: {
    padrao: "slate-700",
    secundario: "slate-500",
    apagado: "slate-400",
  },
  // Cores de categoria/estado NÃO seguem a marca — usam convenções
  // semânticas próprias (verde = sustentável/sucesso, âmbar = social, etc).
  categorias: {
    saude: "rose-100 text-rose-700",
    "meio-ambiente": "emerald-100 text-emerald-700",
    social: "amber-100 text-amber-700",
  },
  feedback: {
    sucesso: "emerald-700 bg-emerald-50", // verde = sucesso é convenção universal
    erro: "red-600 bg-red-50",
  },
} as const;
