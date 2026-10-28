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


  return (
    <div className="relative flex flex-col items-center" aria-hidden="true">
      {/* Círculo do avatar — foto ou personagem */}

      <div
        className={`${tamanhos.circulo} rounded-full border-4 border-white shadow-lg
                    flex items-center justify-center overflow-hidden z-10
                    ${
                      usuario.avatarTipo === "personagem"
                        ? buscarPersonagem(usuario.avatarPersonagemId ?? "explorador").corFundo
                        : "bg-slate-200"
                    }`}
            alt=""
            className="w-full h-full object-cover"
          />
        ) : (
          <span className={tamanhos.texto}>
            {buscarPersonagem(usuario.avatarPersonagemId ?? "explorador").emoji}
          </span>
        )}
      </div>

      {/* Pino estilo GPS: um quadrado rotacionado 45° "saindo" de baixo do
          círculo, criando o efeito de marcador de mapa (Waze/Google Maps) */}
      <div className={`${tamanhos.pino} ${corPino} rotate-45 -mt-1.5 rounded-sm shadow-md`} />
    </div>
  );
}
