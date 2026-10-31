import { useState } from "react";
import { comprimirImagemParaBase64, ehImagem, TAMANHO_MAXIMO_ORIGINAL_BYTES } from "../utils/imagem";
import type { Atividade } from "../types";
import { useAuth } from "../hooks/useAuth";
import { useToast } from "../hooks/useToast";
import { converterPontosParaReais, formatarReais } from "../data/conversao";

function hojeISO(): string {
  return new Date().toISOString().slice(0, 10);
}

export function ModalDetalheAtividade({
  atividade,
  onFechar,
  onDataSalva,
}: {
  atividade: Atividade;
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
      return;
    }
    setEnviando(true);
    try {
      let imagemBase64: string;
      try {
        imagemBase64 = await comprimirImagemParaBase64(arquivoEvidencia);
      } catch (erro) {
        mostrarToast(erro instanceof Error ? erro.message : "Falha ao preparar a imagem.", "erro");
        return;
      }

      const tipoEvidencia = "FOTO";
      const resultado = await concluirAtividade(atividade.id, imagemBase64, tipoEvidencia);

      if (!resultado.sucesso) {
        mostrarToast(resultado.mensagem ?? "Não foi possível concluir.", "erro");
        return;
      }

      const valorReais = formatarReais(converterPontosParaReais(atividade.pontos));
      if (resultado.pendente) {
        mostrarToast(resultado.mensagem ?? "Evidência enviada e em análise.", "info");
        onFechar();
        return;
      }
      mostrarToast(
        resultado.mensagem ?? `+${atividade.pontos} pts (${valorReais}) — ${atividade.nome} concluído! 🎉`,
        "sucesso"
      );

      // Celebração das conquistas novas, em sequência — cada uma some
      // antes da próxima aparecer, pra não empilhar tudo de uma vez.
      resultado.conquistasDesbloqueadas?.forEach((conquista, indice) => {
        setTimeout(() => {
          mostrarToast(`🏆 Conquista desbloqueada: ${conquista.nome}!`, "sucesso");
        }, 1400 * (indice + 1));
      });

      onFechar();
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Detalhes de ${atividade.nome}`}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 sm:px-4"
      onClick={(e) => e.target === e.currentTarget && onFechar()}
    >
      <div className="bg-white rounded-t-2xl sm:rounded-2xl shadow-xl p-6 max-w-sm w-full max-h-[85vh] overflow-y-auto">
        <div className="flex justify-between items-start gap-2 mb-1">
          <h2 className="font-bold text-slate-800 text-lg">{atividade.nome}</h2>
          <button
            onClick={onFechar}
            aria-label="Fechar"
            className="text-slate-600 hover:text-slate-600 text-xl leading-none shrink-0"
          >
            ×
          </button>
        </div>
        <p className="text-sm text-slate-600">{atividade.descricao}</p>
        <p className="text-sm font-semibold text-blue-700 mt-2">
          +{atividade.pontos} pts ({formatarReais(converterPontosParaReais(atividade.pontos))})
        </p>

        {!concluida && (
          <div className="mt-4 flex gap-2 items-end">
            <div className="flex-1">
              <label htmlFor="data-realizacao-modal" className="block text-xs font-medium text-slate-600 mb-1">
                Data em que pretende realizar
              </label>
              <input
                id="data-realizacao-modal"
                type="date"
                min={hojeISO()}
                value={dataEscolhida}
                onChange={(e) => setDataEscolhida(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              />
            </div>
            <button
              onClick={handleSalvarData}
              className="text-sm font-semibold bg-slate-700 hover:bg-slate-800 text-white px-4 py-2 rounded-lg"
            >
              Salvar
            </button>
          </div>
        )}

        {!concluida && (
          <div className="mt-3">
            <label htmlFor="foto-evidencia-modal" className="block text-xs font-medium text-slate-600 mb-1">
              Foto da atividade <span className="text-red-600">(obrigatória)</span> — a IA analisa antes de validar
            </label>
            <input
              id="foto-evidencia-modal"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={(e) => handleEscolherArquivo(e.target.files?.[0] ?? null)}
              className="w-full text-xs text-slate-600 file:mr-2 file:rounded-lg file:border-0
                         file:bg-blue-50 file:px-3 file:py-2 file:text-xs file:font-semibold file:text-blue-700"
            />
            {previaUrl ? (
              <img
                src={previaUrl}
                alt="Pré-visualização da evidência escolhida"
                className="mt-2 max-h-40 w-full rounded-lg object-cover border border-slate-200"
              />
            ) : (
              <p className="text-[11px] text-slate-600 mt-1">
                Sem foto não é possível concluir nem ganhar pontos.
              </p>
            )}
          </div>
        )}

        <button
          onClick={handleConcluir}
          disabled={concluida || enviando || !arquivoEvidencia}
          className={`mt-4 w-full text-sm font-semibold px-4 py-2 rounded-lg transition-colors ${
            concluida
              ? "bg-emerald-200 text-emerald-800 cursor-default"
              : "bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-60"
          }`}
        >
          {concluida ? "Concluído ✓" : enviando ? "Analisando evidência..." : "Enviar evidência e concluir"}
        </button>
      </div>
    </div>
  );
}
