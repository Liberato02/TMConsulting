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

