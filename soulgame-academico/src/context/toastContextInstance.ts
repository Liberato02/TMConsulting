import { createContext } from "react";

export type TipoToast = "sucesso" | "erro" | "info";

export interface ToastContextType {
  mostrarToast: (mensagem: string, tipo?: TipoToast) => void;
}

export const ToastContext = createContext<ToastContextType | undefined>(undefined);