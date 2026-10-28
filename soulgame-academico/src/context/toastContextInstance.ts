import { createContext } from "react";

type TipoToast = "sucesso" | "erro" | "info";

export interface ToastContextType {
    mostrarToast: (mensagem: string, tipo?: TipoToast) => void;
}

export const ToastContext = createContext<ToastContextType | undefined>(undefined);
