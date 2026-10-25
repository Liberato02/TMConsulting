import { useEffect } from "react";

// Uso legítimo de useEffect: sincronizar o título da aba do navegador
// (document.title) com a página atual. É um "efeito colateral" de
// verdade — mexe em algo fora do React (o DOM do documento, fora da
// árvore de componentes) — e precisa rodar de novo sempre que o título
// mudar, daí a dependência [titulo] no array.
export function useTituloDocumento(titulo: string) {
  useEffect(() => {
    const tituloAnterior = document.title;
    document.title = titulo;

    // Restaura o título anterior ao desmontar — evita que a aba fique
    // com um título "grudado" de uma página que o usuário já saiu.
    return () => {
      document.title = tituloAnterior;
    };
  }, [titulo]);
}