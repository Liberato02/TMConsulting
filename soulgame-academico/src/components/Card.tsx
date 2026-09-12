import type { ReactNode } from "react";

// Componente reutilizável: o "card branco com sombra" que se repetia
// copiado em Login, Cadastro, Contato, Desafios, Admin e Detalhe de
// Atividade. Extraído aqui pra ter um lugar só de manutenção.
export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`bg-white rounded-2xl shadow-sm p-6 ${className}`}>
      {children}
    </div>
  );
}
