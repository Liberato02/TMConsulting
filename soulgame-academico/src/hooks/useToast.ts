import { useContext } from "react";
import { ToastContext, type ToastContextType } from "../context/toastContextInstance";

// Separado do ToastProvider pelo mesmo motivo do useAuth: mantém o
// Fast Refresh funcionando corretamente.
export function useToast(): ToastContextType {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast precisa ser usado dentro de um ToastProvider");
    }
    return context;
}
