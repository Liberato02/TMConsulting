import { useRef, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useToast } from "../hooks/useToast";
import { PERSONAGENS_AVATAR } from "../data/avataresPersonagem";

const TAMANHO_MAXIMO_PX = 160; // redimensiona a foto pra não pesar o localStorage

// Redimensiona a imagem via <canvas> antes de salvar como base64 —
// uma foto de celular sem isso facilmente passaria de 2-3MB, e o
// localStorage tem limite de ~5-10MB por site inteiro.
function redimensionarImagem(arquivo: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const leitor = new FileReader();
    leitor.onload = () => {
      const imagem = new Image();
      imagem.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = TAMANHO_MAXIMO_PX;
        canvas.height = TAMANHO_MAXIMO_PX;
        const contexto = canvas.getContext("2d");
        if (!contexto) return reject(new Error("Canvas indisponível"));

        // Recorta um quadrado central da imagem (evita distorcer)
        const lado = Math.min(imagem.width, imagem.height);
        const origemX = (imagem.width - lado) / 2;
        const origemY = (imagem.height - lado) / 2;
        contexto.drawImage(
          imagem,
          origemX,
          origemY,
          lado,
          lado,
          0,
          0,
          TAMANHO_MAXIMO_PX,
          TAMANHO_MAXIMO_PX
        );
        resolve(canvas.toDataURL("image/jpeg", 0.85));
      };
      imagem.onerror = reject;
      imagem.src = leitor.result as string;
    };
    leitor.onerror = reject;
    leitor.readAsDataURL(arquivo);
  });
}

export function SeletorAvatar() {
  const { usuario, definirAvatarPersonagem, definirAvatarFoto } = useAuth();
  const { mostrarToast } = useToast();
  const inputArquivoRef = useRef<HTMLInputElement>(null);
  const [carregandoFoto, setCarregandoFoto] = useState(false);

  if (!usuario) return null;

  async function handleEscolherFoto(evento: React.ChangeEvent<HTMLInputElement>) {
    const arquivo = evento.target.files?.[0];
    if (!arquivo) return;

    if (!arquivo.type.startsWith("image/")) {
      mostrarToast("Escolha um arquivo de imagem.", "erro");
      return;
    }

    setCarregandoFoto(true);
    try {
      const dataUrl = await redimensionarImagem(arquivo);
      definirAvatarFoto(dataUrl);
      mostrarToast("Foto de perfil atualizada!", "sucesso");
    } catch {
      mostrarToast("Não foi possível processar a imagem.", "erro");
    } finally {
      setCarregandoFoto(false);
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 mb-6">
      <p className="text-sm font-semibold text-slate-700 mb-3">
        Escolha seu avatar na trilha
      </p>

      <div className="flex flex-wrap gap-2 mb-3">
        {PERSONAGENS_AVATAR.map((personagem) => {
          const selecionado =
            usuario.avatarTipo === "personagem" &&
            usuario.avatarPersonagemId === personagem.id;
          return (
            <button
              key={personagem.id}
              type="button"
              onClick={() => definirAvatarPersonagem(personagem.id)}
              aria-label={`Usar avatar ${personagem.nome}`}
              aria-pressed={selecionado}
              className={`w-12 h-12 rounded-full flex items-center justify-center text-xl
                          ${personagem.corFundo} transition-transform
                          ${selecionado ? "ring-4 ring-blue-400 scale-110" : "opacity-80 hover:opacity-100"}`}
            >
              {personagem.emoji}
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => inputArquivoRef.current?.click()}
          disabled={carregandoFoto}
          className={`text-sm font-semibold px-4 py-2 rounded-lg transition-colors ${
            usuario.avatarTipo === "foto"
              ? "bg-blue-600 text-white"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          }`}
        >
          {carregandoFoto ? "Processando..." : "Usar minha foto"}
        </button>
        <input
          ref={inputArquivoRef}
          type="file"
          accept="image/*"
          onChange={handleEscolherFoto}
          className="sr-only"
          aria-label="Enviar foto de perfil"
        />
        {usuario.avatarTipo === "foto" && (
          <span className="text-xs text-emerald-700 font-medium">✓ Foto ativa</span>
        )}
      </div>
    </div>
  );
}
