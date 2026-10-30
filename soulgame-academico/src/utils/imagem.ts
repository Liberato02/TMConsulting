// Utilitários de imagem para a evidência das atividades.
// Reduz a foto no navegador antes de enviar: fotos de celular chegam a
// 5-10 MB e estourariam o limite do servidor/IA. Em JPEG de ~1280px a
// imagem fica em poucas centenas de KB e a IA ainda enxerga bem.

export const TAMANHO_MAXIMO_ORIGINAL_BYTES = 15 * 1024 * 1024;
const LADO_MAXIMO_PX = 1280;
const QUALIDADE_JPEG = 0.8;

export function ehImagem(arquivo: File): boolean {
  return arquivo.type.startsWith("image/") && arquivo.type !== "image/svg+xml";
}

function carregarImagem(arquivo: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(arquivo);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Não foi possível abrir a imagem escolhida."));
    };
    img.src = url;
  });
}

/** Redimensiona e converte para JPEG; devolve só o base64 (sem o prefixo data:). */
export async function comprimirImagemParaBase64(arquivo: File): Promise<string> {
  const img = await carregarImagem(arquivo);
  const escala = Math.min(1, LADO_MAXIMO_PX / Math.max(img.width, img.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(img.width * escala);
  canvas.height = Math.round(img.height * escala);

  const contexto = canvas.getContext("2d");
  if (!contexto) throw new Error("Seu navegador não conseguiu processar a imagem.");
  contexto.fillStyle = "#ffffff"; // PNG transparente vira fundo branco no JPEG
  contexto.fillRect(0, 0, canvas.width, canvas.height);
  contexto.drawImage(img, 0, 0, canvas.width, canvas.height);

  const dataUrl = canvas.toDataURL("image/jpeg", QUALIDADE_JPEG);
  return dataUrl.split(",")[1] ?? "";
}
