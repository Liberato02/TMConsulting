import { useState } from "react";
import { comprimirImagemParaBase64, ehImagem, TAMANHO_MAXIMO_ORIGINAL_BYTES } from "../utils/imagem";
import type { Atividade } from "../types";
import { useAuth } from "../hooks/useAuth";
import { useToast } from "../hooks/useToast";
import { converterPontosParaReais, formatarReais } from "../data/conversao";
import type { RespostaEstoqueSangue } from "../data/estoqueSangue";

const CORES_NIVEL_ESTOQUE: Record<string, string> = {
  critico: "bg-red-100 text-red-700",
  baixo: "bg-amber-100 text-amber-700",
  adequado: "bg-emerald-100 text-emerald-700",
};

function hojeISO(): string {
  return new Date().toISOString().slice(0, 10);
}

export function ModalDetalheAtividade({
  atividade,
  estoqueSangue,
  onFechar,
  onDataSalva,
}: {
  atividade: Atividade;
  estoqueSangue: RespostaEstoqueSangue | null;
  onFechar: () => void;
  onDataSalva: (atividadeId: string, dataISO: string) => void;
}) {
  const { usuario, concluirAtividade, definirPrazoDesafio } = useAuth();
  const { mostrarToast } = useToast();
  const [dataEscolhida, setDataEscolhida] = useState(
    usuario?.prazosDesafios[atividade.id] ?? ""
  );
  const [arquivoEvidencia, setArquivoEvidencia] = useState<File | null>(null);
  const [previaUrl, setPreviaUrl] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);

  if (!usuario) return null;
  const concluida = usuario.atividadesConcluidas.includes(atividade.id);

  function handleSalvarData() {
    if (!dataEscolhida) {
      mostrarToast("Escolha uma data antes de salvar.", "erro");
      return;
    }
    definirPrazoDesafio(atividade.id, dataEscolhida);
    mostrarToast("Data salva na Trilha Soul!", "sucesso");
    onDataSalva(atividade.id, dataEscolhida);
  }

  function handleEscolherArquivo(arquivo: File | null) {
    if (previaUrl) URL.revokeObjectURL(previaUrl);
    setPreviaUrl(null);
    setArquivoEvidencia(null);
    if (!arquivo) return;

    if (!ehImagem(arquivo)) {
      mostrarToast("Envie uma foto (JPG, PNG ou WEBP). PDFs não são aceitos como evidência.", "erro");
      return;
    }
    if (arquivo.size > TAMANHO_MAXIMO_ORIGINAL_BYTES) {
      mostrarToast("A imagem é muito grande (máximo 15 MB).", "erro");
      return;
    }
    setArquivoEvidencia(arquivo);
    setPreviaUrl(URL.createObjectURL(arquivo));
  }

  async function handleConcluir() {
    // A evidência é obrigatória: sem foto não existe registro nem pontos.
    if (!arquivoEvidencia) {
      mostrarToast("Anexe uma foto que comprove a atividade para concluir.", "erro");
