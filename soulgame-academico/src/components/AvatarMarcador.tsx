import type { Usuario } from "../types";
import { buscarPersonagem } from "../data/avataresPersonagem";

// Círculo do avatar (personagem OU foto) com um "pino" estilo GPS/Waze
// embaixo — é o marcador que se move pela trilha de desafios.
export function AvatarMarcador({
  usuario,
  tamanho = "md",
}: {
  usuario: Usuario;
  tamanho?: "sm" | "md" | "lg";

  }) {
const tamanhos = {
    sm: { circulo: "w-10 h-10", texto: "text-lg", pino: "w-3 h-3" },
    md: { circulo: "w-14 h-14", texto: "text-2xl", pino: "w-4 h-4" },
    lg: { circulo: "w-20 h-20", texto: "text-4xl", pino: "w-5 h-5" },
}[tamanho];

const corPino =
    usuario.avatarTipo === "personagem"
    ? buscarPersonagem(usuario.avatarPersonagemId ?? "explorador").corFundo
    : "bg-blue-600";
