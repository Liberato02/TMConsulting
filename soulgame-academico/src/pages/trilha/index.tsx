import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { ATIVIDADES } from "../../data/atividades";
import { buscarEstoqueSangue, type RespostaEstoqueSangue } from "../../data/estoqueSangue";
import { TrilhaDesafios } from "../../components/TrilhaDesafios";
import { ListaRegistroAtividades } from "../../components/ListaRegistroAtividades";
import { ModalDetalheAtividade } from "../../components/ModalDetalheAtividade";
import { ModalConfirmarLembrete } from "../../components/ModalConfirmarLembrete";
import { useTituloDocumento } from "../../hooks/useTituloDocumento";

export function Trilha() {
  useTituloDocumento("Trilha Soul | SoulGame");
  const { usuario } = useAuth();

  const [idSelecionado, setIdSelecionado] = useState<string | null>(null);
  const [estoqueSangue, setEstoqueSangue] = useState<RespostaEstoqueSangue | null>(null);
  const [modalLembrete, setModalLembrete] = useState<{ atividadeId: string; dataISO: string } | null>(
    null
  );

  useEffect(() => {
    buscarEstoqueSangue()
      .then(setEstoqueSangue)
      .catch(() => setEstoqueSangue(null));
  }, []);

  // A trilha é montada na ORDEM CRONOLÓGICA das datas escolhidas.
  // Atividades ainda sem data ficam depois, na ordem original.
  const atividadesOrdenadas = useMemo(() => {
    const comData = ATIVIDADES.filter((a) => usuario?.prazosDesafios[a.id]);
    const semData = ATIVIDADES.filter((a) => !usuario?.prazosDesafios[a.id]);
    comData.sort((a, b) =>
      usuario!.prazosDesafios[a.id].localeCompare(usuario!.prazosDesafios[b.id])
    );
    return [...comData, ...semData];
  }, [usuario]);

  if (!usuario) return null;

  const atividadeSelecionada = ATIVIDADES.find((a) => a.id === idSelecionado) ?? null;

  function handleDataSalva(atividadeId: string, dataISO: string) {
    setIdSelecionado(null); // fecha o modal de detalhe
    setModalLembrete({ atividadeId, dataISO });
  }

  const modalAtividade = modalLembrete
    ? ATIVIDADES.find((a) => a.id === modalLembrete.atividadeId)
    : null;

  return (
    <main aria-label="Trilha Soul — mapa de desafios" className="flex-1 px-4 py-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-blue-800 mb-1">🗺️ Trilha Soul</h1>
        <p className="text-sm text-slate-600 mb-4">
          Toque num desafio no mapa ou na lista para escolher a data e acompanhar seu progresso.
        </p>

        <TrilhaDesafios
          atividades={atividadesOrdenadas}
          usuario={usuario}
          atividadeSelecionada={idSelecionado}
          onSelecionar={setIdSelecionado}
        />

        <h2 className="text-sm font-semibold text-slate-600 mt-6 mb-2">
          Registrar avulso
        </h2>
        <ListaRegistroAtividades
          atividades={atividadesOrdenadas}
          usuario={usuario}
          onSelecionar={setIdSelecionado}
        />
      </div>

      {atividadeSelecionada && (
        <ModalDetalheAtividade
          atividade={atividadeSelecionada}
          estoqueSangue={estoqueSangue}
          onFechar={() => setIdSelecionado(null)}
          onDataSalva={handleDataSalva}
        />
      )}

      {modalLembrete && modalAtividade && (
        <ModalConfirmarLembrete
          atividade={modalAtividade}
          dataISO={modalLembrete.dataISO}
          onFechar={() => setModalLembrete(null)}
        />
      )}
    </main>
  );
}
