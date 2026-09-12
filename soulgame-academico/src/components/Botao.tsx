import type { ButtonHTMLAttributes } from "react";

type VarianteBotao = "primario" | "secundario" | "perigo";

interface BotaoProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variante?: VarianteBotao;
}

const ESTILOS_POR_VARIANTE: Record<VarianteBotao, string> = {
  primario: "bg-blue-600 hover:bg-blue-700 text-white",
  secundario: "bg-slate-200 hover:bg-slate-300 text-slate-800",
  perigo: "bg-red-600 hover:bg-red-700 text-white",
};

// Componente reutilizável: o botão principal do projeto, com variantes.
// Substitui os botões inline repetidos em Login, Cadastro, Contato,
// página de erro e Detalhe de Atividade.
export function Botao({ variante = "primario", className = "", ...props }: BotaoProps) {
  return (
    <button
      className={`${ESTILOS_POR_VARIANTE[variante]} font-semibold rounded-lg px-4 py-2
                  text-sm transition-colors disabled:opacity-60 disabled:cursor-not-allowed ${className}`}
      {...props}
    />
  );
}
