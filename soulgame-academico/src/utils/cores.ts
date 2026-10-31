const TEXTO_ESCURO = "#0f172a";
const TEXTO_CLARO = "#ffffff";

// Luminância relativa de uma cor "#RRGGBB" (fórmula da WCAG 2.x).
function luminancia(hex: string): number {
  const [r, g, b] = [1, 3, 5]
    .map((posicao) => parseInt(hex.slice(posicao, posicao + 2), 16) / 255)
    .map((canal) => (canal <= 0.03928 ? canal / 12.92 : ((canal + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contraste(corA: string, corB: string): number {
  const [maior, menor] = [luminancia(corA), luminancia(corB)].sort((a, b) => b - a);
  return (maior + 0.05) / (menor + 0.05);
}

// Escolhe texto claro ou escuro, o que tiver MAIOR contraste com o fundo.
// Útil quando a cor de fundo vem da API (ex.: cor de cada ODS) e não dá
// para garantir o contraste só com classes fixas do Tailwind.
export function corTextoSobre(fundoHex: string): string {
  if (!/^#[0-9a-f]{6}$/i.test(fundoHex)) return TEXTO_ESCURO;
  return contraste(fundoHex, TEXTO_CLARO) >= contraste(fundoHex, TEXTO_ESCURO)
    ? TEXTO_CLARO
    : TEXTO_ESCURO;
}