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


