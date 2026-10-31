import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { listarConquistasApi, type ConquistaApi } from "../../api/clienteApi";
import { useTituloDocumento } from "../../hooks/useTituloDocumento";

export function PainelConquistas() {
  useTituloDocumento("Conquistas | SoulGame");
  const { usuario } = useAuth();
  const [todasConquistas, setTodasConquistas] = useState<ConquistaApi[]>([]);
  const [desbloqueadas, setDesbloqueadas] = useState<ConquistaApi[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    if (!usuario) return;

    Promise.all([listarConquistasApi(), listarConquistasApi(usuario.id)])
      .then(([catalogo, doUsuario]) => {
        setTodasConquistas(catalogo.conquistas);
        setDesbloqueadas(doUsuario.conquistas);
      })
      .catch(() => {
        setTodasConquistas([]);
        setDesbloqueadas([]);
      })
      .finally(() => setCarregando(false));
  }, [usuario]);

  if (!usuario) return null;

  const idsDesbloqueadas = new Set(desbloqueadas.map((c) => c.id));

  return (
    <main aria-label="Painel de conquistas" className="flex-1 px-4 py-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-blue-800 mb-1">🏆 Conquistas</h1>
        <p className="text-sm text-slate-500 mb-5">
          {desbloqueadas.length} de {todasConquistas.length || "—"} desbloqueadas
        </p>

        {carregando ? (
          <p className="text-sm text-slate-400 text-center py-10">Carregando conquistas…</p>
        ) : (
          <ul className="space-y-3">
            {todasConquistas.map((conquista) => {
              const desbloqueada = idsDesbloqueadas.has(conquista.id);
              return (
                <li
                  key={conquista.id}
                  className={`flex items-center gap-4 rounded-xl p-4 border transition-colors
                    ${desbloqueada
                      ? "bg-blue-50 border-blue-200"
                      : "bg-slate-50 border-slate-200 opacity-60"}`}
                >
                  <span
                    className={`text-2xl w-12 h-12 flex items-center justify-center rounded-full shrink-0
                      ${desbloqueada ? "bg-blue-600 text-white animate-brilho" : "bg-slate-300 text-slate-500"}`}
                    aria-hidden="true"
                  >
                    {desbloqueada ? "🏆" : "🔒"}
                  </span>
                  <div className="min-w-0">
                    <p className={`font-semibold ${desbloqueada ? "text-blue-800" : "text-slate-500"}`}>
                      {conquista.nome}
                    </p>
                    <p className="text-xs text-slate-500">{conquista.descricao}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </main>
  );
}
