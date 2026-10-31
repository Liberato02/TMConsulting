import { useCallback, useState, type ReactNode } from "react";
import { ToastContext, type TipoToast } from "./toastContextInstance";

interface Toast {
    id: string;
    mensagem: string;
    tipo: TipoToast;
}

const ESTILO_POR_TIPO: Record<TipoToast, string> = {
    sucesso: "bg-emerald-700",
    erro: "bg-red-600",
    info: "bg-blue-600",
};

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const mostrarToast = useCallback((mensagem: string, tipo: TipoToast = "info") => {
        const id = crypto.randomUUID();
        setToasts((atual) => [...atual, { id, mensagem, tipo }]);

        // Some sozinho depois de 3.5s — feedback temporário, não intrusivo.
        setTimeout(() => {
            setToasts((atual) => atual.filter((t) => t.id !== id));
        }, 3500);
    }, []);

    return (
        <ToastContext.Provider value={{ mostrarToast }}>
            {children}

            {/* role="region" é necessário: aria-label sozinho numa div comum,
                sem role, é ignorado por leitores de tela. */}
            <div
                role="region"
                aria-label="Notificações"
                className="fixed bottom-4 right-4 z-50 flex flex-col gap-2"
            >
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        role="status"
                        className={`${ESTILO_POR_TIPO[toast.tipo]} text-white text-sm font-medium
                        px-4 py-3 rounded-lg shadow-lg animate-[toast-in_0.2s_ease-out]
                        max-w-xs`}
                    >
                        {toast.mensagem}
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
}
