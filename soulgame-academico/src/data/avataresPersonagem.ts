// Personagens prontos para quem não quiser usar a própria foto na trilha.
// São formas geométricas simples (SVG inline, sem depender de imagens
// externas ou de bibliotecas de ícones), cada um com uma cor de destaque.
export interface PersonagemAvatar {
  id: string;
  nome: string;
  corFundo: string; // classe Tailwind de fundo
  emoji: string; // rosto simplificado
}

export const PERSONAGENS_AVATAR: PersonagemAvatar[] = [
  { id: "explorador", nome: "Explorador", corFundo: "bg-blue-500", emoji: "🧭" },
  { id: "planta", nome: "Guardião Verde", corFundo: "bg-emerald-500", emoji: "🌱" },
  { id: "coracao", nome: "Coração Solidário", corFundo: "bg-rose-500", emoji: "❤️" },
  { id: "estrela", nome: "Estrela em Ascensão", corFundo: "bg-amber-500", emoji: "⭐" },
  { id: "raio", nome: "Energia Pura", corFundo: "bg-teal-500", emoji: "⚡" },
  { id: "foguete", nome: "Rumo ao Topo", corFundo: "bg-purple-500", emoji: "🚀" },
];

export function buscarPersonagem(id: string): PersonagemAvatar {
  return PERSONAGENS_AVATAR.find((p) => p.id === id) ?? PERSONAGENS_AVATAR[0];
}
